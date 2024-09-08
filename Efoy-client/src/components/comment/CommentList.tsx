import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { useFindAllCommentsQuery } from "../../redux/api/commentAPI";
import CommentCard from "./CommentCard";
import { useGetCurrentUserQuery } from "../../redux/api/authAPI";

const CommentList = ({doctorId}: {doctorId: string}) => {
  const {isLoading, isSuccess, isError, error, data, refetch} = useFindAllCommentsQuery(doctorId)
  const {isLoading: isUserLoading, isSuccess: isUserSuccess, isError: isUserError, error: userError, data: user} = useGetCurrentUserQuery()

  if (isLoading ) return <Spinner />;
  if (isError ) return <Error error={error} />;

  if (isSuccess)
    return (
      <div className="flex gap-2 flex-wrap   flex-col justify-center items-center">
        
        { 
          data.map((comment) => {
            return <CommentCard key={comment._id} isEditable={user?._id === comment.commenterId?._id} comment={comment} refetch={refetch} />
          })
        }
        {
          data.length === 0 && <p>No comments yet.</p>
        }
          
      </div>
    )
}

export default CommentList