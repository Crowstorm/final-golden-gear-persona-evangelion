// import {MOVE_CHAR, MOVE_CHAR_UP, MOVE_CHAR_DOWN, MOVE_CHAR_RIGHT, MOVE_CHAR_LEFT}  from '../actions/types';
import front from '../assets/front.gif'
import back from '../assets/back.gif'
import left from '../assets/left.gif'
import right from '../assets/right.gif'


let initial_state = {
    x: 12,
    y: 2,
    model: back
}



export default (state = initial_state, action) => {
    switch (action.type) {
        case 'MOVE_CHAR':{
            return {
                x: action.x,
                y: action.y
            }
        }
        case 'MOVE_CHAR_UP':{
            return  Object.assign({}, state, {
                y: state.y+1,
                model: back
            })
        }
        case 'MOVE_CHAR_DOWN':{
            return  Object.assign({}, state, {
                y: state.y-1,
                model: front
            })
        }
        case 'MOVE_CHAR_RIGHT':{
            return  Object.assign({}, state, {
                x: state.x+1,
                model: right
            })
        }
        case 'MOVE_CHAR_LEFT':{
            return{
                ...state,
                x: state.x-1,
                model: left
            }
        }
        case 'SET_CHARACTER_POSITION':{
            return{
                ...state,
                x: action.x,
                y: action.y       
            }
        }
        default: {
            return state;
        }
    }
}