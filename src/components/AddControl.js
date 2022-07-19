import React, { useContext, useState } from "react";
import ObjectRow from "./ObjectRow";
import ControlContext from "./control-context";
const AddControl = (props) => {
  // const ctx = useContext(ControlContext);
  // const rowObjeccts = [];
  const filterRows = props.controls.cntl.filter((row) => {
    return row.pageNum == props.page;
  });
  console.log("Filtered row " + filterRows.length);
  const rows = [];
  if (filterRows.length > 0) {
    // console.log("id " + filterRows[0].id);
    let id = filterRows[0].id;
    console.log("Filter row id",id);
    for (let i = id; i < id+  filterRows.length; i++) {
      rows.push(
        <ObjectRow
          rowClickHandler={props.rowClickHandler}
          setType={props.setType}
          setLable={props.setLable}
          setValue={props.setValue}
          XYChange={props.XYChange}
          object={props.controls.cntl[i]}
          changeGap={props.changeGap}
          changeFontSize={props.changeFontSize}
          key={props.controls.cntl[i].id}
        />
      );
    }
  }
  // console.log(filterRows[0]);

  return (
    <div>
      <table border={2}>
        <thead>
          <tr>
            <th></th>
            <th>Index</th>
            <th>Type</th>
            <th>Gap</th>
            <th>X</th>
            <th>Y</th>
            <th>Font Size</th>
            <th>Lable</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default AddControl;
