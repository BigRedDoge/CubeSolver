# CubeSolver

This is a Rubik's Cube solver written in Python and Javascript.  It takes in pictures of each side of the cube and processes the colors and positions. It extracts colors from the pictures with OpenCV, and then maps the color positions.  Next it takes the position data and calculates a solution. The solving code is written in javascript.  It outputs each step of the solution by listing the color to turn clockwise or counterclockwise (if it says "inverted").  Examples of the cube pictures are in the cube folder.  You place the cube pictures in the cube folder, and it outputs the processed images with colored boxes around each color in the cube_res folder. An example solve is listed in example_solve.txt (from the example pictures).
 
#### To run the program: node solver.js 

Dependencies: 
  * python-shell — npm install python-shell  
  * cv2 — pip install opencv-python 
