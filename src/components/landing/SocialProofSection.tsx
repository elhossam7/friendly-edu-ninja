export const SocialProofSection = () => {
  const clients = [
    { name: "Company 1", logo: "/placeholder.svg" },
    { name: "Company 2", logo: "/placeholder.svg" },
    { name: "Company 3", logo: "/placeholder.svg" },
    { name: "Company 4", logo: "/placeholder.svg" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-gray-600 mb-8">Trusted by leading institutions</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70">
          {clients.map((client, index) => (
            <img
              key={index}
              src={client.logo}
              alt={client.name}
              className="h-12 object-contain animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};