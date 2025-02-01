import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ClipboardCheck, Calendar, CreditCard } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      title: "Student Management",
      description: "Efficiently manage student records and academic progress",
      icon: BookOpen,
    },
    {
      title: "Attendance Tracking",
      description: "Monitor attendance with automated tracking systems",
      icon: ClipboardCheck,
    },
    {
      title: "Exam Scheduling",
      description: "Organize and manage examination schedules effortlessly",
      icon: Calendar,
    },
    {
      title: "Fee Collection",
      description: "Streamline fee collection and financial management",
      icon: CreditCard,
    },
  ];

  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1F2C]">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <feature.icon className="w-12 h-12 text-[#9b87f5] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};