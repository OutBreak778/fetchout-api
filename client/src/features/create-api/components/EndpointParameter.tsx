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
import type { CreateEndpointData } from "@/types";
import { AlertCircle, Plus, X } from "lucide-react";

interface EndpointParameterProps {
  endpointData: CreateEndpointData;
  setEndpointData: React.Dispatch<React.SetStateAction<CreateEndpointData>>;
  paramName: { name: string };
  setParamsName: React.Dispatch<React.SetStateAction<{ name: string }>>;
}

const EndpointParameter = ({
  paramName,
  setParamsName,
  endpointData,
  setEndpointData,
}: EndpointParameterProps) => {
  
  const handleSubmit = () => {
    if (paramName.name.trim()) {
      setEndpointData((prev) => ({
        ...prev,
        params: [...prev.params, { name: paramName.name.trim() }],
      }));
      setParamsName({ name: "" });
    }
  };

  const handleRemoveParams = (index: number) => {
    setEndpointData((prev) => ({
      ...prev,
      params: prev.params.filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card className="border-2 border-gray-200 shadow-lg">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <div>
            <CardTitle className="text-2xl">API Parameters</CardTitle>
            <CardDescription className="text-base">
              Define the parameters your API accepts
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Add Parameter Form */}
        <div className="p-6 bg-gray-50 rounded-xl space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Add New Parameter
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paramName" className="text-sm font-medium">
                Parameter Name
              </Label>
              <Input
                id="paramName"
                value={paramName.name}
                onChange={(e) => setParamsName({ name: e.target.value })}
                onKeyPress={handleKeyPress}
                placeholder="e.g., userId, email, year, name, etc."
                className="h-11 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button
              onClick={handleSubmit}
              disabled={!paramName.name.trim()}
              type="button"
              className="bg-gray-700 hover:bg-gray-900 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Parameter
            </Button>
          </div>
        </div>

        {/* Parameters List */}
        <div className="space-y-4">
          {endpointData.params.length > 0 ? (
            <div className="space-y-3">
              {endpointData.params.map((param, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-800">
                          {param.name}
                        </code>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleRemoveParams(index)}
                      variant="ghost"
                      size="sm"
                      type="button"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No parameters yet
              </h3>
              <p className="text-gray-500 mb-4">
                Add your first parameter to define what data your API accepts
              </p>
              <Button
                onClick={() => document.getElementById("paramName")?.focus()}
                variant="outline"
                type="button"
                className="border-gray-300 hover:bg-gray-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Parameter
              </Button>
            </div>
          )}
        </div>

        {endpointData.params.length > 0 && (
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {endpointData.params.length} parameter
              {endpointData.params.length !== 1 ? "s" : ""} defined
            </p>
            <Button
              onClick={() =>
                setEndpointData((prev) => ({
                  ...prev,
                  params: [],
                }))
              }
              type="button"
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Clear All
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EndpointParameter;
