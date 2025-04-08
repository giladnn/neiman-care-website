
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { AppointmentForm as AppointmentFormType } from '@/types';
import { submitAppointment } from '@/lib/appointment-service';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

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

const AppointmentForm = () => {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language } = useLanguage();

  // Get translated appointment reasons
  const appointmentReasons = [
    {key: "initialConsultation", value: translate('initialConsultation', language)},
    {key: "followUp", value: translate('followUp', language)},
    {key: "treatmentDiscussion", value: translate('treatmentDiscussion', language)},
    {key: "secondOpinion", value: translate('secondOpinion', language)},
    {key: "testResultsReview", value: translate('testResultsReview', language)},
    {key: "other", value: translate('other', language)}
  ];

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
    
    try {
      await submitAppointment(data);
      form.reset();
    } catch (error) {
      console.error("Error saving appointment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translate('fullName', language)}</FormLabel>
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
                <FormLabel>{translate('email', language)}</FormLabel>
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
              <FormLabel>{translate('phoneNumber', language)}</FormLabel>
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
                <FormLabel>{translate('date', language)}</FormLabel>
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
                          <span>{translate('selectDate', language)}</span>
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
                <FormLabel>{translate('time', language)}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={translate('selectTime', language)} />
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
              <FormLabel>{translate('reasonForVisit', language)}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={translate('selectReason', language)} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {appointmentReasons.map((reason) => (
                    <SelectItem key={reason.key} value={reason.key}>
                      {reason.value}
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
              <FormLabel>{translate('additionalInformation', language)}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={translate('additionalInfoPlaceholder', language)}
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
            {isSubmitting ? translate('submitting', language) : translate('submitRequest', language)} 
            {!isSubmitting && <ChevronRight size={16} className="ml-2" />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AppointmentForm;
