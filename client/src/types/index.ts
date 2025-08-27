export type RegisterType = {
  userName: string;
  email: string;
  password: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type User = {
  userName: string;
  email: string;
  avatar?: string;
  isVerified?: string;
  isCreatedAt?: string;
};

export type AuthStore = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
};

export type userButtonProps = {
  user: {
    avatar?: string | "";
    createdAt?: string | Date;
    userName?: string;
    email: string;
    isVerified?: boolean | string;
  };
};

export interface ResponseField {
  id: string;
  key: string;
  value: string;
  type: "string" | "number" | "boolean" | "array" | "object";
}

export type responseStructure = {
  id: string;
  type: "object" | "array";
  fields: ResponseField[];
};

type ParmasData = {
  name: string;
};

export type ResponseData = Record<string, string | number | string[]>;

export type CreateEndpointData = {
  name: string;
  description: string;
  methods: "GET" | "POST" | "PUT" | "DELETE";
  params: ParmasData[];
  response: responseStructure[];
  hits?: number;
  rateLimit: {
    limit: number;
    period: number;
  };
  isPublic: boolean;
};

type methodType = "GET" | "POST" | "PUT" | "DELETE";

export type EndpointData = {
  _id: string;
  name: string;
  description: string;
  methods: methodType;
  slug: string;
  params: { name: string; _id: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: Record<string, any> | Record<string, any>[];
  urlPath: string;
  apiKey: string;
  rateLimit: {
    limit: number;
    period: number;
  };
  hits: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
};

export type EndpointStore = {
  data: EndpointData[];
  isLoading: boolean;
  error: string | null;
  createEndpoint: (item: CreateEndpointData) => Promise<void>;
  fetchEndpoint: () => Promise<void>;
  deleteEndpoint: (slug: string) => Promise<void>
};

type usagelogData = {
  _id: string;
  userId: User;
  endpointId: EndpointData;
  ipAddress: string;
  statusCode: number;
  responseTime: number;
  urlPath?: string;
  createdAt: string;
  updatedAt: string;
};

export type UsagelogStore = {
  usage: usagelogData[]
  isLoading: boolean;
  error: string | null

  fetchLogs: () => Promise<void>
};

export type DashboardStoreData = {
  TotalRequest: number
  AvgResponseTime: {_id: string | null, responseTime: number}[]
  requestPerEndpoint: {
    _id: string
    count: number
  }[]
  requestTrends: {
    _id: string
    countEndpoint: number
  }[]
  successErrorRatio: {
    _id: string 
    count: number
  }[]
  top5Trends: {
    _id: string 
    count: number
  }[]
  recentUsageLogs: {
    _id: string,
    urlPath: string
    statusCode: number
    responseTime: number
    createdAt: string
  }[]
  allStatusCode: {
    _id: number
    count: number
  }[],
  trends: {
    totalRequest: {
      percent: number 
      up: boolean | number
    },
    avgResponseTime: {
      percent: number
      up: boolean | number
    },
    successRate: {
      percent: number
      up: boolean | number
    },
    totalEndpoint: {
      percent: number
      up: boolean | number
    },
  }
}

export type DashboardStore = {
  data: DashboardStoreData | null
  isLoading: boolean
  error: string | null
  fetchDashboard: () => Promise<void>
} 