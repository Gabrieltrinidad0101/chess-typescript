import { PieceInterface } from "../data/types";
import { PieceLogic } from "./PieceLogic";

export default class Piece{

    pieceLogic: PieceLogic;
    constructor(){
        this.pieceLogic = new PieceLogic();
    }

    renderPiece(piece: PieceInterface): HTMLElement{
        const divPiece = document.createElement("div");
        divPiece.className = `pieceHtml color-${this.backgroundColor(piece.positionX, piece.positionY)}`;
        divPiece.textContent = piece.name;
        divPiece.addEventListener("click",_=>this.addEvent(piece))
        return divPiece;
    }

    addEvent(piece: PieceInterface){
        const action = this.pieceLogic.actions.get(piece.name);
        if(!action) return;
        action(piece);
    }

    backgroundColor(positionX: number,positionY: number): string{
        let color = positionX % 2 ? positionY % 2 == 0 : positionY % 2 != 0;
        return color ? "black" : "white";
    }
}