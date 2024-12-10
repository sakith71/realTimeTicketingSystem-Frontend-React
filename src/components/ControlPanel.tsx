import React from "react";

interface Props {
  onStart: () => void;
  onStop: () => void;
}

const ControlPanel = ({ onStart, onStop }: Props) => {
  return (
    <div className="d-flex justify-content-between mt-3">
      <button className="btn btn-success me-2" onClick={onStart}>
        Start
      </button>
      <button className="btn btn-danger" onClick={onStop}>
        Stop
      </button>
    </div>
  );
};

export default ControlPanel;
