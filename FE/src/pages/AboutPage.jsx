import React from "react";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 mt-[6%]">
      {/* Header Section */}
      <header className="w-full bg-orange-400 bg-opacity-70 text-white py-8 shadow-md">
        <h1 className="text-4xl font-serif text-center">About BAKENEST</h1>
      </header>

      {/* Content Section */}
      <div className="container mx-auto flex-grow p-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to BAKENEST!
          </h2>
          <p className="text-gray-600 mb-4">
            Your go-to bakery for delightful treats. Our bakery specializes in
            creating mouth-watering pastries, custom cakes, and artisan bread.
            We believe in quality and taste, ensuring that every bite brings you
            joy.
          </p>
          <p className="text-gray-600 mb-4">
            At BAKENEST, we use only the finest ingredients, hand-picked from
            local suppliers, to craft our delectable offerings. Whether you're
            celebrating a special occasion or simply indulging yourself, we have
            something for everyone.
          </p>
          <p className="text-gray-600">
            Join us on a journey of flavors and let our baked goods bring
            sweetness to your day!
          </p>
        </div>

        {/* Images Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-200 rounded-lg overflow-hidden">
            <img
              src="https://example.com/your-image-1.jpg" 
              alt="Pastries"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-gray-200 rounded-lg overflow-hidden">
            <img
              src="https://example.com/your-image-2.jpg" 
              alt="Custom Cakes"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-gray-200 rounded-lg overflow-hidden">
            <img
              src="https://example.com/your-image-3.jpg" 
              alt="Artisan Bread"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-gray-200 rounded-lg overflow-hidden">
            <img
              src="https://example.com/your-image-4.jpg" 
              alt="Bakery Showcase"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-black text-white py-4 text-center">
        <p>© 2024 BAKENEST. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
