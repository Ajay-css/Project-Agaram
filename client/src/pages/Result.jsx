import { useLocation } from "react-router-dom";
import ScoreCard from "../components/ScoreCard";

export default function Result() {
  const { state } = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <ScoreCard result={state} />
    </div>
  );
}