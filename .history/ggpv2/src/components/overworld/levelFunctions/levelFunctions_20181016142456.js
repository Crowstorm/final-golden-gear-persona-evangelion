import _ from 'lodash';


export const characterMovement = (props, e, BLOCKED) => {
    switch (e.key) {
        case "ArrowUp": {
            let err = [];

            _.forEach(BLOCKED, cell => {
                if (props.position.y + 1 === cell.y && props.position.x === cell.x) {
                    err.push('blocked');
                }
            })
            if (err.length === 0) {
                props.moveCharUp();
            }
            break;
        }
        case "ArrowDown": {
            let err = [];

            _.forEach(BLOCKED, cell => {
                if (props.position.y - 1 === cell.y && props.position.x === cell.x) {
                    err.push('blocked');
                }
            })
            if (err.length === 0) {
                props.moveCharDown();
            }
            break;
        }
        case "ArrowLeft": {
            let err = [];

            _.forEach(BLOCKED, cell => {
                if (props.position.y === cell.y && props.position.x - 1 === cell.x) {
                    err.push('blocked');
                }
            })
            if (err.length === 0) {
                props.moveCharLeft();
            }
            break;
        }
        case "ArrowRight": {
            let err = [];

            _.forEach(BLOCKED, cell => {
                if (props.position.y === cell.y && props.position.x + 1 === cell.x) {
                    err.push('blocked');
                }
            })
            if (err.length === 0) {
                props.moveCharRight();
            }
            break;
        }
        default: { return }
    }
}