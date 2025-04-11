
import { Language } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { AppointmentForm, BlogPost, PatientStory, Service, Testimonial, NewsArticle, Video, Message, FAQ, ContactInfo, BiographySection, FooterInfo } from '@/types';

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
  debugger
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
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
  
  return data as Message[];
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

export async function updateMessageStatus(update: { id: string, read: boolean }) {
  const { data, error } = await typedSupabase
    .from('messages')
    .update({ read: update.read })
    .eq('id', update.id)
    .select();

  if (error) {
    console.error('Error updating message status:', error);
    throw error;
  }
  
  return data;
}

export async function deleteMessage(id: string) {
  const { error } = await typedSupabase
    .from('messages')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
  
  return true;
}

// FAQs related functions
export async function fetchFaqs() {
  const { data, error } = await typedSupabase
    .from('faqs')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
  
  return data as FAQ[];
}

export async function createFaq(faq: {
  question: Record<Language, string>;
  answer: Record<Language, string>;
  category?: string;
  order?: number;
}) {
  const { data, error } = await typedSupabase
    .from('faqs')
    .insert([faq])
    .select();

  if (error) {
    console.error('Error creating FAQ:', error);
    throw error;
  }
  
  return data;
}

export async function updateFaq(faq: {
  id: string;
  question: Record<Language, string>;
  answer: Record<Language, string>;
  category?: string;
  order?: number;
}) {
  const { data, error } = await typedSupabase
    .from('faqs')
    .update({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order
    })
    .eq('id', faq.id)
    .select();

  if (error) {
    console.error('Error updating FAQ:', error);
    throw error;
  }
  
  return data;
}

export async function deleteFaq(id: string) {
  const { error } = await typedSupabase
    .from('faqs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting FAQ:', error);
    throw error;
  }
  
  return true;
}

// Contact Info related functions
export async function fetchContactInfo() {
  const { data, error } = await typedSupabase
    .from('contact_info')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching contact info:', error);
    return [];
  }
  
  return data as ContactInfo[];
}

export async function createContactInfo(info: {
  type: 'address' | 'phone' | 'email' | 'hours';
  value: Record<Language, string>;
  icon?: string;
  order?: number;
}) {
  const { data, error } = await typedSupabase
    .from('contact_info')
    .insert([info])
    .select();

  if (error) {
    console.error('Error creating contact info:', error);
    throw error;
  }
  
  return data;
}

export async function updateContactInfo(info: {
  id: string;
  type: 'address' | 'phone' | 'email' | 'hours';
  value: Record<Language, string>;
  icon?: string;
  order?: number;
}) {
  const { data, error } = await typedSupabase
    .from('contact_info')
    .update({
      type: info.type,
      value: info.value,
      icon: info.icon,
      order: info.order
    })
    .eq('id', info.id)
    .select();

  if (error) {
    console.error('Error updating contact info:', error);
    throw error;
  }
  
  return data;
}

export async function deleteContactInfo(id: string) {
  const { error } = await typedSupabase
    .from('contact_info')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting contact info:', error);
    throw error;
  }
  
  return true;
}

// Biography sections related functions
export async function fetchBiographySections() {
  const { data, error } = await typedSupabase
    .from('biography_sections')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching biography sections:', error);
    return [];
  }
  
  return data as BiographySection[];
}

export async function createBiographySection(section: {
  title: Record<Language, string>;
  content: Record<Language, string>;
  order: number;
}) {
  const { data, error } = await typedSupabase
    .from('biography_sections')
    .insert([section])
    .select();

  if (error) {
    console.error('Error creating biography section:', error);
    throw error;
  }
  
  return data;
}

export async function updateBiographySection(section: {
  id: string;
  title: Record<Language, string>;
  content: Record<Language, string>;
  order: number;
}) {
  const { data, error } = await typedSupabase
    .from('biography_sections')
    .update({
      title: section.title,
      content: section.content,
      order: section.order
    })
    .eq('id', section.id)
    .select();

  if (error) {
    console.error('Error updating biography section:', error);
    throw error;
  }
  
  return data;
}

export async function deleteBiographySection(id: string) {
  const { error } = await typedSupabase
    .from('biography_sections')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting biography section:', error);
    throw error;
  }
  
  return true;
}

export async function updateBiographyOrder(orderUpdate: {
  id1: string;
  order1: number;
  id2: string;
  order2: number;
}) {
  // Update first section
  const { error: error1 } = await typedSupabase
    .from('biography_sections')
    .update({ order: orderUpdate.order1 })
    .eq('id', orderUpdate.id1);

  if (error1) {
    console.error('Error updating biography order:', error1);
    throw error1;
  }
  
  // Update second section
  const { error: error2 } = await typedSupabase
    .from('biography_sections')
    .update({ order: orderUpdate.order2 })
    .eq('id', orderUpdate.id2);

  if (error2) {
    console.error('Error updating biography order:', error2);
    throw error2;
  }
  
  return true;
}

// Footer info related functions
export async function fetchFooterInfo() {
  const { data, error } = await typedSupabase
    .from('footer_info')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching footer info:', error);
    return [];
  }
  
  return data as FooterInfo[];
}

export async function createFooterInfo(info: {
  section: 'quickLinks' | 'contactInfo' | 'officeHours';
  title: Record<Language, string>;
  content: Record<Language, string>;
  link?: string;
  icon?: string;
  order: number;
}) {
  const { data, error } = await typedSupabase
    .from('footer_info')
    .insert([info])
    .select();

  if (error) {
    console.error('Error creating footer info:', error);
    throw error;
  }
  
  return data;
}

export async function updateFooterInfo(info: {
  id: string;
  section: 'quickLinks' | 'contactInfo' | 'officeHours';
  title: Record<Language, string>;
  content: Record<Language, string>;
  link?: string;
  icon?: string;
  order: number;
}) {
  const { data, error } = await typedSupabase
    .from('footer_info')
    .update({
      section: info.section,
      title: info.title,
      content: info.content,
      link: info.link,
      icon: info.icon,
      order: info.order
    })
    .eq('id', info.id)
    .select();

  if (error) {
    console.error('Error updating footer info:', error);
    throw error;
  }
  
  return data;
}

export async function deleteFooterInfo(id: string) {
  const { error } = await typedSupabase
    .from('footer_info')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting footer info:', error);
    throw error;
  }
  
  return true;
}
