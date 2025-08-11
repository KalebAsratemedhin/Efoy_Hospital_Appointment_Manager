import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaPills, FaPlus, FaTrash, FaSave, FaSignature } from 'react-icons/fa';
import { useCreatePrescriptionMutation } from '../../redux/api/prescriptionAPI';
import { PrescriptionCreate } from '../../types/Prescription';
import FormError from '../utils/FormError';
import FormSuccess from '../utils/FormSuccess';

import SignatureCanvas from 'react-signature-canvas';

interface FormData {
  diagnosis: string;
  notes: string;
  expiryDate: string;
}

interface PrescriptionFormProps {
  bookingId: string;
  patientName: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({
  bookingId,
  patientName,
  onSuccess,
  onCancel
}) => {
  const [medications, setMedications] = useState<string[]>(['']);
  const [hasSignature, setHasSignature] = useState(false);
  const signatureRef = useRef<SignatureCanvas>(null);
  const [createPrescription, { isLoading, isError, error, isSuccess }] = useCreatePrescriptionMutation();

  const {
    register,
    handleSubmit,
    formState: { },
    reset
  } = useForm<FormData>({
    defaultValues: {
      diagnosis: '',
      notes: '',
      expiryDate: ''
    }
  });

  const addMedication = () => {
    setMedications([...medications, '']);
  };

  const removeMedication = (index: number) => {
    if (medications.length > 1) {
      const newMedications = medications.filter((_, i) => i !== index);
      setMedications(newMedications);
    }
  };

  const updateMedication = (index: number, value: string) => {
    const newMedications = [...medications];
    newMedications[index] = value;
    setMedications(newMedications);
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

  const onSubmit = async (data: FormData) => {
    if (!hasSignature) {
      alert('Please sign the prescription before submitting');
      return;
    }

    try {
      // Get signature data as base64
      let signatureData = '';
      if (signatureRef.current) {
        signatureData = signatureRef.current.toDataURL();
      }

      const prescriptionData: PrescriptionCreate = {
        bookingId,
        medications: medications.filter(med => med.trim() !== ''),
        diagnosis: data.diagnosis || undefined,
        notes: data.notes || undefined,
        expiryDate: data.expiryDate && data.expiryDate.trim() !== '' ? data.expiryDate : undefined,
        digitalSignature: signatureData
      };

      await createPrescription(prescriptionData).unwrap();
      reset();
      setMedications(['']);
      if (signatureRef.current) {
        signatureRef.current.clear();
      }
      setHasSignature(false);
      onSuccess?.();
    } catch (err) {
      console.error('Failed to create prescription:', err);
    }
  };

  if (isSuccess) {
    return (
      <FormSuccess message="Prescription created successfully!" />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <FaPills className="text-purple-600" />
          Create Prescription
        </h2>
        <p className="text-gray-600">
          Creating prescription for <span className="font-semibold text-gray-800">{patientName}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Medications Section */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            Medications *
          </label>
          <div className="space-y-3">
            {medications.map((medication, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={medication}
                    onChange={(e) => updateMedication(index, e.target.value)}
                    placeholder={`Medication ${index + 1}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                    required
                  />
                </div>
                {medications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMedication(index)}
                    className="p-3 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addMedication}
              className="flex items-center gap-2 px-4 py-3 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors font-medium"
            >
              <FaPlus className="text-sm" />
              Add Another Medication
            </button>
          </div>
        </div>

        {/* Diagnosis */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            Diagnosis
          </label>
          <textarea
            {...register('diagnosis')}
            rows={3}
            placeholder="Enter diagnosis details..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg resize-none"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            Notes
          </label>
          <textarea
            {...register('notes')}
            rows={3}
            placeholder="Enter additional notes..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg resize-none"
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            Expiry Date (Optional)
          </label>
          <input
            type="date"
            {...register('expiryDate')}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
          />
          <p className="text-sm text-gray-500 mt-2">
            Leave empty if no expiry date is needed
          </p>
        </div>

        {/* Digital Signature */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FaSignature className="text-purple-600" />
            Digital Signature *
          </label>
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
            <div className="w-full h-40 flex justify-center">
              <SignatureCanvas
                ref={signatureRef}
                canvasProps={{
                  className: 'border border-gray-300 rounded bg-white',
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
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={clearSignature}
              className="px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
              Clear Signature
            </button>
            {!hasSignature && (
              <span className="text-orange-600 flex items-center gap-2 font-medium">
                ⚠️ Please sign above to enable submission
              </span>
            )}
          </div>
        </div>

        {/* Error Display */}
        {isError && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <FormError error={error} />
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isLoading || !hasSignature}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Creating...
              </>
            ) : (
              <>
                <FaSave className="text-lg" />
                Create Prescription
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-4 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PrescriptionForm; 