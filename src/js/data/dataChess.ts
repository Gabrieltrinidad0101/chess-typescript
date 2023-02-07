import { BasicPieceInterface, dataChess, InitialState, PieceInterface } from "./types"
import { coordinatesType } from "../Piece/PieceTypes";

export class DataChess {
    static initial: InitialState;
    private static chess: Array<Array<BasicPieceInterface>> = [
        [{name: "tower", team: "black"},{name: "pawn", team: "black"},{name: "", team: "space"},{name: "", team: "space"},{name: "", team: "space"},{name: "", team: "space"},{name: "pawn", team: "white"},{name: "tower", team: "white"}],
        [{name: "horse", team: "black"},{name: "pawn", team: "black"},{name: "", team: "space"},{name: "", team: "space"},{name: "", team: "space"},{name: "", team: "space"},{name: "pawn", team: "white"},{name: "horse", team: "white"}],
        [{name: "bishop", team: "black"},{name: "pawn", team: "black"},{name: "", team: "space"},{name: "", team: "space"},{name: "", team: "space"},{name: "", team: "space"},{name: "pawn", team: "white"},{name: "bishop", team: "white"}],
        [{name: "rey", team: "black"},{name: "pawn", team: "black"},{name: "", team: "space"},{name: "", team: "space"},{name: "", team: "space"},{name: "", team: "space"},{name: "pawn", team: "white"},{name: "rey", team: "white"}],
        [{name: "lady", team: "black"},{name: "pawn", team: "black"},{name: "", team: "space"},{name: "", team: "space"},{name: "", team: "space"},{name: "", team: "space"},{name: "pawn", team: "white"},{name: "lady", team: "white"}],
        [{name: "bishop", team: "black"},{name: "pawn", team: "black"},{name: "", team: "space"},{name: "", team: "space"},{name: "", team: "space"},{name: "", team: "space"},{name: "pawn", team: "white"},{name: "bishop", team: "white"}],
        [{name: "horse", team: "black"},{name: "pawn", team: "black"},{name: "", team: "space"},{name: "", team: "space"},{name: "", team: "space"},{name: "", team: "space"},{name: "pawn", team: "white"},{name: "horse", team: "white"}],
        [{name: "tower", team: "black"},{name: "pawn", team: "black"},{name: "", team: "space"},{name: "", team: "space"},{name: "", team: "space"},{name: "", team: "space"},{name: "pawn", team: "white"},{name: "tower", team: "white"}]
    ];

    static {

        const dataChess = new Array<dataChess>();

        for (let i = 0; i < this.chess.length; i++) {
            const row = new Array<PieceInterface>();
            for (let j = 0; j < this.chess[i].length; j++) {
                row.push({
                    name: this.chess[i][j].name,
                    positionX: i,
                    positionY: j,
                    hadMovie: false,
                    team: this.chess[i][j].team,
                    attackPosition: []
                })
            }
            dataChess.push(row);
        }
        this.initial = { dataChess, turn: "white" };
    }


    static getPieceByPosition(coordinatesType: coordinatesType): PieceInterface | undefined {
        if (!this.initial?.dataChess) return;
        if (!this.initial.dataChess[coordinatesType?.x]) return;
        return this.initial.dataChess[coordinatesType.x][coordinatesType.y];
    }

    static getPositionsOfAttack(pieceInterface1: PieceInterface,coordinatesType1: coordinatesType): boolean{
        this.initial.dataChess
        for(const row of this.initial.dataChess){
            for(const pieceInterface2 of row ){
                for(const coordinatesType of pieceInterface2.attackPosition ?? []){
                    if(coordinatesType.x === coordinatesType1.x && 
                    coordinatesType.y === coordinatesType1.y &&
                    pieceInterface1.team !== pieceInterface2.team) return true;
                }
            }
        }
        return false;
    }
}