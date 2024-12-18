import DoctorsList from "../doctors/DoctorsList";
import {Link} from 'react-router-dom';
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { GiNotebook } from "react-icons/gi";
import { MdNotificationsActive } from "react-icons/md";


const LandingPage = () => {
  return (
    <div className=" h-full">
        <div className="text-center  py-24 bg-[url('/docs-cartoon.jpeg')] h-screen bg-cover ">
          <h1 className="text-purple-700 mb-4 text-5xl md:text-8xl font-bold px-24">Efoy Hospital Appointment Manager</h1>
          <h2 className=" text-white text-3xl md:text-5xl">Excellent Health care at your finger tips!</h2>

          <div className="flex gap-4 justify-center mt-20">
              <Link className="bg-white text-2xl text-purple-500 border-2 border-purple-500 hover:bg-purple-500 hover:text-white px-24 py-4 rounded-full  " to='/signin'>signin</Link>
              <Link className="bg-purple-500 text-2xl border-2 border-purple-500 hover:text-purple-500 hover:bg-white hover:border hover:border-bg-purple-500 text-white px-24 py-4 rounded-full" to='/signup'>signup</Link>
            
            </div>
        </div>

        <div className="bg-white py-16 px-4 flex gap-6 h-screen">
          <div className="w-1/2  overflow-hidden ">
            <img src="/doc-1.jpg" alt="doctor"  />

          </div>
          <div className="w-2/3 pt-12">
            <h2 className="text-secondary text-4xl font-bold mb-3 "> <span className="underline underline-offset-8">What we of</span>fer</h2>
            <p className="text-gray-600">
              At Efoy we provide excellent health care by tackling challenges in hospital appointment booking.
              We thrive to connect you with doctors of your choice anywhere and anytime. If you use Efoy, you save your
              time and resources to get top level health care. Leave your appointments to us and focus on your health.
            </p>
            <p className="text-gray-600 mt-5">
              Booking hospital appointments has never been this easier! We have integrated google calendar for you to easily
              manage your time and appointments.
            </p>
          </div>

        </div>
      
        <div className="text-center py-16 h-[400px] pt-24">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Manage Your Hospital Appointments Seamlessly
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            Book, reschedule, or cancel appointments with ease.
          </p>
          <Link to='/signup' className="px-8 py-4 bg-primary text-white hover:text-primary hover:bg-white hover:border hover:border-primary text-xl rounded-md font-semibold">
            Get Started
          </Link>
          
        </div>
        

      <section className="bg-white py-20 bg-[url('/doc-tools.jpeg')]  bg-cover bg-center">
        <div className="container mx-auto text-center">
          <h3 className="text-5xl font-extrabold text-gray-90000 mb-12">
            Why Choose Us?
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-16">
            We provide top-notch services to make your healthcare journey seamless, secure, and efficient. Here’s why we stand out:
          </p>
          <div className="flex flex-wrap gap-8  justify-center ">
              <div className="bg-white p-8 rounded-lg shadow-lg h-72 w-72 hover:shadow-2xl transition-shadow duration-300">
                <div className="mx-auto flex items-center justify-center mb-4 w-24 h-24 bg-purple-100 rounded-full">
                  <GiNotebook className="w-12 h-12 text-purple-500 "  />
                </div>
                <h4 className="text-2xl font-bold text-purple-700 mb-3">
                  Easy Booking
                </h4>
                <p className="text-gray-600">
                  Book your appointments effortlessly, anytime, from anywhere.
                </p>
              </div>
              <div className="bg-white p-8 h-72 w-72 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="mx-auto flex items-center justify-center mb-4 w-24 h-24 bg-purple-100 rounded-full">
                  <MdNotificationsActive className="w-12 h-12 text-purple-500 "  />
                </div>
                <h4 className="text-2xl font-bold text-purple-700 mb-3">
                  Notifications
                </h4>
                <p className="text-gray-600">
                  Stay updated with timely reminders for your appointments.
                </p>
              </div>  
              <div className="bg-white p-8 rounded-lg h-72 w-72 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="mx-auto flex items-center justify-center mb-4 w-24 h-24 bg-purple-100 rounded-full">
                  <RiGitRepositoryPrivateLine className="w-12 h-12 text-purple-500 " />
                </div>
                <h4 className="text-2xl font-bold text-purple-700 mb-3">
                  Secure & Private
                </h4>
                <p className="text-gray-600">
                  Rest assured, your personal data is always safe with us.
                </p>
              </div>

          </div>
        </div>
      </section>
      <section className="py-10 px-4">
        <div className="overflow-y-auto">
          <DoctorsList />
        </div>

      </section>


        <section className="bg-primary text-white py-20 h-[400px]">
        <div className="container mx-auto text-center pt-12">
          <h3 className="text-4xl font-bold mb-12">
            Ready to Manage Your Appointments?
          </h3>
          <Link to='/signup' className="px-8 py-4 bg-white text-primary hover:text-white hover:bg-primary hover:border hover:border-white   text-xl rounded-md font-semibold">
            Sign Up Now
          </Link>
        </div>
      </section>



    </div>
  );
};

export default LandingPage;
