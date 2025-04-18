import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import { createMessage } from "@/lib/supabase";
import WhatsAppQR from "@/components/contact/WhatsAppQR";
import { useLanguage } from "@/context/LanguageContext";
import { translate } from "@/translations";

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
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const Contact = () => {
  const { language } = useLanguage();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (data) {
        await createMessage(data as { name: string, email: string, message: string });
        toast.success(translate("messageSent", language));
      } else {
        toast.error(translate("errorSending", language));
      }
    } catch (error) {
      console.error("Error saving message:", error);
      toast.error(translate("errorSending", language));
    }
    form.reset();
  };

  return (
    <Layout>
      <div className="pt-24 pb-16 bg-primary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 font-serif text-gray-800">
            {translate("contactUs", language)}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {translate("contactDescription", language)}
          </p>
        </div>
      </div>

      <div className="container mx-auto py-16">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2 space-y-8">
            <WhatsAppQR />
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
                  <MapPin size={48} className="text-primary" />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{translate("officeAddress", language)}</h3>
                    <p className="text-gray-600">
                      4 Mota Gur
                      <br />
                      Petah tikva
                      <br />
                      Israel
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Phone</h3>
                    <p className="text-gray-600">073-702-1736</p>
                    <p className="text-sm text-gray-500">
                      Mon-Thu: 9am-5pm, Fri: 9am-2pm
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Email</h3>
                    <p className="text-gray-600">victoria.neiman@gmail.com</p>
                    <p className="text-sm text-gray-500">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday - Thursday: 9:00 - 17:00{" "}
                    </p>
                    <p className="text-gray-600">Friday: 9:00 - 14:00</p>
                    <p className="text-gray-600">Saturday - Sunday: Closed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 font-serif">
                {translate("sendUsMessage", language)}
              </h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{translate("fullName", language)}</FormLabel>
                          <FormControl>
                            <Input dir={language === 'he' ? 'rtl' : 'ltr'} {...field} />
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
                          <FormLabel>{translate("email", language)}</FormLabel>
                          <FormControl>
                            <Input dir={language === 'he' ? 'rtl' : 'ltr'} {...field} />
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

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{translate('subject', language)}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={translate('subjectPlaceHolder', language)}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{translate('message', language)}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={translate('messagePlaceHolder', language)}
                            className="resize-none"
                            rows={6}
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
                      className="w-full md:w-auto bg-primary hover:bg-primary-dark"
                    >
                      {translate("submitMessage", language)}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 font-serif">
                {translate("frequently", language)}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold">
                    {translate("appointmentQuestion", language)}
                  </h4>
                  <p className="text-gray-600">
                    {translate("appointmentAnswer", language)}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold">
                    {translate("referralQuestion", language)}
                  </h4>
                  <p className="text-gray-600">
                    {translate("referralAnswer", language)}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold">
                    {translate("insuranceQuestion", language)}
                  </h4>
                  <p className="text-gray-600">
                    {translate("insuranceAnswer", language)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
