import { DataChess } from "../data/dataChess";
import { PieceInterface, pieceName, Team } from "../data/types";
import { renderTable } from "../Table/createTable";
import { PieceLogic } from "./PieceLogic";
import { coordinatesType } from "./PieceTypes";
export default class Piece{

    pieceLogic: PieceLogic;
    piecesIcon = new Map<`${pieceName}-${Team}`,string>([
        ["king-black",`&#x265A;`],
        ["lady-black", `&#x265B;`],
        ["tower-black", `&#x265C;`],
        ["bishop-black",`&#x265D;`],
        ["horse-black",`&#x265E;`],
        ["pawn-black",`&#x265F;`],
        ["king-white",`&#x2654;`],
        ["lady-white", `&#x2655;`],
        ["tower-white", `&#x2656;`],
        ["bishop-white",`&#x2657;`],
        ["horse-white",`&#x2658;`],
        ["pawn-white",`&#x2659;`],

    ]) 
    constructor(){
        this.pieceLogic = new PieceLogic();
        this.pieceLogic.actionShowPoints = this.showPointsPosition.bind(this);
        window.addEventListener("click", _=> this.removeAllPointsPosition())
    }

    renderPiece(piece: PieceInterface): HTMLElement{
        this.pieceLogic.gerenerateAttackPositionsByPiece(piece);
        const divPiece = document.createElement("div");
        divPiece.className = `team-${piece.team} pieceHtml color-${this.backgroundColor(piece.positionX, piece.positionY)}`;
        divPiece.innerHTML = this.piecesIcon.get(`${piece.name}-${piece.team}`) ?? "";
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
            this.pieceLogic.movePiece(coordinatesType,DataChess.initial.pieceFocus);
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