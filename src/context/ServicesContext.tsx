
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { Service } from '@/types';
import { 
  fetchServices,
  createService,
  updateService,
  deleteService
} from '@/lib/supabase';

interface ServicesContextType {
  services: Service[];
  isLoading: boolean;
  error: Error | null;
  refreshServices: () => Promise<void>;
  addService: (service: Service) => Promise<void>;
  updateServiceItem: (id: string, service: Partial<Service>) => Promise<void>;
  deleteServiceItem: (id: string) => Promise<void>;
}

const ServicesContext = createContext<ServicesContextType>({
  services: [],
  isLoading: false,
  error: null,
  refreshServices: async () => {},
  addService: async () => {},
  updateServiceItem: async () => {},
  deleteServiceItem: async () => {},
});

export const useServices = () => useContext(ServicesContext);

export const ServicesProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const refreshServices = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const servicesData = await fetchServices();
      setServices(servicesData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error fetching services'));
      toast.error('Failed to load services');
      console.error('Error loading services:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addService = async (service: Service) => {
    try {
      await createService(service);
      toast.success('Service created successfully');
      await refreshServices();
    } catch (err) {
      toast.error('Failed to create service');
      throw err;
    }
  };

  const updateServiceItem = async (id: string, service: Partial<Service>) => {
    try {
      await updateService(id, service);
      toast.success('Service updated successfully');
      await refreshServices();
    } catch (err) {
      toast.error('Failed to update service');
      throw err;
    }
  };

  const deleteServiceItem = async (id: string) => {
    try {
      await deleteService(id);
      toast.success('Service deleted successfully');
      await refreshServices();
    } catch (err) {
      toast.error('Failed to delete service');
      throw err;
    }
  };

  useEffect(() => {
    refreshServices();
  }, []);

  return (
    <ServicesContext.Provider
      value={{
        services,
        isLoading,
        error,
        refreshServices,
        addService,
        updateServiceItem,
        deleteServiceItem
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};
