import React, { useEffect, useState } from "react";
import errorimg from "../../Assets/Error.jpg";
import { useSelector } from "react-redux";
import "./Error.css";
function Error() {
  const [errorMessage, setErrorMessage] = useState("Error 404");
  const { error } = useSelector((state) => state);
  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [errorMessage, error]);
  return (
    <div className="fullscreen-container">
      <img src={errorimg} alt="" className="fullscreen-img" />
      <section>
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="box">
          <div className="square" style={{ "--i": "0" }}></div>
          <div className="square" style={{ "--i": "1" }}></div>
          <div className="square" style={{ "--i": "2" }}></div>
          <div className="square" style={{ "--i": "3" }}></div>
          <div className="square" style={{ "--i": "4" }}></div>
          <div className="containerError">
            <h4 className="error">Algo ha salido mal</h4>
            <p className="errorMessage">{errorMessage}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Error;
