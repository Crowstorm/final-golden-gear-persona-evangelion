import './combat.css';

import React from 'react';

export const Bar = (props) => {
    const percentage = 100 - props.current * 100 / props.max;
    let barColor = (props.type === 'health') ? "#1DA598" : "#007efb";
    let margin = (props.type === 'health') ? "24px" : "8px";

    if(props.max === 0){
        barColor = "#808d9a"
    }

    return (
        <div className="bar" style={{ background: barColor, marginLeft: margin, border: "1px solid silver" }}>
            <Filler
                height={percentage}
                side={props.side}
                type={props.type}
            />
            <Value
                side={props.side}
                max={props.max}
                current={props.current}
            />
        </div>
    )
}

export const Filler = (props) => {
    let barColor = (props.type === 'health') ? "#a51d1d" : "#5a00e4";

    return (
        <div className="barFiller"
            style={{
                height: `${props.height}%`,
                background: barColor
            }}>
        </div>
    )
}

const Value = (props) => {
    const value = ( props.side === 'ally') ? `${props.current}/${props.max}` : '';

    return (
        <div className="barText d-flex justify-content-center align-items-center flex-direction-row">
            {value}
        </div>
    )
}