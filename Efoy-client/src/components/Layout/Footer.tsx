import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 ">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8">
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
