from fastapi import APIRouter, HTTPException
from database import supabase
from models import Recording

router = APIRouter()

@router.post("/", response_model=Recording)
def create_recording(recording: Recording):
    # NOTE: 使用 by_alias=False 确保字段名使用下划线格式（匹配数据库列名）
    rec_data = recording.model_dump(by_alias=False, exclude_none=True)
    response = supabase.table("recordings").insert(rec_data).execute()
    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to create recording")
    return response.data[0]

@router.put("/{id}", response_model=Recording)
def update_recording(id: str, recording: Recording):
    # NOTE: 使用 by_alias=False 确保字段名使用下划线格式（匹配数据库列名）
    rec_data = recording.model_dump(by_alias=False, exclude={"id", "created_at", "composer_id"}, exclude_none=True)
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
