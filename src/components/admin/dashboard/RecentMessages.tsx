
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RecentMessages = () => {
  const messages = [
    { name: 'Michael Berkovich', time: '2 hours ago', preview: 'I\'d like to discuss the test results...' },
    { name: 'Anna Shapiro', time: '5 hours ago', preview: 'Thank you for the appointment yesterday...' },
    { name: 'Yael Stein', time: '1 day ago', preview: 'I have a question about my medication...' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div key={i} className="flex flex-col p-4 border rounded-md">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{message.name}</p>
                <p className="text-xs text-gray-500">{message.time}</p>
              </div>
              <p className="text-sm text-gray-600 truncate">{message.preview}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentMessages;
