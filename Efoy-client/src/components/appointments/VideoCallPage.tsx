import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VideoCall from './VideoCall';
import { motion } from 'framer-motion';
import { FaVideo, FaUserMd, FaCalendar, FaPhone, FaArrowLeft } from 'react-icons/fa';
import Spinner from '../utils/Spinner';
import FormError from '../utils/FormError';
import { useJoinVideoCallMutation, useEndVideoCallMutation } from '../../redux/api/videoAPI';
import { authSelector } from '../../redux/slices/authSlice';

interface CallData {
  call_id: string;
  token: string;
  api_key: string;
  user_id: string;
  user_name: string;
  booking: {
    id: string;
    appointmentDate: string;
    time: string;
    reason: string;
    status: string;
  };
}

const VideoCallPage: React.FC = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [callData, setCallData] = useState<CallData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector(authSelector);
  const [joinVideoCall, { isLoading: isJoining, isError: isJoinError, error: joinError }] = useJoinVideoCallMutation();
  const [endVideoCall] = useEndVideoCallMutation();

  useEffect(() => {
    if (!user.id) {
      navigate('/signin');
      return;
    }
    setIsLoading(false);
  }, [user.id, navigate]);

  const handleJoinCall = async () => {
    if (!bookingId) return;

    try {
      const result = await joinVideoCall(bookingId).unwrap();
      setCallData(result);
      setError(null);
    } catch (err: any) {
      setError(err.data?.detail || 'Failed to join video call');
    }
  };

  const handleEndCall = async () => {
    if (!bookingId) return;

    try {
      await endVideoCall(bookingId).unwrap();
    } catch (err) {
      console.error('Failed to end call:', err);
    }

    // Navigate back to appointments
    navigate('/appointments');
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (callData) {
    return (
      <VideoCall
        callId={callData.call_id}
        apiKey={callData.api_key}
        token={callData.token}
        userId={callData.user_id}
        userName={callData.user_name}
        onCallEnd={handleEndCall}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Appointments</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <FaVideo className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Video Consultation</h1>
                <p className="text-white/80">Join your scheduled video appointment</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6"
              >
                <FormError error={error} />
              </motion.div>
            )}

            {isJoinError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6"
              >
                <FormError error={joinError} />
              </motion.div>
            )}

            <div className="text-center mb-8">
              <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaVideo className="text-blue-600 text-4xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Start Your Video Consultation?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Click the button below to join your video call. Make sure you have a stable internet connection 
                and are in a quiet, well-lit environment for the best consultation experience.
              </p>
            </div>

            {/* Call Information */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaCalendar className="text-blue-500" />
                Appointment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <FaCalendar className="text-gray-400" />
                  <span className="text-gray-600">Booking ID: {bookingId}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaUserMd className="text-gray-400" />
                  <span className="text-gray-600">Role: {user?.role}</span>
                </div>
              </div>
            </div>

            {/* Join Call Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleJoinCall}
                disabled={isJoining}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
              >
                {isJoining ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Joining Call...
                  </>
                ) : (
                  <>
                    <FaPhone />
                    Join Video Call
                  </>
                )}
              </motion.button>
            </div>

            {/* Tips */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Tips for a Great Video Call</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  Ensure you have a stable internet connection
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  Find a quiet, well-lit environment
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  Test your microphone and camera before joining
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  Have your medical information ready
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoCallPage; 