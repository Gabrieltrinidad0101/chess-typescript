import { PieceInterface } from "../../data/types";
import { pointPositionsType } from "../PieceTypes";
import { AnalysisPositions } from "../utils/analysisPositions";

export class Rey{
    analysisPositions: AnalysisPositions = new AnalysisPositions();

    generateAttackPositions(pieceInterface: PieceInterface){
        const positions: pointPositionsType = [
            [{ x: 1, y: 0 }],
            [{ x: 1, y: -1 }],
            [{ x: 0, y: -1 }],
            [{ x: -1, y: -1 }],
            [{ x: -1, y: 0 }],
            [{ x: -1, y: 1 }],
            [{ x: 0, y: 1 }],
            [{ x: 1, y: 1 }],
        ]
        this.analysisPositions.generateAttckPositions(positions,pieceInterface);
    }
}