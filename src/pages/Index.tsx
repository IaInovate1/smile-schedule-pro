
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white">
      <div className="w-full max-w-4xl px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-6 text-purple-900">Smile Schedule Pro</h1>
        <p className="text-xl text-gray-600 mb-10">Dental clinic management system for professionals</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Feature Cards */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100">
            <h2 className="text-xl font-semibold mb-3 text-purple-800">Professional Login</h2>
            <p className="text-gray-600 mb-4">Secure access to your dental clinic dashboard.</p>
            <Link to="/login">
              <Button className="bg-purple-600 hover:bg-purple-700">Login</Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100">
            <h2 className="text-xl font-semibold mb-3 text-purple-800">Appointments</h2>
            <p className="text-gray-600 mb-4">View and manage your patient appointments.</p>
            <Link to="/appointments">
              <Button className="bg-purple-600 hover:bg-purple-700">View Appointments</Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100">
            <h2 className="text-xl font-semibold mb-3 text-purple-800">Availability</h2>
            <p className="text-gray-600 mb-4">Set your weekly working hours and availability.</p>
            <Link to="/availability">
              <Button className="bg-purple-600 hover:bg-purple-700">Manage Schedule</Button>
            </Link>
          </div>
        </div>
        
        <p className="text-gray-500 mt-8">
          * This is a basic structure. For full functionality, you'll need to connect with Supabase for PostgreSQL integration.
        </p>
      </div>
    </div>
  );
};

export default Index;
