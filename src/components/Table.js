import React from "react";

import "../styles/components/Table.css";

const Table = ({ content }) => {
  return (
    
      <table className="itemsTable">
        <React.Fragment>{content}</React.Fragment>
      </table>
      
  );
};

export default Table;
