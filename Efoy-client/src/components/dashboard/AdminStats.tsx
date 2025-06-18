import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

const AdminStats = ({ doctorsCount, patientsCount, appointmentsCount }: {doctorsCount: number, patientsCount: number, appointmentsCount: number}) => {
  const pieData = {
    labels: ['Doctors', 'Patients', 'Appointments'],
    datasets: [
      {
        label: '# of Entities',
        data: [doctorsCount, patientsCount, appointmentsCount],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
        hoverBackgroundColor: ['#2563eb', '#059669', '#d97706'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Total Doctors</h3>
          <p className="text-2xl font-bold text-blue-600">{doctorsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Total Patients</h3>
          <p className="text-2xl font-bold text-green-600">{patientsCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600">Total Appointments</h3>
          <p className="text-2xl font-bold text-yellow-600">{appointmentsCount}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Entity Distribution</h2>
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
