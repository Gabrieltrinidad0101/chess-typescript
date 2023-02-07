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
        this.analysisPositions.generateAttckPositions(positions,pieceInterface);
        if(pieceInterface.hadMovie) return;
        
        const castlingLeft: pointPositionsType = [
            { x: -1, y: 0 },
            { x: -2, y: 0, castling: "left" }
        ]

        const castlingRigth: pointPositionsType = [
            { x: 1, y: 0 },
            { x: 2, y: 0,castling: "right" },
        ]

        this.castlingPositions(pieceInterface,"left",castlingLeft);
        this.castlingPositions(pieceInterface,"rigth",castlingRigth);
    }

    getPositionBaseOnPieceOfRey(pieceInterface: PieceInterface,typeOfCastling: "left" | "rigth" ):PieceInterface | void{
        const positionOfTower: coordinatesType = {
            y: pieceInterface.positionY,
            x: typeOfCastling === "left" ? 0 : DataChess.initial.dataChess[0].length -1
        }
        const isTower = DataChess.getPieceByPosition(positionOfTower);
        if(!isTower || isTower.name !== "tower" || isTower.hadMovie) return;
        return isTower;
    }

    castlingPositions(pieceInterface: PieceInterface, typeOfCastling: "left" | "rigth",positions: pointPositionsType){
        const tower = this.getPositionBaseOnPieceOfRey(pieceInterface,typeOfCastling);
        if(!tower) return;
        this.castling(positions,pieceInterface);
    }

    castling(positions: pointPositionsType,pieceInterface: PieceInterface){
        let isAttackPosition = false;
        this.analysisPositions.generateAttckPositionsCallBack(positions,pieceInterface,(pieceInterface2:PieceInterface | void)=>{
            if(isAttackPosition) return;
            isAttackPosition = DataChess.getPositionsOfAttack(pieceInterface,{
                x: pieceInterface.positionX,
                y: pieceInterface.positionY
            }) || 
            (pieceInterface2?.team !== "space");
        });
        if(isAttackPosition) return;
        positions.shift();
        this.analysisPositions.generateAttckPositionsCallBack(positions,pieceInterface,(pieceInterface2:PieceInterface | void) => {
            if(!pieceInterface2) return;
            pieceInterface.attackPosition?.push({
                x: pieceInterface2.positionX,
                y: pieceInterface2.positionY,
                castling: positions[0].castling
            })
        });
    }

}