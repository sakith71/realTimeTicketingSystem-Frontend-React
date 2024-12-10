import React from "react";

interface Props {
  logs: string[];
}

const LogDisplay = ({ logs }: Props) => {
  return (
    <div>
      <h4 className="text-center mb-3">Simulation Logs</h4>
      <div
        className="log-box"
        style={{
          maxHeight: "350px",
          overflowY: "scroll",
          backgroundColor: "#f8f9fa",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      >
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <p key={index} className="mb-1">
              {log}
            </p>
          ))
        ) : (
          <p className="text-muted">No logs yet</p>
        )}
      </div>
    </div>
  );
};

export default LogDisplay;
