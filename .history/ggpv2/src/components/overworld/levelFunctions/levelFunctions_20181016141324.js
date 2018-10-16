export const handleKeyDown = (e, BLOCKED, position) => {
    switch (e.key) {
        case "ArrowUp": {
            let err = [];

            _.forEach(BLOCKED, cell => {
                if (position.y + 1 === cell.y && position.x === cell.x) {
                    err.push('blocked');
                }
            })
            if (err.length === 0) {
                this.props.moveCharUp();
            }
            break;
        }
        case "ArrowDown": {
            let err = [];

            _.forEach(BLOCKED, cell => {
                if (position.y - 1 === cell.y && position.x === cell.x) {
                    err.push('blocked');
                }
            })
            if (err.length === 0) {
                this.props.moveCharDown();
            }
            break;
        }
        case "ArrowLeft": {
            let err = [];

            _.forEach(BLOCKED, cell => {
                if (position.y === cell.y && position.x - 1 === cell.x) {
                    err.push('blocked');
                }
            })
            if (err.length === 0) {
                this.props.moveCharLeft();
            }
            break;
        }
        case "ArrowRight": {
            let err = [];

            _.forEach(BLOCKED, cell => {
                if (position.y === cell.y && position.x + 1 === cell.x) {
                    err.push('blocked');
                }
            })
            if (err.length === 0) {
                this.props.moveCharRight();
            }
            break;
        }
        default: { return }
    }
}