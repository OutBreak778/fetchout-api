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
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EndpointCards from "./EndpointCards";

const Endpoint = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [methodFilter, setMethodFilter] = useState<string>("all");

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
      return matchSearch && matchMethod;
    });

    return filtered;
  }, [data, searchQuery, methodFilter]);

  useEffect(() => {
    fetchEndpoint();
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

        <Select value={methodFilter} onValueChange={setMethodFilter}>
          <SelectTrigger className="w-full md:w-fit">
            <SelectValue placeholder="Select your method" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="PUT">POST</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectContent>
        </Select>
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
