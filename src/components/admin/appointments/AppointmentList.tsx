
import React from 'react';
import { AppointmentForm } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface AppointmentListProps {
  appointments: AppointmentForm[];
  onEdit: (appointment: AppointmentForm) => void;
  onDelete: (id: string) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, onEdit, onDelete }) => {
  const getStatusColor = (status: string = 'pending') => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm">
                      <Mail size={14} className="mr-1 text-gray-400" />
                      <span className="truncate max-w-[150px]">{appointment.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone size={14} className="mr-1 text-gray-400" />
                      <span>{appointment.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm">
                      <Calendar size={14} className="mr-1 text-gray-400" />
                      <span>{typeof appointment.date === 'string' ? 
                        new Date(appointment.date).toLocaleDateString() : 
                        appointment.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock size={14} className="mr-1 text-gray-400" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm max-w-[200px] truncate">{appointment.reason}</div>
                  {appointment.message && (
                    <div className="text-xs text-gray-500 max-w-[200px] truncate">{appointment.message}</div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status || 'Pending'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(appointment)}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(appointment.id as string)}>
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No appointments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppointmentList;
