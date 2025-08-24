import HeaderData from "@/components/HeaderData";
import { Home } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="text-gray-800">
      <HeaderData
        title="Dashboard"
        description="Review all your Endpoint and other info from here."
        icon={Home}
        bgColor="bg-gray-100"
        iconColor="text-gray-800"
      />
        </div>
  );
};

export default Dashboard;
