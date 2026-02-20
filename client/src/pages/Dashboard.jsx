import Query from "../components/Query";
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  
const navigate = useNavigate(); // ✅ TOP LEVEL

const handleStartInterview = (data) => {
  console.log("Interview started:", data);
  navigate(`/interview/${data._id}`);
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <Query onStart={handleStartInterview} />
    </div>
  );
}