import {dataChess,InitialState,PieceInterface} from "./types"
export class DataChess {
    static initial: InitialState;

    static{
        const dataChess = new Array<dataChess>();
        for(let i =0; i < 8; i++){
            const row = new Array<PieceInterface>();
            for(let j =0; j < 8; j++){
                row.push({
                    name: "",
                    positionX: i,
                    positionY: j,
                    hadMovie: false,
                    team: "white"
                })
            }
            dataChess.push(row);
        }
        this.initial = {dataChess};
        this.initial.dataChess[0][0] = {name: 'horse', team: "black",positionX: 0,positionY: 0, hadMovie: false};
    }
}