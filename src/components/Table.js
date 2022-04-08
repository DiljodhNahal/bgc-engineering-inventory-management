import React from "react";

import styles from "../styles/components/Table.css";

const Table = ({ content }) => {
  return (
    <form className={styles.outer}>
     
      <table className="itemsTable">
        <React.Fragment>{content}</React.Fragment>
      </table>
    
    </form>
      
  );
};

export default Table;
