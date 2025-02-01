import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check } from "lucide-react";

export const IntegrationsSection = () => {
  const integrations = [
    {
      name: "Google Classroom",
      logo: "/integrations/google-classroom.svg",
      description: "Seamlessly sync with Google Classroom for assignments and grades",
      features: ["Auto-sync assignments", "Grade import/export", "Calendar integration"],
      category: "LMS",
      status: "coming-soon",
    },
    {
      name: "Microsoft Teams",
      logo: "/integrations/ms-teams.svg",
      description: "Connect your virtual classrooms with Microsoft Teams",
      features: ["Video conferencing", "Chat integration", "File sharing"],
      category: "Communication",
      status: "coming-soon",
    },
    {
      name: "Canvas",
      logo: "/integrations/canvas.svg",
      description: "Integrate with Canvas LMS for comprehensive course management",
      features: ["Course sync", "Grade passback", "Content import"],
      category: "LMS",
      status: "coming-soon",
    },
    {
      name: "Zoom",
      logo: "/integrations/zoom.svg",
      description: "Schedule and manage virtual classes through Zoom",
      features: ["Class scheduling", "Recording management", "Attendance tracking"],
      category: "Communication",
      status: "coming-soon",
    },
    {
      name: "Moodle",
      logo: "/integrations/moodle.svg",
      description: "Connect with Moodle for enhanced learning management",
      features: ["Course migration", "Grade sync", "Resource sharing"],
      category: "LMS",
      status: "coming-soon",
    },
    {
      name: "Slack",
      logo: "/integrations/slack.svg",
      description: "Enable team collaboration through Slack integration",
      features: ["Notifications", "Channel management", "File sharing"],
      category: "Communication",
      status: "coming-soon",
    },
  ];

  const categories = Array.from(new Set(integrations.map(i => i.category)));

  return (
    <section id="integrations" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1F2C]">
            Powerful Integrations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect your favorite educational tools and platforms to create a seamless learning experience
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="px-4 py-2 text-sm font-medium cursor-pointer hover:bg-primary hover:text-white transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {integrations.map((integration, index) => (
            <Card
              key={integration.name}
              className="p-6 hover:shadow-lg transition-shadow group relative overflow-hidden"
            >
              {/* Status Badge */}
              {integration.status !== "live" && (
                <Badge
                  variant={integration.status === "beta" ? "secondary" : "outline"}
                  className="absolute top-4 right-4"
                >
                  {integration.status === "beta" ? "Beta" : "Coming Soon"}
                </Badge>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gray-100 p-2 flex items-center justify-center">
                  <img
                    src={integration.logo}
                    alt={integration.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#1A1F2C]">{integration.name}</h3>
                  <p className="text-sm text-gray-600">{integration.description}</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {integration.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full group-hover:translate-y-0 translate-y-1 transition-transform"
                disabled={true}
              >
                <span className="mr-2">Coming Soon</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Don't see the integration you need?</p>
          <Button variant="outline" size="lg">
            Request Integration
          </Button>
        </div>
      </div>
    </section>
  );
};