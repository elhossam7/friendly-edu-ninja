import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  ClipboardCheck,
  CreditCard,
  ChevronRight,
  Users,
  Clock,
  Zap,
  Settings,
  UserPlus,
  BarChart,
  Menu,
  X,
  HelpCircle,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const stats = [
  { value: "98%", label: "User Satisfaction" },
  { value: "50%", label: "Time Saved" },
  { value: "24/7", label: "Support Available" },
];

const testimonials = [
  {
    name: "John Doe",
    role: "School Principal",
    content: "EduManager has transformed how we manage our institution. The automated systems have saved us countless hours of administrative work.",
    rating: 5,
    image: "/placeholder.svg",
  },
  {
    name: "Jane Smith",
    role: "Administrator",
    content: "The automation features save us countless hours every week. The support team is always there when we need them.",
    rating: 5,
    image: "/placeholder.svg",
  },
  {
    name: "Mike Johnson",
    role: "Department Head",
    content: "An invaluable tool for modern educational institutions. The interface is intuitive and our staff needed minimal training.",
    rating: 5,
    image: "/placeholder.svg",
  },
];

const faqs = [
  {
    question: "How long does it take to set up EduManager?",
    answer: "Setup typically takes less than an hour. Our step-by-step wizard guides you through the entire process, from institution registration to system configuration."
  },
  {
    question: "Is my data secure with EduManager?",
    answer: "Yes, we use industry-standard encryption and security measures to protect your data. All information is stored in secure, encrypted databases."
  },
  {
    question: "Can I import existing student data?",
    answer: "Yes, EduManager supports bulk import of student data via CSV files. Our support team can assist you with the data migration process."
  },
];

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-[#1A1F2C]">EduManager</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-[#9b87f5]">Features</a>
              <a href="#benefits" className="text-gray-600 hover:text-[#9b87f5]">Benefits</a>
              <a href="#testimonials" className="text-gray-600 hover:text-[#9b87f5]">Testimonials</a>
              <Button onClick={handleGetStarted}>Get Started</Button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b">
            <div className="px-4 py-2 space-y-2">
              <a href="#features" className="block text-gray-600 hover:text-[#9b87f5]">Features</a>
              <a href="#benefits" className="block text-gray-600 hover:text-[#9b87f5]">Benefits</a>
              <a href="#testimonials" className="block text-gray-600 hover:text-[#9b87f5]">Testimonials</a>
              <Button onClick={handleGetStarted} className="w-full">Get Started</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] px-4">
        <div className="max-w-4xl mx-auto text-center text-white space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Transform Your Institution's Management
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Save 50% of administrative time with our all-in-one education management platform
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button
              size="lg"
              className="bg-[#D6BCFA] text-[#1A1F2C] hover:bg-[#D6BCFA]/90 transform transition-transform hover:scale-105"
              onClick={handleGetStarted}
            >
              Start Free Trial
              <ChevronRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-[#9b87f5]">{stat.value}</div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white">
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
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
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

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1F2C]">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#9b87f5]" />
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1F2C] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EduManager</h3>
              <p className="text-gray-400">Transforming education management for the digital age.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#benefits" className="hover:text-white">Benefits</a></li>
                <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} EduManager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;