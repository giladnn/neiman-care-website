
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
  name: string;
  email: string;
  phone: string;
  date: string | Date;
  time: string;
  reason: string;
  message?: string;
}

export interface UserData {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name: string;
}
