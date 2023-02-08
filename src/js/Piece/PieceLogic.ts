import { PieceInterface } from "../data/types"
import { DataChess } from "../data/dataChess";
import { actionShowPointsType, actionMethodType, coordinatesType } from "./PieceTypes";
import { Horse } from "./attackPositions/horse";
import { Tower } from "./attackPositions/tower";
import { AnalysisPositions } from "./utils/analysisPositions";
import { king } from "./attackPositions/king";
import { Bishop } from "./attackPositions/bishop";
import { Lady } from "./attackPositions/lady";
import { Pawn } from "./attackPositions/pawn";

export class PieceLogic {
    horse: Horse= new Horse();
    tower: Tower= new Tower();
    rey: king= new king();
    bishop: Bishop = new Bishop();
    lady: Lady = new Lady();
    pawn: Pawn = new Pawn();
        
    analysisPositions: AnalysisPositions = new AnalysisPositions();

    actions: Map<string, actionMethodType> = new Map([
        ["horse", (pieceInterface: PieceInterface) => { this.horse.generateAttackPositions(pieceInterface) }],
        ["tower", (pieceInterface: PieceInterface) => { this.tower.generateAttackPositions(pieceInterface) }],
        ["king", (pieceInterface: PieceInterface)   => { this.rey.generateAttackPositions(pieceInterface) }],
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

    private moveCastling(coordinatesType: coordinatesType, pieceInterface: PieceInterface){
        const tower = this.rey.getPositionBaseOnPieceOfRey(pieceInterface,coordinatesType.castling as "left" || "right");
        if(!tower) return;
        const newPositonOfTower = this.analysisPositions.getPositionBaseOnPiece({
            x: coordinatesType.castling === "left" ? 1 : -1,
            y: 0
        },pieceInterface);
        this.movePiece(newPositonOfTower,tower);    
    }

    movePiece(coordinatesType: coordinatesType, pieceInterface?: PieceInterface) {
        if (!pieceInterface) return;
        const pieceCopy = {...pieceInterface};
        pieceCopy.positionX = coordinatesType.x;
        pieceCopy.positionY = coordinatesType.y;
        if(coordinatesType.castling) this.moveCastling(coordinatesType,pieceCopy);
        DataChess.initial.turn = DataChess.initial.turn === "white" ? "black" : "white"; 
        const dataChess = DataChess.initial.dataChess;
        pieceCopy.hadMovie = true;
        const pieceToEat = {...dataChess[coordinatesType.x][coordinatesType.y]};
        dataChess[coordinatesType.x][coordinatesType.y] = pieceCopy as PieceInterface;
        dataChess[pieceInterface.positionX][pieceInterface.positionY] = {
            name: ``,
            positionX: pieceInterface.positionX,
            positionY: pieceInterface.positionY,
            hadMovie: false,
            team: "space",
            attackPosition: []
        };
        if(pieceCopy.name == "pawn") this.pawn.convertPawnIntoLady(pieceCopy);
        if(pieceToEat.name === "king"){
            alert(`lost ${pieceToEat.team}`);
            window.location.href = "/";
        } 
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