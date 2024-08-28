import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className="bg-gray-700 py-10  flex justify-around">
        <h1 className="font-medium text-3xl ">Efoy <span className="text-gray-400 block text-base my-auto">Your Hospital Appointment Manager</span></h1>
                
            <div className="flex flex-col gap-2">
                <h2>Social media links</h2>
                <Link className="text-gray-200 hover:underline" to='/gmail'>email</Link>
                <Link className="text-gray-200 hover:underline" to='/signup'>twitter</Link>
                <Link className="text-gray-200 hover:underline" to='/signup'>telegram</Link>
                <Link className="text-gray-200 hover:underline" to='/signup'>instagram</Link>

            </div>

            <div className="flex flex-col gap-2">
                <h2>Important links</h2>
                <Link to='/about'>about</Link>
                <Link to='/contact'>Contact us</Link>

            </div> 
    
        </div>
      )
}

export default Footer