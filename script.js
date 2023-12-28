const winScreenElem = document.querySelector(".winScreen")
const rodAElem = document.querySelector(".rodA")
const rodBElem = document.querySelector(".rodB")
const rodCElem = document.querySelector(".rodC")

document.getElementById("button").addEventListener("click", () => {
    towerOfHanoi()
    // update all rods (visual) after making a move
    updateRod(rodA, rodAElem);
    updateRod(rodB, rodBElem);
    updateRod(rodC, rodCElem);
});

//initialize all rods, with three discs on rod A
let rodA = [3, 2, 1]
let rodB = []
let rodC = []

//putting all rods in an array to be able to loop them
const rods = [rodA, rodB, rodC]
//giving the rods their names
const rodNames = ["A", "B", "C" ]

//The function to see if the game is done or not
function checkIfDone(){
    if(rodC.length === 3) {
        console.log('We are done');
        document.getElementById("button").style.display = "none";
        //giving the winning screen a slight delay to let the player see the disc move first
        setTimeout(function () {
            winScreenElem.style.display = "grid";
            document.querySelector(".rods").style.border = "none";
        }, 1000);
    }
}
function towerOfHanoi() {
   //looping through all rods 
    for (let i = 0; i < rods.length; i++) {
        const currentRod = rods[i];
        const rodName = rodNames[i];
        const disc = currentRod[currentRod.length - 1]
        const discOnC = rodC[rodC.length - 1]
        const discOnB = rodB[rodB.length - 1]

        //needed to add in a special case where we need to use the A-rod as a helper rod instead of the B-rod. Only active when we move the smallest disc and the biggest disc is on C-rod
        const specialCase =  disc === 1 && discOnC === 3;

        //If the special case is true and we are currently on rod B, we use rod A as a help rod
        if (specialCase && rodName === "B") {
            const movingDisc = currentRod.pop()
            rodA.push(movingDisc)
            console.log(`moves disc: ${movingDisc} to rodA`);
        
            break;
        }
        
        //these two if-statesment checks if we are able to move to the C rod, if not, it checks if it can move it to B. If not, we move on to the next rod in the array (loop)
        if ((disc < discOnC || discOnC === undefined) && rodName !== 'C' && !specialCase) {
            const movingDisc = currentRod.pop()
            rodC.push(movingDisc)
            console.log(`moves disc: ${movingDisc} to rodC`);
            console.log(`current disc: ${disc} rodC:  ${discOnC}`);
            checkIfDone()
            break;
        }
        
        if ((disc < discOnB || discOnB === undefined) && rodName !== 'B' && !specialCase) {
            const movingDisc = currentRod.pop()
            rodB.push(movingDisc)
            console.log(`moves disc: ${movingDisc} to rodB`);
            console.log(`current disc: ${disc} rodC:  ${discOnC}`);
        
            break;
        }
    } 

}

function updateRod(rodArray, rodElement) {
    rodElement.innerHTML = ""; // Rensa innehållet för att undvika duplicering
    for (let i = 0; i < rodArray.length;  i++) {
        const discElem = document.createElement("div");
        discElem.classList.add("disc");
        discElem.style.width = rodArray[i] * 30 + "px";
        rodElement.appendChild(discElem);
    }
}

// Initial update on page load
updateRod(rodA, rodAElem);
updateRod(rodB, rodBElem);
updateRod(rodC, rodCElem);