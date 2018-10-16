export const handleKeyDown = (props, e, BLOCKED) => {
    switch (e.key) {
        case "ArrowUp": {
            let err = [];

            _.forEach(BLOCKED, cell => {
                if (this.props.position.y + 1 === cell.y && this.props.position.x === cell.x) {
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
                if (this.props.position.y - 1 === cell.y && this.props.position.x === cell.x) {
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
                if (this.props.position.y === cell.y && this.props.position.x - 1 === cell.x) {
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
                if (this.props.position.y === cell.y && this.props.position.x + 1 === cell.x) {
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