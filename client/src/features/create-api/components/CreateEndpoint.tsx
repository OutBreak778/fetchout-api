import HeaderData from "@/components/HeaderData";
import { Separator } from "@/components/ui/separator";
import { AppWindow } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useState, type ChangeEvent } from "react";
import type { CreateEndpointData, responseStructure } from "@/types";
import EndpointBasicInfo from "./EndpointBasicInfo";
import EndpointConfigure from "./EndpointConfigure";
import EndpointResponseEditor from "./EndpointResponseEditor";
import EndpointParameter from "./EndpointParameter";

type FormParams = {
  name: string;
};

const CreateEndpoint = () => {
  const [paramName, setParamName] = useState<FormParams>({
    name: "",
  });

  const [endpointData, setEndpointData] = useState<CreateEndpointData>({
    name: "",
    description: "",
    methods: "GET",
    params: [],
    response: [],
    hits: 0,
    rateLimit: {
      limit: 0,
      period: 0,
    },
    isPublic: false,
  } as CreateEndpointData);

  const onChangeValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      setEndpointData((prev) => {
        const parentValue = prev[parent as keyof typeof prev];

        return {
          ...prev,
          [parent]: {
            ...(typeof parentValue === "object" && parentValue !== null
              ? parentValue
              : {}),
            [child]: value, // ✅ actual input value
          },
        };
      });
    } else {
      setEndpointData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (name === "name") {
      setParamName((prev) => ({
        ...prev,
        name: value,
      }));
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(endpointData);
  };

  return (
    <div className="max-h-screen text-gray-800">
      {/* Header */}
      <HeaderData
        title="Create New API"
        description="Define your API details, parameters, methods, and example responses. Your API will be generated instantly."
        icon={AppWindow}
        iconColor="text-blue-600"
        bgColor="bg-blue-100"
      />
      <Separator />
      <div className="max-w-4xl mx-auto py-12">
        <form
          className="flex flex-col space-y-4 bg-white"
          onSubmit={handleSubmit}
        >
          {/* Basic Information */}

          <EndpointBasicInfo
            endpointData={endpointData}
            onChangeValue={onChangeValue}
          />
          {/* API Parameters */}

          <EndpointParameter
            endpointData={endpointData}
            paramName={paramName}
            setParamsName={setParamName}
            setEndpointData={setEndpointData}
          />

          {/* Response Examples */}
          <EndpointResponseEditor
            response={endpointData.response as responseStructure[]}
            setResponse={(update: responseStructure[]) =>
              setEndpointData((prev) => ({
                ...prev,
                response: update,
              }))
            }
          />

          {/* Configuration */}
          <EndpointConfigure
            endpointData={endpointData}
            onChangeValue={onChangeValue}
            setEndpointData={setEndpointData}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6">
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base border-gray-200 hover:bg-gray-50 bg-transparent cursor-pointer"
            >
              Save as Draft
            </Button>
            <Button
              size="lg"
              type="submit"
              className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 shadow-lg cursor-pointer"
            >
              Create API
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEndpoint;
