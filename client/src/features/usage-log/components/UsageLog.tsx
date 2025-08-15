import HeaderData from "@/components/HeaderData";
import { BarChart3 } from "lucide-react";

const UsageLog = () => {
  return (
    <div className="text-gray-800">
      <HeaderData
        title="Check you Endpoint usage"
        description="Verify your usage per endpoint at a time."
        icon={BarChart3}
        iconColor="text-blue-400"
        bgColor="bg-blue-100"
      />
    </div>
  );
};

export default UsageLog;
