import { DataChess } from "../../data/dataChess";
import { PieceInterface } from "../../data/types";
import { coordinatesType, pointPositionsType } from "../PieceTypes";
import { AnalysisPositions } from "../utils/analysisPositions";

export class Pawn {
    analysisPositions: AnalysisPositions = new AnalysisPositions();

    generateAttackPositions(pieceInterface1: PieceInterface) {
        const direction = pieceInterface1.team === "black" ? 1 : -1;
        const positionsMove: pointPositionsType = pieceInterface1.hadMovie ? 
            [{ x: 0, y: 1 * direction}]
         : 
            [{ x: 0, y: 2 * direction },{ x: 0, y: 1 * direction}]
            const positionsAttack = [{ x: 1 * direction, y: 1 * direction},{ x: -1 * direction, y: 1 * direction}]
        this.analysisPositions.generateLinesAttackPosition({
            pieceInterface: pieceInterface1,
            limit: 2,
            pieceNoAttack: ["black","white"]
        },positionsMove);

        this.analysisPositions.generateAttckPositionsCallBack(positionsAttack,pieceInterface1, (pieceInterface2: PieceInterface | void )=>{
            if(pieceInterface2 === undefined || pieceInterface2?.team === "space" || pieceInterface2?.team === pieceInterface1.team ) return;
            pieceInterface1.attackPosition?.push({
                x: pieceInterface2.positionX,
                y: pieceInterface2.positionY,
            });
        });
    }

    convertPawnIntoLady(pieceInterface: PieceInterface): void {
        debugger;
        const positionToConvertPawnIntoLady = pieceInterface.team == "black" ? 7 : 0;
        if(pieceInterface.positionY !== positionToConvertPawnIntoLady) return;
        DataChess.initial.dataChess[pieceInterface.positionX][pieceInterface.positionY] = {
            ...pieceInterface,
            name: "lady"
        }
    }
}