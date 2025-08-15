import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Braces, Plus, X } from "lucide-react";
import { useState } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
const ObjectResponseEditor = ({
  value,
  onChange,
  fieldId,
}: {
  value: any;
  onChange: (newValue: any) => void;
  structureId?: string;
  fieldId: string;
}) => {
  const [objectFields, setObjectFields] = useState<
    Array<{ id: string; key: string; value: any; type: string }>
  >(() => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return Object.entries(value).map(([key, val], index) => ({
        id: `${fieldId}-${index}`,
        key,
        value: val,
        type: Array.isArray(val) ? "array" : typeof val,
      }));
    }
    return [];
  });

  const addObjectField = () => {
    const newField = {
      id: `${fieldId}-${Date.now()}`,
      key: "",
      value: "",
      type: "string",
    };
    const updated = [...objectFields, newField];
    setObjectFields(updated);
    updateObjectValue(updated);
  };

  const removeObjectField = (id: string) => {
    const updated = objectFields.filter((f) => f.id !== id);
    setObjectFields(updated);
    updateObjectValue(updated);
  };

  const updateObjectField = (
    id: string,
    updates: Partial<{ key: string; value: any; type: string }>
  ) => {
    const updated = objectFields.map((f) =>
      f.id === id ? { ...f, ...updates } : f
    );
    setObjectFields(updated);
    updateObjectValue(updated);
  };

  const updateObjectValue = (fields: typeof objectFields) => {
    const obj = fields.reduce((acc, field) => {
      if (field.key) {
        let processedValue = field.value;
        if (field.type === "number") {
          processedValue = Number(field.value) || 0;
        } else if (field.type === "boolean") {
          processedValue = field.value === "true" || field.value === true;
        } else if (field.type === "array") {
          processedValue =
            typeof field.value === "string"
              ? field.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter((s) => s)
              : Array.isArray(field.value)
              ? field.value
              : [];
        }
        acc[field.key] = processedValue;
      }
      return acc;
    }, {} as any);
    onChange(obj);
  };

  return (
    <div className="space-y-3 border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-center gap-2 mb-3">
        <Braces className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          Object Properties
        </span>
        <div className="flex-1" />
        <Badge variant="secondary" className="text-xs">
          {objectFields.length}{" "}
          {objectFields.length === 1 ? "property" : "properties"}
        </Badge>
      </div>

      {objectFields.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <Braces className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500 mb-3">No object properties yet</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addObjectField}
            className="gap-2 bg-transparent"
          >
            <Plus className="h-3 w-3" />
            Add Property
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {objectFields.map((field) => (
            <div
              key={field.id}
              className="flex items-center gap-2 p-2 bg-gray-50 rounded border flex-col md:flex-row w-full"
            >
              <Input
                value={field.key}
                onChange={(e) =>
                  updateObjectField(field.id, { key: e.target.value })
                }
                placeholder="property"
                className="md:w-1/4 h-8 text-xs font-mono"
              />
              <Select
                value={field.type}
                onValueChange={(type) => updateObjectField(field.id, { type })}
              >
                <SelectTrigger className="w-full md:w-20 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="array">Array</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1 w-full">
                {field.type === "boolean" ? (
                  <Select
                    value={field.value?.toString() || "false"}
                    onValueChange={(value) =>
                      updateObjectField(field.id, { value: value === "true" })
                    }
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">true</SelectItem>
                      <SelectItem value="false">false</SelectItem>
                    </SelectContent>
                  </Select>
                ) : field.type === "array" ? (
                  <Input
                    value={
                      Array.isArray(field.value)
                        ? field.value.join(", ")
                        : field.value
                    }
                    onChange={(e) =>
                      updateObjectField(field.id, { value: e.target.value })
                    }
                    placeholder="item1, item2, item3"
                    className="h-8 text-xs font-mono"
                  />
                ) : (
                  <Input
                    type={field.type === "number" ? "number" : "text"}
                    value={field.value}
                    onChange={(e) =>
                      updateObjectField(field.id, {
                        value:
                          field.type === "number"
                            ? Number(e.target.value) || 0
                            : e.target.value,
                      })
                    }
                    placeholder={`Enter ${field.type}`}
                    className="h-8 text-xs font-mono"
                  />
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={() => removeObjectField(field.id)}
                className="h-8 w-full md:w-8 p-0 bg-red-200/10 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <Button
        variant="outline"
        size="sm"
        type="button"
        onClick={addObjectField}
        className="w-full gap-2 h-8 text-xs border-dashed border-gray-300 bg-transparent"
      >
        <Plus className="h-3 w-3" />
        Add Property
      </Button>
    </div>
  );
};

export default ObjectResponseEditor;
