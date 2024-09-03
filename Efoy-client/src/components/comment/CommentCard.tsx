import { CommentI } from "../../types/Comment"

const CommentCard = ({comment, refetch}: {comment: CommentI, refetch: () => void}) => {
  const commenter = comment.commenterId
  const initials = commenter?.fullName.split(' ').map((name) => name[0].toUpperCase()).join(''); 

  return (
    <div className="bg-white border rounded-md flex  w-full items-center ">
        <div className="w-20 flex justify-center items-center">
          {
           commenter?.profilePic ? 
           <img src="" alt="" /> :
           <div className="w-16 h-16 rounded-full flex justify-center items-center bg-gray-300 text-lg ">
              {initials}
            </div>
          }
           
        </div>
        <div className="text-gray-500 p-2">
          <p className="text-black">{commenter?.fullName}</p>
          <p className="italic">@{commenter?.username}</p>

          {comment.content}
        </div>

    </div>
  )
}

export default CommentCard