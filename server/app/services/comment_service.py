from app.db.models.comment import Comment
from app.db.models.user import User
from app.schemas.comment import CommentCreate, CommentUpdate
from beanie import PydanticObjectId
from fastapi import HTTPException
from typing import List, Optional

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
        return comment

    @staticmethod
    async def delete_comment(id: str):
        comment = await Comment.get(PydanticObjectId(id))
        if not comment:
            raise HTTPException(status_code=404, detail="The comment is not found.")
        await comment.delete()
        return comment

    @staticmethod
    async def update_comment(id: str, data: CommentUpdate):
        comment = await Comment.get(PydanticObjectId(id))
        if not comment:
            raise HTTPException(status_code=404, detail="The comment is not found.")
        update_data = data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(comment, field, value)
        await comment.save()
        return comment

    @staticmethod
    async def get_comments(doctorId: str):
        if not doctorId:
            raise HTTPException(status_code=400, detail="No Id provided.")
        comments = await Comment.find(Comment.doctorId.id == doctorId).to_list()
        return comments 