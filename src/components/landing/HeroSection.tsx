import { Button } from "@/components/ui/button";
import { ChevronRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <section className="relative pt-20 pb-32 min-h-[90vh] flex items-center justify-center bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] px-4">
      <div className="max-w-4xl mx-auto text-center text-white space-y-8 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Transform Your Institution's Management
        </h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
          Join over 10,000+ institutions saving 50% of administrative time with our all-in-one education management platform
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-12">
          <Button
            size="lg"
            className="bg-white text-[#9b87f5] hover:bg-white/90 transform transition-all hover:scale-105"
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
            <Play className="mr-2 h-4 w-4" /> Watch Demo
          </Button>
        </div>
        <p className="text-sm opacity-75 mt-6">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white"></div>
    </section>
  );
};