import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  MessageCircle,
  Search,
  Code,
  Shield,
  Zap,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Download,
  Play,
} from "lucide-react"

export function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("all")

  const documentationSections = [
    {
      title: "Getting Started",
      description: "Learn the basics of our API platform",
      icon: Play,
      articles: 12,
      category: "basics",
    },
    {
      title: "Authentication",
      description: "Secure your API requests with proper auth",
      icon: Shield,
      articles: 8,
      category: "security",
    },
    {
      title: "API Reference",
      description: "Complete documentation of all endpoints",
      icon: Code,
      articles: 45,
      category: "reference",
    },
    {
      title: "Rate Limiting",
      description: "Understanding usage limits and quotas",
      icon: Zap,
      articles: 6,
      category: "limits",
    },
    {
      title: "SDKs & Libraries",
      description: "Official client libraries and tools",
      icon: Download,
      articles: 15,
      category: "tools",
    },
    {
      title: "Best Practices",
      description: "Optimize your API integration",
      icon: CheckCircle,
      articles: 18,
      category: "optimization",
    },
  ]

  const troubleshootingItems = [
    {
      issue: "401 Unauthorized Error",
      solution: "Check your API key and ensure it's included in the Authorization header",
      severity: "high",
    },
    {
      issue: "Rate Limit Exceeded",
      solution: "Implement exponential backoff and respect rate limit headers",
      severity: "medium",
    },
    {
      issue: "Timeout Errors",
      solution: "Increase timeout values and implement retry logic",
      severity: "medium",
    },
    {
      issue: "Invalid Response Format",
      solution: "Verify your request headers include 'Accept: application/json'",
      severity: "low",
    },
  ]

  const faqItems = [
    {
      question: "How do I get started with the API?",
      answer:
        "Sign up for an account, generate your API key, and follow our Quick Start guide. You'll be making your first API call within minutes.",
    },
    {
      question: "What are the rate limits?",
      answer:
        "Free tier: 1,000 requests/month. Pro tier: 100,000 requests/month. Enterprise: Custom limits. All plans include burst allowances.",
    },
    {
      question: "How do I upgrade my plan?",
      answer:
        "Visit your dashboard settings and select 'Billing'. You can upgrade instantly and changes take effect immediately.",
    },
    {
      question: "Is there a sandbox environment?",
      answer:
        "Yes! Use our sandbox endpoints for testing. All sandbox requests are free and don't count toward your quota.",
    },
    {
      question: "How do I report API issues?",
      answer:
        "Use the contact form below or email support@apiplatform.com. Include your API key and request details for faster resolution.",
    },
  ]
 

  return (
    <div className="min-h-screen bg-background text-black">
      {/* Hero Section */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Help & Support Center</h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Everything you need to integrate and succeed with our API platform
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search documentation, guides, and FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Documentation Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-bold text-foreground">Documentation</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {documentationSections.map((section, index) => {
                  const Icon = section.icon
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                              <Icon className="h-5 w-5 text-accent" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{section.title}</CardTitle>
                              <Badge variant="secondary" className="mt-1">
                                {section.articles} articles
                              </Badge>
                            </div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">{section.description}</CardDescription>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>

            {/* Troubleshooting Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <AlertCircle className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-bold text-foreground">Common Issues</h2>
              </div>

              <div className="space-y-4">
                {troubleshootingItems.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-2 rounded-full ${
                            item.severity === "high"
                              ? "bg-destructive/10"
                              : item.severity === "medium"
                                ? "bg-yellow-100 dark:bg-yellow-900/20"
                                : "bg-green-100 dark:bg-green-900/20"
                          }`}
                        >
                          <AlertCircle
                            className={`h-4 w-4 ${
                              item.severity === "high"
                                ? "text-destructive"
                                : item.severity === "medium"
                                  ? "text-yellow-600 dark:text-yellow-400"
                                  : "text-green-600 dark:text-green-400"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2">{item.issue}</h3>
                          <p className="text-muted-foreground">{item.solution}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <HelpCircle className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:no-underline py-6">
                      <span className="font-medium text-foreground">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-muted-foreground">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Support */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-accent" />
                  <CardTitle>Contact Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Input placeholder="Your email" type="email" />
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Describe your issue..." rows={4} />
                  <Button className="w-full">Send Message</Button>
                </div>

                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">support@apiplatform.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">24/7 Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Code className="h-4 w-4 mr-2" />
                  API Status
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download SDKs
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Community Forum
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Changelog
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">API Gateway</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Database</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">CDN</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Degraded</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}