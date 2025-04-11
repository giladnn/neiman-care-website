
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { AppointmentForm } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import { fetchAppointments, updateAppointment, deleteAppointment } from '@/lib/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import AppointmentFormDialog from '@/components/admin/appointments/AppointmentFormDialog';
import { Link } from 'react-router-dom';

const UpcomingAppointments = () => {
  const queryClient = useQueryClient();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<AppointmentForm | null>(null);
  const [formData, setFormData] = useState<AppointmentForm>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    reason: '',
    message: '',
    status: 'pending'
  });

  // Use React Query to fetch appointments
  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
  });
  
  // Mutation for updating appointments
  const updateMutation = useMutation({
    mutationFn: (data: { id: string, appointment: Partial<AppointmentForm> }) => 
      updateAppointment(data.id, data.appointment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Appointment updated successfully');
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Error updating appointment: ${error.message}`);
    }
  });

  // Mutation for deleting appointments
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAppointment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Appointment deleted successfully');
    },
    onError: (error) => {
      toast.error(`Error deleting appointment: ${error.message}`);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Fallback static data if no appointments in Supabase or while loading
  const staticAppointments = [
    { id: '1', name: 'Sarah Cohen', date: '2024-04-10', time: '10:00 AM', reason: 'Follow-up', email: 'sarah@example.com', phone: '123-456-7890', status: 'pending' },
    { id: '2', name: 'David Levy', date: '2024-04-10', time: '2:30 PM', reason: 'Initial Consultation', email: 'david@example.com', phone: '123-456-7890', status: 'confirmed' },
    { id: '3', name: 'Rachel Goldstein', date: '2024-04-11', time: '9:15 AM', reason: 'Treatment Discussion', email: 'rachel@example.com', phone: '123-456-7890', status: 'pending' }
  ];

  const displayAppointments = isLoading || error || !appointments?.length ? staticAppointments : appointments;

  const getStatusColor = (status: string = 'pending') => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const openEditDialog = (appointment: AppointmentForm) => {
    setCurrentAppointment(appointment);
    setFormData({
      id: appointment.id,
      name: appointment.name,
      email: appointment.email,
      phone: appointment.phone,
      date: appointment.date instanceof Date ? appointment.date.toISOString().split('T')[0] : appointment.date as string,
      time: appointment.time,
      reason: appointment.reason,
      message: appointment.message || '',
      status: appointment.status || 'pending'
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateAppointment = () => {
    if (!currentAppointment?.id) return;
    
    updateMutation.mutate({
      id: currentAppointment.id,
      appointment: formData
    });
  };

  const handleDeleteAppointment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <Card className="col-span-full lg:col-span-2 h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Appointments</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.open('/appointment', '_blank')}>
            <Calendar size={16} className="mr-2" />
            Schedule New
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/appointments">
              View All
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[500px]">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
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
                        appointment.date.toLocaleDateString() : 
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

                  <div className="flex justify-end mt-3 gap-2">
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(appointment)}>
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteAppointment(appointment.id as string)}>
                      <Trash2 size={14} className="mr-1 text-red-500" />
                      <span className="text-red-500">Delete</span>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No appointments scheduled yet
              </div>
            )}
          </div>
        )}
      </CardContent>

      {/* Edit Appointment Dialog */}
      <AppointmentFormDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        title="Edit Appointment"
        description="Update appointment details and status."
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleUpdateAppointment}
        submitButtonText="Update Appointment"
      />
    </Card>
  );
};

export default UpcomingAppointments;
