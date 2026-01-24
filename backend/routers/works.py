from fastapi import APIRouter, HTTPException
from database import supabase
from models import Work

router = APIRouter()

@router.post("/", response_model=Work)
def create_work(work: Work):
    # NOTE: 使用 by_alias=False 确保字段名使用下划线格式（匹配数据库列名）
    work_data = work.model_dump(by_alias=False, exclude_none=True)
    response = supabase.table("works").insert(work_data).execute()
    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to create work")
    return response.data[0]

@router.put("/{id}", response_model=Work)
def update_work(id: str, work: Work):
    # NOTE: 使用 by_alias=False 确保字段名使用下划线格式（匹配数据库列名）
    work_data = work.model_dump(by_alias=False, exclude={"id", "created_at", "composer_id"}, exclude_none=True)
    response = supabase.table("works").update(work_data).eq("id", id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Work not found")
    return response.data[0]

@router.delete("/{id}")
def delete_work(id: str):
    response = supabase.table("works").delete().eq("id", id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Work not found")
    return {"message": "Work deleted successfully"}
