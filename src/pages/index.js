import React, { useEffect, useState } from "react";
import DoubtForm from "@/components/doubtForm";
import DoubtList from "@/components/doubtList";

function Home() {
  const [doubts, setDoubts] = useState([]);

  const fetchDoubts = async () => {
    try {
      const response = await fetch("/api/doubts");
      const data = await response.json();
      setDoubts(data);
    } catch (error) {
      console.error("Error fetching doubts:", error);
    }
  };

  useEffect(() => {
    fetchDoubts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="container max-w-4xl mx-auto px-4 pt-8 pb-24 relative min-h-screen">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-8 text-center">
          Doubt Portal
        </h1>
        <div className="bg-white rounded-xl shadow-xl p-6 backdrop-blur-lg bg-opacity-90">
          <DoubtList doubts={doubts} />
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-100 backdrop-blur-lg bg-opacity-90">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <DoubtForm onDoubtSubmitted={fetchDoubts} />
        </div>
      </div>
    </div>
  );
}

export default Home;
