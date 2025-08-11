import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaPrint, FaPills, FaUserMd, FaUser, FaCalendar, FaFileAlt, FaTimes } from 'react-icons/fa';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from 'jspdf';
import { Prescription } from '../../types/Prescription';

interface PrescriptionDisplayProps {
  prescription: Prescription;
  onClose?: () => void;
}

const PrescriptionDisplay: React.FC<PrescriptionDisplayProps> = ({
  prescription,
  onClose
}) => {
  const signatureRef = useRef<SignatureCanvas>(null);
  const [hasSignature, setHasSignature] = useState(false);


  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generatePDF = () => {
    if (!hasSignature && !prescription.digitalSignature) {
      alert('Please sign the prescription before generating PDF');
      return;
    }

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;

    let yPosition = margin + 20;

    // Header
    pdf.setFontSize(24);
    pdf.setTextColor(0, 0, 0);
    pdf.text('MEDICAL PRESCRIPTION', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;

    // Prescription ID
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Prescription ID: ${prescription.id}`, margin, yPosition);
    yPosition += 15;

    // Date
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Date: ${formatDate(prescription.issueDate)}`, margin, yPosition);
    yPosition += 20;

    // Doctor Information
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('PRESCRIBING DOCTOR:', margin, yPosition);
    yPosition += 8;
    pdf.setFontSize(12);
    pdf.text(`Dr. ${prescription.doctorId?.fullName || 'N/A'}`, margin + 10, yPosition);
    yPosition += 8;
    pdf.text(`Email: ${prescription.doctorId?.email || 'N/A'}`, margin + 10, yPosition);
    yPosition += 20;

    // Patient Information
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('PATIENT INFORMATION:', margin, yPosition);
    yPosition += 8;
    pdf.setFontSize(12);
    pdf.text(`Name: ${prescription.patientId?.fullName || 'N/A'}`, margin + 10, yPosition);
    yPosition += 8;
    pdf.text(`Email: ${prescription.patientId?.email || 'N/A'}`, margin + 10, yPosition);
    yPosition += 20;

    // Diagnosis
    if (prescription.diagnosis) {
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('DIAGNOSIS:', margin, yPosition);
      yPosition += 8;
      pdf.setFontSize(12);
      pdf.text(prescription.diagnosis, margin + 10, yPosition);
      yPosition += 20;
    }

    // Medications
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('PRESCRIBED MEDICATIONS:', margin, yPosition);
    yPosition += 8;
    pdf.setFontSize(12);
    
    prescription.medications?.forEach((medication, index) => {
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = margin + 20;
      }
      pdf.text(`${index + 1}. ${medication}`, margin + 10, yPosition);
      yPosition += 8;
    });

    // Notes
    if (prescription.notes) {
      yPosition += 10;
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = margin + 20;
      }
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('ADDITIONAL NOTES:', margin, yPosition);
      yPosition += 8;
      pdf.setFontSize(12);
      pdf.text(prescription.notes, margin + 10, yPosition);
      yPosition += 20;
    }

    // Expiry Date
    if (prescription.expiryDate) {
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = margin + 20;
      }
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Expiry Date: ${formatDate(prescription.expiryDate)}`, margin, yPosition);
      yPosition += 20;
    }

    // Signature Section
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = margin + 20;
    }

    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text('DOCTOR SIGNATURE:', margin, yPosition);
    yPosition += 8;

    // Add signature image - use stored signature if available, otherwise use current signature
    let signatureDataURL = '';
    if (prescription.digitalSignature) {
      signatureDataURL = prescription.digitalSignature;
    } else if (signatureRef.current && hasSignature) {
      signatureDataURL = signatureRef.current.toDataURL();
    }

    if (signatureDataURL) {
      try {
        const imgData = signatureDataURL.split(',')[1];
        pdf.addImage(imgData, 'PNG', margin, yPosition, 60, 30);
        yPosition += 35;
      } catch (error) {
        console.error('Error adding signature to PDF:', error);
      }
    }

    pdf.text(`Signed on: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 8;
    pdf.text(`Prescription ID: ${prescription.id}`, margin, yPosition);

    // Footer
    yPosition += 20;
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = margin + 20;
    }
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text('This is a digital prescription generated by Efoy Hospital Appointment Manager', pageWidth / 2, yPosition, { align: 'center' });

    // Save PDF
    const fileName = `prescription_${prescription.id}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
  };

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      setHasSignature(false);
    }
  };

  const handleSignatureEnd = () => {
    setHasSignature(true);
  };

  const canGeneratePDF = hasSignature || prescription.digitalSignature;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-2xl max-w-6xl mx-auto overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <FaPills className="text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Medical Prescription</h1>
              <p className="text-purple-100 text-lg">#{prescription.id?.slice(-8)}</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaUserMd className="text-blue-600" />
              Prescribing Doctor
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600">Name</p>
              <p className="font-semibold text-gray-900">Dr. {prescription.doctorId?.fullName || 'N/A'}</p>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold text-gray-900">{prescription.doctorId?.email || 'N/A'}</p>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaUser className="text-green-600" />
              Patient Information
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600">Name</p>
              <p className="font-semibold text-gray-900">{prescription.patientId?.fullName || 'N/A'}</p>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold text-gray-900">{prescription.patientId?.email || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaCalendar className="text-purple-600" />
              Issue Date
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {prescription.issueDate ? formatDate(prescription.issueDate) : 'N/A'}
            </p>
          </div>

          {prescription.expiryDate && (
            <div className="bg-orange-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaCalendar className="text-orange-600" />
                Expiry Date
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {formatDate(prescription.expiryDate)}
              </p>
            </div>
          )}
        </div>

        {/* Diagnosis */}
        {prescription.diagnosis && (
          <div className="bg-indigo-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaFileAlt className="text-indigo-600" />
              Diagnosis
            </h3>
            <p className="text-lg text-gray-900 leading-relaxed">{prescription.diagnosis}</p>
          </div>
        )}

        {/* Medications */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaPills className="text-purple-600" />
            Prescribed Medications
          </h3>
          <div className="space-y-3">
            {prescription.medications?.map((medication, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold">
                  {index + 1}
                </div>
                <span className="text-lg text-gray-900">{medication}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        {prescription.notes && (
          <div className="bg-yellow-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaFileAlt className="text-yellow-600" />
              Additional Notes
            </h3>
            <p className="text-lg text-gray-900 leading-relaxed">{prescription.notes}</p>
          </div>
        )}

        {/* Digital Signature */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaFileAlt className="text-gray-600" />
            Digital Signature
          </h3>
          
          {prescription.digitalSignature ? (
            // Show stored signature
            <div className="space-y-4">
              <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
                <img 
                  src={prescription.digitalSignature} 
                  alt="Doctor's Signature" 
                  className="w-full h-32 object-contain border border-gray-300 rounded"
                />
              </div>
              <p className="text-sm text-gray-600 text-center">
                ✓ Prescription signed by Dr. {prescription.doctorId?.fullName}
              </p>
            </div>
          ) : (
            // Show signature input
            <div className="space-y-4">
              <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
                <div className="w-full h-40 flex justify-center">
                  <SignatureCanvas
                    ref={signatureRef}
                    canvasProps={{
                      className: 'border border-gray-300 rounded',
                      width: 400,
                      height: 150
                    }}
                    penColor="black"
                    backgroundColor="white"
                    onEnd={handleSignatureEnd}
                    minWidth={0.5}
                    maxWidth={2}
                    throttle={16}
                    velocityFilterWeight={0.7}
                    dotSize={1}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={clearSignature}
                  className="px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors font-medium"
                >
                  Clear Signature
                </button>
                {!hasSignature && (
                  <span className="text-orange-600 flex items-center gap-2 font-medium">
                    ⚠️ Please sign above to enable PDF download
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
          <button
            onClick={generatePDF}
            disabled={!canGeneratePDF}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaDownload className="text-lg" />
            Download PDF
          </button>
          
          <button
            onClick={() => window.print()}
            className="flex items-center gap-3 px-8 py-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
          >
            <FaPrint className="text-lg" />
            Print
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PrescriptionDisplay; 