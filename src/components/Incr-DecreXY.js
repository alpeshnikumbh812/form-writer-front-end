import React from "react";
import '../UI/incr_decr_xy.css'

const IncrDecreXY = (props) => {

    return (
        <div className="quantity">
            {/* <input type="button" value="-"> */}
            <button className="quantity__minus" value={props.value} onClick={(event)=>{
                event.preventDefault();
                props.XYChange(props.coardinate,'-',props.id)}}>-</button>
            <span className="quantity__input">{props.value}</span>
            <button className="quantity__plus" value={props.value} onClick={(event) => {
                event.preventDefault();
                props.XYChange(props.coardinate,'+',props.id)}}>+</button>
        </div>
    )
}

export default IncrDecreXY;