import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen,
  Calendar,
  ClipboardCheck,
  CreditCard,
  ChevronRight,
  Users,
  Clock,
  Zap,
  CheckCircle2,
  Settings,
  UserPlus,
  BarChart,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

const whyChooseUs = [
  {
    title: "Trusted by 100+ Institutions",
    description: "Join the growing community of satisfied educational institutions",
    icon: Users,
  },
  {
    title: "24/7 Customer Support",
    description: "Get help whenever you need it with our round-the-clock support",
    icon: Clock,
  },
  {
    title: "Seamless Integration",
    description: "Easily integrate with your existing educational tools and systems",
    icon: Zap,
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Sign Up & Customize",
    description: "Create your account and customize your dashboard to match your needs",
    icon: Settings,
  },
  {
    step: 2,
    title: "Add Your Data",
    description: "Easily import students, teachers, and courses into the system",
    icon: UserPlus,
  },
  {
    step: 3,
    title: "Start Managing",
    description: "Begin tracking attendance, grades, and fees effortlessly",
    icon: BarChart,
  },
];

const testimonials = [
  {
    name: "John Doe",
    role: "School Principal",
    content: "EduManager has transformed how we manage our institution.",
    image: "/placeholder.svg",
  },
  {
    name: "Jane Smith",
    role: "Administrator",
    content: "The automation features save us countless hours every week.",
    image: "/placeholder.svg",
  },
  {
    name: "Mike Johnson",
    role: "Department Head",
    content: "An invaluable tool for modern educational institutions.",
    image: "/placeholder.svg",
  },
];

const Index = () => {
  const { toast } = useToast();

  const handleGetStarted = () => {
    toast({
      title: "Welcome to EduManager!",
      description: "We'll contact you shortly to get you started.",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] px-4">
        <div className="max-w-4xl mx-auto text-center text-white space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Empower Education Management with EduManager
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Streamline your institution's operations with intuitive tools designed
            for success
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button
              size="lg"
              className="bg-[#D6BCFA] text-[#1A1F2C] hover:bg-[#D6BCFA]/90 transform transition-transform hover:scale-105"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10 transform transition-transform hover:scale-105"
            >
              Learn More
              <ChevronRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1F2C]">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-[#9b87f5] mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1F2C]">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={item.title}
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md transform transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-4 p-4 bg-[#9b87f5]/10 rounded-full">
                  <item.icon className="w-8 h-8 text-[#9b87f5]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1F2C]">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-[#9b87f5] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {step.step}
                  </div>
                </div>
                <step.icon className="w-12 h-12 text-[#9b87f5] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-[32px] left-[60%] w-[80%] h-[2px] bg-[#9b87f5]/20">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <ChevronRight className="w-6 h-6 text-[#9b87f5]" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1F2C]">
            What Our Users Say
          </h2>
          <Carousel className="max-w-xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="mx-4">
                    <CardContent className="p-6 text-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full mx-auto mb-4"
                      />
                      <p className="text-lg mb-4">{testimonial.content}</p>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default Index;