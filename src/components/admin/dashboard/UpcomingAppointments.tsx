
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { AppointmentForm } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Mail, Phone } from 'lucide-react';

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState<AppointmentForm[]>([]);
  
  useEffect(() => {
    // Load appointments from localStorage
    const loadAppointments = () => {
      const storedAppointments = localStorage.getItem('appointments');
      if (storedAppointments) {
        const parsedAppointments = JSON.parse(storedAppointments);
        // Sort appointments by date (newest first)
        parsedAppointments.sort((a: AppointmentForm, b: AppointmentForm) => {
          const dateA = new Date(`${a.date} ${a.time}`);
          const dateB = new Date(`${b.date} ${b.time}`);
          return dateA.getTime() - dateB.getTime();
        });
        setAppointments(parsedAppointments);
      }
    };

    // Load appointments initially
    loadAppointments();
    
    // Set up interval to refresh appointments every minute
    const intervalId = setInterval(loadAppointments, 60000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Fallback static data if no appointments in localStorage
  const staticAppointments = [
    { id: '1', name: 'Sarah Cohen', date: '2024-04-10', time: '10:00 AM', reason: 'Follow-up', email: 'sarah@example.com', phone: '123-456-7890', status: 'pending' },
    { id: '2', name: 'David Levy', date: '2024-04-10', time: '2:30 PM', reason: 'Initial Consultation', email: 'david@example.com', phone: '123-456-7890', status: 'confirmed' },
    { id: '3', name: 'Rachel Goldstein', date: '2024-04-11', time: '9:15 AM', reason: 'Treatment Discussion', email: 'rachel@example.com', phone: '123-456-7890', status: 'pending' }
  ];

  const displayAppointments = appointments.length > 0 ? appointments : staticAppointments;

  const getStatusColor = (status: string = 'pending') => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card className="col-span-full lg:col-span-2 h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Appointments</CardTitle>
        <Button variant="outline" size="sm" onClick={() => window.open('/appointment', '_blank')}>
          <Calendar size={16} className="mr-2" />
          Schedule New
        </Button>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[500px]">
        <div className="space-y-4">
          {displayAppointments.length > 0 ? (
            displayAppointments.map((appointment) => (
              <div key={appointment.id || appointment.name} className="p-4 border rounded-md bg-white shadow-sm hover:shadow transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-lg">{appointment.name}</div>
                  <Badge className={getStatusColor(appointment.status as string)}>
                    {appointment.status || 'Pending'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={14} className="mr-1 text-gray-400" />
                    <span>{appointment.date instanceof Date ? 
                      new Date(appointment.date).toLocaleDateString() : 
                      new Date(appointment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={14} className="mr-1 text-gray-400" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail size={14} className="mr-1 text-gray-400" />
                    <span>{appointment.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone size={14} className="mr-1 text-gray-400" />
                    <span>{appointment.phone}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-2 rounded-md">
                  <div className="text-sm font-medium">Reason: {appointment.reason}</div>
                  {appointment.message && (
                    <div className="text-sm text-gray-600 mt-1 line-clamp-2">{appointment.message}</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No appointments scheduled yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;
