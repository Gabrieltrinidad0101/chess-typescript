import { PieceInterface } from "../data/types";
import { renderTable } from "../Table/createTable";
import { PieceLogic } from "./PieceLogic";
import { coordinatesType } from "./PieceTypes";
export default class Piece{

    pieceLogic: PieceLogic;
    constructor(){
        this.pieceLogic = new PieceLogic();
        this.pieceLogic.actionShowPoints = this.showPointsPosition.bind(this);
        window.addEventListener("click", _=> this.removeAllPointsPosition())
    }

    renderPiece(piece: PieceInterface): HTMLElement{
        this.pieceLogic.gerenerateAttackPositionsByPiece(piece);
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
        pointPosition?.addEventListener("click",_=>{
            this.pieceLogic.movePiece(coordinatesType);
            renderTable();
        });
    }

    
    addEvent(e: MouseEvent, piece: PieceInterface){
        this.removeAllPointsPosition();
        e.stopPropagation();
        this.pieceLogic.showAttackPosition(piece);
    }

    backgroundColor(positionX: number,positionY: number): string{
        let color = positionX % 2 ? positionY % 2 == 0 : positionY % 2 != 0;
        return color ? "black" : "white";
    }
}