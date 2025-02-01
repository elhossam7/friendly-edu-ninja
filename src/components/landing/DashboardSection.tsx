import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export const DashboardSection = () => {
  const dashboardViews = [
    {
      id: "overview",
      title: "Overview",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      description: "Get a bird's eye view of your institution's performance",
    },
    {
      id: "students",
      title: "Students",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      description: "Manage student records and track academic progress",
    },
    {
      id: "analytics",
      title: "Analytics",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      description: "Analyze performance metrics and generate insights",
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
              <TabsTrigger key={view.id} value={view.id}>
                {view.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {dashboardViews.map((view) => (
            <TabsContent key={view.id} value={view.id}>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1">
                      <h3 className="text-2xl font-bold mb-4">{view.title}</h3>
                      <p className="text-gray-600 mb-6">{view.description}</p>
                      <ul className="space-y-3">
                        <li className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-[#9b87f5] rounded-full mr-3"></span>
                          Real-time updates and notifications
                        </li>
                        <li className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-[#9b87f5] rounded-full mr-3"></span>
                          Customizable widgets and layouts
                        </li>
                        <li className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-[#9b87f5] rounded-full mr-3"></span>
                          Advanced filtering and search
                        </li>
                      </ul>
                    </div>
                    <div className="order-1 md:order-2">
                      <img
                        src={view.image}
                        alt={`${view.title} Dashboard View`}
                        className="rounded-lg shadow-xl animate-fade-in"
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