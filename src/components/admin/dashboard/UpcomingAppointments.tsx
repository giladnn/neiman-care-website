
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UpcomingAppointments = () => {
  const appointments = [
    { name: 'Sarah Cohen', date: '2024-04-10', time: '10:00 AM', type: 'Follow-up' },
    { name: 'David Levy', date: '2024-04-10', time: '2:30 PM', type: 'Initial Consultation' },
    { name: 'Rachel Goldstein', date: '2024-04-11', time: '9:15 AM', type: 'Treatment Discussion' }
  ];

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-md">
              <div>
                <p className="font-medium">{appointment.name}</p>
                <p className="text-sm text-gray-500">{appointment.type}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">{appointment.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;
