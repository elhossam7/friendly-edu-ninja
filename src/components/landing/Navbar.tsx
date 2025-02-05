import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-[#1A1F2C]">EduManager</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-[#9b87f5]">Features</a>
            <a href="#benefits" className="text-gray-600 hover:text-[#9b87f5]">Benefits</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-[#9b87f5]">How It Works</a>
            <a href="#testimonials" className="text-gray-600 hover:text-[#9b87f5]">Testimonials</a>
            <Button onClick={handleGetStarted}>Get Started</Button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="px-4 py-2 space-y-2">
            <a href="#features" className="block text-gray-600 hover:text-[#9b87f5]">Features</a>
            <a href="#benefits" className="block text-gray-600 hover:text-[#9b87f5]">Benefits</a>
            <a href="#how-it-works" className="block text-gray-600 hover:text-[#9b87f5]">How It Works</a>
            <a href="#testimonials" className="block text-gray-600 hover:text-[#9b87f5]">Testimonials</a>
            <Button onClick={handleGetStarted} className="w-full">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};