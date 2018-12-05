import './combat.css';

import React from 'react';

export const Bar = (props) =>{
    return(
        <div className="bar">
            <Filler percentage={props.percentage}/>
        </div>
    )
}

export const Filler = (props) =>{
    console.log(props)
    return(
        <div className="barFiller" style={{height: `${props.percentage}%`}}>

        </div>
    )
}