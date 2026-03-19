from pydantic import BaseModel
from typing import Optional

class JobBase(BaseModel):
    company: str
    position: str
    status: str
    applied_date: str
    job_link: Optional[str] = ""
    notes: Optional[str] = ""

class JobCreate(JobBase):
    pass

class JobUpdate(JobBase):
    pass

class JobResponse(JobBase):
    id: int

    class Config:
        from_attributes = True