import React from "react";

interface Props {
  ticketCount: number;
}

const TicketDisplay = ({ ticketCount }: Props) => {
  return (
    <div>
      <h4 className="text-center mb-3">Ticket Display</h4>
      <p className="text-center fs-5">
        Tickets in Pool: <strong>{ticketCount}</strong>
      </p>
    </div>
  );
};

export default TicketDisplay;
