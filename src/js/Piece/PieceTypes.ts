import { PieceInterface } from "../data/types"
export type actionMethodType = (pieceInterface: PieceInterface) => void;
export type coordinatesType = { x: number, y: number }
export type pointPositionsType = Array<Array<coordinatesType>>
export type actionShowPointsType = (coordinatesType: coordinatesType) => void;
