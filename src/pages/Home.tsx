import { Link } from "react-router-dom";
import { Leaf, Calculator, BarChart, Lightbulb } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-6">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl font-bold text-white mb-4">EcoViz</h1>
        <p className="text-2xl text-white mb-8">
          Calculate, Visualize, and Reduce Your Carbon Footprint
        </p>
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-semibold text-white mb-4">What We Do</h2>
          <p className="text-xl text-white mb-6">
            EcoViz is a powerful tool that helps you understand and minimize
            your environmental impact:
          </p>
          <ul className="text-left text-lg text-white space-y-4">
            <li className="flex items-center">
              <Calculator className="mr-2" /> Calculate your personal carbon
              footprint
            </li>
            <li className="flex items-center">
              <BarChart className="mr-2" /> Visualize your impact across
              different areas of your life
            </li>
            <li className="flex items-center">
              <Lightbulb className="mr-2" /> Get AI-powered recommendations to
              reduce your carbon footprint
            </li>
          </ul>
        </div>
        <Link
          to="/calculator"
          className="inline-flex items-center px-6 py-3 text-lg font-semibold text-green-600 bg-white rounded-full hover:bg-green-100 transition-colors duration-300"
        >
          <Leaf className="mr-2" />
          Start Your Carbon Footprint Analysis
        </Link>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Easy to Use",
              description: "Simple questions to gather your lifestyle data",
            },
            {
              title: "Accurate Results",
              description: "Precise calculations based on the latest research",
            },
            {
              title: "Actionable Insights",
              description: "Personalized tips to reduce your carbon footprint",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-2">
                {feature.title}
              </h2>
              <p className="text-white opacity-80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
