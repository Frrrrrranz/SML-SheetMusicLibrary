from fastapi import APIRouter, HTTPException
from database import supabase
from models import Recording

router = APIRouter()

@router.post("/", response_model=Recording)
def create_recording(recording: Recording):
    rec_data = recording.model_dump(by_alias=True, exclude_none=True)
    response = supabase.table("recordings").insert(rec_data).execute()
    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to create recording")
    return response.data[0]

@router.put("/{id}", response_model=Recording)
def update_recording(id: str, recording: Recording):
    rec_data = recording.model_dump(by_alias=True, exclude={"id", "created_at", "composer_id"}, exclude_none=True)
    response = supabase.table("recordings").update(rec_data).eq("id", id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Recording not found")
    return response.data[0]

@router.delete("/{id}")
def delete_recording(id: str):
    response = supabase.table("recordings").delete().eq("id", id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Recording not found")
    return {"message": "Recording deleted successfully"}
