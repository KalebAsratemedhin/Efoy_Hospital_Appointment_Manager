import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DocStats = () => {
  // Dummy data for demonstration
  const totalAppointments = 35;
  const monthlyAppointments = [3, 5, 2, 8, 7, 4, 6, 9, 5, 2, 8, 3]; // Monthly data

  const barData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Appointments',
        data: monthlyAppointments,
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-700">Doctor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Total Appointments Card */}
        

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Monthly Appointments</h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default DocStats;
