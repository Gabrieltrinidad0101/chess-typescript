import { PieceInterface } from "../../data/types";
import { PieceLogic } from "../PieceLogic";
import { pointPositionsType } from "../PieceTypes";
import { AnalysisPositions } from "../utils/analysisPositions";

export class Horse{
    analysisPositions: AnalysisPositions = new AnalysisPositions();
    generateAttackPositionsHorse(pieceInterface: PieceInterface) {
        this.analysisPositions.clearAttackPositions(pieceInterface);
        const listOfPositions: pointPositionsType = [
            [{ x: 2, y: 1 }],
            [{ x: 2, y: -1 }],
            [{ x: -2, y: 1 }],
            [{ x: -2, y: -1 }],
            [{ x: 1, y: 2 }],
            [{ x: -1, y: 2 }],
            [{ x: 1, y: -2 }],
            [{ x: -1, y: -2 }],
        ]
        this.analysisPositions.generatePointsPosition(listOfPositions, pieceInterface);
    }
}