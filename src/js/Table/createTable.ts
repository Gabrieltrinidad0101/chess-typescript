import {DataChess} from "../data/dataChess";
import { createRow, createPiece } from "./tableComponents";

export const renderTable = ()=>{
    const dataChess = DataChess.initial.dataChess;
    const documentFragment  = new DocumentFragment()
    dataChess.forEach((row) => {
        const rowHtml = createRow(row,((piece) =>{
            return createPiece(piece);
        }))
        documentFragment.append(rowHtml);
    });
    document.querySelector(".table")?.appendChild(documentFragment);
}
