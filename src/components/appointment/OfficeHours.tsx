
import React from 'react';

const OfficeHours = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-xl font-bold mb-4 font-serif">Office Hours</h3>
      <table className="w-full">
        <tbody>
          <tr className="border-b">
            <td className="py-2 font-medium">Monday - Thursday</td>
            <td className="py-2 text-right">9:00 AM - 5:00 PM</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium">Friday</td>
            <td className="py-2 text-right">9:00 AM - 2:00 PM</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium">Saturday</td>
            <td className="py-2 text-right">Closed</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Sunday</td>
            <td className="py-2 text-right">Closed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OfficeHours;
