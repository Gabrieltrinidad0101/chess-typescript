import { DataChess } from "../../data/dataChess";
import { PieceInterface } from "../../data/types";
import { coordinatesType, pointPositionsType } from "../PieceTypes";
import { AnalysisPositions } from "../utils/analysisPositions";

export class Rey{
    analysisPositions: AnalysisPositions = new AnalysisPositions();

    generateAttackPositions(pieceInterface: PieceInterface){
        const positions: pointPositionsType = [
            { x: 1, y: 0 },
            { x: 1, y: -1 },
            { x: 0, y: -1 },
            { x: -1, y: -1 },
            { x: -1, y: 0 },
            { x: -1, y: 1 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
        ]
        this.castlingPositions(pieceInterface);
        this.analysisPositions.generateAttckPositions(positions,pieceInterface);
    }

    castlingPositions(pieceInterface: PieceInterface){
        const castling1: pointPositionsType = [
            { x: -1, y: 0 },
            { x: -2, y: 0 }
        ]

        const castling2: pointPositionsType = [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 },
        ]

        this.castling(castling1,pieceInterface);
        this.castling(castling2,pieceInterface);
    }

    castling(positions: pointPositionsType,pieceInterface: PieceInterface){
        let isAttackPosition1 = false;
        this.analysisPositions.generateAttckPositionsCallBack(positions,pieceInterface,(coordinatesType:coordinatesType)=>{
            if(isAttackPosition1) return;
            isAttackPosition1 = DataChess.getPositionsOfAttack(pieceInterface,coordinatesType) || 
            (DataChess.getPieceByPosition(coordinatesType)?.team !== "space");
        });
        if(isAttackPosition1) return;
        this.analysisPositions.generateAttckPositionsCallBack(positions,pieceInterface,(coordinatesType:coordinatesType) => {
            pieceInterface.attackPosition?.push(coordinatesType)
        });
    }

}