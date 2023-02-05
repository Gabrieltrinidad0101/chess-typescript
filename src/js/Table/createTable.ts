import {DataChess} from "../data/dataChess";
import { createRow, createPiece } from "./tableComponents";

export const renderTable = ()=>{
    const table = document.querySelector(".table");
    if(!table) return;
    table.innerHTML = "";
    const dataChess = DataChess.initial.dataChess;
    const documentFragment  = new DocumentFragment()
    dataChess.forEach((row) => {
        const rowHtml = createRow(row,((piece) =>{
            return createPiece(piece);
        }))
        documentFragment.append(rowHtml);
    });
    table.appendChild(documentFragment);
}
