import { coordinatesType } from "../Piece/PieceTypes";

export type Team = "white" | "black" | "space";

export interface PieceInterface {
    name: string;
    positionX: number;
    positionY: number;
    hadMovie: boolean;
    team: Team;
    attackPosition?: Array<coordinatesType>,
}

export type dataChess = Array<PieceInterface>;

export type BasicPieceInterface = {
    name: string;
    team: Team;
}



export interface InitialState{
    dataChess: Array<dataChess>,
    pieceFocus?: PieceInterface,
    turn: "white" | "black";
}
