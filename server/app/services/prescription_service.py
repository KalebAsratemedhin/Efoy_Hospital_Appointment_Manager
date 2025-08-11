from app.db.models.prescription import Prescription
from app.db.models.booking import Booking
from app.db.models.user import User
from app.schemas.prescription import PrescriptionCreate, PrescriptionUpdate, PrescriptionOut, PrescriptionPaginatedResponse
from beanie import PydanticObjectId
from datetime import datetime
from fastapi import HTTPException, status
from typing import List, Union

class PrescriptionService:
    @staticmethod
    async def create_prescription(prescription_data: PrescriptionCreate, current_user: User) -> PrescriptionOut:
        """Create a new prescription"""
        try:
            # Verify the booking exists and current user is the doctor
            booking = await Booking.get(PydanticObjectId(prescription_data.bookingId), fetch_links=True)
            if not booking:
                raise HTTPException(status_code=404, detail="Booking not found")
            
            if str(booking.doctorId.id) != str(current_user.id):
                raise HTTPException(status_code=403, detail="Only the assigned doctor can create prescriptions")
            
            # Check if prescription already exists for this booking
            existing_prescription = await Prescription.find_one(Prescription.bookingId.id == PydanticObjectId(prescription_data.bookingId))
            if existing_prescription:
                raise HTTPException(status_code=400, detail="Prescription already exists for this booking")
            
            # Create prescription
            prescription = Prescription(
                bookingId=booking, # This is correct for Beanie Link
                doctorId=current_user,
                patientId=booking.patientId,
                medications=prescription_data.medications,
                diagnosis=prescription_data.diagnosis,
                notes=prescription_data.notes,
                expiryDate=prescription_data.expiryDate,
                digitalSignature=prescription_data.digitalSignature
            )
            
            await prescription.insert()
            
            # Convert to response format
            prescription_dict = prescription.model_dump()
            prescription_dict['id'] = str(prescription.id)
            prescription_dict['bookingId'] = str(booking.id)  # Extract ID from Link field
            prescription_dict['doctorId'] = {
                'id': str(current_user.id),
                'fullName': current_user.fullName,
                'email': current_user.email,
                'role': current_user.role
            }
            prescription_dict['patientId'] = {
                'id': str(booking.patientId.id),
                'fullName': booking.patientId.fullName,
                'email': booking.patientId.email,
                'role': booking.patientId.role
            }
            
            return PrescriptionOut.model_validate(prescription_dict)
            
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to create prescription: {str(e)}"
            )
    
    @staticmethod
    async def find_patient_prescriptions(current_user: User, page: int = 1, limit: int = 10) -> PrescriptionPaginatedResponse:
        """Get prescriptions for the current patient user"""
        try:
            skip = (page - 1) * limit
            
            prescriptions = await Prescription.find(
                Prescription.patientId.id == current_user.id
            ).skip(skip).limit(limit).to_list()
            
            total_prescriptions = await Prescription.find(
                Prescription.patientId.id == current_user.id
            ).count()
            
            # Fetch linked data
            prescriptions_with_links = []
            for prescription in prescriptions:
                await prescription.fetch_link(Prescription.doctorId)
                await prescription.fetch_link(Prescription.patientId)
                await prescription.fetch_link(Prescription.bookingId)


                prescription_dict = prescription.model_dump()
                prescription_dict['id'] = str(prescription.id)
                prescription_dict['bookingId'] = str(prescription.bookingId.id)  # Extract ID from Link field
                prescription_dict['doctorId'] = {
                    'id': str(prescription.doctorId.id),
                    'fullName': prescription.doctorId.fullName,
                    'email': prescription.doctorId.email,
                    'role': prescription.doctorId.role
                }
                prescription_dict['patientId'] = {
                    'id': str(current_user.id),
                    'fullName': current_user.fullName,
                    'email': current_user.email,
                    'role': current_user.role
                }
                prescriptions_with_links.append(PrescriptionOut.model_validate(prescription_dict))
            
            return PrescriptionPaginatedResponse(
                items=prescriptions_with_links,
                total=total_prescriptions,
                page=page,
                limit=limit,
                total_pages=(total_prescriptions + limit - 1) // limit,
                has_next=page < (total_prescriptions + limit - 1) // limit,
                has_prev=page > 1
            )
            
        except Exception as e:
            print('getting patient prescriptions', e)
            raise HTTPException(
                status_code=500,
                detail=f"Failed to fetch prescriptions: {str(e)}"
            )
    
    @staticmethod
    async def find_doctor_prescriptions(current_user: User, page: int = 1, limit: int = 10) -> PrescriptionPaginatedResponse:
        """Get prescriptions created by the current doctor user"""
        try:
            skip = (page - 1) * limit
            
            prescriptions = await Prescription.find(
                Prescription.doctorId.id == current_user.id
            ).skip(skip).limit(limit).to_list()
            
            total_prescriptions = await Prescription.find(
                Prescription.doctorId.id == current_user.id
            ).count()
            
            # Fetch linked data
            prescriptions_with_links = []
            for prescription in prescriptions:
                await prescription.fetch_link(Prescription.patientId)
                prescription_dict = prescription.model_dump()
                prescription_dict['id'] = str(prescription.id)
                prescription_dict['bookingId'] = str(prescription.bookingId.id)  # Extract ID from Link field
                prescription_dict['doctorId'] = {
                    'id': str(current_user.id),
                    'fullName': current_user.fullName,
                    'email': current_user.email,
                    'role': current_user.role
                }
                prescription_dict['patientId'] = {
                    'id': str(prescription.patientId.id),
                    'fullName': prescription.patientId.fullName,
                    'email': prescription.patientId.email,
                    'role': prescription.patientId.role
                }
                prescriptions_with_links.append(PrescriptionOut.model_validate(prescription_dict))
            
            return PrescriptionPaginatedResponse(
                items=prescriptions_with_links,
                total=total_prescriptions,
                page=page,
                limit=limit,
                total_pages=(total_prescriptions + limit - 1) // limit,
                has_next=page < (total_prescriptions + limit - 1) // limit,
                has_prev=page > 1
            )
            
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to fetch prescriptions: {str(e)}"
            )
    
    @staticmethod
    async def find_one_prescription(id: str, current_user: User) -> PrescriptionOut:
        """Get a specific prescription by ID"""
        try:
            prescription = await Prescription.get(PydanticObjectId(id), fetch_links=True)
            if not prescription:
                raise HTTPException(status_code=404, detail="Prescription not found")
            
            # Check if user has access to this prescription
            if (str(prescription.patientId.id) != str(current_user.id) and 
                str(prescription.doctorId.id) != str(current_user.id)):
                raise HTTPException(status_code=403, detail="Access denied")
            
            # Convert to response format
            prescription_dict = prescription.model_dump()
            prescription_dict['id'] = str(prescription.id)
            prescription_dict['bookingId'] = str(prescription.bookingId.id)  # Extract ID from Link field
            prescription_dict['doctorId'] = {
                'id': str(prescription.doctorId.id),
                'fullName': prescription.doctorId.fullName,
                'email': prescription.doctorId.email,
                'role': prescription.doctorId.role
            }
            prescription_dict['patientId'] = {
                'id': str(prescription.patientId.id),
                'fullName': prescription.patientId.fullName,
                'email': prescription.patientId.email,
                'role': prescription.patientId.role
            }
            
            return PrescriptionOut.model_validate(prescription_dict)
            
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to fetch prescription: {str(e)}"
            )
    
    @staticmethod
    async def update_prescription(id: str, prescription_update: PrescriptionUpdate, current_user: User) -> PrescriptionOut:
        """Update a prescription (only by the prescribing doctor)"""
        try:
            prescription = await Prescription.get(PydanticObjectId(id))
            if not prescription:
                raise HTTPException(status_code=404, detail="Prescription not found")
            
            # Only the prescribing doctor can update
            if str(prescription.doctorId.id) != str(current_user.id):
                raise HTTPException(status_code=403, detail="Only the prescribing doctor can update this prescription")
            
            # Update fields
            update_data = prescription_update.model_dump(exclude_unset=True)
            for field, value in update_data.items():
                setattr(prescription, field, value)
            
            await prescription.save()
            
            # Convert to response format
            prescription_dict = prescription.model_dump()
            prescription_dict['id'] = str(prescription.id)
            prescription_dict['bookingId'] = str(prescription.bookingId.id)  # Extract ID from Link field
            prescription_dict['doctorId'] = {
                'id': str(current_user.id),
                'fullName': current_user.fullName,
                'email': current_user.email,
                'role': current_user.role
            }
            prescription_dict['patientId'] = {
                'id': str(prescription.patientId.id),
                'fullName': prescription.patientId.fullName,
                'email': prescription.patientId.email,
                'role': prescription.patientId.role
            }
            
            return PrescriptionOut.model_validate(prescription_dict)
            
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to update prescription: {str(e)}"
            ) 