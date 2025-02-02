import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Users, 
  GraduationCap, 
  BookOpen,
  Plus,
  Bell,
  Settings,
  ChevronRight
} from "lucide-react";

const Dashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleQuickAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} action will be implemented soon.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search..."
              className="w-[200px] lg:w-[300px]"
              prefix={<Search className="h-4 w-4 text-muted-foreground" />}
            />
            <button title="Notifications" className="relative p-2 hover:bg-accent rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            </button>
            <button title="Settings" className="p-2 hover:bg-accent rounded-full">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-8 animate-fade-in">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            title="Students"
            value={1234}
            icon={Users}
            progress={75}
            isLoading={isLoading}
          />
          <StatsCard
            title="Classes"
            value={24}
            icon={GraduationCap}
            progress={60}
            isLoading={isLoading}
          />
          <StatsCard
            title="Teachers"
            value={48}
            icon={BookOpen}
            progress={90}
            isLoading={isLoading}
          />
        </div>

        {/* Quick Actions */}
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => (
              <button
                key={action.title}
                onClick={() => handleQuickAction(action.title)}
                className="group p-4 text-left rounded-lg border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{action.title}</h3>
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Activity Tabs */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="recent" className="space-y-4">
              <TabsList>
                <TabsTrigger value="recent">Recent Activity</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="tasks">Pending Tasks</TabsTrigger>
              </TabsList>
              <TabsContent value="recent" className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))}
              </TabsContent>
              {/* Add other tab contents */}
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

// Helper Components
const StatsCard = ({ title, value, icon: Icon, progress, isLoading }) => (
  <Card className="transition-all duration-300 hover:shadow-md">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <div className="h-9 w-24 animate-pulse bg-muted rounded" />
      ) : (
        <>
          <div className="text-2xl font-bold">{value.toLocaleString()}</div>
          <Progress value={progress} className="mt-3" />
        </>
      )}
    </CardContent>
  </Card>
);

const ActivityItem = ({ title, time, description }) => (
  <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-muted/50 transition-colors">
    <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
    <div>
      <div className="font-medium">{title}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
      <div className="text-xs text-muted-foreground mt-1">{time}</div>
    </div>
  </div>
);

// Data
const quickActions = [
  {
    title: "Add Student",
    description: "Register a new student in the system"
  },
  {
    title: "Create Class",
    description: "Set up a new class or section"
  },
  {
    title: "Add Teacher",
    description: "Register a new teacher profile"
  }
];

const recentActivities = [
  {
    title: "New Student Registration",
    description: "John Doe was added to Grade 10-A",
    time: "2 hours ago"
  },
  // Add more activities
];

export default Dashboard;
