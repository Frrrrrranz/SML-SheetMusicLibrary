from fastapi import APIRouter, HTTPException
from database import supabase
from models import Composer, ComposerCreate, ComposerUpdate

router = APIRouter()

@router.get("/", response_model=list[Composer])
def get_composers():
    response = supabase.table("composers").select("*").order("name").execute()
    return response.data

@router.get("/{id}", response_model=Composer)
def get_composer(id: str):
    # Fetch composer
    composer_response = supabase.table("composers").select("*").eq("id", id).single().execute()
    if not composer_response.data:
        raise HTTPException(status_code=404, detail="Composer not found")
    
    composer = composer_response.data

    # Fetch works
    works_response = supabase.table("works").select("*").eq("composer_id", id).execute()
    composer["works"] = works_response.data

    # Fetch recordings
    recordings_response = supabase.table("recordings").select("*").eq("composer_id", id).execute()
    composer["recordings"] = recordings_response.data

    return composer

@router.post("/", response_model=Composer)
def create_composer(composer: ComposerCreate):
    response = supabase.table("composers").insert(composer.model_dump(by_alias=True, exclude_none=True)).execute()
    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to create composer")
    return response.data[0]

@router.put("/{id}", response_model=Composer)
def update_composer(id: str, composer: ComposerUpdate):
    # Filter out None values
    update_data = composer.model_dump(by_alias=True, exclude_none=True)
    
    response = supabase.table("composers").update(update_data).eq("id", id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Composer not found")
    return response.data[0]

@router.delete("/{id}")
def delete_composer(id: str):
    response = supabase.table("composers").delete().eq("id", id).execute()
    # Supabase delete returns the deleted rows
    if not response.data:
         raise HTTPException(status_code=404, detail="Composer not found")
    return {"message": "Composer deleted successfully"}
