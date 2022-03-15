import React from "react";

import "../styles/components/Table.css";

const Table = ({ content }) => {
  return (
    <div>
      <table className="itemsTable">
        <div className="content">{content}</div>
      </table>
    </div>
  );
};

export default Table;
