import { DataChess } from "../data/dataChess";
import { PieceInterface, pieceName, Team } from "../data/types";
import { renderTable } from "../Table/createTable";
import { pieceHtml } from "../Table/types";
import { PieceLogic } from "./PieceLogic";
import { coordinatesType } from "./PieceTypes";
import { AnalysisPositions } from "./utils/analysisPositions"
export default class Piece {
    pieceLogic: PieceLogic;
    analysisPositions: AnalysisPositions = new AnalysisPositions();
    piecesIcon = new Map<`${pieceName}-${Team}`, string>([
        ["king-black", `&#x265A;`],
        ["lady-black", `&#x265B;`],
        ["tower-black", `&#x265C;`],
        ["bishop-black", `&#x265D;`],
        ["horse-black", `&#x265E;`],
        ["pawn-black", `&#x265F;`],
        ["king-white", `&#x2654;`],
        ["lady-white", `&#x2655;`],
        ["tower-white", `&#x2656;`],
        ["bishop-white", `&#x2657;`],
        ["horse-white", `&#x2658;`],
        ["pawn-white", `&#x2659;`],

    ])
    constructor() {
        this.pieceLogic = new PieceLogic();
        this.pieceLogic.actionShowPoints = this.showPointsPosition.bind(this);
        window.addEventListener("click", _ => this.removeAllPointsPosition())
    }

    renderPiece(pieceInterface: PieceInterface): pieceHtml {
        this.pieceLogic.gerenerateAttackPositionsByPiece(pieceInterface);
        const divPiece = document.createElement("div");
        divPiece.className = `team-${pieceInterface.team} pieceHtml color-${this.backgroundColor(pieceInterface.positionX, pieceInterface.positionY)}`;
        divPiece.innerHTML = this.piecesIcon.get(`${pieceInterface.name}-${pieceInterface.team}`) ?? "";
        divPiece.addEventListener("click", e => this.addEvent(e, pieceInterface))
        const pointPosition = this.createPointsPosition(pieceInterface);
        return { divPiece, pointPosition };
    }

    private removeAllPointsPosition() {
        document.querySelectorAll(".pointHtml").forEach((pointHtml) => {
            pointHtml.setAttribute("style", "visibility: hidden")
        })
    }

    private showPointsPosition(coordinatesType: coordinatesType) {
        const pointPosition = <HTMLElement>document.querySelector(`.position-${coordinatesType.x}-${coordinatesType.y}`)
        pointPosition?.setAttribute("style", "visibility: visible")
    }

    private createPointsPosition(pieceInterface: PieceInterface): HTMLElement {
        const pointPosition = document.createElement("div");
        pointPosition.className = `pointHtml position-${pieceInterface.positionX}-${pieceInterface.positionY}`
        pointPosition.addEventListener("click", _ => {
            for(const position of DataChess.initial.pieceFocus?.attackPosition ?? []){
                if (position.x !== pieceInterface.positionX || position.y !== pieceInterface.positionY) continue;
                this.pieceLogic.movePiece(position, DataChess.initial.pieceFocus);
                renderTable();
                break;
            }
        });
        return pointPosition;
    }


    addEvent(e: MouseEvent, piece: PieceInterface) {
        this.removeAllPointsPosition();
        e.stopPropagation();
        this.pieceLogic.showAttackPosition(piece);
    }

    backgroundColor(positionX: number, positionY: number): string {
        let color = positionX % 2 ? positionY % 2 == 0 : positionY % 2 != 0;
        return color ? "black" : "white";
    }
}