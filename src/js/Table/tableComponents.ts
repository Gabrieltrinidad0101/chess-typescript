import { PieceInterface } from "../data/types";
import Piece from "../Piece/Piece";
import { pieceHtml } from "./types";


export const createRow = (row: Array<PieceInterface>, callBack: (pieceInterface: PieceInterface) => pieceHtml): HTMLElement => {
    const rowDiv: HTMLElement = document.createElement("div");
    row.forEach((pieceInterface) => {
        const containerPiece: HTMLElement = document.createElement("div");
        containerPiece.className = "containerPieceAndPointPosition";
        const pieceAndPointPosition = callBack(pieceInterface);
        containerPiece.appendChild(pieceAndPointPosition.divPiece);
        containerPiece.appendChild(pieceAndPointPosition.pointPosition);
        rowDiv.appendChild(containerPiece);
    });
    return rowDiv;
}


export const createPiece = (pieceInterface: PieceInterface): pieceHtml => {
    const piece = new Piece();
    return piece.renderPiece(pieceInterface);
}