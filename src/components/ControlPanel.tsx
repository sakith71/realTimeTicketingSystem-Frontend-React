import React from "react";

interface Props {
  onStart: () => void;
  onStop: () => void;
}

const ControlPanel = ({ onStart, onStop }: Props) => {
  return (
    <div className="d-flex justify-content-center gap-5 mt-4">
      <button className="btn btn-success px-5" onClick={onStart}>
        Start
      </button>
      <button className="btn btn-danger px-5" onClick={onStop}>
        Stop
      </button>
    </div>
  );
};

export default ControlPanel;
