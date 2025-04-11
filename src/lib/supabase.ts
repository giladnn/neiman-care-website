import { supabase } from '@/integrations/supabase/client';
import { AppointmentForm, BlogPost, PatientStory, Service, Testimonial, NewsArticle, Video } from '@/types';

// Type-casting the supabase client to avoid TypeScript errors
const typedSupabase = supabase as any;

// Appointments related functions
export async function fetchAppointments() {
  const { data, error } = await typedSupabase
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
  const { data, error } = await typedSupabase
    .from('appointments')
    .insert([appointment])
    .select();

  if (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
  
  return data;
}

export async function updateAppointment(id: string, appointment: Partial<AppointmentForm>) {
  const { data, error } = await typedSupabase
    .from('appointments')
    .update(appointment)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
  
  return data;
}

export async function deleteAppointment(id: string) {
  const { error } = await typedSupabase
    .from('appointments')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
  
  return true;
}

// Blog related functions
export async function fetchBlogPosts() {
  const { data, error } = await typedSupabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  
  return data as BlogPost[];
}

export async function createBlogPost(blogPost: BlogPost) {
  const { data, error } = await typedSupabase
    .from('blog_posts')
    .insert([blogPost])
    .select();

  if (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
  
  return data;
}

export async function updateBlogPost(id: string, blogPost: Partial<BlogPost>) {
  const { data, error } = await typedSupabase
    .from('blog_posts')
    .update(blogPost)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
  
  return data;
}

export async function deleteBlogPost(id: string) {
  const { error } = await typedSupabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
  
  return true;
}

// Patient stories related functions
export async function fetchPatientStories() {
  const { data, error } = await typedSupabase
    .from('patient_stories')
    .select('*');

  if (error) {
    console.error('Error fetching patient stories:', error);
    return [];
  }
  
  return data as PatientStory[];
}

export async function createPatientStory(patientStory: PatientStory) {
  const { data, error } = await typedSupabase
    .from('patient_stories')
    .insert([patientStory])
    .select();

  if (error) {
    console.error('Error creating patient story:', error);
    throw error;
  }
  
  return data;
}

export async function updatePatientStory(id: string, patientStory: Partial<PatientStory>) {
  const { data, error } = await typedSupabase
    .from('patient_stories')
    .update(patientStory)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating patient story:', error);
    throw error;
  }
  
  return data;
}

export async function deletePatientStory(id: string) {
  const { error } = await typedSupabase
    .from('patient_stories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting patient story:', error);
    throw error;
  }
  
  return true;
}

// Services related functions
export async function fetchServices() {
  const { data, error } = await typedSupabase
    .from('services')
    .select('*');

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }
  
  return data as Service[];
}

export async function createService(service: Service) {
  const { data, error } = await typedSupabase
    .from('services')
    .insert([service])
    .select();

  if (error) {
    console.error('Error creating service:', error);
    throw error;
  }
  
  return data;
}

export async function updateService(id: string, service: Partial<Service>) {
  const { data, error } = await typedSupabase
    .from('services')
    .update(service)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating service:', error);
    throw error;
  }
  
  return data;
}

export async function deleteService(id: string) {
  const { error } = await typedSupabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
  
  return true;
}

// Testimonials related functions
export async function fetchTestimonials() {
  const { data, error } = await typedSupabase
    .from('testimonials')
    .select('*');

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
  
  return data as Testimonial[];
}

export async function createTestimonial(testimonial: Testimonial) {
  const { data, error } = await typedSupabase
    .from('testimonials')
    .insert([testimonial])
    .select();

  if (error) {
    console.error('Error creating testimonial:', error);
    throw error;
  }
  
  return data;
}

export async function updateTestimonial(id: string, testimonial: Partial<Testimonial>) {
  const { data, error } = await typedSupabase
    .from('testimonials')
    .update(testimonial)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating testimonial:', error);
    throw error;
  }
  
  return data;
}

export async function deleteTestimonial(id: string) {
  const { error } = await typedSupabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
  
  return true;
}

// News related functions
export async function fetchNewsArticles() {
  const { data, error } = await typedSupabase
    .from('news_articles')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching news articles:', error);
    return [];
  }
  
  return data as NewsArticle[];
}

export async function createNewsArticle(newsArticle: NewsArticle) {
  const { data, error } = await typedSupabase
    .from('news_articles')
    .insert([newsArticle])
    .select();

  if (error) {
    console.error('Error creating news article:', error);
    throw error;
  }
  
  return data;
}

export async function updateNewsArticle(id: string, newsArticle: Partial<NewsArticle>) {
  const { data, error } = await typedSupabase
    .from('news_articles')
    .update(newsArticle)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating news article:', error);
    throw error;
  }
  
  return data;
}

export async function deleteNewsArticle(id: string) {
  const { error } = await typedSupabase
    .from('news_articles')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting news article:', error);
    throw error;
  }
  
  return true;
}

// Videos related functions
export async function fetchVideos() {
  const { data, error } = await typedSupabase
    .from('videos')
    .select('*');

  if (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
  
  return data as Video[];
}

export async function createVideo(video: Video) {
  const { data, error } = await typedSupabase
    .from('videos')
    .insert([video])
    .select();

  if (error) {
    console.error('Error creating video:', error);
    throw error;
  }
  
  return data;
}

export async function updateVideo(id: string, video: Partial<Video>) {
  const { data, error } = await typedSupabase
    .from('videos')
    .update(video)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating video:', error);
    throw error;
  }
  
  return data;
}

export async function deleteVideo(id: string) {
  const { error } = await typedSupabase
    .from('videos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
  
  return true;
}

// Messages related functions
export async function fetchMessages() {
  const { data, error } = await typedSupabase
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

export async function createMessage(message: { name: string, email: string, message: string }) {
  const { data, error } = await typedSupabase
    .from('messages')
    .insert([message])
    .select();

  if (error) {
    console.error('Error creating message:', error);
    throw error;
  }
  
  return data;
}
