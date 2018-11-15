import React from 'react';
import { MAIN_GRID } from '../../components/overworld/grids/grids';
import _ from 'lodash';

class gridBlocker extends React.Component {
    state = {
        blocked: [
            
        ]
    }

    addBlocked(x, y) {
        //sprawdz czy juz jest w state
        let wasBlocked = false;
        const cell = {
            x: x,
            y: y
        }

        this.state.blocked.forEach((blocked, index) => {
            if (blocked.x === x & blocked.y === y) {
                wasBlocked = true;
                let list = this.state.blocked;
                list.splice(index, 1)
                this.setState({
                    blocked: list
                })
            }
        })

        if (wasBlocked === false) {
            this.setState({
                blocked: [...this.state.blocked, cell]
            })
        }
        // console.log(this.state, output)
    }

    generateGrid = () =>{
        let output = ``;
        this.state.blocked.forEach((blocked) => {
            output += '{x:';
            output += blocked.x;
            output += ',';
            output += 'y:';
            output += blocked.y;
            output += "}";
            output += ',';
        })
        console.log(output)
    }

    renderMainGrid = () => {
        return _.map(MAIN_GRID, row => {
            return <div key={`row${row[0].y}`} className="row" style={{ margin: 0, boxSizing: 'border-box' }}> {_.map(row, cell => {
                let color;
                let isBlocked = false;

                this.state.blocked.forEach((blocked) => {
                    if (blocked.x === cell.x && blocked.y === cell.y) {
                        isBlocked = true;
                        return;
                    }
                })

                if (isBlocked === true) {
                    color = "rgba(200,0,0,0.5)"
                } else {
                    "rgba(100,100,100,0.5)"
                }

                return <div
                    key={cell.x + '.' + cell.y}
                    id={'d' + cell.x + '_' + cell.y}
                    className="gridCell"
                    style={{ border: "1px solid green", backgroundColor: color }}
                    onClick={() => this.addBlocked(cell.x, cell.y)}
                >
                </div>
            })
            } </div>
        })
    };
    render() {
        return (
            <div style={{ zIndex: 1000, width: "100%", height: "100%", position: "absolute" }}>
                {this.renderMainGrid()}
                <button onClick={()=> this.generateGrid()}>Generuj</button>
            </div>
        )
    }
}

export default gridBlocker;