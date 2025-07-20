from app.db.models.comment import Comment
from app.db.models.user import User
from app.schemas.comment import CommentCreate, CommentUpdate
from beanie import PydanticObjectId
from fastapi import HTTPException
from typing import List, Optional
from beanie.operators import And

class CommentService:
    @staticmethod
    async def create_comment(data: CommentCreate, current_user: User):
        if str(current_user.id) == data.doctorId:
            raise HTTPException(status_code=400, detail="You cannot comment on yourself.")
        comment = Comment(
            commenterId=current_user,
            doctorId=PydanticObjectId(data.doctorId),
            content=data.content
        )
        await comment.insert()
        return comment.model_dump()

    @staticmethod
    async def delete_comment(id: str, current_user: User):
        comment = await Comment.get(PydanticObjectId(id))
        if not comment:
            raise HTTPException(status_code=404, detail="Comment not found")
        
        if str(comment.commenterId.ref.id) != str(current_user.id):
            raise HTTPException(status_code=403, detail="You can only delete your own comments")
        
        await comment.delete()
        return {"message": "Comment deleted successfully"}

    @staticmethod
    async def update_comment(id: str, data: CommentUpdate, current_user: User):
        comment = await Comment.get(PydanticObjectId(id))
        if not comment:
            raise HTTPException(status_code=404, detail="Comment not found")
        
        if str(comment.commenterId.ref.id) != str(current_user.id):
            raise HTTPException(status_code=403, detail="You can only update your own comments")
        
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(comment, field, value)
        
        await comment.save()
        return comment.model_dump()

    @staticmethod
    async def get_comments(doctorId: str):
        if not doctorId:
            raise HTTPException(status_code=400, detail="No Id provided.")
        comments = await Comment.find(
            Comment.doctorId.id == PydanticObjectId(doctorId),
            fetch_links=False
        ).to_list()
        return [c.model_dump() for c in comments]

    @staticmethod
    async def get_doctor_comments(doctorId: str):
        comments = await Comment.find(
            Comment.doctorId.id == PydanticObjectId(doctorId)
        ).to_list()
        return [c.model_dump() for c in comments]