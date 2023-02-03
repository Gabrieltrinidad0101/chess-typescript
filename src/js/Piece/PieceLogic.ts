import { PieceInterface } from "../data/types"

type actionMethod = (pieceInterface: PieceInterface) => void;

export class PieceLogic{
    actions: Map<string,actionMethod> = new Map([
        ["horse", this.horse]
    ]);

    horse(pieceInterface: PieceInterface){
        
        const pointPosition = <HTMLElement>document.querySelector(`.position-${pieceInterface.positionX + 2}-${pieceInterface.positionY + 1}`)
        pointPosition?.setAttribute("style","visibility: visible")

    }
}