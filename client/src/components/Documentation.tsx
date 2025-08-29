import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Cookie, Copy, Key } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Link } from "react-router-dom";
import { copyToClipboard } from "@/lib/utils";
import logo from "../assets/logo.svg";

const endpoints = [
  {
    id: "auth-login",
    method: "POST",
    path: "/auth/login",
    description: "Authenticate and get token",
    params: [
      {
        name: "email",
        type: "string",
        required: true,
        description: "User email address",
      },
      {
        name: "password",
        type: "string",
        required: true,
        description: "User password",
      },
    ],
    response: {
      success: true,
      user: {
        id: "eyJhbGciOiJIUzI1NiIsInR5JD7kpXVCJ9",
        userName: "Jhon Doe",
        email: "user@example.com",
      },
    },
  },
  {
    id: "get-logs",
    method: "POST",
    path: "/sample-api",
    description: "Fetch recent usage logs",
    params: [
      {
        name: "limit",
        type: "number",
        required: false,
        description: "Number of logs to return (default: 50)",
      },
      {
        name: "offset",
        type: "number",
        required: false,
        description: "Number of logs to skip",
      },
    ],
    response: {
      success: true,
      logs: [
        {
          id: 1,
          endpoint: "/api/<usage-log>",
          method: "GET",
          status: 200,
          timestamp: "Aug 25, 2025, 08:47:51 PM",
          ipAddress: "213.83.3, 172.71.198.18, 10.204.159",
          response: `210 ms`,
        },
      ],
    },
  },
];

const sampleCode = [
  {
    code: 200,
    title: "Data fetched successfully",
    description: "View the Sample code of data",
  },
  {
    code: 405,
    title: "Method Not Allowed",
    description: "HTTP method not supported for this endpoint",
  },
];

