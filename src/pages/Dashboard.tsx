import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bell,
  BookOpen,
  GraduationCap,
  Plus,
  Search,
  Settings,
  Users,
  ChevronRight,
  Clock,
  FileText,
  AlertCircle
} from "lucide-react";
import { ReactNode } from "react";

interface StatsItem {
  title: string;
  value: number;
  icon: ReactNode;
  progress: number;
}

interface QuickAction {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}

interface ActivityItem {
  title: string;
  time: string;
  description: string;
  icon: ReactNode;
  key: number;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickAction = (action: string) => {
    toast({
      title: action,
      description: `${action} action triggered successfully!`,
    });
  };

  const stats: StatsItem[] = [
    {
      title: "Students",
      value: 1234,
      icon: <Users className="h-4 w-4" />,
      progress: 75,
    },
    {
      title: "Classes",
      value: 24,
      icon: <BookOpen className="h-4 w-4" />,
      progress: 60,
    },
    {
      title: "Teachers",
      value: 48,
      icon: <GraduationCap className="h-4 w-4" />,
      progress: 90,
    },
  ];

  const quickActions: QuickAction[] = [
    {
      title: "Add Student",
      description: "Register a new student in the system",
      icon: <Plus className="h-4 w-4" />,
      onClick: () => handleQuickAction("Add Student"),
    },
    {
      title: "Create Class",
      description: "Set up a new class or section",
      icon: <BookOpen className="h-4 w-4" />,
      onClick: () => handleQuickAction("Create Class"),
    },
    {
      title: "Add Teacher",
      description: "Register a new teacher profile",
      icon: <GraduationCap className="h-4 w-4" />,
      onClick: () => handleQuickAction("Add Teacher"),
    },
    {
      title: "Schedule Class",
      description: "Create or modify class schedules",
      icon: <Clock className="h-4 w-4" />,
      onClick: () => handleQuickAction("Schedule Class"),
    },
    {
      title: "Take Attendance",
      description: "Record student attendance",
      icon: <FileText className="h-4 w-4" />,
      onClick: () => handleQuickAction("Take Attendance"),
    },
    {
      title: "Grade Entry",
      description: "Enter or update student grades",
      icon: <AlertCircle className="h-4 w-4" />,
      onClick: () => handleQuickAction("Grade Entry"),
    },
  ];

  const recentActivities: ActivityItem[] = [
    {
      title: "New Student Registration",
      description: "John Doe was registered as a new student",
      time: "2 hours ago",
      icon: <Users className="h-4 w-4" />,
      key: 1
    },
    {
      title: "Class Schedule Updated",
      description: "Grade 10-A schedule was modified",
      time: "4 hours ago",
      icon: <Clock className="h-4 w-4" />,
      key: 2
    },
    {
      title: "Teacher Assignment",
      description: "Ms. Smith assigned to Mathematics",
      time: "1 day ago",
      icon: <GraduationCap className="h-4 w-4" />,
      key: 3
    }
  ];

  const upcomingEvents: ActivityItem[] = [
    {
      title: "Parent-Teacher Meeting",
      description: "Annual meeting for Grade 10 parents",
      time: "Tomorrow at 2:00 PM",
      icon: <Clock className="h-4 w-4" />,
      key: 4
    },
    {
      title: "Science Fair",
      description: "School-wide science project exhibition",
      time: "Next Monday",
      icon: <AlertCircle className="h-4 w-4" />,
      key: 5
    }
  ];

  const pendingTasks: ActivityItem[] = [
    {
      title: "Grade Submission",
      description: "Submit final grades for Term 1",
      time: "Due in 2 days",
      icon: <FileText className="h-4 w-4" />,
      key: 6
    },
    {
      title: "Student Reports",
      description: "Generate progress reports for Grade 8",
      time: "Due next week",
      icon: <AlertCircle className="h-4 w-4" />,
      key: 7
    }
  ];

  React.useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9b87f5]/10 to-[#7E69AB]/10">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">eduManager</h1>
            <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Beta</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors" />
              <Input
                placeholder="Search anything..."
                className="w-[200px] pl-9 lg:w-[300px] transition-all duration-300 border-muted group-hover:border-primary"
              />
            </div>
            <button 
              className="relative p-2 hover:bg-accent rounded-full transition-all duration-300 hover:scale-105"
              title="Show notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            </button>
            <button 
              className="p-2 hover:bg-accent rounded-full transition-all duration-300 hover:scale-105 hover:rotate-45"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-8 animate-fade-in">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={cn(
                  "p-2 rounded-full transition-colors duration-300",
                  index === 0 ? "bg-blue-100 text-blue-700" :
                  index === 1 ? "bg-green-100 text-green-700" :
                  "bg-purple-100 text-purple-700"
                )}>
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  {isLoading ? (
                    <Skeleton className="h-8 w-20" />
                  ) : (
                    stat.value
                  )}
                </div>
                <Progress 
                  value={stat.progress} 
                  className={cn(
                    "transition-all duration-300 group-hover:h-2",
                    index === 0 ? "bg-blue-100" :
                    index === 1 ? "bg-green-100" :
                    "bg-purple-100"
                  )}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <button
                key={action.title}
                onClick={action.onClick}
                className="group relative p-4 rounded-lg border bg-card text-card-foreground shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        </div>

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
                  <ActivityItem key={activity.key} {...activity} />
                ))}
              </TabsContent>
              <TabsContent value="upcoming" className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <ActivityItem key={event.key} {...event} />
                ))}
              </TabsContent>
              <TabsContent value="tasks" className="space-y-4">
                {pendingTasks.map((task, index) => (
                  <ActivityItem key={task.key} {...task} />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

// Helper Components
const ActivityItem = ({ title, time, description, icon }: { 
  title: string;
  time: string;
  description: string;
  icon: ReactNode;
}) => (
  <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-muted/50 transition-colors">
    <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        {icon}
        <p className="font-medium">{title}</p>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
  </div>
);

export default Dashboard;
