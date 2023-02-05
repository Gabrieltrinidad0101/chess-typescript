import { PieceInterface } from "../../data/types"
import { DataChess } from "../../data/dataChess";
import { actionShowPointsType, coordinatesType } from "../PieceTypes";
import { AttackPositions } from "./analysisPositionsType";

export class AnalysisPositions{
    actionShowPoints?: actionShowPointsType;

    clearAttackPositions(pieceInterface: PieceInterface){
        pieceInterface.attackPosition = [];
    }

    public generateAttckPositions(attackPositions: AttackPositions) {
        attackPositions.positions.forEach(position => {
            position.forEach(coordinatesType => {
                this.calculatePointPosition({
                    x: coordinatesType.x + attackPositions.pieceInterface.positionX,
                    y: coordinatesType.y + attackPositions.pieceInterface.positionY
                }, attackPositions.pieceInterface);
            })
        })
    }

    private calculatePointPosition(coordinatesType: coordinatesType, pieceInterface1: PieceInterface) {
        const pieceInterface2 = DataChess.getPieceByPosition(coordinatesType);
        if (pieceInterface2 && pieceInterface1.team === pieceInterface2.team) return;
        pieceInterface1.attackPosition?.push(coordinatesType);
    }
}