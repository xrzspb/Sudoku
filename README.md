# Sudoku
===========================
How to run the application
===========================
Open View.html in a browser. The application supports multiple
browers, including IE10, Chrome, Firefox, Safari and Opera.

===========================
Workflow 
===========================
Clicks on 'Let's start' in the starter page and then choose a 
difficulty to start the game. 
When game is over, a popup window will be displayed to let user
choose to restart or return to the starter page.

===========================
Responsive Web Design
===========================
To make UI look nice in multiple broswers and devices is challenging. 

To implement responsive design, I did couple things: 

  1. use relative sizes instead of absolute size for components
  
  2. calculate component size dynamically based on window's size
   
  3. use an Input Panel for user input, considering it's difficult and 
     slow to use keyboard in mobile devices

===========================
Code Structure
===========================
The whole structure are designed based on MVC framework.

1. View

  (1) View.jade: draws the basic UI, which is translated to HTML by 
                Jade engine automatically
                
  (2) SudokuView.js: it dynamicly draws UI of the sudoku board and
                    of the digits panel
                    
2. Model

  (1) SudokuGenerator.js: creates the board data model
  
  (2) SudokuSolver.js: manipulates the board data model
  
  (3) Cell.js: represents a cell object in the sudoku board. It 
              contains properties: row, column, value and possible values
              
3. Controller 

  (1) ViewController.js: handles user action events

4. Helper:

  (1) Config.js: contains constants which are used universally. 
                it defines dimension of the board so that we can create an
                advanced Soduku game in a larger board than 9*9

  (2) Util.js: contains general helper methods

============================
Unit Test
============================
using Qunit test framework to test logic in sudoku solver and in utility methods





