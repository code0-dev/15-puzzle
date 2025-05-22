"use strict";

const cont = document.querySelector(".container");
const restartBtn = document.getElementById("restart-btn");
const playAgainBtn = document.getElementById("play-again-btn");
//const numArray = [Array(15).keys()].map(num => num + 1);
let numArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
numArray.push(null);
numArray.sort(() => Math.random() - 0.5);
let solved = false;

//making and rendering the tiles
function renderTiles(tiles) {    
  cont.innerHTML = "";    
  tiles.forEach((tile, i) => {        const box = document.createElement("div");        
    box.className = tile ? "tile": "empty-tile";        
    box.textContent = tile || "";
    box.addEventListener("click", () => moveTile(i))        
    cont.appendChild(box);
  })
}
  
  //moving a tile when clicked
function moveTile(i) {    
  const emptyTileIndex = numArray.indexOf(null);    
  const validMoves = [i + 4, i - 4]; 
    
  if (i%4 !== 3) validMoves.push(i + 1);    
  if (i%4 !== 0) validMoves.push(i - 1);
  
  validMoves.forEach(move => {
    if (move === emptyTileIndex) {
      [numArray[i], numArray[emptyTileIndex]] = [numArray[emptyTileIndex], numArray[i]];
      renderTiles(numArray);
      isSolved();
    }    
  })
}
  
  //checking if the puzzle is solved
 function isSolved() {    
  const nums = numArray.filter((v) => v > 0);    
  let count = 0;    
  for (let i = 0; i<nums.length; i++) {
    if (count > 0) break;
    for (let j = i+1; j < nums.length; j++) { 
      if (count > 0) break;
      if (nums[i] < nums[j]) {        
          
      } else {count++}
      
    }    
  }    
  
  if (count === 0 && numArray.indexOf(null) === 15) {
    solved = true;
  } else {
    count = 0;
  } 
  
  if (solved) {
    document.querySelector(".result").style.animationName = "display-result";
    document.querySelector(".empty-tile").textContent = "16"; 
    document.querySelector(".empty-tile").classList.add("tile");
    restartBtn.style.pointerEvents = "none";
    
    document.querySelectorAll(".tile").forEach(tile => {
      tile.style.animationName = "change-color"            
      tile.style.pointerEvents = "none"
    });       
    
    document.querySelector(".before").style.padding = "4px";        
    document.querySelector(".before").style.animationName = "spin"; 
    numArray.pop(); 
    
    setTimeout(() => { 
      document.querySelectorAll(".tile").forEach(tile => tile.style.filter = "blur(5px)");
      
      document.querySelectorAll(".tile").forEach(tile => tile.style.animationName = "");
      
      document.querySelector(".before").style.padding = "0px";
      
      document.querySelector(".before").style.animationName = "";
      
      playAgainBtn.style.animationName = "show-play-again-btn";
    }, 5000)
  }
}
  
playAgainBtn.addEventListener("click", () => {    
  document.querySelector(".result").style.animationName = "";
  numArray.push(null);
  numArray.sort(() => Math.random() - 0.5);    
  solved = false;
  renderTiles(numArray);
  document.querySelector(".empty-tile").textContent = "";    
  document.querySelector(".empty-tile").classList.remove("tile");
  restartBtn.style.pointerEvents = "";
  document.querySelectorAll(".tile").forEach(tile => {        
    tile.style.filter = "blur(0px)"
    tile.style.pointerEvents = "";
  })  
  
  playAgainBtn.style.animationName = "";
})
  
restartBtn.addEventListener("click", () => {
  numArray.sort(() => Math.random() - 0.5);
  renderTiles(numArray);
})
  
renderTiles(numArray);
  
function displayCommentSection() {
  document.querySelector(".btn-cont").style.height = "24px";
  document.querySelector(".comment-field").style.height = "85px";
  document.querySelector(".comment-field").style.width = "240px";
};
  
function hideCommentSection() {
  document.querySelector(".btn-cont").style.height = "0px";
  document.querySelector(".comment-field").style.height = "35px";
  document.querySelector(".comment-field").style.width = "150px";
};
  
document.querySelector(".comment-field").addEventListener("focus", displayCommentSection);
  
document.querySelector(".comment-field").addEventListener("blur", hideCommentSection);
  
  