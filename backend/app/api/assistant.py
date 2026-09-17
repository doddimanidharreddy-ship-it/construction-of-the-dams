from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schemas.schemas import ChatRequest, ChatResponse
from app.services.assistant_service import AssistantService

router = APIRouter(prefix="/assistant", tags=["Assistant"])

@router.post("/chat")
def assistant_chat(chat_in: ChatRequest, db: Session = Depends(get_db)):
    res = AssistantService.process_chat(db, chat_in.message, chat_in.project_id)
    return res

@router.post("/query")
def assistant_query(payload: dict, db: Session = Depends(get_db)):
    question = payload.get("question", payload.get("message", ""))
    res = AssistantService.process_chat(db, question)
    return res
