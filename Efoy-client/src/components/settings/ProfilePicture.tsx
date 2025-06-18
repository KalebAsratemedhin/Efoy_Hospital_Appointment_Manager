
import { User } from "../../types/User";
import { FaCamera } from "react-icons/fa";
import FormError from "../utils/FormError";
import FormSuccess from "../utils/FormSuccess";
import { useUpdateProfilePictureMutation } from "../../redux/api/userAPI";
import { useState } from "react";

const ProfilePicture = ({ user }: { user: User }) => {
  const initials = user?.fullName.split(" ").map((name) => name[0].toUpperCase()).join("");
  const [updateProfilePicture, { isError, error, isSuccess }] = useUpdateProfilePictureMutation();
  const [pic, setPic] = useState<File | null>(null);
  const [picUrl, setPicUrl] = useState<string | null>(null); 
  const [picChanged, setPicChanged] = useState(false)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPic(file);
      setPicChanged(true)
      setPicUrl(URL.createObjectURL(file)); 
    }
  };

  const handleSave = async () => {
    if (pic && user?.id) {
      await updateProfilePicture({ id: user.id, file: pic });
      setPicChanged(false)
    }
  }

  return (
    <div className="flex flex-col space-y-1 items-center">

      <div className="w-36 h-36 rounded-lg flex items-center justify-center relative">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="profilePicture"
          onChange={onFileChange}
        />
        <label htmlFor="profilePicture" className="cursor-pointer absolute right-3 bottom-3">
          <FaCamera className="w-10 h-10 text-primary" />
        </label>
        <div className="flex justify-center items-center">
            
          {picUrl ? (
            <img className="bg-yellow-50 w-36 h-36 rounded-full" src={picUrl} alt="profile" />
          ) : user.profilePic ? (
            <img className="bg-yellow-50 w-36 h-36 rounded-full" src={user.profilePic} alt="profile" referrerPolicy="no-referrer" />
          ) : (
            <div className='w-28 h-28 text-3xl font-medium rounded-full bg-gray-300 flex justify-center items-center'>
              <p>{initials}</p>
            </div>
          )}
        </div>
        

      </div>
      {picChanged && <button onClick={handleSave} className="bg-primary text-white px-8 py-2 rounded">Save</button>}
      {isError && <FormError error={error} />}
      {isSuccess && <FormSuccess message={"Successfully uploaded."} />}
    </div>
  );
};

export default ProfilePicture;
