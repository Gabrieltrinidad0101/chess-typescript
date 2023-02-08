import { PieceInterface } from "../../data/types"
import { DataChess } from "../../data/dataChess";
import { actionShowPointsType, coordinatesType, pointPositionsType } from "../PieceTypes";
import { LineOfAttackType, LinesOfAttackType } from "./analysisPositionsType";

export class AnalysisPositions{
    actionShowPoints?: actionShowPointsType;

    clearAttackPositions(pieceInterface: PieceInterface){
        pieceInterface.attackPosition = [];
    }

    public getPositionBaseOnPiece(coordinatesType: coordinatesType,pieceInterface: PieceInterface): coordinatesType{
        return {
            x: coordinatesType.x + pieceInterface.positionX,
            y: coordinatesType.y + pieceInterface.positionY
        }
    }


    public getCoordinatesTypeOfPiece(pieceInterface: PieceInterface, castling?: "left" | "right") : coordinatesType{
        return {
            x: pieceInterface.positionX,
            y: pieceInterface.positionY,
            castling
        }
    }

    public getPieceBaseOnPositionPiece(coordinatesType: coordinatesType,pieceInterface: PieceInterface): PieceInterface | void{
        const coordinatesType2 = this.getPositionBaseOnPiece(coordinatesType,pieceInterface);
        return DataChess.getPieceByPosition(coordinatesType2);
    }

    public generateAttckPositionsCallBack(positions: pointPositionsType,pieceInterface1: PieceInterface,callBack: (pieceInterface: PieceInterface | void) => void) {
        positions.forEach(coordinatesType1 => {
            const pieceInterface2 = this.getPieceBaseOnPositionPiece(coordinatesType1,pieceInterface1);
            callBack(pieceInterface2);
        })
    }

    public generateAttckPositions(positions: pointPositionsType,pieceInterface1: PieceInterface) {
        this.generateAttckPositionsCallBack(positions,pieceInterface1,pieceInterface2=>{
            this.calculatePointPosition(pieceInterface1,pieceInterface2);
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
        const {coordinatesType,pieceInterface,x,y,limit,pieceNoAttack,pieceAttack}  = lineOfAttackType;
        const coordinatesType1 = {
            x: (coordinatesType?.x ?? pieceInterface.positionX) + x,
            y: (coordinatesType?.y ?? pieceInterface.positionY) + y,
        };
        const pieceInterface2 = DataChess.getPieceByPosition(coordinatesType1);
        if (limit === 1 || pieceInterface2 == undefined || pieceNoAttack.includes(pieceInterface2.team))
            return;
        pieceInterface.attackPosition?.push(coordinatesType1);
        if(pieceInterface2.team == pieceAttack) return;
        this.getLineOfAttack({...lineOfAttackType,limit: limit - 1,coordinatesType: coordinatesType1 });
    }

    private calculatePointPosition(pieceInterface1: PieceInterface,pieceInterface2: PieceInterface | void) {
        if (!pieceInterface2 || pieceInterface1.team === pieceInterface2.team) return;
        pieceInterface1.attackPosition?.push({
            x: pieceInterface2.positionX,
            y: pieceInterface2.positionY,
        });
    }
}