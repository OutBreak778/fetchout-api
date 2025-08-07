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
import { useAuthStore } from "@/stores/useAuthStore";
import type { LoginType } from "@/types";
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [password, setPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginType>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (!email || !password) {
      toast.error("All fields required");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Invalid Email");
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      console.log(loginData);
      setLoading(false);

      setLoginData({
        email: "",
        password: "",
      });
      navigate("/dashboard")
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(`Error in Login: ${error}`);
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
        title="Go back"
      >
        <ChevronLeft className="h-10 w-10" />
      </Button>

      <Card className="w-full max-w-md bg-white border border-gray-100 shadow-xl rounded-xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-extrabold text-gray-900">
            Welcome to Fetchout 👋
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Sign in to your account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900">
                  Email Address
                </Label>
                <Input
                  name="email"
                  onChange={onChangeValue}
                  value={loginData.email}
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <div className="relative flex">
                  <Input
                    name="password"
                    onChange={onChangeValue}
                    value={loginData.password}
                    type={password ? "text" : "password"}
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
                disabled={isLoading}
                className="w-full flex items-center cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
              >
                {loading ? (
                  <>
                    <p className="text-white font-semibold">Loading</p>
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>Login</>
                )}
              </Button>
            </div>

            <div className="flex items-center justify-center text-sm mt-3">
              <p className="text-muted-foreground ">don't have an account ?</p>{" "}
              <Link
                to={"/register"}
                className="text-blue-700 ml-2 font-medium hover:underline"
              >
                Register here...
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
