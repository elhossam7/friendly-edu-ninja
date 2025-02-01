export const IntegrationsSection = () => {
  const integrations = [
    { name: "Integration 1", logo: "/placeholder.svg" },
    { name: "Integration 2", logo: "/placeholder.svg" },
    { name: "Integration 3", logo: "/placeholder.svg" },
    { name: "Integration 4", logo: "/placeholder.svg" },
    { name: "Integration 5", logo: "/placeholder.svg" },
    { name: "Integration 6", logo: "/placeholder.svg" },
  ];

  return (
    <section id="integrations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1F2C]">
          Integrations
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="flex flex-col items-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={integration.logo}
                alt={integration.name}
                className="w-16 h-16 object-contain mb-2"
              />
              <p className="text-sm text-gray-600">{integration.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};