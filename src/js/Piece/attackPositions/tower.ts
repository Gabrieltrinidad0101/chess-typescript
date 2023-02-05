import { PieceInterface } from "../../data/types";
import { coordinatesType } from "../PieceTypes";
import { DataChess } from "../../data/dataChess";
import { AnalysisPositions } from "../utils/analysisPositions";

export class Tower{
    analysisPositions: AnalysisPositions = new AnalysisPositions();

    getLineOfTowerAttack(pieceInterface1: PieceInterface, x: number, y: number, coordinatesType: coordinatesType | void) {
        coordinatesType = {
            x: (coordinatesType?.x ?? pieceInterface1.positionX) + x,
            y: (coordinatesType?.y ?? pieceInterface1.positionY) + y,
        };
        const pieceInterface2 = DataChess.getPieceByPosition(coordinatesType);
        if (pieceInterface2 == undefined || pieceInterface2?.team != "space") {
            pieceInterface2?.team !== pieceInterface1.team &&
                (pieceInterface1.attackPosition?.push(coordinatesType));
            return;
        }
        pieceInterface1.attackPosition?.push(coordinatesType);
        this.getLineOfTowerAttack(pieceInterface1, x, y, coordinatesType)
    }

    generateAttackPositionsTower(pieceInterface1: PieceInterface) {
        this.getLineOfTowerAttack(pieceInterface1, 1, 0)
        this.getLineOfTowerAttack(pieceInterface1, -1, 0)
        this.getLineOfTowerAttack(pieceInterface1, 0, 1)
        this.getLineOfTowerAttack(pieceInterface1, 0, -1)
    }

}