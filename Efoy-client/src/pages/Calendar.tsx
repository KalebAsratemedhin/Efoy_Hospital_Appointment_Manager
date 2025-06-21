// Author: AI Assistant
// Created: 2024-06-09
// Modern calendar page using FullCalendar React
import { useFindCurrentUserBookingsQuery } from "../redux/api/bookingAPI";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/slices/authSlice";
import Spinner from "../components/utils/Spinner";
import Error from "../components/utils/Error";
import { useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

const CalendarPage = () => {
  const authState = useSelector(authSelector);
  const { data, isLoading, isError, error } = useFindCurrentUserBookingsQuery({ page: 1, limit: 100 });
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  if (isLoading) return <Spinner />;
  if (isError) return <Error error={error} />;

  // Map bookings to FullCalendar events
  const events = (data?.bookings || []).map((booking: any) => {
    const start = new Date(booking.appointmentDate.split("T")[0] + " " + booking.time);
    const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 min duration
    return {
      id: booking._id,
      title: authState.role === "patient"
        ? `Dr. ${booking.doctorId.fullName}`
        : booking.patientId?.fullName || "Patient",
      start,
      end,
      extendedProps: { ...booking },
      color: booking.status === 'approved' ? '#7b10b0' : booking.status === 'pending' ? '#f59e42' : '#ef4444',
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 flex items-center gap-3">
          <span className="w-2 h-8 bg-[#7b10b0] rounded-full mr-3"></span>
          My Appointments Calendar
        </h1>
        <p className="text-gray-500 text-lg">View all your upcoming appointments in a beautiful calendar view.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-2xl p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listWeek'
          }}
          height={600}
          events={events}
          eventClick={(info) => setSelectedEvent(info.event.extendedProps)}
          eventDisplay="block"
          dayMaxEvents={3}
          selectable={false}
          nowIndicator={true}
        />
      </div>
      {/* Custom Modal for event details */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setSelectedEvent(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 min-w-[320px] max-w-[90vw] relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl" onClick={() => setSelectedEvent(null)}>&times;</button>
            <h2 className="text-xl font-bold mb-2 text-[#7b10b0]">Appointment Details</h2>
            <div className="mb-2">
              <span className="font-semibold">Date:</span> {new Date(selectedEvent.appointmentDate).toLocaleDateString()}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Time:</span> {selectedEvent.time}
            </div>
            <div className="mb-2">
              <span className="font-semibold">With:</span> {authState.role === 'patient' ? `Dr. ${selectedEvent.doctorId.fullName}` : selectedEvent.patientId?.fullName || 'Patient'}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Status:</span> <span className="capitalize px-2 py-1 rounded-full text-xs" style={{ background: selectedEvent.status === 'approved' ? '#d1fae5' : selectedEvent.status === 'pending' ? '#fef3c7' : '#fee2e2', color: selectedEvent.status === 'approved' ? '#065f46' : selectedEvent.status === 'pending' ? '#92400e' : '#991b1b' }}>{selectedEvent.status}</span>
            </div>
            {selectedEvent.reason && (
              <div className="mb-2">
                <span className="font-semibold">Reason:</span> {selectedEvent.reason}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage; 