import { DataChess } from "../../data/dataChess";
import { PieceInterface } from "../../data/types";
import { coordinatesType, pointPositionsType } from "../PieceTypes";
import { AnalysisPositions } from "../utils/analysisPositions";

export class Pawn {
    analysisPositions: AnalysisPositions = new AnalysisPositions();

    generateAttackPositions(pieceInterface1: PieceInterface) {
        const direction = pieceInterface1.team === "black" ? 1 : -1;
        const positions: Array<coordinatesType> = pieceInterface1.hadMovie ? 
            [{ x: 0, y: 1 * direction}]
         : 
            [{ x: 0, y: 2 * direction },{ x: 0, y: 1 * direction}]
        this.analysisPositions.generateLinesAttackPosition({
            pieceInterface: pieceInterface1,
            limit: 2,
            pieceNoAttack: ["black","white"]
        },positions);

        // this.analysisPositions.generateAttckPositionsCallBack(positions,pieceInterface1, (coordinatesType:coordinatesType )=>{
        //     const pieceInterface2 = DataChess.getPieceByPosition(coordinatesType);
        //     if(pieceInterface2 === undefined || pieceInterface2?.team !== "space") return;
        //     pieceInterface1.attackPosition?.push(coordinatesType);
        // });
    }
}