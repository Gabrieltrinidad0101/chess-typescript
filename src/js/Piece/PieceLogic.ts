import { PieceInterface } from "../data/types"
import { DataChess } from "../data/dataChess";
import { actionShowPointsType, actionMethodType, coordinatesType } from "./PieceTypes";
import { Horse } from "./attackPositions/horse";
import { Tower } from "./attackPositions/tower";
import { AnalysisPositions } from "./utils/analysisPositions";
import { Rey } from "./attackPositions/rey";

export class PieceLogic {
    horse: Horse= new Horse();
    tower: Tower= new Tower();
    rey: Rey= new Rey();
    analysisPositions: AnalysisPositions = new AnalysisPositions();

    actions: Map<string, actionMethodType> = new Map([
        ["horse", (pieceInterface: PieceInterface) => { this.horse.generateAttackPositionsHorse(pieceInterface) }],
        ["tower", (pieceInterface: PieceInterface) => { this.tower.generateAttackPositionsTower(pieceInterface) }],
        ["rey", (pieceInterface: PieceInterface)   => { this.rey.generateAttackPositionsRey(pieceInterface) }]
    ]);

    
    actionShowPoints?: actionShowPointsType;

    gerenerateAttackPositionsByPiece(pieceInterface: PieceInterface) {
        const action = this.actions.get(pieceInterface.name);
        this.analysisPositions.clearAttackPositions(pieceInterface);
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
            canNoMoveToAttackPosition: false,
        };
    }

    showAttackPosition(pieceInterface: PieceInterface) {
        console.log(DataChess.initial.turn,"   ",pieceInterface.team);
        if(DataChess.initial.turn !== pieceInterface.team) return;
        DataChess.initial.pieceFocus = pieceInterface;
        pieceInterface.attackPosition?.forEach((coordinatesType) => {
            if(pieceInterface.name === "rey"){
                console.log(DataChess.existAttackPosition(coordinatesType))
            }
            if (this.actionShowPoints === undefined || DataChess.existAttackPosition(coordinatesType)) return;
            this.actionShowPoints(coordinatesType)
        })
    }
}