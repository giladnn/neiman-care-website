
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

interface EmailRequest {
  type: 'contact' | 'appointment';
  data: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { type, data }: EmailRequest = await req.json()

    let emailContent
    let subject

    if (type === 'contact') {
      subject = `New Contact Form Submission from ${data.name}`
      emailContent = `
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        Subject: ${data.subject}
        Message: ${data.message}
      `
    } else if (type === 'appointment') {
      subject = `New Appointment Request from ${data.name}`
      emailContent = `
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        Date: ${data.date}
        Time: ${data.time}
        Reason: ${data.reason}
        Additional Information: ${data.message || 'None provided'}
      `
    }

    const emailResponse = await resend.emails.send({
      from: "doctor.neiman.victoria@gmail.com",
      to: ["gilad.neimann@gmail.com"],
      subject,
      html: `<pre>${emailContent}</pre>`,
    })

    console.log("Email sent successfully:", emailResponse)

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    )
  }
}

serve(handler)
