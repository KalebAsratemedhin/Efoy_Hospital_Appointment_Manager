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

  // Map bookings to FullCalendar events - fix data access
  const events = (data?.items || []).map((booking: any) => {
    console.log('Booking for calendar:', booking); // Debug log
    
    const start = new Date(booking.appointmentDate.split("T")[0] + " " + booking.time);
    const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 min duration
    
    return {
      id: booking.id,
      title: authState.role === "patient"
        ? `Dr. ${booking.doctorId?.fullName || 'Unknown Doctor'}`
        : booking.patientId?.fullName || "Patient",
      start,
      end,
      extendedProps: { ...booking },
      color: booking.status === 'approved' ? '#10b981' : booking.status === 'pending' ? '#f59e0b' : '#ef4444',
    };
  });

  console.log('Calendar events:', events); // Debug log

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 flex items-center gap-3">
          <span className="w-2 h-8 bg-blue-600 rounded-full mr-3"></span>
          My Appointments Calendar
        </h1>
        <p className="text-gray-500 text-lg">View all your upcoming appointments in a beautiful calendar view.</p>
      </div>
      
      {events.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Appointments Found</h3>
          <p className="text-gray-500">You don't have any appointments scheduled yet.</p>
        </div>
      ) : (
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
      )}
      
      {/* Custom Modal for event details */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setSelectedEvent(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 min-w-[320px] max-w-[90vw] relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl" onClick={() => setSelectedEvent(null)}>&times;</button>
            <h2 className="text-xl font-bold mb-4 text-blue-600">Appointment Details</h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-semibold">Date:</span> 
                <span>{new Date(selectedEvent.appointmentDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-semibold">Time:</span> 
                <span>{selectedEvent.time}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="font-semibold">With:</span> 
                <span>{authState.role === 'patient' ? `Dr. ${selectedEvent.doctorId?.fullName || 'Unknown'}` : selectedEvent.patientId?.fullName || 'Patient'}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="font-semibold">Status:</span> 
                <span className={`capitalize px-3 py-1 rounded-full text-xs font-medium ${
                  selectedEvent.status === 'approved' ? 'bg-green-100 text-green-800' :
                  selectedEvent.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedEvent.status}
                </span>
              </div>
              
              {selectedEvent.reason && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <div>
                    <span className="font-semibold">Reason:</span> 
                    <p className="text-gray-700 mt-1">{selectedEvent.reason}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage; 