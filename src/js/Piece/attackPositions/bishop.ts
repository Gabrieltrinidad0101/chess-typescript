import { PieceInterface } from "../../data/types";
import { coordinatesType } from "../PieceTypes";
import { AnalysisPositions } from "../utils/analysisPositions";

export class Bishop{
    analysisPositions: AnalysisPositions = new AnalysisPositions();

    generateAttackPositions(pieceInterface: PieceInterface) {
        const positions: Array<coordinatesType> = [
            {x: 1,y: 1},
            {x: -1,y: -1},
            {x: -1,y: 1},
            {x: 1,y: -1},
        ];
        this.analysisPositions.generateLinesAttackPosition({
            pieceInterface:  pieceInterface,
            limit: Infinity,
            pieceNoAttack: [pieceInterface.team],
            pieceAttack: pieceInterface.team === "black" ? "white" : "black"
        },positions);
    }
}