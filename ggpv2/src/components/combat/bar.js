import './combat.css';

import React from 'react';

export const Bar = (props) => {
    return (
        <div className="bar">
            {/* <Filler percentage={props.percentage} side={props.side} type={props.type} /> */}
            <Value percentage={props.percentage} />
        </div>
    )
}

export const Filler = (props) => {
    console.log(props)
    if (props.side === 'ally') {
        return (
            <div className="barFiller" style={{
                height: `${props.percentage}%`, background: "#a51d1d"
            }}>
                {/* {props.percentage} */}
            </div>
        )
    }
    return (
        <div className="barFiller" style={{ height: `${props.percentage}%` }}>

        </div>
    )
}

const Value = (props) =>{
    return(
        <div className="barText " style={{transform: "rotate(-90deg)", color: "white", }}>
            {props.percentage}
        </div>
    )
}