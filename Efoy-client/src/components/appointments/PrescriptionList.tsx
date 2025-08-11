import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPills, FaDownload, FaEye, FaCalendar, FaUserMd, FaUser } from 'react-icons/fa';
import { useGetPatientPrescriptionsQuery, useGetDoctorPrescriptionsQuery } from '../../redux/api/prescriptionAPI';
import { Prescription } from '../../types/Prescription';
import PrescriptionDisplay from './PrescriptionDisplay';
import Spinner from '../utils/Spinner';
import Pagination from '../utils/Pagination';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/slices/authSlice';

const PrescriptionList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  
  const user = useSelector(authSelector);
  const isDoctor = user.role === 'doctor';

  const { data: patientPrescriptionsData, isLoading: isPatientLoading, isError: isPatientError } = useGetPatientPrescriptionsQuery({
    page: currentPage,
    limit: 10
  }, { skip: isDoctor });

  const { data: doctorPrescriptionsData, isLoading: isDoctorLoading, isError: isDoctorError } = useGetDoctorPrescriptionsQuery({
    page: currentPage,
    limit: 10
  }, { skip: !isDoctor });

  const prescriptionsData = isDoctor ? doctorPrescriptionsData : patientPrescriptionsData;
  const isLoading = isDoctor ? isDoctorLoading : isPatientLoading;
  const isError = isDoctor ? isDoctorError : isPatientError;


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleViewPrescription = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setShowPrescriptionModal(true);
  };

  const handleCloseModal = () => {
    setShowPrescriptionModal(false);
    setSelectedPrescription(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12">
        <div className="text-center">
          <div className="text-red-600 text-xl font-medium mb-3">
            Failed to load prescriptions
          </div>
          <div className="text-gray-600">
            Please try again later
          </div>
        </div>
      </div>
    );
  }

  if (!prescriptionsData?.items || prescriptionsData.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12">
        <div className="text-center">
          <div className="text-gray-500 text-xl mb-3">No prescriptions found</div>
          <div className="text-gray-400">
            {isDoctor ? "You haven't created any prescriptions yet." : "You don't have any prescriptions yet."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <FaPills className="text-purple-600" />
            {isDoctor ? 'My Prescriptions' : 'My Prescriptions'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isDoctor 
              ? 'View and manage all prescriptions you have created for your patients'
              : 'View and manage all your medical prescriptions in one place'
            }
          </p>
        </motion.div>

        {/* Prescriptions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {prescriptionsData.items.map((prescription, index) => (
            <motion.div
              key={prescription.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <FaPills className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Prescription</h3>
                      <p className="text-purple-100 text-sm">#{prescription.id?.slice(-8)}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    prescription.status === 'active' ? 'bg-green-500 text-white' :
                    prescription.status === 'expired' ? 'bg-red-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {prescription.status || 'N/A'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Doctor/Patient Info */}
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    {isDoctor ? <FaUser className="text-blue-600" /> : <FaUserMd className="text-blue-600" />}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      {isDoctor ? 'Patient' : 'Prescribed by'}
                    </p>
                    <p className="font-semibold text-gray-900">
                      {isDoctor 
                        ? prescription.patientId?.fullName 
                        : `Dr. ${prescription.doctorId?.fullName}`
                      }
                    </p>
                  </div>
                </div>

                {/* Issue Date */}
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCalendar className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Issued on</p>
                    <p className="font-semibold text-gray-900">
                      {prescription.issueDate ? formatDate(prescription.issueDate) : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Expiry Date */}
                {prescription.expiryDate && (
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <FaCalendar className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expires on</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(prescription.expiryDate)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Medications Preview */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">Medications</p>
                  <div className="space-y-1">
                    {prescription.medications?.slice(0, 2).map((med, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <FaPills className="text-purple-500 text-xs" />
                        <span className="truncate">{med}</span>
                      </div>
                    ))}
                    {prescription.medications && prescription.medications.length > 2 && (
                      <p className="text-xs text-gray-500 mt-1">
                        +{prescription.medications.length - 2} more medications
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleViewPrescription(prescription)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    <FaEye className="text-sm" />
                    View Details
                  </button>
                  
                  <button
                    onClick={() => handleViewPrescription(prescription)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    title="Download PDF"
                  >
                    <FaDownload className="text-sm" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {prescriptionsData.total_pages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={prescriptionsData.total_pages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

        {/* Prescription Modal */}
        {showPrescriptionModal && selectedPrescription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <PrescriptionDisplay
                prescription={selectedPrescription}
                onClose={handleCloseModal}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionList; 