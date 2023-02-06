import { PieceInterface } from "../../data/types";
import { coordinatesType, pointPositionsType } from "../PieceTypes";
import { DataChess } from "../../data/dataChess";
import { AnalysisPositions } from "../utils/analysisPositions";

export class Tower{
    analysisPositions: AnalysisPositions = new AnalysisPositions();

    generateAttackPositions(pieceInterface: PieceInterface) {
        const positions: Array<coordinatesType> = [
            {x: 1,y: 0},
            {x: 0,y: -1},
            {x: 0,y: 1},
            {x: 1,y: -1},
        ];
        this.analysisPositions.generateLinesAttackPosition({
            pieceInterface,
            limit: Infinity,
            pieceNoAttack: [pieceInterface.team]
        },positions);
    }
}