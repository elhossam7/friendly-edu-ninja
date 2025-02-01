import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/landing/Footer";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { IntegrationsSection } from "@/components/landing/IntegrationsSection";
import { CTVSection } from "@/components/landing/CTVSection";
import { DashboardSection } from "@/components/landing/DashboardSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SmoothScroll />
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <DashboardSection />
      <BenefitsSection />
      <HowItWorksSection />
      <IntegrationsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTVSection />
      <Footer />
    </div>
  );
};

export default Index;