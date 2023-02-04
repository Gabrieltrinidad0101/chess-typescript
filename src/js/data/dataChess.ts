import { dataChess, InitialState, PieceInterface } from "./types"
import { coordinatesType } from "../Piece/PieceTypes";

export class DataChess {
    static initial: InitialState;

    static {
        const dataChess = new Array<dataChess>();
        for (let i = 0; i < 8; i++) {
            const row = new Array<PieceInterface>();
            for (let j = 0; j < 8; j++) {
                row.push({
                    name: `${i}-${j}`,
                    positionX: i,
                    positionY: j,
                    hadMovie: false,
                    team: "space",
                    attackPosition: [],
                })
            }
            dataChess.push(row);
        }
        this.initial = { dataChess };
        const piece1 = this.initial.dataChess[4][6];
        const piece2 = this.initial.dataChess[3][4];
        const piece3 = this.initial.dataChess[1][4];
        piece1.name = 'horse';
        piece1.team = "black"
        piece2.name = 'horse';
        piece2.team = "black";
        piece3.name = "tower";
        piece3.team = "black";
    }

    static getPieceByPosition(coordinatesType: coordinatesType): PieceInterface | void {
        if (!this.initial?.dataChess) return;
        if (!this.initial.dataChess[coordinatesType.x]) return;
        return this.initial.dataChess[coordinatesType.x][coordinatesType.y];
    }
}