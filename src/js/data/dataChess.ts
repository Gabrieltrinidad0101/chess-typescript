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
                    name: ``,
                    positionX: i,
                    positionY: j,
                    hadMovie: false,
                    team: "space",
                    attackPosition: [],
                    canNoMoveToAttackPosition: false
                })
            }
            dataChess.push(row);
        }
        this.initial = { dataChess, turn: "white" };
        const piece1 = this.initial.dataChess[4][3];
        const piece2 = this.initial.dataChess[1][2];
        const piece3 = this.initial.dataChess[7][4];
        const piece4 = this.initial.dataChess[1][4];
        piece1.name = 'horse';
        piece1.team = "black"
        piece2.name = 'horse';
        piece2.team = "black";
        piece3.name = "tower";
        piece3.team = "white";
        piece4.name = "rey";
        piece4.team = "white";
        piece1.canNoMoveToAttackPosition = true

    }


    static getPieceByPosition(coordinatesType: coordinatesType): PieceInterface | void {
        if (!this.initial?.dataChess) return;
        if (!this.initial.dataChess[coordinatesType.x]) return;
        return this.initial.dataChess[coordinatesType.x][coordinatesType.y];
    }

    static existAttackPosition(pieceInterface: PieceInterface,coordinatesType1: coordinatesType): boolean{
        for(const row of this.initial.dataChess){
            for(const pieceInterface of row){
                if(pieceInterface.name == pieceInterface.name && pieceInterface.team)
                for(const coordinatesType2 of pieceInterface.attackPosition ?? []){
                    if(coordinatesType2.x == coordinatesType1.x && coordinatesType2.y == coordinatesType1.y ){
                        return true;
                    }
                }
            }
        }
        return false;
    }
}