const Documentation = () => {
  const CodeBlock = ({ children }: { children: string; language?: string }) => (
    <div className="relative bg-black text-white p-4 w-full rounded-lg font-mono text-[11px] overflow-x-auto">
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 text-white"
        onClick={() => copyToClipboard(children)}
      >
        <Copy className="h-4 w-4" />
      </Button>
      <pre className="text-pretty">{children}</pre>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="">
          {/* Main Content */}
          <main className="flex-1 py-8">
            {/* Overview Section */}
            <section id="overview" className="mb-8 px-4">
              <h2 className="text-3xl font-bold text-black mb-6">
                API Documentation
              </h2>
              <div className="">
                <p className="text-gray-600 text-md leading-relaxed mb-6">
                  Fetchout is an API monitoring and analytics platform that
                  helps developers track API performance, usage, errors, and
                  trends in real-time. Built for developers, startups, SaaS
                  builders, and teams who rely on APIs to power their
                  applications.
                </p>
                <div className="bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-black mb-3">
                    Base URL
                  </h3>
                  <CodeBlock>{`https://fetchout-api.onrender.com/api`}</CodeBlock>
                </div>
              </div>
            </section>

            <Separator className="my-8" />

            {/* Authentication Section */}
            <section id="authentication" className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                Authentication
              </h2>
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Cookie className="h-5 w-5 text-yellow-600" />
                    <h3 className="font-semibold text-yellow-800">
                      Important: Cookie-Based Authentication
                    </h3>
                  </div>
                  <p className="text-yellow-700 text-sm">
                    This API uses cookie-based authentication. You must first
                    login through the postman which was used to login in web
                    interface to establish a session in postman before making
                    API calls. The login cookies will be automatically included
                    in subsequent requests.
                  </p>
                </div>

                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Key className="h-5 w-5" />
                      <span>API Key Configuration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      After logging in, you can create and manage your API keys
                      from the dashboard. Include your API key in the
                      Authorization header:
                    </p>
                    <CodeBlock>Authorization: Bearer YOUR_API_KEY</CodeBlock>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        Creating Your Own API
                      </h4>
                      <div className="text-blue-700 text-sm">
                        To create your own monitored API endpoint, navigate to
                        the dashboard after login, click{" "}
                        <Link
                          className="underline underline-offset-2 font-semibold"
                          to="/create-endpoint"
                        >
                          Create Endpoint
                        </Link>
                        , configure your endpoint URL, method, and monitoring
                        preferences. You'll receive a unique endpoint ID and
                        monitoring webhook that tracks all requests, responses,
                        and performance metrics automatically. Visit{" "}
                        <Link
                          className="underline underline-offset-2 font-semibold"
                          to="/profile"
                        >
                          Profile
                        </Link>{" "}
                        or{" "}
                        <Link
                          className="underline underline-offset-2 font-semibold"
                          to="/endpoint"
                        >
                          Endpoint
                        </Link>{" "}
                        route to use API and Key
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle>Python (requests)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CodeBlock language="python">{`import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY'
}

response = requests.get(
    'https://fetchout-api.onrender.com/api/ENDPOINT/API_KEY',
    headers=headers
)`}</CodeBlock>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle>Node.js (Axios)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CodeBlock language="javascript">{`const axios = require('axios');

const response = await axios.get(
  'https://fetchout-api.onrender.com/api/ENDPOINT/API_KEY',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);`}</CodeBlock>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <Separator className="my-8" />

            {/* Postman Setup Section */}
            <section id="postman-setup" className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                Postman Setup
              </h2>
              <div className="space-y-6">
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>Quick Setup Guide</CardTitle>
                    <CardDescription>
                      Follow these steps to test the Fetchout API in Postman
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                            1
                          </div>
                          <h4 className="font-semibold">Login First</h4>
                        </div>
                        <p className="text-gray-600 text-sm ml-9">
                          Visit the Fetchout web and login to web app. This is required to have an account on fetchout website before making any API calls.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                            2
                          </div>
                          <h4 className="font-semibold">Postman API login</h4>
                        </div>
                        <p className="text-gray-600 text-sm ml-9">
                          Login in postman as API with your detail which was
                          used to login in Fetchout web app
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                            3
                          </div>
                          <h4 className="font-semibold">Set Variables</h4>
                        </div>
                        <p className="text-gray-600 text-sm ml-9">
                          Update the API_KEY variable or add the URL of fetchout
                          with API_KEY in your Postman environment or in Input
                          box with your actual API key from the Endpoint or
                          Profile.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                            4
                          </div>
                          <h4 className="font-semibold">Test Endpoints</h4>
                        </div>
                        <p className="text-gray-600 text-sm ml-9">
                          Start with the /dashboard endpoint to verify your
                          setup, then explore other endpoints.
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        variant="outline"
                        onClick={() =>
                          copyToClipboard(
                            "https://fetchout-api.onrender.com/api/SLUG_ENDPOINT_HERE/API_KEY_HERE"
                          )
                        }
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Base URL
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>Environment Variables</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Set these variables in your Postman environment:
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                          <div>
                            <span className="text-gray-500">BASE_URL:</span>
                            <br />
                            <span>https://fetchout-api.onrender.com/api</span>
                          </div>
                          <div>
                            <span className="text-gray-500">API_KEY:</span>
                            <br />
                            <span>YOUR_API_KEY_HERE</span>
                          </div>
                          <div>
                            <span className="text-gray-800">Sample</span>
                            <br />
                            <span>BASE_URL/API_KEY_HERE</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-8" />

            {/* Endpoints Section */}
            <section id="endpoints" className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                API Endpoints
              </h2>
              <div className="space-y-8">
                {endpoints.map((endpoint, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant={
                              endpoint.method === "GET"
                                ? "secondary"
                                : "default"
                            }
                          >
                            {endpoint.method}
                          </Badge>
                          <code className="text-lg font-mono">
                            {endpoint.path}
                          </code>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(
                              `https://fetchout-api.onrender.com/api${endpoint.path}`
                            )
                          }
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy URL
                        </Button>
                      </div>
                      <CardDescription>{endpoint.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Tabs defaultValue="curl" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="curl">cURL</TabsTrigger>
                          <TabsTrigger value="javascript">
                            JavaScript
                          </TabsTrigger>
                          <TabsTrigger value="python">Python</TabsTrigger>
                          <TabsTrigger value="postman">Postman</TabsTrigger>
                        </TabsList>

                        <TabsContent value="curl" className="space-y-4">
                          <CodeBlock>{`curl -X ${endpoint.method} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  https://fetchout-api.onrender.com/api${endpoint.path}`}</CodeBlock>
                        </TabsContent>

                        <TabsContent value="javascript" className="space-y-4">
                          <CodeBlock language="javascript">{`const response = await fetch('https://fetchout-api.onrender.com/api${endpoint.path}', {
  method: '${endpoint.method}',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`}</CodeBlock>
                        </TabsContent>

                        <TabsContent value="python" className="space-y-4">
                          <CodeBlock language="python">{`import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.${endpoint.method.toLowerCase()}(
    'https://fetchout-api.onrender.com/api${endpoint.path}',
    headers=headers
)

data = response.json()
print(data)`}</CodeBlock>
                        </TabsContent>

                        <TabsContent value="postman" className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-3">
                              Postman Configuration:
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <strong>Method:</strong> {endpoint.method}
                              </div>
                              <div>
                                <strong>URL:</strong>{" "}
                                <code>
                                  {"{{BASE_URL}}"}
                                  {endpoint.path}
                                </code>
                              </div>
                              <div>
                                <strong>Headers:</strong>
                              </div>
                              <ul className="ml-4 space-y-1">
                                <li>
                                  Authorization:{" "}
                                  <code>Bearer {"{{API_KEY}}"}</code>
                                </li>
                                <li>
                                  Content-Type: <code>application/json</code>
                                </li>
                              </ul>
                              {endpoint.params.length > 0 && (
                                <>
                                  <div>
                                    <strong>Body JSON:</strong>
                                  </div>
                                  <ul className="ml-4 space-y-1">
                                    {endpoint.params.map((param, i) => (
                                      <li key={i}>
                                        {param.name}: <code>{param.type}</code>{" "}
                                        (
                                        {param.required
                                          ? "required"
                                          : "optional"}
                                        )
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>

                      {endpoint.params.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-black mb-3">
                            Parameters
                          </h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-2 font-medium">
                                    Name
                                  </th>
                                  <th className="text-left py-2 font-medium">
                                    Type
                                  </th>
                                  <th className="text-left py-2 font-medium">
                                    Required
                                  </th>
                                  <th className="text-left py-2 font-medium hidden md:block">
                                    Description
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {endpoint.params.map((param, paramIndex) => (
                                  <tr key={paramIndex} className="border-b">
                                    <td className="py-2 font-mono text-sm">
                                      {param.name}
                                    </td>
                                    <td className="py-2 text-gray-600">
                                      {param.type}
                                    </td>
                                    <td className="py-2">
                                      <Badge
                                        variant={
                                          param.required
                                            ? "destructive"
                                            : "secondary"
                                        }
                                      >
                                        {param.required
                                          ? "Required"
                                          : "Optional"}
                                      </Badge>
                                    </td>
                                    <td className="py-2 text-gray-600 hidden md:block">
                                      {param.description}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold text-black mb-3">
                          Example Response
                        </h4>
                        <CodeBlock language="json">
                          {JSON.stringify(endpoint.response, null, 2)}
                        </CodeBlock>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator className="my-8" />

            {/* Error Handling Section */}
            <section id="errors" className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                Error Handling
              </h2>
              <div className="space-y-6">
                <p className="text-gray-600">
                  The API uses conventional HTTP response codes to indicate the
                  success or failure of requests.
                </p>

                <div className="grid gap-4">
                  {sampleCode.map((error, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-4">
                          <Badge variant="outline" className="font-mono">
                            {error.code}
                          </Badge>
                          <div>
                            <h3 className="font-semibold text-black">
                              {error.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {error.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>Error Response Format</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock language="json">{`{
  "success": false,
  "message": "Invalid API key provided or Method not allowed.",
}`}</CodeBlock>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-12" />

            {/* Quickstart Section */}
            <section id="quickstart" className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                Quickstart Guide
              </h2>
              <div className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <CardTitle>Get Your API Key</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Sign up for a Fetchout account and get your API key
                        from the Profile or Endpoint.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200">
                    <CardHeader>
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <CardTitle>Make Your First Call</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Test the API by fetching your dashboard analytics with a
                        simple GET request.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200">
                    <CardHeader>
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <CardTitle>View Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Monitor your API usage and performance metrics in
                        real-time through the dashboard.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>Complete Example</CardTitle>
                    <CardDescription>
                      Follow these steps to authenticate and fetch data using
                      the Fetchout API.
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <Tabs defaultValue="step1">
        <TabsList className="flex items-center gap-1 px-0">
          <TabsTrigger
            value="step1"
            aria-label="1. Login"
            className="rounded-none px-2 py-1 text-xs font-medium text-muted-foreground md:text-sm border-b-2 border-transparent data-[state=active]:text-foreground data-[state=active]:border-foreground"
          >
            {"1. Login"}
          </TabsTrigger>
          <span aria-hidden="true" className="px-1 text-muted-foreground">
            {"→"}
          </span>
          <TabsTrigger
            value="step2"
            aria-label="2. Fetch"
            className="rounded-none px-2 py-1 text-xs font-medium text-muted-foreground md:text-sm border-b-2 border-transparent data-[state=active]:text-foreground data-[state=active]:border-foreground"
          >
            {"2. Fetch"}
          </TabsTrigger>
          <span aria-hidden="true" className="px-1 text-muted-foreground">
            {"→"}
          </span>
          <TabsTrigger
            value="step3"
            aria-label="3. Response"
            className="rounded-none px-2 py-1 text-xs font-medium text-muted-foreground md:text-sm border-b-2 border-transparent data-[state=active]:text-foreground data-[state=active]:border-foreground"
          >
            {"3. Response"}
          </TabsTrigger>
        </TabsList>

                      {/* Step 1 - Login */}
                      <TabsContent value="step1">
                        <CodeBlock language="javascript">{`// Install axios: npm install axios
const axios = require('axios');
const BASE_URL = 'https://fetchout-api.onrender.com/api';

async function login() {
  try {
    const response = await axios.post(\`\${BASE_URL}/auth/login\`, {
      email: 'your_email',
      password: 'your_password'
    }, {
      withCredentials: true // cookie will be stored
    });

    console.log('Login successful, cookie saved locally.');
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
  }
}

login();`}</CodeBlock>
                      </TabsContent>

                      {/* Step 2 - Fetch */}
                      <TabsContent value="step2">
                        <CodeBlock language="javascript">{`const axios = require('axios');
const BASE_URL = 'https://fetchout-api.onrender.com/api';
const API_KEY = 'YOUR_API_KEY_HERE'
const SLUG_ENDPOINT_NAME = 'ENDPOINT_URL_HERE'

async function fetchDashboard() {
  try {
    // Cookie is automatically sent because of withCredentials
    const response = await axios.get(\`\${BASE_URL}/\${SLUG_ENDPOINT_NAME}/\${API_KEY}\`, { withCredentials: true });
    console.log('Dashboard Data:', response.data);
  } catch (error) {
    console.error('Error fetching dashboard:', error.response?.data || error.message);
  }
}

fetchDashboard();`}</CodeBlock>
                      </TabsContent>
                      <TabsContent value="step3">
                        <CodeBlock language="javascript">{`{
  "success": true,
  "message": "Data fetched successfully",
  "data": [
    {
      "response..."
    }
  ]
}`}</CodeBlock>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t pt-8 mt-16">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="flex items-center justify-center">
                    <span className="text-white font-bold text-xs bg-white">
                      <img
                        src={logo}
                        alt="logo image"
                        className="invert w-8 h-8"
                      />
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-black">
                    Fetchout API
                  </span>
                </div>
                <div className="text-gray-600 text-sm">
                  <p>
                    Developed by{" "}
                    <strong className="underline underline-offset-2">
                      Nikhil Mishra
                    </strong>
                  </p>
                  <p>
                    Contact:{" "}
                    <a
                      href="mailto:outbreak@gmail.com"
                      className="text-black hover:underline"
                    >
                      outbreak@gmail.com
                    </a>
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  © 2024 Fetchout. All rights reserved.
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
