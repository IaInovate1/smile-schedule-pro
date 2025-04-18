
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar } from "lucide-react";

// Mock data for demonstration
const MOCK_APPOINTMENTS = [
  { id: 1, patient: "John Smith", date: "2025-04-20 09:00", type: "Check-up" },
  { id: 2, patient: "Sarah Johnson", date: "2025-04-20 10:30", type: "Cleaning" },
  { id: 3, patient: "Michael Brown", date: "2025-04-21 14:00", type: "Root Canal" },
  { id: 4, patient: "Emily Davis", date: "2025-04-22 11:00", type: "Filling" },
  { id: 5, patient: "Robert Wilson", date: "2025-04-23 15:30", type: "Extraction" },
];

const Appointments = () => {
  const [appointments] = useState(MOCK_APPOINTMENTS);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/availability">
              <Button className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700">
                <Calendar className="h-4 w-4" />
                Manage Availability
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader className="bg-purple-50">
            <CardTitle className="text-2xl text-purple-900">Your Appointments</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-6 py-4 text-left font-medium text-gray-500">Patient</th>
                    <th className="px-6 py-4 text-left font-medium text-gray-500">Appointment Date</th>
                    <th className="px-6 py-4 text-left font-medium text-gray-500">Appointment Type</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{appointment.patient}</td>
                      <td className="px-6 py-4">{appointment.date}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.type === "Check-up" ? "bg-blue-100 text-blue-800" :
                          appointment.type === "Cleaning" ? "bg-green-100 text-green-800" :
                          appointment.type === "Root Canal" ? "bg-red-100 text-red-800" :
                          appointment.type === "Filling" ? "bg-yellow-100 text-yellow-800" :
                          "bg-purple-100 text-purple-800"
                        }`}>
                          {appointment.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <p className="text-center text-gray-500 mt-8">
          * This shows mock data. For real appointment data, you'll need Supabase integration.
        </p>
      </div>
    </div>
  );
};

export default Appointments;
