import React, { useState, useEffect } from "react";
import ConfigurationForm from "./components/ConfigurationForm";
import ControlPanel from "./components/ControlPanel";
import LogDisplay from "./components/LogDisplay";
import TicketDisplay from "./components/TicketDisplay";

function App() {
  const inputFields = [
    "Enter the Number Of Tickets",
    "Ticket Release Rate",
    "Ticket Retrieval Rate",
    "Maximum Ticket Capacity",
    "Enter the Number Of Vendors",
    "Enter the Number Of Customers",
  ];

  const [ticketCount, setTicketCount] = useState(0); // Example initial ticket count
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        // Simulate ticket updates
        setTicketCount((prev) => {
          const newCount = prev > 0 ? prev - 1 : 0;
          addLog(`Ticket pool updated: ${newCount} tickets left`);
          return newCount;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    addLog("Simulation started");
  };

  const handleStop = () => {
    setIsRunning(false);
    addLog("Simulation stopped");
  };

  const addLog = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  return (
    <div className="container py-4">
      <div className="row">
        {/* Left Section: Configuration Form */}
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="p-3 bg-light shadow rounded">
            <ConfigurationForm inputFields={inputFields} />
            <ControlPanel onStart={handleStart} onStop={handleStop} />
          </div>
        </div>

        {/* Right Section: Ticket Display and Logs */}
        <div className="col-lg-6 col-md-12">
          <div className="row">
            {/* Ticket Display */}
            <div className="col-12 mb-4">
              <div className="p-3 bg-white shadow rounded">
                <TicketDisplay ticketCount={ticketCount} />
              </div>
            </div>
            {/* Log Display */}
            <div className="col-12">
              <div className="p-3 bg-white shadow rounded">
                <LogDisplay logs={logs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
