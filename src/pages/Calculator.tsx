import { useState } from "react";
import { LeafIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { Button } from "../components/ui/button";

export function Calculator() {
  const [electricity, setElectricity] = useState<number[]>([500]);
  const [transportation, setTransportation] = useState<number[]>([50]);
  const [diet, setDiet] = useState<number[]>([75]);
  const [otherFactors, setOtherFactors] = useState<number[]>([25]);
  const [result, setResult] = useState<number | null>(null);
  const [calculationId, setCalculationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const calculateFootprint = async () => {
    setIsLoading(true);
    setError(null);
    const userId = "testuser123"; // In a real app, this should be dynamically generated or retrieved from user authentication
    const API_URL = "ec2-44-192-45-247.compute-1.amazonaws.com/calculate";

    const data = {
      electricity: electricity[0],
      transportation: transportation[0],
      diet: diet[0],
      otherFactors: otherFactors[0],
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, data }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setResult(result.carbonFootprint);
      setCalculationId(result.calculationId);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to calculate carbon footprint. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen p-6">
      <Card className="max-w-md bg-gradient-to-br from-green-50 to-green-100 ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-green-800">
            Carbon Footprint Calculator
          </CardTitle>
          <CardDescription className="text-green-600">
            Estimate your environmental impact
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="electricity"
              className="text-sm font-medium text-green-700"
            >
              Electricity Usage (kWh per month)
            </Label>
            <Slider
              id="electricity"
              min={0}
              max={1000}
              step={10}
              value={electricity}
              onValueChange={setElectricity}
              className="[&_[role=slider]]:bg-green-600"
            />
            <p className="text-sm text-green-600 text-right">
              {electricity} kWh
            </p>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="transportation"
              className="text-sm font-medium text-green-700"
            >
              Transportation (miles per week)
            </Label>
            <Slider
              id="transportation"
              min={0}
              max={500}
              step={5}
              value={transportation}
              onValueChange={setTransportation}
              className="[&_[role=slider]]:bg-green-600"
            />
            <p className="text-sm text-green-600 text-right">
              {transportation} miles
            </p>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="diet"
              className="text-sm font-medium text-green-700"
            >
              Diet Impact (0-100)
            </Label>
            <Slider
              id="diet"
              min={0}
              max={100}
              step={1}
              value={diet}
              onValueChange={setDiet}
              className="[&_[role=slider]]:bg-green-600"
            />
            <p className="text-sm text-green-600 text-right">{diet}</p>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="otherFactors"
              className="text-sm font-medium text-green-700"
            >
              Other Factors (0-100)
            </Label>
            <Slider
              id="otherFactors"
              min={0}
              max={100}
              step={1}
              value={otherFactors}
              onValueChange={setOtherFactors}
              className="[&_[role=slider]]:bg-green-600"
            />
            <p className="text-sm text-green-600 text-right">{otherFactors}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={calculateFootprint}
            disabled={isLoading}
          >
            <LeafIcon className="w-4 h-4 mr-2" />
            {isLoading ? "Calculating..." : "Calculate"}
          </Button>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          {result !== null && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold text-green-800">
                Your carbon footprint: {result.toFixed(2)} kg CO2e
              </p>
              <p className="text-sm text-green-600">
                Calculation ID: {calculationId}
              </p>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
