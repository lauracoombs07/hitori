"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Review Assignment

   Author: Laura Coombs
   Date:   June 1, 2024


   Global Variables
   ================

   allCells Done
      References the TD cells within the Hitori table grid.

   Function List
   =============

   startUp() Done
      Run when the web page is loaded; displays puzzle 1
      and loads the event handlers for the web page buttons.

   setupPuzzle() Done
      Sets up a new puzzle, adding the event handlers for
      every puzzle cell.

   switchPuzzle(e) Done
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   findErrors() Done
      Highlights the errors in the Hitori puzzle in a red font.

   showSolution() Given
      Shows the solution to the Hitori puzzle

   checkSolution() Given
      Checks the current user's puzzle to verify whether it contains
      the complete and correct solution.

   drawHitori(numbers, blocks, rating) Given
      Returns a text string of the HTML code to
      display a Hitori puzzle table based on the contents of
      the numbers, blocks, and rating parameters.

*/

/* ================================================================= */

var allCells;

window.onload = startUp;

function startUp() {
   // a. change the inner HTML of the element with id puzzleTitle to text "Puzzle 1"
   document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";
   // b. Call the drawHitori() function using the  hitori1Numbers, hitori1Blocks, and hitori1Rating variables as arguments and store the HTML code returned int hte inner HTML of the page element sith id "puzzle
    document.getElementById("puzzle").innerHTML = drawHitori(hitori1Numbers, hitori1Blocks, hitori1Rating);
   // c. Declare a variable named puzzleButtons referencing the page elements with the class name "puzzles"
   var puzzleButtons = document.getElementsByClassName("puzzles");
   // c. Loop through the puzzleButtons collection and for each button, add an even handler that runs the switchPuzzle() function when the button is clicked
  for (var i = 0; i < puzzleButtons.length; i++) puzzleButtons[i].onclick = switchPuzzle;
  // d. Call the setupPuzzle() function
  setupPuzzle();
   // e. Add an event handler to the check solutions button to run the find errors function when clicked
    document.getElementById("check").onclick = findErrors;
   // f. add and event handler to the show solution button to run the showSolution() function when clicked
    document.getElementById("solve").onclick = showSolution;

}

// Add the switchPuzzle() function, which switches the page between the three possible Hitori puzzles. Include the event object e as a parameter of the function and add the following commands:
function switchPuzzle(e) {
   //   a. Declare the puzzleID variable equal to the ID of the event object target.
   //   e. Enclose all of the commands in the switchPuzzle() function within an if statement that displays a confirm dialog box asking users whether they want to switch puzzles even though their work will be lost. If the confirm dialog box returns a value of true, run the commands within the if statement command block.
    if (confirm("You will lose all of your work on the puzzle. Do you want to switch puzzles?")) {
       var puzzleID = e.target.id;
       //   b. Change the inner HTML of the element with the ID “puzzleTitle” to the value of the value attribute of the event object target.
       document.getElementById("puzzleTitle").innerHTML = e.target.value;
       //   c. Create a switch-case structure with the puzzleID variable that loads the appropriate HTML code for each of the three puzzles into the page element with the ID “puzzle”. Use the drawHitori() function to generate the HTML code and assume that puzzleID is limited to the values “puzzle1”, “puzzle2”, and “puzzle3”.
       switch (puzzleID) {
          case "puzzle1":
              document.getElementById("puzzle").innerHTML = drawHitori(hitori1Numbers, hitori1Blocks, hitori1Rating);
              break;
          case "puzzle2":
              document.getElementById("puzzle").innerHTML = drawHitori(hitori2Numbers, hitori2Blocks, hitori2Rating);
              break;
          case "puzzle3":
              document.getElementById("puzzle").innerHTML = drawHitori(hitori3Numbers, hitori3Blocks, hitori3Rating);
              break;
      }
      // d. After the switch-case structure, call the setupPuzzle() function to set up the features of the selected puzzle.
      setupPuzzle();
    }
}

