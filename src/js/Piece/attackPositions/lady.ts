import { PieceInterface } from "../../data/types";
import { AnalysisPositions } from "../utils/analysisPositions";
import { Bishop } from "./bishop";
import { Tower } from "./tower";

export class Lady{
    analysisPositions: AnalysisPositions = new AnalysisPositions();
    tower: Tower = new Tower();
    bishop: Bishop = new Bishop();
    generateAttackPositions(pieceInterface1: PieceInterface) {
        this.tower.generateAttackPositions(pieceInterface1);
        this.bishop.generateAttackPositions(pieceInterface1);
    }
}