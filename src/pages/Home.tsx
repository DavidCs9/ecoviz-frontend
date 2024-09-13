import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">EcoViz</h1>
        <p className="text-xl text-white mb-8">
          Discover your carbon footprint and make a difference
        </p>
        <Link
          to="/calculator"
          className="inline-flex items-center px-6 py-3 text-lg font-semibold text-green-600 bg-white rounded-full hover:bg-green-100 transition-colors duration-300"
        >
          <Leaf className="mr-2" />
          Calculate Your Footprint
        </Link>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Track", "Analyze", "Improve"].map((action, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-2">
                {action}
              </h2>
              <p className="text-white opacity-80">
                {action === "Track" &&
                  "Monitor your daily habits and their impact on the environment."}
                {action === "Analyze" &&
                  "Get insights into your carbon footprint and areas for improvement."}
                {action === "Improve" &&
                  "Receive personalized recommendations to reduce your environmental impact."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
