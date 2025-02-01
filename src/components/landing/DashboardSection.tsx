import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export const DashboardSection = () => {
  const dashboardViews = [
    {
      id: "overview",
      title: "Overview",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      description: "Get a bird's eye view of your institution's performance",
      testimonial: {
        text: "The overview dashboard has transformed how we track our institution's performance. It's intuitive and powerful.",
        author: "Sarah Johnson",
        role: "School Principal",
      },
    },
    {
      id: "students",
      title: "Students",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      description: "Manage student records and track academic progress",
      testimonial: {
        text: "Managing student records has never been easier. The dashboard provides everything we need at a glance.",
        author: "Michael Chen",
        role: "Academic Coordinator",
      },
    },
    {
      id: "analytics",
      title: "Analytics",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      description: "Analyze performance metrics and generate insights",
      testimonial: {
        text: "The analytics dashboard helps us make data-driven decisions quickly and effectively.",
        author: "Emily Rodriguez",
        role: "Department Head",
      },
    },
  ];

  return (
    <section id="dashboard" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1F2C]">
            Intuitive Dashboard
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience a powerful yet user-friendly interface designed for educational management
          </p>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-[400px] grid-cols-3 mx-auto mb-8">
            {dashboardViews.map((view) => (
              <TabsTrigger 
                key={view.id} 
                value={view.id}
                className="transition-all duration-300 hover:bg-primary/90 data-[state=active]:scale-105"
              >
                {view.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {dashboardViews.map((view) => (
            <TabsContent 
              key={view.id} 
              value={view.id}
              className="transition-all duration-300 animate-fade-in"
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1">
                      <h3 className="text-2xl font-bold mb-4">{view.title}</h3>
                      <p className="text-gray-600 mb-6">{view.description}</p>
                      <ul className="space-y-3">
                        <li className="flex items-center text-gray-600 transition-transform duration-200 hover:translate-x-1">
                          <span className="w-2 h-2 bg-[#9b87f5] rounded-full mr-3"></span>
                          Real-time updates and notifications
                        </li>
                        <li className="flex items-center text-gray-600 transition-transform duration-200 hover:translate-x-1">
                          <span className="w-2 h-2 bg-[#9b87f5] rounded-full mr-3"></span>
                          Customizable widgets and layouts
                        </li>
                        <li className="flex items-center text-gray-600 transition-transform duration-200 hover:translate-x-1">
                          <span className="w-2 h-2 bg-[#9b87f5] rounded-full mr-3"></span>
                          Advanced filtering and search
                        </li>
                      </ul>
                      
                      {/* Integrated Social Proof */}
                      <div className="mt-8 p-4 bg-gray-50 rounded-lg transition-transform duration-300 hover:-translate-y-1">
                        <Quote className="w-8 h-8 text-[#9b87f5] mb-2" />
                        <p className="text-gray-600 italic mb-2">{view.testimonial.text}</p>
                        <div className="flex items-center">
                          <div>
                            <p className="font-semibold text-gray-800">{view.testimonial.author}</p>
                            <p className="text-sm text-gray-500">{view.testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="order-1 md:order-2">
                      <img
                        src={view.image}
                        alt={`${view.title} Dashboard View`}
                        className="rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] animate-fade-in"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};