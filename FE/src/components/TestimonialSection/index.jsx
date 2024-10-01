import React from "react";

const testimonials = [
  {
    name: "Steve",
    review: "Best bakery in town! The cakes are amazing.",
    image: "/testimonials/boy.jpg",
  },
  {
    name: "Julia Wilson",
    review: "I love their fresh pastries every morning!",
    image: "/testimonials/girl.jpg",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                loading="lazy"
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="italic">"{testimonial.review}"</p>
              <h3 className="mt-4 text-lg font-semibold">{testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
