import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SolutionSection = () => {
  return (
    <section id="solution" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1F2C]">
          Our Solution
        </h2>
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2 mx-auto mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <Card>
              <CardContent className="p-6">
                <img
                  src="/placeholder.svg"
                  alt="Dashboard Preview"
                  className="w-full rounded-lg shadow-lg animate-fade-in"
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="features">
            <Card>
              <CardContent className="p-6">
                <img
                  src="/placeholder.svg"
                  alt="Features Preview"
                  className="w-full rounded-lg shadow-lg animate-fade-in"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};