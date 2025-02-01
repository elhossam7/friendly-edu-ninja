export const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      title: "Register Your Institution",
      description: "Complete a simple registration process with your institution details.",
    },
    {
      number: "2",
      title: "Configure Your Setup",
      description: "Set up roles, academic year, and class structure.",
    },
    {
      number: "3",
      title: "Start Managing",
      description: "Begin using the platform to streamline your institution's management.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1F2C]">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center p-6 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-12 h-12 bg-[#9b87f5] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};