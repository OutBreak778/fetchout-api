import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      // No token, go to login
      navigate("/login");
      return;
    }

    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify-email?token=${token}`);
        if (res.data.success) {
          navigate("/login");
        } else {
          navigate("/login"); // or show error
          toast.error("Something went wrong!")
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [navigate, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="ml-2">Verifying your email...</span>
      </div>
    );
  }

  return null;
};

export default VerifyEmail;
