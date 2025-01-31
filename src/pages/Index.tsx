import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen,
  Calendar,
  ClipboardCheck,
  CreditCard,
  ChevronRight,
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