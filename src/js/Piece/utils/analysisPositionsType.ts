import { PieceInterface, Team } from "../../data/types";
import { coordinatesType } from "../PieceTypes";

export interface LinesOfAttackType{
    pieceInterface: PieceInterface, 
    coordinatesType?: coordinatesType,
    limit: number,
    pieceNoAttack: Array<Team>
}

export interface LineOfAttackType extends LinesOfAttackType{
    x: number,
    y: number, 
}