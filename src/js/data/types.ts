import { coordinatesType } from "../Piece/PieceTypes";

export interface PieceInterface {
    name: string;
    positionX: number;
    positionY: number;
    hadMovie: boolean;
    team: "white" | "black" | "space";
    attackPosition?: Array<coordinatesType>,
}

export type dataChess = Array<PieceInterface>;

export interface InitialState{
    dataChess: Array<dataChess>,
    pieceFocus?: PieceInterface,
    turn: "white" | "black";
}
