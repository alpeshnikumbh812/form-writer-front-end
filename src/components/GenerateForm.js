import React, { useState } from "react";
import "../UI/generate-form.css";

const GenerateForm = (props) => {
  console.log("Inside generate : ", props.object);
  const [isVisible, setIsVisible] = useState(false);

  let row = [];

  for (let i = 0; i < props.object.cntl.length; i++) {
    row.push(
      <tr key={props.object.cntl[i].id}>
        <td>{props.object.cntl[i].lable}</td>
        <td>
          <input
            type="text"
            value={props.object.cntl[i].value}
            onChange={(event) =>
              props.setValue(event.target.value, props.object.cntl[i].id)
            }
          ></input>
        </td>
      </tr>
    );
  }

  const downloadPdf = () => {
    console.log(props.object);
    props.dislayControls(props.object);
    setIsVisible(true);
    // fetch(
    //   "http://localhost:8080/form-filling/profile/download-file/" +
    //     props.profileId
    // );
  };

  return (
    <div className="generate-form-main-div">
      <div className="generate-form">
        <div className="tbl-header">
          <table>
            <thead>
              <tr>
                <th>Lable</th>
                <th>Value</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table>
            <tbody>
              {row}
              <tr>
                <td colSpan="2">
                  <button onClick={downloadPdf}>Generate PDF</button>
                </td>
              </tr>
              {isVisible && <tr>
                <td colSpan="2">
                  <a
                    target="_blank"
                    href={
                      "http://localhost:8080/form-filling/profile/download-file/" +
                      props.profileId
                    }
                  >Download PDF</a>
                </td>
              </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GenerateForm;
