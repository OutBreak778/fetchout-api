import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { ResponseField, responseStructure } from "@/types";
import {
  Braces,
  Brackets,
  ChevronDown,
  ChevronUp,
  Code2,
  FileJson,
  Plus,
  Trash2,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import ObjectResponseEditor from "./ObjectResponseEditor";
import { useDebounceFn } from "../hook/useDebounce";

interface EndpointResponseEditorProps {
  response: responseStructure[];
  setResponse: (response: responseStructure[]) => void;
}

const EndpointResponseEditor = ({
  response,
  setResponse,
}: EndpointResponseEditorProps) => {
  const [mode, setMode] = useState<"form" | "raw">("form");
  const [rawJSON, setRawJSON] = useState("");
  console.log(rawJSON)
  const [expandedObjects, setExpandedObjects] = useState(new Set());

  const addStructure = (type: "array" | "object" = "object") => {
    const newStructure: responseStructure = {
      id: Date.now().toString(),
      type,
      fields: [],
    };

    setResponse([...response, newStructure]);
  };

  const removeStructure = (id: string) => {
    setResponse(response.filter((item) => item.id !== id));
  };

  const addField = (id: string) => {
    const newFields: ResponseField = {
      id: Date.now().toString(),
      key: "",
      value: "",
      type: "string",
    };

    setResponse(
      response.map((item) =>
        item.id === id ? { ...item, fields: [...item.fields, newFields] } : item
      )
    );
  };

  const updateFieldFn = (
    structureId: string,
    fieldId: string,
    key: keyof ResponseField,
    value: string
  ) => {
    setResponse(
      response.map((item) =>
        item.id === structureId
          ? {
              ...item,
              fields: item.fields.map((f) =>
                f.id === fieldId ? { ...f, [key]: value } : f
              ),
            }
          : item
      )
    );
  };

  const updateField = useDebounceFn(updateFieldFn, 30);

  const removeField = (id: string, fieldId: string) => {
    setResponse(
      response.map((item) =>
        item.id === id
          ? {
              ...item,
              fields: item.fields.filter((field) => field.id !== fieldId),
            }
          : item
      )
    );
  };

  const generateJson = () => {
    if (response.length === 1) {
      const structure = response[0];
      const data = structure.fields.reduce((acc, field) => {
        if (field.key) {
          acc[field.key] = field.value;
        }

        return acc;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, {} as any);

      if (structure.type === "array") {
        return JSON.stringify([data], null, 2);
      }
      return JSON.stringify(data, null, 2);
    }

    const result = response.map((structure) => {
      const data = structure.fields.reduce((acc, field) => {
        if (field.key) {
          acc[field.key] = field.value;
        }

        return acc;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, {} as any);

      return structure.type === "array" ? [data] : data;
    });

    return JSON.stringify(result, null, 2);
  };

  const toggleObjectExpansion = (structureId: string, fieldId: string) => {
    const key = `${structureId}-${fieldId}`;
    const newExpanded = new Set(expandedObjects);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedObjects(newExpanded);
  };

  return (
    <Card className="w-full max-w-7xl mx-auto shadow-lg border border-gray-100 bg-white rounded-lg">
      <CardHeader className="pb-4 px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl">Response Example</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Create flexible JSON responses - objects, arrays, or complex
          structures
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 px-4 sm:px-6">
        <Tabs
          value={mode}
          onValueChange={(val) => setMode(val as "form" | "raw")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
            <TabsTrigger
              value="form"
              className="gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <Code2 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Form Builder</span>
              <span className="xs:hidden">Form</span>
            </TabsTrigger>
            <TabsTrigger
              value="raw"
              className="gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <FileJson className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Raw JSON</span>
              <span className="xs:hidden">JSON</span>
            </TabsTrigger>
          </TabsList>

          

          <TabsContent value="form" className="rounded-lg">
            {response.length === 0 ? (
              <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <FileJson className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                  No response structure yet
                </h3>
                <p className="text-sm text-gray-500 mb-4 sm:mb-6 px-4">
                  Choose how you want to structure your API response data.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
                  <Button
                    onClick={() => addStructure("object")}
                    className="gap-2 cursor-pointer w-full sm:w-auto"
                  >
                    <Braces className="h-4 w-4" />
                    Create Object
                  </Button>
                  <Button
                    onClick={() => addStructure("array")}
                    variant="outline"
                    className="gap-2 cursor-pointer w-full sm:w-auto"
                  >
                    <Brackets className="h-4 w-4" />
                    Create Array
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {response.map((item, index) => (
                  <Card key={item.id} className="border-0 mt-2">
                    <CardHeader className="pb-2 px-3 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-4 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="gap-1 text-xs">
                              {item.type === "array" ? (
                                <Brackets className="h-3 w-3" />
                              ) : (
                                <Braces className="h-3 w-3" />
                              )}
                              {item.type}
                            </Badge>
                            <span className="text-xs sm:text-sm font-medium text-gray-500">
                              #{index + 1}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStructure(item.id)}
                          className="text-red-600 cursor-pointer hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-6">
                      {item.fields.length === 0 ? (
                        <div className="text-center py-6 sm:py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                          <p className="text-sm text-gray-600 mb-3">
                            Add your first Field
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addField(item.id)}
                            className="border border-gray-200 cursor-pointer"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Fields
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {item.fields.map((field) => {
                            const objectKey = `${item.id}-${field.id}`;
                            const isObjectExpanded =
                              expandedObjects.has(objectKey);

                            return (
                              <div key={field.id} className="space-y-2">
                                {/* Main field row */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-3 bg-gray-50 rounded-lg">
                                  <Input
                                    onChange={(e) =>
                                      updateField(
                                        item.id,
                                        field.id,
                                        "key",
                                        e.target.value
                                      )
                                    }
                                    value={field.key}
                                    placeholder="Field Key"
                                    className="w-full sm:w-1/4 font-mono text-sm"
                                  />

                                  <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <Select
                                      value={field.type}
                                      onValueChange={(e) =>
                                        updateField(
                                          item.id,
                                          field.id,
                                          "type",
                                          e
                                        )
                                      }
                                    >
                                      <SelectTrigger className="w-full sm:w-28">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="string">
                                          String
                                        </SelectItem>
                                        <SelectItem value="number">
                                          Number
                                        </SelectItem>
                                        <SelectItem value="boolean">
                                          Boolean
                                        </SelectItem>
                                        <SelectItem value="array">
                                          Array
                                        </SelectItem>
                                        <SelectItem value="object">
                                          Object
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <Badge
                                      variant="secondary"
                                      className="hidden sm:inline-flex text-xs"
                                    >
                                      {field.type}
                                    </Badge>
                                  </div>

                                  {/* Value input for non-object types */}
                                  {field.type !== "object" && (
                                    <div className="flex-1 w-full">
                                      {field.type === "boolean" ? (
                                        <Select
                                          value={
                                            field.value?.toString() || "false"
                                          }
                                          onValueChange={(e) =>
                                            updateField(
                                              item.id,
                                              field.id,
                                              "value",
                                              e
                                            )
                                          }
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select value" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="true">
                                              true
                                            </SelectItem>
                                            <SelectItem value="false">
                                              false
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      ) : field.type === "array" ? (
                                        <Textarea
                                          value={
                                            Array.isArray(field.value)
                                              ? field.value.join(", ")
                                              : field.value || ""
                                          }
                                          onChange={(e) =>
                                            updateField(
                                              item.id,
                                              field.id,
                                              "value",
                                              e.target.value
                                            )
                                          }
                                          placeholder="item1, item2, item3"
                                          className="min-h-[40px] max-h-20 font-mono text-sm resize-none"
                                          rows={2}
                                        />
                                      ) : (
                                        <Input
                                          type={
                                            field.type === "number"
                                              ? "number"
                                              : "text"
                                          }
                                          onChange={(e) =>
                                            updateField(
                                              item.id,
                                              field.id,
                                              "value",
                                              e.target.value
                                            )
                                          }
                                          value={field.value || ""}
                                          placeholder={`Enter ${field.type} value`}
                                          className="font-mono text-sm"
                                        />
                                      )}
                                    </div>
                                  )}

                                  {/* Object toggle button */}
                                  {field.type === "object" && (
                                    <div className="flex items-center gap-2 w-full sm:w-auto border-none ">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        type="button"
                                        onClick={() =>
                                          toggleObjectExpansion(
                                            item.id,
                                            field.id
                                          )
                                        }
                                        className="gap-2 flex-1 sm:flex-none w-full border border-gray-300"
                                      >
                                        {isObjectExpanded ? (
                                          <>
                                            <ChevronUp className="h-4 w-4" />
                                            <span className="hidden sm:inline font-normal ">
                                              Hide Object
                                            </span>
                                            <span className="sm:hidden font-normal">
                                              Hide
                                            </span>
                                          </>
                                        ) : (
                                          <>
                                            <ChevronDown className="h-4 w-4" />
                                            <span className="hidden sm:inline font-normal ">
                                              Edit Object
                                            </span>
                                            <span className="sm:hidden font-normal">
                                              Edit
                                            </span>
                                          </>
                                        )}
                                      </Button>
                                    </div>
                                  )}

                                  <Button
                                    variant="ghost"
                                    onClick={() =>
                                      removeField(item.id, field.id)
                                    }
                                    className="text-red-600 bg-red-200/10 hover:text-red-700 hover:bg-red-50 cursor-pointer h-8 w-full md:w-8 p-0 shrink-0"
                                  >
                                    <XIcon className="w-4 h-4" />
                                  </Button>
                                </div>

                                {/* Object editor - shown below when expanded */}
                                {field.type === "object" &&
                                  isObjectExpanded && (
                                    <ObjectResponseEditor
                                      value={field.value}
                                      onChange={(newValue) =>
                                        updateField(
                                          item.id,
                                          field.id,
                                          "value",
                                          newValue
                                        )
                                      }
                                      structureId={item.id}
                                      fieldId={field.id}
                                    />
                                  )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={() => addField(item.id)}
                        className="gap-2 w-full mt-4 border-2 border-gray-200 cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                        Add Field
                      </Button>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Button
                    onClick={() => addStructure("object")}
                    variant="outline"
                    type="button"
                    className="flex-1 gap-2 h-12 border-dashed bg-transparent border-gray-300"
                  >
                    <Braces className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      Add Object Structure
                    </span>
                    <span className="sm:hidden">Add Object</span>
                  </Button>
                  <Button
                    onClick={() => addStructure("array")}
                    variant="outline"
                    type="button"
                    className="flex-1 gap-2 h-12 border-dashed bg-transparent border-gray-300"
                  >
                    <Brackets className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      Add Array Structure
                    </span>
                    <span className="sm:hidden">Add Array</span>
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="raw" className="rounded-lg">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Generated JSON</h3>
              <p className="text-sm text-gray-600 mb-4">
                This JSON represents your response structure. You can copy and
                modify it as needed.
              </p>
              <Textarea
                value={generateJson()}
                onChange={(e) => setRawJSON(e.target.value)}
                rows={15}
                className="font-mono text-sm bg-white border-gray-200 min-h-[300px] sm:min-h-[400px]"
                placeholder="Your JSON response will appear here..."
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EndpointResponseEditor;
