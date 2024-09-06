// import { CommentI } from "../../types/Comment"
// import { MdDeleteOutline } from "react-icons/md";
// import { CiEdit } from "react-icons/ci";


// const CommentCard = ({comment, refetch, isEditable}: {comment: CommentI, isEditable: boolean, refetch: () => void}) => {
//   const commenter = comment.commenterId
//   const initials = commenter?.fullName.split(' ').map((name) => name[0].toUpperCase()).join(''); 

//   const handleDelete = () => {


//   }

//   const handleEdit = () => {

//   }

//   return (
//     <div className="bg-white border rounded-md flex  w-full ">
//         <div className="w-20 flex flex-col items-center p-2  ">
//           {
//            commenter?.profilePic ? 
//            <img src="" alt="" /> :
//            <div className="w-16 h-16 rounded-full flex justify-center items-center bg-gray-300 text-lg ">
//               {initials}
//             </div>
//           }
           
//         </div>
//         <div className="flex-grow pt-2 text-gray-500">
//           <p className="text-black">{commenter?.fullName}</p>
//           <p className="italic">@{commenter?.username}</p>

//           {comment.content}
//         </div>
//         {isEditable && 
//           <div className="w-14  flex gap-2 p-2">
//             <MdDeleteOutline onClick={handleDelete} />
//             <CiEdit onClick={handleEdit} /> 
//           </div>
//         }

//     </div>
//   )
// }

// export default CommentCard


import { CommentI } from "../../types/Comment";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import { useDeleteCommentMutation, useUpdateCommentMutation } from "../../redux/api/commentAPI";
import Error from "../utils/Error";

const CommentCard = ({ comment, refetch, isEditable }: { comment: CommentI; isEditable: boolean; refetch: () => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [deleteComment, {isError, error}] = useDeleteCommentMutation();
  const [updateComment, {isError: isUpdateError, error: updateError}] = useUpdateCommentMutation();

  const commenter = comment.commenterId;
  const initials = commenter?.fullName.split(' ').map((name) => name[0].toUpperCase()).join('');

  const handleDelete = async () => {
    try {
      await deleteComment(comment?._id as string).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete the comment:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    console.log("gonna save")
    try {
      const res = await updateComment({ id: comment?._id as string, update: {content: editedContent, doctorId: comment.doctorId as string} }).unwrap();
      // console.log('res', res)
      setIsEditing(false);
      refetch();


    } catch (error) {
      console.error("Failed to update the comment:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(comment.content); // Reset the edited content if cancel is clicked
  };


  if (isError || isUpdateError)
    return <Error error={error || updateError} />

  return (
    <div className="bg-white border rounded-md flex w-full">
      <div className="w-20 flex flex-col items-center p-2">
        {commenter?.profilePic ? (
          <img src={commenter.profilePic} alt="Profile" className="w-16 h-16 rounded-full" />
        ) : (
          <div className="w-16 h-16 rounded-full flex justify-center items-center bg-gray-300 text-lg">
            {initials}
          </div>
        )}
      </div>
      <div className="flex-grow pt-2 text-gray-500">
        <p className="text-black">{commenter?.fullName}</p>
        <p className="italic">@{commenter?.username}</p>

        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        ) : (
          <p>{comment.content}</p>
        )}
      </div>
      {isEditable && (
        <div className="w-14 flex gap-2 p-2">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="text-green-500">Save</button>
              <button onClick={handleCancel} className="text-red-500">Cancel</button>
            </>
          ) : (
            <>
              <MdDeleteOutline onClick={handleDelete} className="cursor-pointer" />
              <CiEdit onClick={handleEdit} className="cursor-pointer" />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
