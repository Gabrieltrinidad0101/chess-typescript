import { PieceInterface } from "../data/types"
import { DataChess } from "../data/dataChess";
import { actionShowPointsType, actionMethodType, pointPositionsType, coordinatesType } from "./PieceTypes";

export class PieceLogic {
    actions: Map<string, actionMethodType> = new Map([
        ["horse", (pieceInterface: PieceInterface) => { this.generateAttackPositionsHorse(pieceInterface) }],
        ["tower", (pieceInterface: PieceInterface) => { this.generateAttackPositionsTower(pieceInterface) }],
        ["rey", (pieceInterface: PieceInterface) => { this.generateAttackPositionsRey(pieceInterface) }]
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

    private calculatePointPosition(coordinatesType: coordinatesType, pieceInterface1: PieceInterface) {
        const pieceInterface2 = DataChess.getPieceByPosition(coordinatesType);
        if (pieceInterface2 && pieceInterface1.team === pieceInterface2.team) return;
        pieceInterface1.attackPosition?.push(coordinatesType);
    }

    private showPointsPosition(listOfCoordinatesType?: Array<coordinatesType>) {
        listOfCoordinatesType?.forEach((coordinatesType) => {
            if (this.actionShowPoints === undefined) return;
            this.actionShowPoints(coordinatesType)
        })
    }

    callAction(pieceInterface: PieceInterface) {
        const action = this.actions.get(pieceInterface.name);
        action && action(pieceInterface);
    }

    generateAttackPositionsHorse(pieceInterface: PieceInterface) {
        this.clearAttackPositions(pieceInterface);
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
        this.generatePointsPosition(listOfPositions, pieceInterface);
    }

    clearAttackPositions(pieceInterface: PieceInterface){
        pieceInterface.attackPosition = [];
    }

    getLineOfTowerAttack(pieceInterface1: PieceInterface, x: number, y: number, coordinatesType: coordinatesType | void) {
        coordinatesType = {
            x: (coordinatesType?.x ?? pieceInterface1.positionX) + x,
            y: (coordinatesType?.y ?? pieceInterface1.positionY) + y,
        };
        const pieceInterface2 = DataChess.getPieceByPosition(coordinatesType);
        if (pieceInterface2 == undefined || pieceInterface2?.team != "space") {
            pieceInterface2?.team !== pieceInterface1.team &&
                (pieceInterface1.attackPosition?.push(coordinatesType));
            return;
        }
        pieceInterface1.attackPosition?.push(coordinatesType);
        this.getLineOfTowerAttack(pieceInterface1, x, y, coordinatesType)
    }

    generateAttackPositionsTower(pieceInterface1: PieceInterface) {
        this.clearAttackPositions(pieceInterface1);
        this.getLineOfTowerAttack(pieceInterface1, 1, 0)
        this.getLineOfTowerAttack(pieceInterface1, -1, 0)
        this.getLineOfTowerAttack(pieceInterface1, 0, 1)
        this.getLineOfTowerAttack(pieceInterface1, 0, -1)
    }

    generateAttackPositionsRey(pieceInterface: PieceInterface){
        this.clearAttackPositions(pieceInterface);
        const listOfPositions: pointPositionsType = [
            [{ x: 1, y: 0 }],
            [{ x: 1, y: -1 }],
            [{ x: 0, y: -1 }],
            [{ x: -1, y: -1 }],
            [{ x: -1, y: 0 }],
            [{ x: -1, y: 1 }],
            [{ x: 0, y: 1 }],
            [{ x: 1, y: 1 }],
        ]
        this.generatePointsPosition(listOfPositions, pieceInterface);
    }

    movePiece(coordinatesType: coordinatesType) {
        if (!DataChess.initial.pieceFocus) return;
        DataChess.initial.turn = DataChess.initial.turn === "white" ? "black" : "white"; 
        const pieceFocus = DataChess.initial.pieceFocus;
        const pieceFocusCopy = {...DataChess.initial.pieceFocus};
        const dataChess = DataChess.initial.dataChess;
        pieceFocusCopy.positionX = coordinatesType.x;
        pieceFocusCopy.positionY = coordinatesType.y;
        dataChess[coordinatesType.x][coordinatesType.y] = pieceFocusCopy as PieceInterface;
        dataChess[pieceFocus.positionX][pieceFocus.positionY] = {
            name: ``,
            positionX: pieceFocus.positionX,
            positionY: pieceFocus.positionY,
            hadMovie: false,
            team: "space",
            attackPosition: [],
        };
    }

    showAttackPosition(pieceInterface: PieceInterface) {
        if(DataChess.initial.turn !== pieceInterface.team) return;
        DataChess.initial.pieceFocus = pieceInterface;
        this.showPointsPosition(pieceInterface.attackPosition)
    }
}