import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ClipboardCheck, Calendar, CreditCard, Users, Bell, ChartBar, Settings } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      title: "Student Management",
      description: "Efficiently manage student records, academic progress, and personal information all in one place",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Attendance Tracking",
      description: "Automated attendance system with real-time tracking and detailed reporting capabilities",
      icon: ClipboardCheck,
      color: "text-green-500",
    },
    {
      title: "Academic Planning",
      description: "Create and manage comprehensive academic plans, schedules, and curriculum mapping",
      icon: Calendar,
      color: "text-purple-500",
    },
    {
      title: "Fee Management",
      description: "Streamline fee collection with automated billing and payment tracking systems",
      icon: CreditCard,
      color: "text-orange-500",
    },
    {
      title: "Resource Library",
      description: "Centralized digital library for educational resources and learning materials",
      icon: BookOpen,
      color: "text-pink-500",
    },
    {
      title: "Notifications",
      description: "Instant alerts for important updates, events, and academic announcements",
      icon: Bell,
      color: "text-yellow-500",
    },
    {
      title: "Performance Analytics",
      description: "Comprehensive analytics and reporting tools for tracking student progress",
      icon: ChartBar,
      color: "text-indigo-500",
    },
    {
      title: "Custom Settings",
      description: "Flexible configuration options to adapt the system to your institution's needs",
      icon: Settings,
      color: "text-teal-500",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1F2C]">
            Powerful Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your educational institution effectively
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};