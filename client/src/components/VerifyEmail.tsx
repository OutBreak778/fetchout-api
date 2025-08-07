import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      toast.error("No token found in URL");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/auth/verify-email?token=${token}`);
        if (res.data.success) {
          toast.success("Email verified successfully!");
        } else {
          toast.error(res.data.message || "Verification failed");
          navigate("/login");
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Invalid or expired token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 w-full">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800"><Loader2 className="w-10 h-10 animate-spin" /></h1>
        </div>
      </div>
    );
  }

  return null;
};

export default VerifyEmail;
