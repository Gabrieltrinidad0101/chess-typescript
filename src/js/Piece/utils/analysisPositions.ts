import { PieceInterface } from "../../data/types"
import { DataChess } from "../../data/dataChess";
import { actionShowPointsType, coordinatesType, pointPositionsType } from "../PieceTypes";
import { LineOfAttackType, LinesOfAttackType } from "./analysisPositionsType";

export class AnalysisPositions{
    actionShowPoints?: actionShowPointsType;

    clearAttackPositions(pieceInterface: PieceInterface){
        pieceInterface.attackPosition = [];
    }

    public generateAttckPositionsCallBack(positions: pointPositionsType,pieceInterface: PieceInterface,callBack: (coordinatesType: coordinatesType) => void) {
        positions.forEach(coordinatesType => {
            callBack({
                x: coordinatesType.x + pieceInterface.positionX,
                y: coordinatesType.y + pieceInterface.positionY
            });
        })
    }

    public generateAttckPositions(positions: pointPositionsType,pieceInterface: PieceInterface) {
        this.generateAttckPositionsCallBack(positions,pieceInterface,coordinatesType=>{
            this.calculatePointPosition(coordinatesType,pieceInterface);
        })
    }

    generateLinesAttackPosition(linesOfAttackType: LinesOfAttackType,positions: Array<coordinatesType>){
        positions.forEach((position) => {
            this.getLineOfAttack({
                ...linesOfAttackType,
                x: position.x,
                y: position.y,
            })
        })
    }

    getLineOfAttack(lineOfAttackType: LineOfAttackType) {
        const {coordinatesType,pieceInterface,x,y,limit,pieceNoAttack}  = lineOfAttackType;
        const coordinatesType1 = {
            x: (coordinatesType?.x ?? pieceInterface.positionX) + x,
            y: (coordinatesType?.y ?? pieceInterface.positionY) + y,
        };
        const pieceInterface2 = DataChess.getPieceByPosition(coordinatesType1);
        if (limit === 1 || pieceInterface2 == undefined || pieceNoAttack.includes(pieceInterface2.team))
            return;
        pieceInterface.attackPosition?.push(coordinatesType1);
        this.getLineOfAttack({...lineOfAttackType,limit: limit - 1,coordinatesType: coordinatesType1 });
    }

    private calculatePointPosition(coordinatesType: coordinatesType, pieceInterface1: PieceInterface) {
        const pieceInterface2 = DataChess.getPieceByPosition(coordinatesType);
        if (pieceInterface2 && pieceInterface1.team === pieceInterface2.team) return;
        pieceInterface1.attackPosition?.push(coordinatesType);
    }
}