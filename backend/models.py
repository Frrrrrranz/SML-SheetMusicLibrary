from pydantic import BaseModel, Field
from typing import List, Optional

def to_camel(string: str) -> str:
    words = string.split('_')
    return words[0] + ''.join(word.capitalize() for word in words[1:])

class CamelModel(BaseModel):
    class Config:
        alias_generator = to_camel
        populate_by_name = True

class Work(CamelModel):
    id: Optional[str] = None
    composer_id: Optional[str] = None
    title: str
    edition: Optional[str] = None
    year: Optional[str] = None
    file_url: Optional[str] = None
    created_at: Optional[str] = None

class Recording(CamelModel):
    id: Optional[str] = None
    composer_id: Optional[str] = None
    title: str
    performer: Optional[str] = None
    duration: Optional[str] = None
    year: Optional[str] = None
    created_at: Optional[str] = None

class Composer(CamelModel):
    id: str
    name: str
    period: str
    image: str
    sheet_music_count: int = 0
    recording_count: int = 0
    created_at: Optional[str] = None
    works: Optional[List[Work]] = []
    recordings: Optional[List[Recording]] = []

class ComposerCreate(CamelModel):
    name: str
    period: str
    image: str

class ComposerUpdate(CamelModel):
    name: Optional[str] = None
    period: Optional[str] = None
    image: Optional[str] = None
