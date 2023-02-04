import { PieceInterface } from "../data/types"
import {DataChess} from "../data/dataChess";
import { actionShowPointsType,actionMethodType,pointPositionsType,coordinatesType } from "./PieceTypes";

export class PieceLogic {
    actions: Map<string, actionMethodType> = new Map([
        ["horse", (pieceInterface: PieceInterface)=>this.horse(pieceInterface)]
    ]);

    actionShowPoints?: actionShowPointsType;

    private generatePointsPosition(positions: pointPositionsType, pieceInterface: PieceInterface) {
        positions.forEach(position => {
            position.forEach(coordinates => {
                this.calculatePointPosition(coordinates, pieceInterface);
            })
        })
    }

    private calculatePointPosition(coordinatesType: coordinatesType,pieceInterface1: PieceInterface){
        const pieceInterface2 = DataChess.initial.dataChess[coordinatesType.x][coordinatesType.y];
        if(pieceInterface1.team === pieceInterface2.team) return;
        this.showPointsPosition(coordinatesType);
    }

    private showPointsPosition(coordinatesType: coordinatesType) {
        if(this.actionShowPoints === undefined) return;
        this.actionShowPoints(coordinatesType);
    }

    horse(pieceInterface: PieceInterface) {
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
        this.generatePointsPosition(listOfPositions,pieceInterface);

    }
}