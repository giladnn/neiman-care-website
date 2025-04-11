
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, Plus } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAppointments, updateAppointment, deleteAppointment } from '@/lib/supabase';
import AppointmentList from '@/components/admin/appointments/AppointmentList';
import AppointmentFormDialog from '@/components/admin/appointments/AppointmentFormDialog';
import { AppointmentForm } from '@/types';

const AppointmentManagement = () => {
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
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

  // Fetch appointments
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

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      reason: '',
      message: '',
      status: 'pending'
    });
    setCurrentAppointment(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsAddDialogOpen(true);
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
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Appointment Management</h1>
          <Button onClick={openAddDialog} className="flex items-center gap-2">
            <Plus size={16} />
            <span>Add Appointment</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>
              Manage patient appointments - edit details, update status, or cancel appointments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                Error loading appointments
              </div>
            ) : (
              <AppointmentList 
                appointments={appointments || []}
                onEdit={openEditDialog}
                onDelete={handleDeleteAppointment}
              />
            )}
          </CardContent>
        </Card>
      </div>

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

      {/* Add Appointment Dialog is a placeholder - in a real app, you'd probably redirect to the public appointment form */}
      <AppointmentFormDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        title="Add Appointment"
        description="Create a new appointment."
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={() => {
          toast.info('Creating new appointments from admin is not implemented. Please use the public appointment form.');
          setIsAddDialogOpen(false);
        }}
        submitButtonText="Add Appointment"
      />
    </AdminLayout>
  );
};

export default AppointmentManagement;
