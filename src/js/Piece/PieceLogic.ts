import { PieceInterface } from "../data/types"
import {DataChess} from "../data/dataChess";
import { actionShowPointsType,actionMethodType,pointPositionsType,coordinatesType } from "./PieceTypes";

export class PieceLogic {
    private limitTest: number = 1;
    actions: Map<string, actionMethodType> = new Map([
        ["horse", (pieceInterface: PieceInterface)=>{this.generateAttackPositionsHorse(pieceInterface)}],
        ["tower", (pieceInterface: PieceInterface)=>{this.generateAttackPositionsTower(pieceInterface)}]
    ]);

    actionShowPoints?: actionShowPointsType;

    private generatePointsPosition(positions: pointPositionsType, pieceInterface: PieceInterface) {
        positions.forEach(position => {
            position.forEach(coordinatesType => {
                this.calculatePointPosition({ 
                    x: coordinatesType.x + pieceInterface.positionX, 
                    y: coordinatesType.y + pieceInterface.positionY 
                }, pieceInterface);
            })
        })
    }

    private calculatePointPosition(coordinatesType: coordinatesType,pieceInterface1: PieceInterface){
        const pieceInterface2 = DataChess.getPieceByPosition(coordinatesType);
        if(pieceInterface2 && pieceInterface1.team === pieceInterface2.team) return;
        pieceInterface1.attackPosition?.push(coordinatesType);
    }

    private showPointsPosition(coordinatesType: coordinatesType) {
        if(this.actionShowPoints === undefined) return;
        this.actionShowPoints(coordinatesType)
    }

    callAction(pieceInterface: PieceInterface){
        const action = this.actions.get(pieceInterface.name);
        action && action(pieceInterface);
    }

    generateAttackPositionsHorse(pieceInterface: PieceInterface){
        const listOfPositions: pointPositionsType = [
            [{ x:  2, y:  1 }],
            [{ x:  2, y: -1 }],
            [{ x: -2, y:  1 }],
            [{ x: -2, y: -1 }],
            [{ x:  1, y:  2 }],
            [{ x: -1, y:  2 }],
            [{ x:  1, y: -2 }],
            [{ x: -1, y: -2 }],
        ]
        this.generatePointsPosition(listOfPositions,pieceInterface);
    }

    test(pieceInterface1: PieceInterface,x: number, y: number,coordinatesType: coordinatesType ){
        coordinatesType = {x: coordinatesType.x + x, y: coordinatesType.y + y};
        const pieceInterface2 = DataChess.getPieceByPosition(coordinatesType);
        if(pieceInterface2 == undefined) return;
        pieceInterface1.attackPosition?.push(coordinatesType);
        this.test(pieceInterface1,x,y,coordinatesType)
    }

    generateAttackPositionsTower(pieceInterface1: PieceInterface){
        this.test(pieceInterface1,1,0,{x: pieceInterface1.positionX, y: pieceInterface1.positionY})
        this.test(pieceInterface1,0,1,{x: pieceInterface1.positionX, y: pieceInterface1.positionY})
        console.log(pieceInterface1.attackPosition);
    }

    showAttackPosition(pieceInterface: PieceInterface) {
        pieceInterface.attackPosition?.forEach((coordinatesType)=>{
            this.showPointsPosition(coordinatesType)
        })
    }
}