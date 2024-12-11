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

  const [formData, setFormData] = useState({
    totalTickets: 0,
    ticketReleaseRate: 0,
    customerRetrievalRate: 0,
    maxTicketCapacity: 0,
    numVendors: 0,
    numCustomers: 0,
  });

  const [ticketCount, setTicketCount] = useState(0); // Example initial ticket count
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        fetch("http://localhost:8081/api/simulation/ticketCount")
          .then((res) => res.json())
          .then((data) => setTicketCount(data))
          .catch((err) => console.error(err));

        fetch("http://localhost:8081/api/simulation/logs")
          .then((res) => res.json())
          .then((data) => setLogs(data))
          .catch((err) => console.error(err));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const handleStart = () => {
    fetch("http://localhost:8081/api/simulation/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        setIsRunning(true);
      })
      .catch((error) => console.error("Error starting simulation:", error));
  };

  const handleStop = () => {
    fetch("http://localhost:8081/api/simulation/stop", {
      method: "POST",
    })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        setIsRunning(false);
      })
      .catch((error) => console.error("Error stopping simulation:", error));
  };

  const updateFormData = (index: number, value: string) => {
    const fieldNames = [
      "totalTickets",
      "ticketReleaseRate",
      "customerRetrievalRate",
      "maxTicketCapacity",
      "numVendors",
      "numCustomers",
    ];
    const key = fieldNames[index] as keyof typeof formData;
    setFormData({ ...formData, [key]: Number(value) });
  };

  return (
    <div className="container py-4">
      <div className="row">
        {/* Left Section: Configuration Form */}
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="p-3 bg-light shadow rounded">
            {inputFields.map((field, index) => (
              <div className="form-floating mb-3" key={index}>
                <input
                  type="number"
                  className="form-control"
                  id={`input-${index}`}
                  placeholder={field}
                  onChange={(e) => updateFormData(index, e.target.value)}
                />
                <label htmlFor={`input-${index}`}>{field}</label>
              </div>
            ))}
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
