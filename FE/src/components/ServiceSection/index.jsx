import React from "react";

const services = [
  {
    title: "Custom Cakes",
    description: "Personalized cakes for every occasion.",
    Image: "/menu/6.jpg",
  },
  {
    title: "Fresh Pastries",
    description: "Delicious pastries made fresh daily.",
    Image: "/menu/7.jpg",
  },
  {
    title: "Artisan Bread",
    description: "Handcrafted bread with natural ingredients.",
    Image: "/menu/4.jpg",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Our Specialties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <img
                // src={service.Image}
                alt={service.title}
                loading="lazy"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
