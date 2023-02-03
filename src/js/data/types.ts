export interface PieceInterface {
    name: string;
    positionX: number;
    positionY: number;
    hadMovie: boolean;
    team: "white" | "black";
}

export type dataChess = Array<PieceInterface>;

export interface InitialState{
    dataChess: Array<dataChess>
}
