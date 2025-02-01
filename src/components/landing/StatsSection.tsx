export const StatsSection = () => {
  const stats = [
    { value: "98%", label: "User Satisfaction" },
    { value: "50%", label: "Time Saved" },
    { value: "24/7", label: "Support Available" },
    { value: "10K+", label: "Active Users" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-[#9b87f5]">{stat.value}</div>
              <div className="text-gray-600 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};