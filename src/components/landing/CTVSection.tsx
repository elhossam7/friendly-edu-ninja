import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CTVSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Institution?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of institutions already using EduManager to streamline their operations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-[#9b87f5] hover:bg-white/90"
            onClick={() => navigate("/login")}
          >
            Start Free Trial
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            Schedule Demo
          </Button>
        </div>
      </div>
    </section>
  );
};