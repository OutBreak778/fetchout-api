import { MailCheck, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button"; // adjust path as per your structure
import { Link, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const navigate = useNavigate()
    const isVerified = false
    if(isVerified) {
        navigate("/login")
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 w-full">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md text-center">
        <div className="flex flex-col items-center gap-4">
          <MailCheck className="h-12 w-12 text-green-500" />
          <h1 className="text-2xl font-semibold text-gray-800">
            Check your email
          </h1>
          <p className="text-sm text-gray-600">
            We've sent a verification link to your email address.
            <br />
            Didn’t get it? Check your spam folder 
          </p>

          <Link to="/login" className="w-full">
            <Button variant="default" className="w-full mt-4">
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
