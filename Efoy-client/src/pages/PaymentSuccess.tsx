import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaDownload, FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  // For now, we'll use a default amount since we can't fetch it without the payment API
  // In a real implementation, you'd fetch the payment details using the sessionId
  const paymentAmount = 150.00; // This should come from the actual payment record

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const handleDownloadReceipt = () => {
    // Create a simple receipt text
    const receipt = `
      EFOY HOSPITAL - PAYMENT RECEIPT
      
      Transaction ID: ${sessionId || 'N/A'}
      Amount: ${formatCurrency(paymentAmount)}
      Status: Completed
      Date: ${new Date().toLocaleDateString()}
      Time: ${new Date().toLocaleTimeString()}
      
      Thank you for your payment!
      Your appointment has been confirmed.
    `;

    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${sessionId || 'payment'}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleEmailReceipt = () => {
    const subject = 'Payment Confirmation - EFOY Hospital';
    const body = `
      Dear Patient,
      
      Your payment has been successfully processed.
      
      Transaction Details:
      - Transaction ID: ${sessionId || 'N/A'}
      - Amount: ${formatCurrency(paymentAmount)}
      - Status: Completed
      
      Your appointment has been confirmed.
      
      Best regards,
      EFOY Hospital Team
    `;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <FaCheckCircle className="text-white text-6xl mx-auto mb-4" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Payment Successful!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-green-100 text-lg"
            >
              Your appointment has been confirmed
            </motion.p>
          </div>

          {/* Success Content */}
          <div className="px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Thank You for Your Payment
              </h2>
              <p className="text-gray-600 mb-6">
                Your payment has been processed successfully. You will receive a confirmation email shortly.
                The webhook will update your appointment status in the background.
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-3">
                  <FaCheckCircle className="text-green-600 text-lg" />
                                  <span className="text-green-800 font-medium">
                  Payment Amount: {formatCurrency(paymentAmount)}
                </span>
                </div>
                {sessionId && (
                  <p className="text-green-700 text-sm mt-2">
                    Transaction ID: {sessionId}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 mb-6"
            >
              <button
                onClick={handleDownloadReceipt}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <FaDownload className="text-sm" />
                Download Receipt
              </button>
              
              <button
                onClick={handleEmailReceipt}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <FaEnvelope className="text-sm" />
                Email Receipt
              </button>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <button
                onClick={() => navigate('/appointments')}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium mx-auto"
              >
                <FaArrowLeft className="text-sm" />
                Back to Appointments
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess; 