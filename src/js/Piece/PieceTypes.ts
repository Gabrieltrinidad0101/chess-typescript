import { PieceInterface } from "../data/types"
export type actionMethodType = (pieceInterface: PieceInterface) => void;
export type coordinatesType = { x: number, y: number, castling?: "left" | "right" }
export type pointPositionsType = Array<coordinatesType>
export type actionShowPointsType = (coordinatesType: coordinatesType) => void;
