import React from "react";

type LogDisplayProps = {
  logs: string[];
};

const LogDisplay: React.FC<LogDisplayProps> = ({ logs }) => {
  return (
    <div>
      <h4>Simulation Logs</h4>
      <div
        style={{
          maxHeight: "370px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        
        }}
      >
        {logs.map((log, index) => (
          <p key={index} style={{ margin: "", fontSize: "16px" }}>
            {log}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LogDisplay;
