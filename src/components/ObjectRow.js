import React, { useState, useContext, Fragment } from "react";
import XYContext from "./xy-context";
import IncrDecreXY from "./Incr-DecreXY.js";

const ObjectRow = (props) => {
  var disabled = "none";
  if (props.object.controlType == "box") {
    disabled = "";
  } else {
    disabled = "none";
  }

  // console.log("Object row id"+props.object.id);

  return (
    <Fragment>
      <tr key={props.object.id}>
        <td>
          <input
            type="radio"
            name="row"
            value={props.object.id}
            onClick={() => {
              props.rowClickHandler(props.object.id);
            }}
          />
        </td>
        <td>{props.object.indexNum}</td>
        <td>
          <input
            type="text"
            name="type"
            value={props.object.controlType}
            onChange={(event) => {
              console.log("Event : ", event.target.value);
              props.setType(event.target.value,props.object.id);
            }}
          />
        </td>
        <td>
          <div className="quantity" style={{ pointerEvents: disabled }}>
            <button
              className="quantity__minus"
              onClick={(event) => {
                event.preventDefault();
                props.changeGap("-",props.object.id);
              }}
            >
              -
            </button>
            <span className="quantity__input" style={{ width: "25px" }}>
              {props.object.gap}
            </span>
            <button
              className="quantity__plus"
              value={props.object.value}
              onClick={(event) => {
                event.preventDefault();
                props.changeGap("+",props.object.id);
              }}
            >
              +
            </button>
          </div>
        </td>
        <td>
          <IncrDecreXY
            coardinate={"x"}
            value={props.object.x}
            XYChange={props.XYChange}
            id = {props.object.id}
          ></IncrDecreXY>
        </td>
        <td>
          <IncrDecreXY
            coardinate={"y"}
            value={props.object.y}
            XYChange={props.XYChange}
            id = {props.object.id}
          ></IncrDecreXY>
        </td>
        <td>
          <div className="quantity">
              <button
                className="quantity__minus"
                onClick={(event) => {
                  event.preventDefault();
                  props.changeFontSize("-",props.object.id);
                }}
              >
                -
              </button>
              <span className="quantity__input" style={{ width: "25px" }}>
                {props.object.fontSize}
              </span>
              <button
                className="quantity__plus"
                value={props.object.value}
                onClick={(event) => {
                  event.preventDefault();
                  props.changeFontSize("+",props.object.id);
                }}
              >
                +
              </button>
            </div>
        </td>
        <td>
          <input
            type="text"
            name="lable"
            value={props.object.lable}
            onChange={(event) => {
              props.setLable(event.target.value,props.object.id);
            }}
          />
        </td>
        <td>
          <input
            type="text"
            name="value"
            value={props.object.value}
            onChange={(event) => {
              props.setValue(event.target.value,props.object.id);
            }}
          />
        </td>
      </tr>
    </Fragment>
  );
};

export default ObjectRow;
