let xTurn=true,
gameOn=true;
const winOBJ={
    "c1":[["c1","c2","c3"],["c1","c4","c7"],["c1","c5","c9"]],
    "c2":[["c1","c2","c3"],["c2","c5","c8"]],
    "c3":[["c1","c2","c3"],["c3","c6","c9"],["c3","c5","c7"]],
    "c4":[["c4","c5","c6"],["c1","c4","c7"]],
    "c5":[["c4","c5","c6"],["c2","c5","c8"]],
    "c6":[["c4","c5","c6"],["c3","c6","c9"]],
    "c7":[["c7","c8","c9"],["c1","c4","c7"],["c3","c5","c7"]],
    "c8":[["c7","c8","c9"],["c2","c5","c8"]],
    "c9":[["c7","c8","c9"],["c3","c6","c9"],["c1","c5","c9"]]
}
window.onload=function(){
    document.querySelectorAll(".cell").forEach(cell=>addEventListener('click',(e)=>{
        if(gameOn){
            const id=e.target.id;
            if(!hasValue(id)){
                const turn=xTurn?"X":"O";
                new Audio(`./resource/${turn}.wav`).play();
                document.getElementById(id).innerHTML=turn;
                const isWin=checkWin(id);
                if(isWin){
                    win(isWin)
                }
                else{
                    xTurn=!xTurn;
                }
            }
        }
       
    }))
}
function hasValue(cellId){
    const cell=document.getElementById(cellId);
    return cell.textContent.length;
}
function checkWin(cellId){
    const checkArr=winOBJ[cellId],
    compare=xTurn?"X":"O";
    for(let i=0;i<checkArr.length;i++){
        let foundWin=true;
        for(let j=0;j<checkArr[i].length;j++){
            const checkCellValue=document.getElementById(checkArr[i][j]).textContent;
            if(checkCellValue!==compare){
                foundWin=false;
            }
        }
        if(foundWin){
            return checkArr[i];
        }
    }
    return false;
}
function win(winArr){
    winArr.forEach(cell=>{
        document.getElementById(cell).classList.add("win")
    })
    gameOn=false;
    new Audio("./resource/win.wav").play();
}

function restart(){
    xTurn=true;
    gameOn=true;
    document.querySelectorAll(".cell").forEach(cell=>cell.innerHTML="");
    document.querySelectorAll(".win").forEach(cell=>cell.classList.remove("win"));
}
