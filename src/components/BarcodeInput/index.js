import React, { useState } from "react";

import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";
  
  function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

const BarcodeInputField = ( props ) => {
  const [ enteredProduct, setEnteredProduct ] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    props.history.push(`/product/${enteredProduct}`);
  }

  const onInputChange = (e) => {
    setEnteredProduct(e.target.value);
  }

  return (
    <form onSubmit={onSubmit}>
      <input placeholder="e.g. 7622300710613" className="textInput" required type="number" onChange={onInputChange}/>
      <button className="btn" type="submit">Find</button>
    </form>
  )
}

export default withRouter(BarcodeInputField);