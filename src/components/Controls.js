import React, { Fragment, useState } from "react";

import AddControl from "./AddControl";
import CreateProfileForm from "./CreateProfileForm";
import "../UI/controls.css";

const Controls = (props) => {
  const [enterControls, setControls] = useState();
  const [enterdState, setEnteredState] = useState(false);
  const getControls = (event) => {
    setControls(event.target.value);
    setEnteredState(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Fragment>
       
      <div className="controls">
        <form onSubmit={(event) => {event.preventDefault();
        props.saveControls()}}>
          <label>Enter No of Controls : </label>
          <input
            style={{width:"30%"}}
            type="number"
            onChange={(event) => {
              props.manageControls(event.target.value);
            }}
          />
          <button type="submit">Submit</button>
          <AddControl
            rowClickHandler={props.rowClickHandler}
            controls={props.controls}
            noOfControls={enterControls}
            setType={props.setType}
            setLable={props.setLable}
            setValue={props.setValue}
            XYChange={props.XYChange}
            changeGap={props.changeGap}
            changeFontSize={props.changeFontSize}
            page={props.page}
          ></AddControl>
          <button className="check" onClick={()=>props.dislayControls(props.controls)}>Check</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Controls;
