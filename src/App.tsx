import React, { useState, useEffect } from "react";
import ConfigurationForm from "./components/ConfigurationForm";
import ControlPanel from "./components/ControlPanel";
import LogDisplay from "./components/LogDisplay";
import TicketDisplay from "./components/TicketDisplay";

function App() {
  const inputFields = [
    "Enter the Number Of Tickets",
    "Ticket Release Rate (ms)",
    "Ticket Retrieval Rate (ms)",
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

  const [ticketCount, setTicketCount] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Error states to track validation errors
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        fetch("http://localhost:8081/api/simulation/ticketCount")
          .then((res) => res.json())
          .then(setTicketCount)
          .catch((err) => console.error(err));

        fetch("http://localhost:8081/api/simulation/logs")
          .then((res) => res.json())
          .then(setLogs)
          .catch((err) => console.error(err));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const handleStart = () => {
    const invalidFields = Object.entries(formData).filter(
      ([key, value]) => isNaN(value) || value <= 0
    );

    if (invalidFields.length > 0) {
      alert("Please correct all input fields before starting the simulation.");
      return;
    }

    if (formData.maxTicketCapacity > formData.totalTickets) {
      alert("Max capacity cannot exceed the total number of tickets. Please enter a valid value.");
      return;
    }

    fetch("http://localhost:8081/api/simulation/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => setIsRunning(true))
      .catch((err) => console.error(err));
  };

  const handleStop = () => {
    fetch("http://localhost:8081/api/simulation/stop", { method: "POST" })
      .then(() => setIsRunning(false))
      .catch((err) => console.error(err));
  };

  // Update form data and validate inputs
  const updateFormData = (index: number, value: string) => {
    const keys = [
      "totalTickets",
      "ticketReleaseRate",
      "customerRetrievalRate",
      "maxTicketCapacity",
      "numVendors",
      "numCustomers",
    ];

    const numericValue = Number(value);
    const newErrors = [...errors];

    if (isNaN(numericValue) || numericValue <= 0) {
      newErrors[index] = "Please enter a valid positive number.";
    } else {
      newErrors[index] = ""; // Clear error if input is valid
    }

    // Additional validation for max ticket capacity
    if (
      keys[index] === "maxTicketCapacity" &&
      numericValue > formData.totalTickets
    ) {
      newErrors[index] = "Max capacity cannot exceed the total number of tickets.";
    }

    setErrors(newErrors);
    setFormData({ ...formData, [keys[index]]: numericValue });
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="p-3 bg-light shadow rounded">
            <ConfigurationForm
              inputFields={inputFields}
              onChange={updateFormData}
              errors={errors}
            />
            <ControlPanel onStart={handleStart} onStop={handleStop} />
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="row">
            <div className="col-12 mb-4">
              <div className="p-3 bg-light shadow rounded">
                <TicketDisplay ticketCount={ticketCount} />
              </div>
            </div>
            <div className="col-12">
              <div className="p-3 bg-light shadow rounded">
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