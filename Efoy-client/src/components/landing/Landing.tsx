import DoctorsList from "../doctors/DoctorsList";

const LandingPage = () => {
  return (
    <div className=" h-full">
        <div className="text-center  py-24">
          <h1 className="text-primary mb-4 text-5xl font-bold">Efoy Hospital Appointment Manager</h1>
          <h2 className="text-xl">Excellent Health care at your finger tips!</h2>
        </div>

        <div className="bg-white py-16 px-4 flex gap-2">
          <div className="w-1/3 overflow-hidden  h-72">
            <img src="/doc-2.jpeg" alt="doctor"  />

          </div>
          <div className="w-2/3">
            <h2 className="text-secondary text-xl">What we offer</h2>
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
      
        <div className="text-center py-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Manage Your Hospital Appointments Seamlessly
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            Book, reschedule, or cancel appointments with ease.
          </p>
          <button className="px-8 py-4 bg-primary text-white text-xl rounded-md font-semibold">
            Get Started
          </button>
          
        </div>
        
        <section className="bg-white py-20">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-10">
            Why Choose Us?
          </h3>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-purple-100 p-6 rounded-md shadow-md">
                <h4 className="text-2xl font-bold text-primary mb-2">
                  Easy Booking
                </h4>
                <p className="text-gray-600">
                  Book appointments with a few clicks from anywhere.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-purple-100 p-6 rounded-md shadow-md">
                <h4 className="text-2xl font-bold text-primary mb-2">
                  Notifications
                </h4>
                <p className="text-gray-600">
                  Get reminders for your upcoming appointments.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-purple-100 p-6 rounded-md shadow-md">
                <h4 className="text-2xl font-bold text-primary mb-2">
                  Secure & Private
                </h4>
                <p className="text-gray-600">
                  Your data is safe and protected with us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        <section className="bg-primary text-white py-20">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6">
            Ready to Manage Your Appointments?
          </h3>
          <button className="px-8 py-4 bg-white text-primary text-xl rounded-md font-semibold">
            Sign Up Now
          </button>
        </div>
      </section>
      <section className="py-10 px-4">
        <div className="overflow-y-auto">
          <DoctorsList />
        </div>

      </section>



    </div>
  );
};

export default LandingPage;
