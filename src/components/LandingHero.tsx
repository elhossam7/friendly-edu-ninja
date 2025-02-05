import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const navigate = useNavigate();

  return (
    // ...existing code...
    <div className="flex justify-center gap-4">
      <Button 
        onClick={() => navigate("/login")} 
        className="font-semibold"
      >
        Start Free Trial
      </Button>
      <Button 
        onClick={() => navigate("/login")} 
        variant="outline" 
        className="font-semibold"
      >
        Get Started
      </Button>
    </div>
    // ...existing code...
  );
};
