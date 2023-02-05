import { PieceInterface } from "../data/types"
import { DataChess } from "../data/dataChess";
import { actionShowPointsType, actionMethodType, coordinatesType } from "./PieceTypes";
import { Horse } from "./attackPositions/horse";
import { Tower } from "./attackPositions/tower";

export class PieceLogic {
    horse: Horse= new Horse();
    tower: Tower= new Tower();

    actions: Map<string, actionMethodType> = new Map([
        ["horse", (pieceInterface: PieceInterface) => { this.horse.generateAttackPositionsHorse(pieceInterface) }],
        ["tower", (pieceInterface: PieceInterface) => { this.tower.generateAttackPositionsTower(pieceInterface) }],
        ["rey", (pieceInterface: PieceInterface) => { this.generateAttackPositionsRey(pieceInterface) }]
    ]);

    
    actionShowPoints?: actionShowPointsType;

    callAction(pieceInterface: PieceInterface) {
        const action = this.actions.get(pieceInterface.name);
        action && action(pieceInterface);
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
        console.log(DataChess.initial.turn,"   ",pieceInterface.team);
        if(DataChess.initial.turn !== pieceInterface.team) return;
        DataChess.initial.pieceFocus = pieceInterface;
        pieceInterface.attackPosition?.forEach((coordinatesType) => {
            if (this.actionShowPoints === undefined) return;
            this.actionShowPoints(coordinatesType)
        })
    }


    private showPointsPosition(listOfCoordinatesType?: Array<coordinatesType>) {
    }
    
}