import HeaderData from "@/components/HeaderData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEndpointStore } from "@/stores/useEndpointStore";
import { Globe, Loader2, Plus, Search, SearchIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import EndpointCards from "./EndpointCards";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const Endpoint = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [methodFilter, setMethodFilter] = useState<string>("all");
  const [visibleFilter, setVisibleFilter] = useState<string>("all");
  const [rateLimitRange, setRateLimitRange] = useState([0, 200]);

  const hasFetched = useRef(false);

  const { data, isLoading, fetchEndpoint } = useEndpointStore();
  const filteredEndpoint = useMemo(() => {
    const filtered = data.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.methods.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchMethod =
        methodFilter === "all" || item.methods === methodFilter;

      const matchVisible =
        visibleFilter === "all" ||
        (visibleFilter === "public" && item.isPublic) ||
        (visibleFilter === "private" && !item.isPublic);

      const matchRateLimit =
        item.rateLimit.limit >= rateLimitRange[0] &&
        item.rateLimit.limit <= rateLimitRange[1];

      return matchSearch && matchMethod && matchVisible && matchRateLimit;
    });

    return filtered;
  }, [data, searchQuery, methodFilter, visibleFilter, rateLimitRange]);

  useEffect(() => {
    if (hasFetched.current) return; // 🚧 guard

    fetchEndpoint();
    hasFetched.current = true;
  }, [fetchEndpoint]);

  if (isLoading) {
    return (
      <div className="flex items-center text-gray-600 justify-center w-full h-full">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="text-gray-800">
      <div className="flex justify-between flex-col md:flex-row">
        <HeaderData
          title="View All Endpoints"
          description="View, Verify and manage you API endpoints from here."
          icon={Globe}
          iconColor="text-blue-400"
          bgColor="bg-blue-100"
        />
        <Button className="border-2 border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-500 cursor-pointer">
          <Link to="/create-api" className="flex items-center justify-center">
            <Plus className="w-6 h-6 mr-2" />
            Create Endpoint
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-3 gap-3 min-w-full">
        <div className="flex items-center justify-center relative rounded-md w-full">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-800" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search API endpoints..."
            className="pl-10 "
          />
        </div>

        <div className="flex items-center gap-x-3">
          <Select value={methodFilter} onValueChange={setMethodFilter}>
            <SelectTrigger
              className="w-full md:w-fit cursor-pointer"
              aria-label="Select your method"
              name="Select your method"
            >
              <SelectValue placeholder="Select your method" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem className="cursor-pointer" value="all">
                All
              </SelectItem>
              <SelectItem className="cursor-pointer" value="GET">
                GET
              </SelectItem>
              <SelectItem className="cursor-pointer" value="POST">
                POST
              </SelectItem>
              <SelectItem className="cursor-pointer" value="DELETE">
                DELETE
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={visibleFilter} onValueChange={setVisibleFilter}>
            <SelectTrigger
              className="w-full md:w-fit cursor-pointer"
              aria-label="Select your public or private ?"
              name="Select your public or private ?"
            >
              <SelectValue placeholder="Select your visible endpoint" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem className="cursor-pointer" value="all">
                All
              </SelectItem>
              <SelectItem className="cursor-pointer" value="private">
                Private
              </SelectItem>
              <SelectItem className="cursor-pointer" value="public">
                Public
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="space-y-2 min-w-[200px]">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Rate Limit ({rateLimitRange[0]}-{rateLimitRange[1]} req per min)
            </Label>
            <div className="py-2 rounded-md bg-background border-none">
              <Slider
                value={rateLimitRange}
                onValueChange={setRateLimitRange}
                max={200}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
          </div>
          {(methodFilter !== "all" || visibleFilter !== "all" || rateLimitRange[0] !== 0 ||
                rateLimitRange[1] !== 200) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setMethodFilter("all");
                setVisibleFilter("all");
                                    setRateLimitRange([0, 200])
              }}
              className="bg-red-50 text-red-600 cursor-pointer"
            >
              Reset filters
            </Button>
          )}
        </div>
      </div>
      <div className="gap-4 mt-6">
        <EndpointCards filteredEndpoints={filteredEndpoint} />
      </div>
      {data.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-lg mb-2">
            No endpoints found matching your criteria.
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            Try adjusting your filters or search terms.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer shadow-lg">
            <Link to="/create-api" type="button" className="flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Endpoint
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Endpoint;
