import { PieceInterface } from "../data/types";
import { PieceLogic } from "./PieceLogic";
import { coordinatesType } from "./PieceTypes";
export default class Piece{

    pieceLogic: PieceLogic;
    constructor(){
        this.pieceLogic = new PieceLogic();
        this.pieceLogic.actionShowPoints = this.showPointsPosition;
        window.addEventListener("click", _=> this.removeAllPointsPosition())
    }

    renderPiece(piece: PieceInterface): HTMLElement{
        const divPiece = document.createElement("div");
        divPiece.className = `pieceHtml color-${this.backgroundColor(piece.positionX, piece.positionY)}`;
        divPiece.textContent = piece.name;
        divPiece.addEventListener("click",e=>this.addEvent(e,piece))
        return divPiece;
    }

    private removeAllPointsPosition(){
        document.querySelectorAll(".pointHtml").forEach((pointHtml)=>{
            pointHtml.setAttribute("style","visibility: hidden")
        })
    }
    
    private showPointsPosition(coordinatesType: coordinatesType) {
        const pointPosition = <HTMLElement>document.querySelector(`.position-${coordinatesType.x}-${coordinatesType.y}`)
        pointPosition?.setAttribute("style", "visibility: visible")
    }
    
    addEvent(e: MouseEvent, piece: PieceInterface){
        this.removeAllPointsPosition();
        e.stopPropagation();
        const action = this.pieceLogic.actions.get(piece.name);
        action && action(piece);
    }

    backgroundColor(positionX: number,positionY: number): string{
        let color = positionX % 2 ? positionY % 2 == 0 : positionY % 2 != 0;
        return color ? "black" : "white";
    }
}