import { PieceInterface } from "../data/types"
import { DataChess } from "../data/dataChess";
import { actionShowPointsType, actionMethodType, coordinatesType } from "./PieceTypes";
import { Horse } from "./attackPositions/horse";
import { Tower } from "./attackPositions/tower";
import { AnalysisPositions } from "./utils/analysisPositions";
import { Rey } from "./attackPositions/rey";
import { Bishop } from "./attackPositions/bishop";
import { Lady } from "./attackPositions/lady";
import { Pawn } from "./attackPositions/pawn";

export class PieceLogic {
    horse: Horse= new Horse();
    tower: Tower= new Tower();
    rey: Rey= new Rey();
    bishop: Bishop = new Bishop();
    lady: Lady = new Lady();
    pawn: Pawn = new Pawn();
        
    analysisPositions: AnalysisPositions = new AnalysisPositions();

    actions: Map<string, actionMethodType> = new Map([
        ["horse", (pieceInterface: PieceInterface) => { this.horse.generateAttackPositions(pieceInterface) }],
        ["tower", (pieceInterface: PieceInterface) => { this.tower.generateAttackPositions(pieceInterface) }],
        ["rey", (pieceInterface: PieceInterface)   => { this.rey.generateAttackPositions(pieceInterface) }],
        ["bishop", (pieceInterface: PieceInterface) => { this.bishop.generateAttackPositions(pieceInterface) }],
        ["lady", (pieceInterface: PieceInterface)   => { this.lady.generateAttackPositions(pieceInterface) }],
        ["pawn", (pieceInterface: PieceInterface)   => { this.pawn.generateAttackPositions(pieceInterface) }]
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
        pieceFocusCopy.hadMovie = true;
        const pieceToEat = {...dataChess[coordinatesType.x][coordinatesType.y]};
        dataChess[coordinatesType.x][coordinatesType.y] = pieceFocusCopy as PieceInterface;
        dataChess[pieceFocus.positionX][pieceFocus.positionY] = {
            name: ``,
            positionX: pieceFocus.positionX,
            positionY: pieceFocus.positionY,
            hadMovie: false,
            team: "space",
            attackPosition: []
        };
        if(pieceToEat.name === "rey") alert(`lost ${pieceToEat.team}`);
    }

    showAttackPosition(pieceInterface: PieceInterface) {
        console.log(DataChess.initial.turn,"   ",pieceInterface.team);
        if(DataChess.initial.turn !== pieceInterface.team) return;
        DataChess.initial.pieceFocus = pieceInterface;
        console.log(pieceInterface.attackPosition);
        pieceInterface.attackPosition?.forEach((coordinatesType) => {
            if (this.actionShowPoints === undefined) return;
            this.actionShowPoints(coordinatesType)
        })
    }
}