import DoctorsList from "../doctors/DoctorsList";
import {Link} from 'react-router-dom';
import { FaHeartbeat, FaStethoscope, FaAmbulance } from "react-icons/fa";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">

      {/* Hero Section */}
      <div className="relative pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-white to-cyan-50"></div>
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Your Health, <span className="text-cyan-600">Our Priority</span>
              </h1>
              <p className="text-xl text-gray-600">
                Experience seamless healthcare management with Efoy. Book appointments, connect with top doctors, and manage your health journey effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="bg-cyan-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cyan-700 transition-all transform hover:scale-105">
                  Get Started
                </Link>
                <Link to="/doctors" className="border-2 border-cyan-600 text-cyan-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cyan-50 transition-all transform hover:scale-105">
                  Find Doctors
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-cyan-200 rounded-2xl transform rotate-3"></div>
              <img src="/docs-cartoon.jpeg" alt="Healthcare" className="relative rounded-2xl shadow-xl" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-cyan-50 to-white shadow-sm"
            >
              <div className="text-4xl font-bold text-cyan-600 mb-2">500+</div>
              <div className="text-gray-600">Expert Doctors</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-cyan-50 to-white shadow-sm"
            >
              <div className="text-4xl font-bold text-cyan-600 mb-2">10k+</div>
              <div className="text-gray-600">Happy Patients</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-cyan-50 to-white shadow-sm"
            >
              <div className="text-4xl font-bold text-cyan-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-cyan-50 to-white shadow-sm"
            >
              <div className="text-4xl font-bold text-cyan-600 mb-2">15+</div>
              <div className="text-gray-600">Specialties</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-24 bg-gradient-to-b from-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive healthcare solutions for you and your family</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-6">
                <FaHeartbeat className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Doctors</h3>
              <p className="text-gray-600">Connect with qualified healthcare professionals across various specialties.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-6">
                <FaStethoscope className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Easy Scheduling</h3>
              <p className="text-gray-600">Book, reschedule, or cancel appointments with just a few clicks.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-6">
                <FaAmbulance className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Emergency Care</h3>
              <p className="text-gray-600">24/7 emergency medical services at your fingertips.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Doctors Section */}
      <div className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Doctors</h2>
            <p className="text-xl text-gray-600">Meet our expert healthcare professionals</p>
          </div>
          <div className="overflow-x-auto">
            <DoctorsList />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Ready to Take Control of Your Health?</h2>
            <p className="text-xl text-cyan-100 mb-12">Join thousands of patients who trust Efoy for their healthcare needs.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="bg-white text-cyan-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cyan-50 transition-all transform hover:scale-105">
                Get Started Now
              </Link>
              <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cyan-700 transition-all transform hover:scale-105">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
