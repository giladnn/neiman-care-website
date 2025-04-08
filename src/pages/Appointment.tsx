
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { AppointmentForm as AppointmentFormType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Define the form schema using zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string({
    required_error: "Please select a time.",
  }),
  reason: z.string().min(5, {
    message: "Please provide a reason for your appointment.",
  }),
  message: z.string().optional(),
});

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM"
];

const appointmentReasons = [
  "Initial Consultation",
  "Follow-up Appointment",
  "Treatment Discussion",
  "Second Opinion",
  "Test Results Review",
  "Other"
];

const Appointment = () => {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      reason: "",
      message: "",
    },
  });

  // Submit handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    console.log("Form submitted:", data);
    
    try {
      // Create appointment object with unique ID and timestamp
      const appointment: AppointmentFormType = {
        id: uuidv4(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : data.date,
        time: data.time,
        reason: data.reason,
        message: data.message,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      // Get existing appointments or initialize empty array
      const existingAppointments = localStorage.getItem('appointments') 
        ? JSON.parse(localStorage.getItem('appointments') || '[]') 
        : [];
      
      // Add new appointment
      existingAppointments.push(appointment);
      
      // Save back to localStorage
      localStorage.setItem('appointments', JSON.stringify(existingAppointments));
      
      // Send email notification
      const emailSent = await sendEmailNotification(appointment);
      
      if (emailSent) {
        toast.success('Appointment request submitted successfully! We will contact you shortly to confirm.');
        form.reset();
      } else {
        toast.warning('Appointment saved but email notification could not be sent. We will still process your request.');
      }
    } catch (error) {
      console.error("Error saving appointment:", error);
      toast.error('There was a problem submitting your appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Send email notification using EmailJS
  const sendEmailNotification = async (appointment: AppointmentFormType) => {
    try {
      // Prepare email template parameters
      const templateParams = {
        to_email: 'gilad.neiman@gmail.com',
        from_name: appointment.name,
        subject: `New Appointment Request: ${appointment.name} - ${appointment.date}`,
        message: `
          New Appointment Request:
          
          ID: ${appointment.id}
          Name: ${appointment.name}
          Email: ${appointment.email}
          Phone: ${appointment.phone}
          Date: ${appointment.date}
          Time: ${appointment.time}
          Reason: ${appointment.reason}
          Message: ${appointment.message || 'No additional message'}
          Status: ${appointment.status}
          Created: ${appointment.createdAt}
        `,
        reply_to: appointment.email
      };
      
      console.log("Sending email notification to gilad.neiman@gmail.com");
      console.log(templateParams);
      
      // Send email using EmailJS
      // Note: Replace these with your actual EmailJS service, template, and user IDs
      const response = await emailjs.send(
        'service_appointment',  // Your EmailJS service ID
        'template_appointment', // Your EmailJS template ID
        templateParams,
        'your_emailjs_public_key' // Your EmailJS public key
      );
      
      console.log('Email successfully sent!', response);
      return true;
    } catch (error) {
      console.error("Error sending email notification:", error);
      return false;
    }
  };

  return (
    <Layout>
      <div className="pt-24 pb-16 bg-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 font-serif text-gray-800">Schedule an Appointment</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Request an appointment with Dr. Victoria Neiman. We will contact you shortly to confirm your appointment time.
          </p>
        </div>
      </div>

      <div className="container mx-auto py-16">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-3 space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 font-serif">Request an Appointment</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+972 50 123 4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Select date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                  field.onChange(date);
                                  setIsDateOpen(false);
                                }}
                                disabled={(date) => {
                                  // Disable weekends and past dates
                                  const day = date.getDay();
                                  const isPastDate = date < new Date();
                                  return day === 0 || day === 6 || isPastDate;
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason for Visit</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {appointmentReasons.map((reason) => (
                              <SelectItem key={reason} value={reason}>
                                {reason}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please share any additional information about your condition or specific concerns."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary-dark"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'} 
                      {!isSubmitting && <ChevronRight size={16} className="ml-2" />}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="text-xl font-bold mb-4 font-serif">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-3 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-600">+972 3 123 4567</p>
                    <p className="text-sm text-gray-500">Mon-Thu: 9am-5pm, Fri: 9am-2pm</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-3 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600">contact@neiman-care.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-3 rounded-full mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-gray-600">
                      123 Medical Center Dr.<br />
                      Tel Aviv, 61000<br />
                      Israel
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4 font-serif">Office Hours</h3>
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Monday - Thursday</td>
                    <td className="py-2 text-right">9:00 AM - 5:00 PM</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Friday</td>
                    <td className="py-2 text-right">9:00 AM - 2:00 PM</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Saturday</td>
                    <td className="py-2 text-right">Closed</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Sunday</td>
                    <td className="py-2 text-right">Closed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Appointment;
