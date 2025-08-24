import HeaderData from "@/components/HeaderData";
import { Separator } from "@/components/ui/separator";
import { AppWindow, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import type { CreateEndpointData, responseStructure } from "@/types";
import EndpointBasicInfo from "./EndpointBasicInfo";
import EndpointConfigure from "./EndpointConfigure";
import EndpointResponseEditor from "./EndpointResponseEditor";
import EndpointParameter from "./EndpointParameter";
import { toast } from "sonner";
import { useEndpointStore } from "@/stores/useEndpointStore";

type FormParams = {
  name: string;
};

const CreateEndpoint = () => {
  const [paramName, setParamName] = useState<FormParams>({
    name: "",
  });

  const { createEndpoint, isLoading } = useEndpointStore();

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!endpointData.name.trim()) {
      toast.error("Endpoint name is required.");
      return;
    }
    if (!endpointData.methods) {
      toast.error("HTTP method is required.");
      return;
    }

    try {
      const formattedData = {
        ...endpointData,
        rateLimit: {
          limit: Number(endpointData.rateLimit.limit) || 0,
          period: Number(endpointData.rateLimit.period) || 0,
        },
      };
      await createEndpoint(formattedData);

      setEndpointData({
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
      });

      toast.success("Endpoint created successfully 🚀");
      setParamName({ name: "" });
    } catch (error) {
      console.log(`${error}`);
      toast.error("Endpoint creation failed.");
    }
  };

  return (
    <div className="min-h-0 text-gray-800">
      {/* Header */}
      <HeaderData
        title="Create New API"
        description="Define your API details, parameters, methods, and example responses. Your API will be generated instantly."
        icon={AppWindow}
        iconColor="text-gray-800"
        bgColor="bg-gray-100"
      />
      <Separator />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex flex-col space-y-4 bg-white">
          <EndpointBasicInfo
            endpointData={endpointData}
            onChangeValue={onChangeValue}
          />
          <EndpointParameter
            endpointData={endpointData}
            paramName={paramName}
            setParamsName={setParamName}
            setEndpointData={setEndpointData}
          />
          <EndpointResponseEditor
            response={endpointData.response as responseStructure[]}
            setResponse={(update: responseStructure[]) =>
              setEndpointData((prev) => ({
                ...prev,
                response: update,
              }))
            }
          />
          <EndpointConfigure
            endpointData={endpointData}
            onChangeValue={onChangeValue}
            setEndpointData={setEndpointData}
          />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-end sm:flex-row gap-4 justify-end pt-4 pb-2"
          >
            <div className="flex space-x-3 justify-end">
              <Button
                size="lg"
                type="submit"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(e);
                  }
                }}
                onSubmit={handleSubmit}
                disabled={isLoading}
                className="h-12 px-8 text-base disabled:cursor-not-allowed cursor-pointer bg-gray-800 hover:bg-gray-700 shadow-lg"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Create API
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEndpoint;
