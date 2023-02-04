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
        const piece1 = this.initial.dataChess[3][5];
        const piece2 = this.initial.dataChess[1][6];
        piece1.name = 'horse';
        piece2.name = 'horse';
    }
}