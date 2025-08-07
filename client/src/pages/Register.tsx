import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import type { RegisterType } from "@/types";
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [registerData, setRegisterData] = useState<RegisterType>({
    userName: "",
    email: "",
    password: "",
  });

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBack = () => {
    navigate("/");
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const { userName, email, password } = registerData;
  if (!userName || !email || !password) {
    toast.error("All fields are required.");
    return;
  }
  if (!email.includes("@")) {
    toast.error("Please enter a valid email.");
    return;
  }
  if (password.length < 4) {
    toast.error("Password must be at least 4 characters.");
    return;
  }

  try {
    setLoading(true);

    const URL = `${import.meta.env.VITE_SERVER_URL}/auth/register`
    await api.post(URL, {userName, email, password})
    toast.success("User created successfully.")

    setRegisterData({
      userName: "",
      email: "",
      password: "",
    });

    navigate("/verify-email");
  } catch (error) {
    console.error("Error in Register Page:", error);
    toast.error("Registration failed. Try again.");
  } finally {
    setLoading(false); 
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative w-full">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={handleBack}
        className="absolute top-4 left-4 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        aria-label="Go back"
        title="Go Back"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Card className="w-full max-w-md bg-white border border-gray-100 shadow-xl rounded-xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-extrabold text-gray-900">
            Welcome to Fetchout 👋
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Create a new account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userName" className="text-gray-700">
                  User Name
                </Label>
                <Input
                  name="userName"
                  onChange={onChangeValue}
                  value={registerData.userName}
                  type="text"
                  placeholder="Jhon Doe"
                  required
                  className="  border-gray-300 text-gray-900 bg-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email Address
                </Label>
                <Input
                  name="email"
                  onChange={onChangeValue}
                  value={registerData.email}
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="  border-gray-300 text-gray-900 bg-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <div className="relative flex">
                  <Input
                    name="password"
                    type={password ? "text" : "password"}
                    onChange={onChangeValue}
                    value={registerData.password}
                    placeholder="*********"
                    required
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => setPassword((prev) => !prev)}
                    type="button"
                    className="text-muted-foreground absolute right-3 bottom-2.5"
                  >
                    {password ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
              >
                {loading ? (
                  <div className="text-muted flex space-x-2 items-center">
                    <p>Creating Account</p>
                    <Loader2 className="w-4 h-4 animate-spin transition-all text-muted" />
                  </div>
                ) : ( "Register" )}
              </Button>
            </div>

            <div className="flex items-center justify-center text-sm mt-3">
              <p className="text-muted-foreground ">
                Already have an account ?
              </p>{" "}
              <Link
                to={"/login"}
                className="text-blue-700 ml-2 font-medium hover:underline"
              >
                Login here...
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
