import { Check } from "lucide-react";

export const BenefitsSection = () => {
  const benefits = [
    "Reduce administrative workload by 50%",
    "Streamline communication between staff and parents",
    "Automate attendance tracking and reporting",
    "Enhance student performance monitoring",
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1F2C]">
          Key Benefits
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-lg bg-gray-50 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Check className="text-[#9b87f5] mt-1" />
              <p className="text-gray-700">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};