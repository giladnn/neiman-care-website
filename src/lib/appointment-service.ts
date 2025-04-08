
import { v4 as uuidv4 } from 'uuid';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { AppointmentForm } from '@/types';

// Submit appointment data, save to localStorage and send email
export const submitAppointment = async (data: any) => {
  console.log("Form submitted:", data);
  
  try {
    // Create appointment object with unique ID and timestamp
    const appointment: AppointmentForm = {
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
      return true;
    } else {
      toast.warning('Appointment saved but email notification could not be sent. We will still process your request.');
      return true;
    }
  } catch (error) {
    console.error("Error saving appointment:", error);
    toast.error('There was a problem submitting your appointment. Please try again.');
    throw error;
  }
};

// Send email notification using EmailJS
export const sendEmailNotification = async (appointment: AppointmentForm) => {
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
