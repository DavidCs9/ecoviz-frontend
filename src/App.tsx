import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { Calculator } from "./pages/Calculator";
import Results, { ResultsProps } from "./pages/Results";

const queryClient = new QueryClient();

// Wrapper component to handle state passing
const ResultsWrapper = () => {
  const location = useLocation();
  const state = location.state as ResultsProps;

  if (!state) {
    // Handle the case where state is not available
    return (
      <div>
        No data available. Please calculate your carbon footprint first.
      </div>
    );
  }

  return <Results {...state} />;
};

// Define the ResultsProps interface

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/results" element={<ResultsWrapper />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
