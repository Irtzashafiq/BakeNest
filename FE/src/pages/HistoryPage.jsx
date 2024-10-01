// history.jsx
import React from "react";

const History = () => {
  return (
    <section className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Title Section */}
      <div className="text-center max-w-4xl">
        <h1 className="text-xl font-semibold mb-4 text-orange-400">BAKENEST HISTORY</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-12">
          We have decided to create a humble but refined environment where our
          respected patrons can enjoy the finest quality seafood prepared with
          the utmost diligence
        </h2>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-12 leading-relaxed px-4">
        <p className="text-lg text-justify">
          Leverage agile frameworks to provide a robust synopsis for high level
          overviews. Iterative approaches to corporate strategy foster
          collaborative thinking to further the overall value proposition.
          Organically grow the holistic world view of disruptive innovation via
          workplace diversity and empowerment. Capitalize on low hanging fruit
          to identify a ballpark value added activity to beta test. Override the
          digital divide with additional clickthroughs from DevOps.
          Nanotechnology immersion along the information highway will close the
          loop on customer service.
        </p>

        <p className="text-lg text-justify">
          Podcasting operational change management inside of workflows to
          establish a framework. Taking seamless key performance indicators
          offline to maximise the long tail. Keeping your eye on the ball while
          performing a deep dive on the start-up mentality to derive convergence
          on cross-platform integration. Efficiently unleash cross-media
          information without cross-media value. Quickly maximize timely
          deliverables for real-time schemas. Dramatically maintain
          clicks-and-mortar solutions without functional solutions cutting-edge
          deliverables.
        </p>
      </div>
    </section>
  );
};

export default History;
