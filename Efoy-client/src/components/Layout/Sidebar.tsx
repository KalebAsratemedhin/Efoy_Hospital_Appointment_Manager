import { Link, useNavigate } from "react-router-dom"
import { IoHomeOutline } from "react-icons/io5";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";

import { FaUserMd } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { LuStethoscope } from "react-icons/lu";
import { BsClipboardCheckFill } from "react-icons/bs";
import { VscCalendar } from "react-icons/vsc";
import { useSignoutMutation } from "../../redux/api/authAPI";
import Spinner from "../utils/Spinner";
import Error from "../utils/Error";
import { useDispatch } from "react-redux";
import { clearAuth } from "../../redux/slices/authSlice";
import { useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";


const Sidebar = ({isOpen, onSidebarToggle}:{isOpen: boolean, onSidebarToggle: () => void}) => {

  const [signout, {isSuccess, isError, error, isLoading}] = useSignoutMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignout = async () => {
    await signout()
  }

  useEffect(() => {
    if(isSuccess){
      dispatch(clearAuth())
      navigate('/')
    }

  }, [isSuccess])

  if(isLoading)
    return <Spinner />
    
  if(isError)
    return <Error error={error}/>

  return (
    <div className={`min-w-12 bg-white shadow-md border-r h-full sm:relative flex-col gap-4 absolute w-60 sm:w-auto z-10 ${isOpen ? 'flex' : 'hidden'} sm:flex`}>
        <div className="mb-6 p-4 bg-tertiary bg-opacity-25 flex">
            <h1 className="font-medium text-3xl ">Efoy <LuStethoscope className="inline" /> <span className="text-gray-400 block text-base my-auto">Your Hospital Appointment Manager</span></h1>
            <IoArrowBack onClick={onSidebarToggle} className="w-14 h-14 font-bold sm:hidden" />

        </div>
        <div className="flex flex-col gap-2 px-4">
            <Link className="flex gap-3 h-12 border border-tertiary rounded-lg items-center pl-4 hover:bg-tertiary" to='/'> <IoHomeOutline className="" width='20px' /> Home</Link>
            <Link className="flex gap-3 h-12 border border-tertiary rounded-lg items-center pl-4 hover:bg-tertiary" to='/dashboard'> <RiDashboardHorizontalFill/> Dashboard</Link>
            <Link className="flex gap-3 h-12 border border-tertiary rounded-lg items-center pl-4 hover:bg-tertiary" to='/appointments'>  <BsClipboardCheckFill /> Appointments</Link>
            <Link className="flex gap-3 h-12 border border-tertiary rounded-lg items-center pl-4 hover:bg-tertiary" to='/appointments'>  <VscCalendar /> Calendar</Link>

            <Link className="flex gap-3 h-12 border border-tertiary rounded-lg items-center pl-4 hover:bg-tertiary" to='/doctors'> <FaUserMd /> Doctors</Link> 
            <Link className="flex gap-3 h-12 border border-tertiary rounded-lg items-center pl-4 hover:bg-tertiary" to='/settings'> <IoSettingsOutline />  Settings</Link>

            <button onClick={handleSignout} className="flex gap-3 h-12 border border-tertiary rounded-lg items-center pl-4 hover:bg-tertiary" type="button" > <PiSignOut /> Signout</button>
        </div>
    </div>
  )
}

export default Sidebar