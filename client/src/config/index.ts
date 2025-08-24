import {
  AlertCircle,
  BarChart3,
  BookA,
  Clock,
  Code,
  Database,
  Globe,
  Home,
  Plus,
  RefreshCw,
  Settings,
  Shield,
  User,
  Zap,
} from "lucide-react";

export const routes = [
  {
    id: 1,
    title: "Dashboard",
    route: "/dashboard",
    icon: Home,
  },
  {
    id: 2,
    title: "Endpoints",
    route: "/endpoints",
    icon: Globe,
  },
  {
    id: 3,
    title: "Usage Log",
    route: "/usage-log",
    icon: BarChart3,
  },
];

export const userButtonRoutes = [
  {
    id: 1,
    title: "Profile",
    route: "/profile",
    icon: User,
  },
  {
    id: 2,
    title: "Documentation",
    route: "/documentation",
    icon: BookA,
  },
  {
    id: 3,
    title: "Settings",
    route: "/settings",
    icon: Settings,
  },
];

export const apiExample = `curl https://fetchoutapi.com/api/endpoint/city-weather \\
  --cookie "sessionId"=your-session-secret-token
  `;

export const apiResponse = `{
  "city": "San Francisco",
  "temperature": "72°F",
  "condition": "Sunny",
  "humidity": "65%",
  "wind_speed": "8 mph",
  "timestamp": "2024-01-15T14:30:00Z"
}`;

export const features = [
  {
    icon: Zap,
    title: "Create in Minutes",
    description:
      "Zero config. One command. Your API is live globally with auto-scaling.",
    gradient: "from-yellow-400 to-orange-500",
    bgGradient:
      "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
  },
  {
    icon: BarChart3,
    title: "Better Analytics",
    description:
      "Request logs, performance metrics, and error tracking in one dashboard.",
    gradient: "from-blue-400 to-purple-500",
    bgGradient:
      "from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20",
  },
  {
    icon: Shield,
    title: "Built-in Security",
    description:
      "Rate limiting, API keys, CORS, and DDoS protection out of the box.",
    gradient: "from-green-400 to-teal-500",
    bgGradient:
      "from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20",
  },
  {
    icon: Clock,
    title: "Blazing Fast Response",
    description:
      "Sub-100ms latency across all endpoints with real-time performance monitoring.",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient:
      "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
  },
];

export const methods = [
  {
    value: "GET",
    color: "bg-green-100 text-green-800",
    description: "Retrieve data",
  },
  {
    value: "POST",
    color: "bg-blue-100 text-blue-800",
    description: "Create new data",
  },
  {
    value: "PUT",
    color: "bg-yellow-100 text-yellow-800",
    description: "Update existing data",
  },
  {
    value: "DELETE",
    color: "bg-red-100 text-red-800",
    description: "Remove data",
  },
];

export const methodColors = {
  GET: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700",
  POST: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
  PUT: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700",
  DELETE:
    "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700",
  PATCH:
    "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
};

export const methodIcons = {
  GET: Database,
  POST: Plus,
  PUT: RefreshCw,
  DELETE: AlertCircle,
  PATCH: Code,
};

export const steps = [
  {
    type: "command",
    content: "curl -X POST https://fetchout-api.vercel.app/users",
    delay: 50,
  },
  {
    type: "command",
    content: '-H "Content-Type: application/json"',
    delay: 40,
  },
  {
    type: "command",
    content: '-d \'{"name": "John Doe", "email": "john@example.com"}\'',
    delay: 30,
  },
  {
    type: "response",
    content:
      '{\n  "id": "usr_1234567890",\n  "name": "John Doe",\n  "email": "john@example.com",\n  "created_at": "2024-01-15T10:30:00Z",\n  "status": "active"\n}',
    delay: 20,
  },
];
