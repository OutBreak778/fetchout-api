import type { CreateEndpointData } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { methods } from "@/config";
import { Badge } from "@/components/ui/badge";
import { Globe, Lock, Zap } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useDebounceValue } from "../hook/useDebounce";

interface EndpointConfigureProps {
  endpointData: CreateEndpointData;
  onChangeValue: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setEndpointData: React.Dispatch<React.SetStateAction<CreateEndpointData>>;
}

const EndpointConfigure = ({
  endpointData,
  onChangeValue,
  setEndpointData,
}: EndpointConfigureProps) => {

    const limitFn = endpointData.rateLimit.limit
  const period = endpointData.rateLimit.period
  
  const limit = useDebounceValue(limitFn, 40)
  return (
    <Card className="border-2 border-gray-200 shadow-lg">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl">Configuration</CardTitle>
        <CardDescription className="text-base">
          Set up how your API behaves
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <Label className="text-base font-medium">HTTP Method</Label>
          <Select
            value={endpointData.methods} 
            onValueChange={(value) =>
              onChangeValue({
                target: { name: "methods", value },
              } as unknown as React.ChangeEvent<HTMLInputElement>)
            }
          >
            <SelectTrigger className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Choose a method" />
            </SelectTrigger>
            <SelectContent position="popper" className="z-50" portal={false}>
              {methods.map((method) => (
                <SelectItem
                  key={method.value}
                  value={method.value}
                  className="py-3"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      className={`${method.color} font-mono font-semibold`}
                    >
                      {method.value}
                    </Badge>
                    <span className="text-gray-600">{method.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-lg ${
                endpointData.isPublic ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              {endpointData.isPublic ? (
                <Globe className="w-6 h-6 text-green-600" />
              ) : (
                <Lock className="w-6 h-6 text-gray-600" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {endpointData.isPublic ? "Public API" : "Private API"}
              </h3>
              <p className="text-gray-600">
                {endpointData.isPublic
                  ? "Anyone can access this API with proper authentication"
                  : "Only you and authorized users can access this API"}
              </p>
            </div>
          </div>
          <Switch
            checked={endpointData.isPublic}
            onCheckedChange={(checked) =>
              setEndpointData((prev) => ({ ...prev, isPublic: checked }))
            }
            className="data-[state=checked]:bg-green-600"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <Label className="text-base font-medium">Rate Limiting</Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="requests" className="text-sm text-gray-600">
                Max Requests
              </Label>
              <Input
                id="requests"
                name="rateLimit.limit"
                onChange={onChangeValue}
                value={limit}
                type="number"
                placeholder="100"
                className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeWindow" className="text-sm text-gray-600">
                Time Window (seconds)
              </Label>
              <Input
                id="timeWindow"
                type="number"
                name="rateLimit.period"
                onChange={onChangeValue}
                value={period ?? 0}
                placeholder="3600"
                className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Limit the number of requests per time window to prevent abuse
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EndpointConfigure;
