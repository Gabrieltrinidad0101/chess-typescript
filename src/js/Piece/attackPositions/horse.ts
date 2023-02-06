import { PieceInterface } from "../../data/types";
import { pointPositionsType } from "../PieceTypes";
import { AnalysisPositions } from "../utils/analysisPositions";

export class Horse{
    analysisPositions: AnalysisPositions = new AnalysisPositions();
    generateAttackPositions(pieceInterface: PieceInterface) {
        const positions: pointPositionsType = [
            { x: 2, y: 1 },
            { x: 2, y: -1 },
            { x: -2, y: 1 },
            { x: -2, y: -1 },
            { x: 1, y: 2 },
            { x: -1, y: 2 },
            { x: 1, y: -2 },
            { x: -1, y: -2 },
        ]
        this.analysisPositions.generateAttckPositions(
            positions,
            pieceInterface,
        );
    }
}