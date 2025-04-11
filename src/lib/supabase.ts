
import { supabase } from '@/integrations/supabase/client';
import { AppointmentForm, BlogPost, PatientStory, Service, Testimonial, NewsArticle, Video } from '@/types';

// Appointments related functions
export async function fetchAppointments() {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
  
  return data as AppointmentForm[];
}

export async function createAppointment(appointment: AppointmentForm) {
  const { data, error } = await supabase
    .from('appointments')
    .insert([appointment])
    .select();

  if (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
  
  return data;
}

// Blog related functions
export async function fetchBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  
  return data as BlogPost[];
}

// Patient stories related functions
export async function fetchPatientStories() {
  const { data, error } = await supabase
    .from('patient_stories')
    .select('*');

  if (error) {
    console.error('Error fetching patient stories:', error);
    return [];
  }
  
  return data as PatientStory[];
}

// Services related functions
export async function fetchServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*');

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }
  
  return data as Service[];
}

// Testimonials related functions
export async function fetchTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*');

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
  
  return data as Testimonial[];
}

// News related functions
export async function fetchNewsArticles() {
  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching news articles:', error);
    return [];
  }
  
  return data as NewsArticle[];
}

// Videos related functions
export async function fetchVideos() {
  const { data, error } = await supabase
    .from('videos')
    .select('*');

  if (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
  
  return data as Video[];
}

// Messages related functions
export async function fetchMessages() {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
  
  return data;
}
