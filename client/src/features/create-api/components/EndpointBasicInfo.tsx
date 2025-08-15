import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CreateEndpointData } from "@/types";
import type React from "react";

interface EndpointBasicInfoProps {
    endpointData: CreateEndpointData
    onChangeValue: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const EndpointBasicInfo = ({endpointData, onChangeValue}: EndpointBasicInfoProps) => {
  return (
    <Card className="border-0">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl">Basic Information</CardTitle>
        <CardDescription className="text-base">
          Give your API a name and describe what it does
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="title" className="text-base font-medium">
            API Name
          </Label>
          <Input
            id="title"
            name="name"
            onChange={onChangeValue}
            value={endpointData.name}
            placeholder="User Authentication API"
            className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="description" className="text-base font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            onChange={onChangeValue}
            value={endpointData.description}
            placeholder="Handles user login, registration, and authentication tokens..."
            className="min-h-[120px] text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EndpointBasicInfo;
