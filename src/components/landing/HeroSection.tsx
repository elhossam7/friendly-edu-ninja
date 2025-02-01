import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
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
  );
};