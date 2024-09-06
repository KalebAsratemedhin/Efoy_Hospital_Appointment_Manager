// import { Link } from "react-router-dom"

// const Footer = () => {
//     return (
//         <div className="bg-gray-900 py-10 px-6 sm:px-20 flex flex-col md:flex-row gap-2  justify-between  text-gray-300">
//         <div className="flex justify-center items-center md:w-1/3">
//             <p className=" text-center text-base ">&copy; 2024 Efoy. All rights reserved.</p>

            
//         </div>
//         <div className="flex-grow flex justify-around flex-row">
//             <div className="mt-8 sm:mt-0 flex flex-col  md:items-start">
//                 <h2 className="text-lg font-semibold mb-4 text-gray-100">  <span className="border-b-2 border-primary pb-2 ">Social</span> Media </h2>
//                 <Link className="text-gray-400 hover:text-gray-200 hover:border-b-2 hover:border-purple-900 " to="/gmail">Email</Link>
//                 <Link className="text-gray-400 hover:text-gray-200 hover:border-b-2 hover:border-purple-900 " to="/signup">Twitter</Link>
//                 <Link className="text-gray-400 hover:text-gray-200 hover:border-b-2 hover:border-purple-900 " to="/signup">Telegram</Link>
//                 <Link className="text-gray-400 hover:text-gray-200 hover:border-b-2 hover:border-purple-900 " to="/signup">Instagram</Link>
//             </div>

//             <div className="mt-8 sm:mt-0 flex flex-col  md:items-start">
//                 <h2 className="text-lg font-semibold mb-4 text-gray-100">  <span className="border-b-2 border-primary pb-2 ">Important</span>   Links </h2>

//                 <Link className="text-gray-400 hover:text-gray-200 hover:border-b-2 hover:border-purple-900 " to="/about">About</Link>
//                 <Link className="text-gray-400 hover:text-gray-200 hover:border-b-2 hover:border-purple-900 " to="/contact">Contact Us</Link>
//             </div>
//         </div>
//         </div>

       
//       )
// }

// export default Footer

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTelegram, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <div className="bg-gray-900 py-10 px-6 sm:px-20 flex flex-col md:flex-row gap-2 justify-between text-gray-300">
            <div className="flex justify-center items-center md:w-1/3">
                <p className="text-center text-base">&copy; 2024 Efoy. All rights reserved.</p>
            </div>
            <div className="flex-grow flex justify-around flex-row">
                <div className="mt-8 sm:mt-0 flex flex-col md:items-start">
                    <h2 className="text-lg font-semibold mb-4 text-gray-100">
                        <span className="border-b-2 border-primary pb-2">Social</span> Media
                    </h2>
                    <Link className="text-gray-400 hover:text-gray-200 hover:border-b-2 hover:border-purple-900 flex items-center gap-2" to="/gmail">
                        <FontAwesomeIcon icon={faEnvelope} /> Email
                    </Link>
                    <Link className="text-gray-400 hover:text-gray-200 hover:border-b-2 hover:border-purple-900 flex items-center gap-2" to="/signup">
                        <FontAwesomeIcon icon={faTwitter} /> Twitter
                    </Link>
                    <Link className="text-gray-400 hover:text-gray-200 hover:border-b-2 hover:border-purple-900 flex items-center gap-2" to="/signup">
                        <FontAwesomeIcon icon={faTelegram} /> Telegram
                    </Link>
                    <Link className="text-gray-400 hover:text-gray-200 hover:border-b-2 hover:border-purple-900 flex items-center gap-2" to="/signup">
                        <FontAwesomeIcon icon={faInstagram} /> Instagram
                    </Link>
                </div>

                <div className="mt-8 sm:mt-0 flex flex-col md:items-start">
                    <h2 className="text-lg font-semibold mb-4 text-gray-100">
                        <span className="border-b-2 border-primary pb-2">Important</span> Links
                    </h2>
                    <Link className="text-gray-400 hover:text-gray-200 hover:border-b-2 hover:border-purple-900" to="/about">
                        About
                    </Link>
                    <Link className="text-gray-400 hover:text-gray-200 hover:border-b-2 hover:border-purple-900" to="/contact">
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
