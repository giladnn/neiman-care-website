
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { AppointmentForm } from '@/types';

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState<AppointmentForm[]>([]);
  
  useEffect(() => {
    // Load appointments from localStorage
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
  }, []);

  // Fallback static data if no appointments in localStorage
  const staticAppointments = [
    { name: 'Sarah Cohen', date: '2024-04-10', time: '10:00 AM', reason: 'Follow-up', email: 'sarah@example.com', phone: '123-456-7890' },
    { name: 'David Levy', date: '2024-04-10', time: '2:30 PM', reason: 'Initial Consultation', email: 'david@example.com', phone: '123-456-7890' },
    { name: 'Rachel Goldstein', date: '2024-04-11', time: '9:15 AM', reason: 'Treatment Discussion', email: 'rachel@example.com', phone: '123-456-7890' }
  ];

  const displayAppointments = appointments.length > 0 ? appointments : staticAppointments;

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayAppointments.map((appointment, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-md">
              <div>
                <p className="font-medium">{appointment.name}</p>
                <p className="text-sm text-gray-500">{appointment.reason}</p>
                <p className="text-xs text-gray-400">{appointment.email}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {appointment.date instanceof Date 
                    ? new Date(appointment.date).toLocaleDateString() 
                    : new Date(appointment.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">{appointment.time}</p>
                <p className="text-xs text-gray-400">{appointment.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;
