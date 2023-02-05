import { PieceInterface } from "../../data/types"
import { DataChess } from "../../data/dataChess";
import { actionShowPointsType, actionMethodType, pointPositionsType, coordinatesType } from "./PieceTypes";

export class AnalysisPositions{
    actionShowPoints?: actionShowPointsType;

    clearAttackPositions(pieceInterface: PieceInterface){
        pieceInterface.attackPosition = [];
    }

    private generatePointsPosition(positions: pointPositionsType, pieceInterface: PieceInterface) {
        positions.forEach(position => {
            position.forEach(coordinatesType => {
                this.calculatePointPosition({
                    x: coordinatesType.x + pieceInterface.positionX,
                    y: coordinatesType.y + pieceInterface.positionY
                }, pieceInterface);
            })
        })
    }

    private calculatePointPosition(coordinatesType: coordinatesType, pieceInterface1: PieceInterface) {
        const pieceInterface2 = DataChess.getPieceByPosition(coordinatesType);
        if (pieceInterface2 && pieceInterface1.team === pieceInterface2.team) return;
        pieceInterface1.attackPosition?.push(coordinatesType);
    }

    movePiece(coordinatesType: coordinatesType) {
        if (!DataChess.initial.pieceFocus) return;
        DataChess.initial.turn = DataChess.initial.turn === "white" ? "black" : "white"; 
        const pieceFocus = DataChess.initial.pieceFocus;
        const pieceFocusCopy = {...DataChess.initial.pieceFocus};
        const dataChess = DataChess.initial.dataChess;
        pieceFocusCopy.positionX = coordinatesType.x;
        pieceFocusCopy.positionY = coordinatesType.y;
        dataChess[coordinatesType.x][coordinatesType.y] = pieceFocusCopy as PieceInterface;
        dataChess[pieceFocus.positionX][pieceFocus.positionY] = {
            name: ``,
            positionX: pieceFocus.positionX,
            positionY: pieceFocus.positionY,
            hadMovie: false,
            team: "space",
            attackPosition: [],
        };
    }

    showAttackPosition(pieceInterface: PieceInterface) {
        console.log(DataChess.initial.turn,"   ",pieceInterface.team);
        if(DataChess.initial.turn !== pieceInterface.team) return;
        DataChess.initial.pieceFocus = pieceInterface;
        this.showPointsPosition(pieceInterface.attackPosition)
    }


    private showPointsPosition(listOfCoordinatesType?: Array<coordinatesType>) {
        listOfCoordinatesType?.forEach((coordinatesType) => {
            if (this.actionShowPoints === undefined) return;
            this.actionShowPoints(coordinatesType)
        })
    }


}