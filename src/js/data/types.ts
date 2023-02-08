import { coordinatesType } from "../Piece/PieceTypes";

export type Team = "white" | "black" | "space";
export type pieceName = "pawn" | "horse" | "tower" | "king" | "lady" | "bishop" | ""
export interface PieceInterface {
    name: pieceName;
    positionX: number;
    positionY: number;
    hadMovie: boolean;
    team: Team;
    attackPosition?: Array<coordinatesType>,
}

export type dataChess = Array<PieceInterface>;

export type BasicPieceInterface = {
    name: pieceName;
    team: Team;
}



export interface InitialState{
    dataChess: Array<dataChess>,
    pieceFocus?: PieceInterface,
    turn: "white" | "black";
}
