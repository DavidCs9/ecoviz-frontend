/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { Leaf, Car, Zap, Coffee, ShoppingBag } from "lucide-react";
import ReactMarkdown from "react-markdown";

export interface ResultsProps {
  carbonFootprint: number;
  calculationData: {
    housing: {
      energy: {
        electricity: number;
        naturalGas: number;
        heatingOil: number;
      };
    };
    transportation: {
      car: {
        milesDriven: number;
        fuelEfficiency: number;
      };
      publicTransit: {
        busMiles: number;
        trainMiles: number;
      };
      flights: {
        shortHaul: number;
        longHaul: number;
      };
    };
    food: {
      dietType: string;
      wasteLevel: string;
    };
    consumption: {
      shoppingHabits: string;
      recyclingHabits: string;
    };
  };
  aiAnalysis: string;
}

const RADIAN = Math.PI / 180;

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value.toFixed(1)}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};

const Results: React.FC<ResultsProps> = ({
  carbonFootprint,
  calculationData,
  aiAnalysis,
}) => {
  const animatedNumber = useSpring({
    number: carbonFootprint,
    from: { number: 0 },
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const calculateSectorEmissions = () => {
    console.log(calculationData);
    const housing =
      calculationData.housing.energy.electricity * 0.42 +
      calculationData.housing.energy.naturalGas * 5.3 +
      calculationData.housing.energy.heatingOil * 10.15;

    const transportation =
      (calculationData.transportation.car.milesDriven /
        calculationData.transportation.car.fuelEfficiency) *
        8.89 +
      calculationData.transportation.publicTransit.busMiles * 0.059 +
      calculationData.transportation.publicTransit.trainMiles * 0.041 +
      calculationData.transportation.flights.shortHaul * 1100 +
      calculationData.transportation.flights.longHaul * 4400;

    const foodEmissions = carbonFootprint * 0.25; // Assuming food is roughly 25% of total emissions
    const consumptionEmissions = carbonFootprint * 0.15; // Assuming consumption is roughly 15% of total emissions

    return { housing, transportation, foodEmissions, consumptionEmissions };
  };

  const sectorEmissions = calculateSectorEmissions();

  const data = [
    {
      name: "Housing",
      value: sectorEmissions.housing,
      color: "#4CAF50",
      icon: Zap,
    },
    {
      name: "Transportation",
      value: sectorEmissions.transportation,
      color: "#2196F3",
      icon: Car,
    },
    {
      name: "Food",
      value: sectorEmissions.foodEmissions,
      color: "#FFC107",
      icon: Coffee,
    },
    {
      name: "Consumption",
      value: sectorEmissions.consumptionEmissions,
      color: "#9C27B0",
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="min-h-screen w-full p-6">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-100 to-blue-100 p-6 rounded-lg shadow-lg overflow-hidden text-gray-600">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-green-800">
            Your Carbon Footprint Results
          </h1>

          <div className="flex justify-center items-center mb-8">
            <Leaf className="w-16 h-16 text-green-500 mr-4" />
            <animated.span className="text-6xl font-bold text-green-700">
              {animatedNumber.number.to((n) => n.toFixed(2))}
            </animated.span>
            <span className="text-2xl ml-2">kg CO2e / year</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-green-700">
                Breakdown
              </h2>
              <ResponsiveContainer height={300}>
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-green-700">
                Details
              </h2>
              <ul className="space-y-4">
                {data.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <item.icon
                      className="w-8 h-8 mr-4"
                      style={{ color: item.color }}
                    />
                    <span className="text-lg">
                      {item.name}: {item.value.toFixed(1)} kg CO2e
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">
              AI Recommendations
            </h2>
            <div className="bg-green-50 p-6 rounded-lg shadow-inner">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h3
                      className="text-xl font-semibold mb-2 text-green-800"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h4
                      className="text-lg font-semibold mb-2 text-green-700"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="mb-4 text-green-900" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      className="list-disc list-inside mb-4 text-green-900"
                      {...props}
                    />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      className="list-decimal list-inside mb-4 text-green-900"
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="mb-2" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong
                      className="font-semibold text-green-800"
                      {...props}
                    />
                  ),
                  em: ({ node, ...props }) => (
                    <em className="italic text-green-700" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-green-500 pl-4 italic my-4 text-green-800"
                      {...props}
                    />
                  ),
                }}
              >
                {aiAnalysis}
              </ReactMarkdown>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 mt-8">
            <p>
              These recommendations are generated by AI and should be considered
              as general advice.
            </p>
            <p>
              Always consult with environmental experts for personalized
              strategies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
