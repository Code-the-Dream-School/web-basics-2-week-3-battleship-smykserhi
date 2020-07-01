


const battleship = () => {
  /*## Step 1: Create Players

For this game, you will need **two players**.

Each player should have a "name", "ship count", and "game board" which means you will need to use an object. Below are the default values for each object property:

| Property  | Type   | Default Value                                                    |
| --------- | ------ | ---------------------------------------------------------------- |
| name      | String | User-provided via the `prompt()` function                        |
| shipCount | Number | `4` (the number of ships each player starts with)                |
| gameBoard | Array  | 2-dimensional array with 4 rows and 4 columns, filled with zeros |
*/
const player1 = {
  name: "Test1",
  shipCount : 0,
  gameBoard : [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
}
const player2 = {
  name: "Test2",
  shipCount : 0,
  gameBoard : [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
}

/*
## Step 2: Randomly Add Ships to each Board

Each player's board will start with **four ships**.

The ships should be placed randomly, which means you will need to do the following steps for each player's board:

1. Create a loop that runs until 4 ships have been added to the board
2. Inside the loop, generate a random `x` and a random `y` coordinate (must be between 0 and 3)
3. Check if the board space (array element) at those coordinates has a ship or not:
   - If not, "add a ship" (change the value from `0` to `1`) and increment the total added ships counter
   - If yes, let the loop continue (do nothing)

Here's an example of how a player's board would look in visual form:

<img height="200" src="img/board-start.png" alt="Example game board with four ships" style="float: left; margin-right: 20px;" />

| Ship | Coordinates |
| :--: | :---------: |
|  1   |   (0, 3)    |
|  2   |   (1, 1)    |
|  3   |   (2, 0)    |
|  4   |   (3, 2)    |

<div style="clear: left"></div>
*/
// creating random pocitioned ships
function fillBoard (player){
  while(player.shipCount !== 4){
    let x = Math.floor(Math.random()*player.gameBoard[0].length)
    let y = Math.floor(Math.random()*player.gameBoard.length)
    if(player.gameBoard[y][x] === 0){
      player.gameBoard[y][x] = 1;
      player.shipCount ++;
    }
  }
  return true;
}
//drowing fields 
function updatePlayerField(player, text){
  text = `<div class="battleField" id="battleField" style="margin-left: 35px; padding: 10px">`
  text += `<h2 style = "text-align: center" class="${player.name}">${player.name}</h2>`
  text += `<table id = "table" >`;
      for(let i = 0 ; i < player.gameBoard.length+1 ; i++){
        if(i ===0){
          text += `<tr style ="background-color: rgba(195, 207, 217) ; color : white ; margin : 0; padding : 10px" >`;
        }else text += `<tr >`;        
        if(i>0){
          text += `<td style ="background-color: rgba(195, 207, 217) ; color : white ; margin : 0; padding : 10px" id="tdId">${i}</td>`;
        }else text += `<td  > </td>`;        
        for(let j = 0 ; j < player.gameBoard[0].length; j++){
          if(i >= 1){
            if(player.gameBoard[i-1][j] === 0){
              // of no ship
              text += `<td style = " margin : 0; padding : 10px; border: solid 2px rgba(238, 242, 245)" class="${player.name}NoShip" >0</td>`
              //if ship
            }else if(player.gameBoard[i-1][j] === 1) text += `<td style=" margin : 0; padding : 10px; border: solid 2px rgba(238, 242, 245)" class="${player.name}Ship">0</td>`; 
            //if get fit ship
            else if(player.gameBoard[i-1][j] === 2) text += `<td style=" background-color: rgba(26, 174, 159); margin : 0; padding : 10px; border: solid 2px rgba(238, 242, 245)" class="clear">1</td>`
            //if missed
            else if(player.gameBoard[i-1][j] === 3) text += `<td style=" background-color: red;  margin : 0; padding : 10px; border: solid 2px rgba(238, 242, 245)" class="clear">0</td>`               
            //text += `<td>0</td>`;                    
          }else text += `<td style ="color : white ; margin : 0; padding : 10px">${j+1}</td>`;          
        }        
        text += `</tr>`;
      }
      text += `</table>`;
      text += `</div>`
      return text;
}
//function clear onClock events
function clearMouseClick(tableId){
  let t = document.getElementById(tableId); // select table
  let trs = t.getElementsByTagName("tr"); // all tr tags
  let tds = null;
  
  for (var i=0; i<trs.length; i++)
  {
      tds = trs[i].getElementsByTagName("td"); //all td tags
      for (let n=0; n<tds.length;n++)
      {
         tds[n].onclick=function() {  } // clear all onclick function after game ower
      }
  }
  
}
//function modifyed data in user object on mouse mode
function shipDead(tableId , player){
  let t = document.getElementById(tableId); //select table
  let trs = t.getElementsByTagName("tr"); //list of 'tr' tags
  let tds = null;  
  for (var i=0; i<trs.length; i++)
  {
      tds = trs[i].getElementsByTagName("td"); // list of 'td' tags
      for (let n=0; n<tds.length;n++)
      {
         if(tds[n].className === "shipDead") {
           if(i > player.gameBoard.length + 1){ // if hit player 2 field
            player.gameBoard[i-6][n-1] = 2 
           }else player.gameBoard[i-1][n-1] = 2 // if hit player 1 field
           tds[n].className = "clear"
         }else if(tds[n].className === "mised"){
          if(i > player.gameBoard.length + 1){ // if hit player 2 field
            player.gameBoard[i-6][n-1] = 3
           }else player.gameBoard[i-1][n-1] = 3 // if hit player 1 field
           tds[n].className = "clear"                
         }        
      }
  }   
}

//function which work with mouse events
function getTableValueByMouseClick(tableId){
  update() // update fields after modification
  console.log("Mouse tupe")
  let t = document.getElementById(tableId); // select table
  let trs = t.getElementsByTagName("tr"); //list of "tr" tags
  let tds = null;
  //let playerFire = true;
  for (var i=0; i<trs.length; i++)
  {         
      tds = trs[i].getElementsByTagName("td"); //list of "td" tags
      for (let n=0; n<tds.length;n++)
      {      
            tds[n].onclick = function() {  // set up function which responce for mouse click
              if(playerFire){    //player 2           
                if(this.className === `${player1.name}Ship`){
                  this.style.cssText = "background-color: rgba(26, 174, 159) ; color : white ; margin : 0; padding : 10px";
                  this.innerHTML = "1"
                  this.className = "shipDead" // change class name to modify player.gameBoard
                  shipDead(tableId, player1) // update  player.gameBoard after mouth click
                  player1.shipCount --;                   
                  if(player1.shipCount === 0 ){ // if all ship dead 
                    alert(`Congratulation ${player2.name} you Win!!!!!`)
                    clearMouseClick(tableId) //clear onClick events  
                    document.getElementById("hwo").innerHTML = `<br><br><br> ${player2.name}  great game`                  
                    } else document.getElementById("hwo").innerHTML = `<br><br><br> ${player2.name}  great shot try one more time`
                  }else if(this.className === `${player1.name}NoShip`){
                    playerFire = !playerFire; // change player
                    this.style.cssText = "background-color: red ; color : white ; margin : 0; padding : 10px ; border: solid 2px rgba(238, 242, 245)";
                    this.className = "mised" // change class name to modify player.gameBoard
                    shipDead(tableId, player1)// update  player.gameBoard after mouth click
                    document.getElementById("hwo").innerHTML = `<br><br><br> ${player2.name} sory you missed`
                    }
              }else {          // player 1     
                if(this.className === `${player2.name}Ship`){
                  this.style.cssText = "background-color: rgba(26, 174, 159) ; color : white ; margin : 0; padding : 10px";
                  this.innerHTML = "1"
                  player2.shipCount --;
                  this.className = "shipDead" // change class name to modify player.gameBoard
                  shipDead(tableId, player2)// update  player.gameBoard after mouth click
                  if(player2.shipCount === 0 ){ // if all ship dead 
                    alert(`Congratulation ${player1.name} you Win!!!!!`)
                    clearMouseClick(tableId) //clear onClick events 
                    document.getElementById("hwo").innerHTML = `<br><br><br> ${player2.name}  great game`  
                  } else document.getElementById("hwo").innerHTML = `<br><br><br> ${player1.name}  great shot try one more time`
                }else if(this.className === `${player2.name}NoShip`){
                  playerFire = !playerFire; // change player
                    this.style.cssText = "background-color: red ; color : white ; margin : 0; padding : 10px ; border: solid 2px rgba(238, 242, 245)";
                    this.className = "mised"// change class name to modify player.gameBoard
                    shipDead(tableId, player2)// update  player.gameBoard after mouth click
                    document.getElementById("hwo").innerHTML = `<br><br><br> ${player1.name} sory you missed`                   
                }
              }             
            }         
      }
  }  
}
// function update battle field
function update(){
  const buttleField = document.getElementById("result")
  let gameTable = "";
  gameTable += updatePlayerField(player1, gameTable);
  gameTable += updatePlayerField(player2, gameTable);
  buttleField.innerHTML = gameTable;
  let tag = document.createElement("p");
  tag.innerHTML = `<button id="makeShot">Make a shot</button> <h2 id="hwo"><br><br><br>${message}</h2>`
  document.getElementById("result").appendChild(tag);
  document.getElementById("makeShot").addEventListener("click" , makeShot) // create event for play  with prompt box
  return true
}
//function which modify player.gameBoard after prompt get X and Y pocition
function makeShot(){
    if(player1.shipCount === 0 ){
      document.getElementById("hwo").innerHTML = `<br><br><br> ${player2.name}  great game`  
      alert(`Congratulation ${player2.name} you Win!!!!!`)
    }else if (player2.shipCount === 0){
       document.getElementById("hwo").innerHTML = `<br><br><br> ${player1.name}  great game` 
       alert(`Congratulation ${player1.name} you Win!!!!!`)
    }
    else{
      let x;
      let y;
      let underFire
      if(playerFire) {
        playerShot = player2
        underFire = player1
      }else {
        playerShot = player1
        underFire = player2
      }
          x =  parseInt(prompt(`enter X from 1 to ${underFire.gameBoard.length}`)) - 1
          y =  parseInt(prompt(`enter Y from 1 to ${underFire.gameBoard.length}`))  -1
          if(x >= 0 && x < underFire.gameBoard.length && y >= 0 && x < underFire.gameBoard.length) { // if pocitin in butle field
            if(underFire.gameBoard[y][x] === 1){ // if ship
              underFire.gameBoard[y][x] = 2; //set to green ship 
              underFire.shipCount --;        
              message = `${playerShot.name} Great shot try one more time`
              }else if(underFire.gameBoard[y][x] === 0){ // if meesed
                underFire.gameBoard[y][x] = 3; // set to red 
              //console.log("shot2", underFire); 
              message = `${playerShot.name} Sory you missed`
              if(underFire === player1){ // switch players
                underFire = player2
                playerFire = !playerFire
              }else {
                underFire = player1 
                playerFire = !playerFire
              }
              
            }
          }else alert("Your shot out from Battlefield")          
      update(); // update screen after modifications
    }
    
}

let playerFire = true; //which player make first shot true player 2 for mouse mode
let playerShot //= player2; //which player make first shot true player 2 for prompt mode
player1.name = prompt("Enter first player name");
player2.name = prompt("Enter second player name");
let message = `${player2.name} you first`
fillBoard(player1) ? console.log("Random player1 success") : console.log("Random player1 fail"); // fill rundoms ship
fillBoard(player2) ? console.log("Random player2 success") : console.log("Random player2 fail"); //fill rundoms ship
console.log(player1);
console.log(player2);
//alert(`${player2.name} shoots first`)
document.getElementById("result").style.cssText = "display: flex ; margin : 25px";
getTableValueByMouseClick("result" ); 
  return 'The winner is...?'
}

const gameResult = battleship()


