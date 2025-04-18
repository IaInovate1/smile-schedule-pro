
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calendar, Save } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Days of the week
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Availability = () => {
  // Initial availability state with 9 AM to 5 PM for all weekdays
  const [availability, setAvailability] = useState(
    DAYS.reduce((acc, day) => {
      acc[day] = { start: "09:00", end: "17:00" };
      return acc;
    }, {} as Record<string, { start: string; end: string }>)
  );

  const handleTimeChange = (day: string, field: "start" | "end", value: string) => {
    setAvailability({
      ...availability,
      [day]: {
        ...availability[day],
        [field]: value,
      },
    });
  };

  const handleSave = () => {
    // This is a placeholder for actual save logic
    // In a real application, we would save to Supabase here
    console.log("Saving availability:", availability);
    
    toast({
      title: "Availability updated",
      description: "Your weekly schedule has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/appointments">
              <Button variant="outline" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                View Appointments
              </Button>
            </Link>
            <Button 
              onClick={handleSave} 
              className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700"
            >
              <Save className="h-4 w-4" />
              Save Schedule
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="bg-purple-50">
            <CardTitle className="text-2xl text-purple-900">Weekly Availability</CardTitle>
            <CardDescription>
              Set your working hours for each day of the week
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {DAYS.map((day) => (
                <div key={day} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 border rounded-md hover:bg-gray-50">
                  <div className="font-medium">{day}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor={`${day}-start`} className="text-sm font-medium text-gray-500 mb-1 block">
                        Start Time
                      </label>
                      <Input
                        id={`${day}-start`}
                        type="time"
                        value={availability[day].start}
                        onChange={(e) => handleTimeChange(day, "start", e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor={`${day}-end`} className="text-sm font-medium text-gray-500 mb-1 block">
                        End Time
                      </label>
                      <Input
                        id={`${day}-end`}
                        type="time"
                        value={availability[day].end}
                        onChange={(e) => handleTimeChange(day, "end", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {availability[day].start} - {availability[day].end}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <p className="text-center text-gray-500 mt-8">
          * This is a demo. For persistent data storage, you'll need Supabase integration.
        </p>
      </div>
    </div>
  );
};

export default Availability;
