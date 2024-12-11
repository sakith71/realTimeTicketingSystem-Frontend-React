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

    const updateFormData = (index: number, value: string) => {
        const keys = [
            "totalTickets",
            "ticketReleaseRate",
            "customerRetrievalRate",
            "maxTicketCapacity",
            "numVendors",
            "numCustomers",
        ];
        setFormData({ ...formData, [keys[index]]: Number(value) });
    };

    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-lg-6 col-md-12 mb-4">
                  <div className="p-3 bg-light shadow rounded">
                    <ConfigurationForm inputFields={inputFields} onChange={updateFormData} />
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