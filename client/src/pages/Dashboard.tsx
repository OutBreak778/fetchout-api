import HeaderData from "@/components/HeaderData";
import { Home } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="text-gray-800">
      <HeaderData
        title="Dashboard"
        description="Review all your Endpoint and other info from here."
        icon={Home}
        bgColor="bg-purple-100"
        iconColor="text-purple-600"
      />
        </div>
  );
};

export default Dashboard;