// 7. Create the setupPuzzle() function to set up the features of the puzzle table. Within the function add the following commands:
function setupPuzzle() {
//   a. Use the querySelectorAll() method to create an object collection of all of the td elements within the hitoriGrid table and save the object collection in the allCells variable.
   allCells = document.querySelectorAll("table#hitoriGrid td");
//   b. Create a for loop that loops the allCells object collection and, for each cell, change the background-color style to white, the font color to black, and the border-radius value to 0.
    for (var i = 0; i < allCells.length; i++) {
       allCells[i].style.backgroundColor = "white";
       allCells[i].style.color = "black";
       allCells[i].style.borderRadius = "0";
       //   Within the for loop, add a mouseover event listener for each puzzle cell that runs an anonymous function that
       allCells[i].onmousedown = function(e) {
          //    i. Change the background color to white, the font color to black, and the border radius to 0 if the user is pressing the Shift key.
          if (e.shiftKey) {
             this.style.backgroundColor = "white";
             this.style.color = "black";
             this.style.borderRadius = "0";
             // i. Changes the cursor to the jpf_eraser.png image or the generic cursor named “alias” if the user is pressing the Shift key this.style.cursor = "url(images/jpf_eraser.png), alias";
             // iv. To avoid inadvertently selecting the text of the table cells, include a command to prevent the default action of the browser in response to the mousedown event.
             e.preventDefault();//   ii. Change the background color to black, the font color to white, and the border radius to 0 if the user is pressing the Alt key.
          } else if (e.altKey) {
             this.style.backgroundColor = "black";
             this.style.color = "white";
             this.style.borderRadius = "0";
            //   ii. Changes the cursor to the jpf_block.png image or the generic cursor named “cell” if the user is pressing the Alt key. this.style.cursor = "url(images/jpf_block.png), cell";
             e.preventDefault();//   iii. Otherwise, change the background color to rgb(101, 101, 101), the font color to white, and the border radius to 50%.
          } else {
             this.style.backgroundColor = "rgb(101, 101, 101)";
             this.style.color = "white";
             this.style.borderRadius = "50%";
            //   iii. Otherwise, changes the cursor to the jpf_circle.png image or the generic cursor named “pointer”.
            //   this.style.cursor = "url(images/jpf_circle.png), pointer";
             e.preventDefault();
          }
       }
       //   Within the for loop, add a mouseover event listener for each puzzle cell that runs an anonymous function that
       allCells[i].onmouseover = function(e) {
          if (e.shiftKey) {
             // i. Changes the cursor to the jpf_eraser.png image or the generic cursor named “alias” if the user is pressing the Shift key.
             this.style.cursor = "url(images/jpf_eraser.png), alias";
             // iv. To avoid inadvertently selecting the text of the table cells, include a command to prevent the default action of the browser in response to the mousedown event.
          } else if (e.altKey) {
             //   ii. Changes the cursor to the jpf_block.png image or the generic cursor named “cell” if the user is pressing the Alt key.
             this.style.cursor = "url(images/jpf_block.png), cell";
          } else {
             //   iii. Otherwise, changes the cursor to the jpf_circle.png image or the generic cursor named “pointer”.
             this.style.cursor = "url(images/jpf_circle.png), pointer";
          }
       }
      // e. Finally, within the for loop, add an event listener that runs the checkSolution() function in response to the mouseup event to test whether the user has solved the puzzle.
      document.addEventListener("mouseup", checkSolution);
    }
}

// 8. Create the findErrors() function that will highlight incorrect cells by displaying the cell number of an incorrect cell in a red font. Add the following commands:
function findErrors() {
  //   a. Create a for loop that goes through all of the cells in the allCells object collection. If the cell belongs to the blocks class but has a background color of rgb(101, 101, 100) or if it belongs to the circles class but has a black background, change the font color to red.
  //   b. The red font colors should appear only briefly.
  for (var i = 0; i < allCells.length; i++) {
    if ((allCells[i].className === "blocks" && allCells[i].style.backgroundColor === "rgb(101, 101, 101)") ||
        (allCells[i].className === "circles" && allCells[i].style.backgroundColor === "black")) {
      allCells[i].style.color = "red";
    }
  }
  //   After the for loop, insert a setTimeout() method with a 1-second interval.
  setTimeout(function() {
  //   Within the setTimeout() method, add an anonymous function that loops through every cell in the allCells collection, changing all cells with a font color of red back to white.
    for (var i = 0; i < allCells.length; i++) {
      if (allCells[i].style.color === "red") {
        allCells[i].style.color = "white";
      }
    }
  }, 1000)
}


/* ================================================================= */

function checkSolution() {
   /* Set the initial solved state of the puzzle to true */
   var solved = true;

   /* Loop through the puzzle cells, exiting when an incorrect
      cell is found, setting the solved variable to false */

   for (var i = 0; i < allCells.length; i++) {
      var cellColor = allCells[i].style.backgroundColor;
      var cellClass = allCells[i].className;

      /* A cell is incorrect if it is in the block class and is not black
         or in the circle class and is not white */
      if ( (cellClass === "blocks" && cellColor !== "black") ||
           (cellClass === "circles" && cellColor !== "rgb(101, 101, 101)")) {
         solved = false;
         break;
      }
   }

   /* If solved is still true after the loop, display an alert box */
   if (solved) alert("Congratulations! You solved the puzzle!");
}

function showSolution () {
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].style.color = "";
      allCells[i].style.backgroundColor = "";
      allCells[i].style.borderRadius = "";
   };
}

function drawHitori(numbers, blocks, rating) {

   /* Initial HTML String for the Hitori Puzzle */
   var htmlString = "";

   /* numbers is a multidimensional array containing the
      Hitori numbers; blocks is a corresponding
      multidimensional array containing the location of the
      blocks which are indicated by the # character.
      Non-blocking cells are indicated by a blank character.
  */

   /* Create a Web table with the id, hitoriGrid, containing
      the numeric values. Blocks cells have the class name,
      blocks. Non-blocking cells have the class name, circles
  */

   var totalRows = numbers.length;
   var totalCols = numbers[0].length;
   htmlString = "<table id='hitoriGrid'>";
   htmlString += "<caption>" + rating + "</caption>";


   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr>";

      for (var j = 0; j < totalCols; j++) {
         if (blocks[i][j] == "#") htmlString += "<td  class='blocks'>"
         else htmlString += "<td class='circles'>";

         htmlString += numbers[i][j];
         htmlString +="</td>";
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}
