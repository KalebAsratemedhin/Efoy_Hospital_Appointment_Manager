import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 ">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold text-cyan-400 mb-4">Efoy</h3>
                        <p className="text-gray-400">Your trusted healthcare partner</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="text-lg font-semibold text-cyan-400 mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-cyan-400 transition-colors">Home</Link></li>
                            <li><Link to="/doctors" className="text-gray-400 hover:text-cyan-400 transition-colors">Doctors</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-cyan-400 transition-colors">Services</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</Link></li>
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-lg font-semibold text-cyan-400 mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li><Link to="/appointments" className="text-gray-400 hover:text-cyan-400 transition-colors">Appointments</Link></li>
                            <li><Link to="/consultations" className="text-gray-400 hover:text-cyan-400 transition-colors">Online Consultations</Link></li>
                            <li><Link to="/emergency" className="text-gray-400 hover:text-cyan-400 transition-colors">Emergency Care</Link></li>
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h4 className="text-lg font-semibold text-cyan-400 mb-4">Contact</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-center space-x-3">
                                <FaEnvelope className="text-cyan-400" />
                                <span>info@efoy.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaPhone className="text-cyan-400" />
                                <span>+1 234 567 890</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaMapMarkerAlt className="text-cyan-400" />
                                <span>123 Healthcare St, Medical City</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
                >
                    <p>&copy; 2024 Efoy. All rights reserved.</p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
