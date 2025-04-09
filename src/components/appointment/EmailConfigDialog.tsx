
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"

const EmailConfigDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <InfoIcon size={16} />
          Email Configuration
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Email Configuration Instructions</DialogTitle>
          <DialogDescription>
            Set up EmailJS to receive appointment notifications via email
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <h3 className="font-medium text-lg">Follow these steps:</h3>
          
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <p className="font-medium">Create an EmailJS account</p>
              <p className="text-sm text-muted-foreground">Visit <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">emailjs.com</a> and create an account if you don't have one.</p>
            </li>
            
            <li>
              <p className="font-medium">Create an Email Service</p>
              <p className="text-sm text-muted-foreground">Connect your Gmail or another email provider to EmailJS. Note the <span className="font-mono bg-muted p-0.5 rounded">Service ID</span>.</p>
            </li>
            
            <li>
              <p className="font-medium">Create an Email Template</p>
              <p className="text-sm text-muted-foreground">Create a template with the variables: <span className="font-mono bg-muted p-0.5 rounded">from_name</span>, <span className="font-mono bg-muted p-0.5 rounded">to_email</span>, <span className="font-mono bg-muted p-0.5 rounded">subject</span>, <span className="font-mono bg-muted p-0.5 rounded">message</span>, and <span className="font-mono bg-muted p-0.5 rounded">reply_to</span>. Note the <span className="font-mono bg-muted p-0.5 rounded">Template ID</span>.</p>
            </li>
            
            <li>
              <p className="font-medium">Get your Public Key</p>
              <p className="text-sm text-muted-foreground">Find your public key in your EmailJS account settings.</p>
            </li>
            
            <li>
              <p className="font-medium">Update the application code</p>
              <p className="text-sm text-muted-foreground">Edit <span className="font-mono bg-muted p-0.5 rounded">src/lib/appointment-service.ts</span> and replace:</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li><span className="font-mono bg-muted p-0.5 rounded">'YOUR_SERVICE_ID'</span> with your EmailJS service ID</li>
                <li><span className="font-mono bg-muted p-0.5 rounded">'YOUR_TEMPLATE_ID'</span> with your EmailJS template ID</li>
                <li><span className="font-mono bg-muted p-0.5 rounded">'YOUR_PUBLIC_KEY'</span> with your EmailJS public key</li>
                <li>Update <span className="font-mono bg-muted p-0.5 rounded">'clinic@example.com'</span> to your clinic's email</li>
              </ul>
            </li>
          </ol>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-md">
          <p className="text-sm font-medium text-amber-800">Important Security Note</p>
          <p className="text-sm text-amber-700 mt-1">
            Only use your <strong>public</strong> key in the frontend code. Never include private keys or credentials.
            EmailJS is designed to be safely used from frontend applications with just the public key.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EmailConfigDialog;
