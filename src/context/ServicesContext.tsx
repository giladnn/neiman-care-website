
import { createContext, useState, useContext, ReactNode } from 'react';
import { Service } from '@/types';
import { fetchServices } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

interface ServicesContextType {
  services: Service[];
  setServices: (services: Service[]) => void;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

// Default services for fallback
const defaultServices: Service[] = [
  {
    id: '1',
    title: 'Cancer Diagnosis',
    description: 'Comprehensive diagnostic services including genetic testing and advanced imaging to accurately identify cancer types and stages.',
    icon: '🔬',
  },
  {
    id: '2',
    title: 'Personalized Treatment Planning',
    description: 'Individualized treatment plans tailored to your specific diagnosis, health profile, and personal preferences.',
    icon: '📋',
  },
  {
    id: '3',
    title: 'Chemotherapy',
    description: 'Administration and management of the most advanced and appropriate chemotherapy regimens for your specific cancer type.',
    icon: '💊',
  },
  {
    id: '4',
    title: 'Immunotherapy',
    description: 'Cutting-edge immunotherapy treatments that harness your immune system to fight cancer cells.',
    icon: '🛡️',
  },
  {
    id: '5',
    title: 'Targeted Therapy',
    description: 'Precision medicine approaches that target specific genes or proteins that contribute to cancer growth and survival.',
    icon: '🎯',
  },
  {
    id: '6',
    title: 'Survivorship Care',
    description: 'Comprehensive follow-up care and support for cancer survivors to maintain health and prevent recurrence.',
    icon: '🌱',
  }
];

export const ServicesProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[]>(defaultServices);
  
  // Use React Query to fetch services
  const { isLoading, error, refetch } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
    onSettled: (data, error) => {
      if (error) {
        // If there's an error, use the default services
        setServices(defaultServices);
      } else if (data && data.length > 0) {
        setServices(data);
      }
    }
  });

  return (
    <ServicesContext.Provider value={{ 
      services, 
      setServices, 
      isLoading, 
      error: error as Error | null,
      refetch
    }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = (): ServicesContextType => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};
