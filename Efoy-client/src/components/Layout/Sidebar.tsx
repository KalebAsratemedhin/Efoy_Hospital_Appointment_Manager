import { Link } from "react-router-dom"
import { IoHomeOutline } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";

import { IoNotifications } from "react-icons/io5";
import { FaUserMd } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { LuStethoscope } from "react-icons/lu";


const Sidebar = () => {
  return (
    <div className="min-w-12 bg-white shadow-md border-r h-screen flex flex-col gap-4">
        <div className="mb-6 p-4 bg-tertiary bg-opacity-25">
            <h1 className="font-medium text-3xl ">Efoy <LuStethoscope className="inline" /> <span className="text-gray-400 block text-base my-auto">Your Hospital Appointment Manager</span></h1>

        </div>
        <div className="flex flex-col gap-2 px-4">
            <Link className="flex gap-3 h-12 border border-tertiary rounded-lg items-center pl-4 hover:bg-tertiary" to='/'> <IoHomeOutline className="" width='20px' /> Home</Link>
            <Link className="flex gap-3 h-12 border border-tertiary rounded-lg items-center pl-4 hover:bg-tertiary" to='/dashboard'> <RiDashboardHorizontalFill/> Dashboard</Link>
            <Link className="flex gap-3 h-12 border border-tertiary rounded-lg items-center pl-4 hover:bg-tertiary" to='/appointments'>  <FaUserMd /> Appointments</Link>
            <Link className="flex gap-3 h-12 border border-tertiary rounded-lg items-center pl-4 hover:bg-tertiary" to='/book'> <FaBook /> Book</Link>
            <Link className="flex gap-3 h-12 border border-tertiary rounded-lg items-center pl-4 hover:bg-tertiary" to='/favorites'> <MdFavoriteBorder />Favorites</Link>
            <Link className="flex gap-3 h-12 border border-tertiary rounded-lg items-center pl-4 hover:bg-tertiary" to='/settings'> <IoSettingsOutline />  Settings</Link>

            <button className="flex gap-3 h-12 border border-tertiary rounded-lg items-center pl-4 hover:bg-tertiary" type="button" > <PiSignOut /> Signout</button>
        </div>
    </div>
  )
}

export default Sidebar