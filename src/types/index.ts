export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  author: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position?: string;
  content: string;
  rating: number;
  imageUrl?: string;
}

export interface PatientStory extends Testimonial {
  fullStory: string;
  diagnosis?: string;
  treatmentJourney?: string;
  videoUrl?: string;
  featured: boolean;
  category?: string; // Adding category field
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  date: string;
  excerpt: string;
  url: string;
  imageUrl?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
}

export interface AppointmentForm {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: Date | string;
  time: string;
  reason: string;
  message?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  created_at?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read?: boolean;
}

export interface FAQ {
  id: string;
  question: Record<Language, string>;
  answer: Record<Language, string>;
  category?: string;
  order?: number;
  created_at?: string;
}

export interface ContactInfo {
  id: string;
  type: 'address' | 'phone' | 'email' | 'hours';
  value: Record<Language, string>;
  icon?: string;
  order?: number;
}

export interface BiographySection {
  id: string;
  title: Record<Language, string>;
  content: Record<Language, string>;
  order: number;
}

export interface FooterInfo {
  id: string;
  section: 'quickLinks' | 'contactInfo' | 'officeHours';
  title: Record<Language, string>;
  content: Record<Language, string>;
  link?: string;
  icon?: string;
  order: number;
}

export interface UserData {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name: string;
}

export interface Video {
  id: string;
  title: string;
  source: 'youtube' | 'facebook';
  url: string;
  thumbnail?: string;
}
