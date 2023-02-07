import { PieceInterface } from "../../data/types";
import { coordinatesType } from "../PieceTypes";
import { AnalysisPositions } from "../utils/analysisPositions";

export class Tower{
    analysisPositions: AnalysisPositions = new AnalysisPositions();

    generateAttackPositions(pieceInterface: PieceInterface) {
        const positions: Array<coordinatesType> = [
            {x: 1,y: 0},
            {x: 0,y: -1},
            {x: 0,y: 1},
            {x: -1,y: 0},
        ];
        this.analysisPositions.generateLinesAttackPosition({
            pieceInterface,
            limit: Infinity,
            pieceNoAttack: [pieceInterface.team],
            pieceAttack: pieceInterface.team === "black" ? "white" : "black"
        },positions);
    }
}