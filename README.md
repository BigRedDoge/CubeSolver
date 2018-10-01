# CubeSolver

This is a Rubik's Cube solver written in Python and Javascript.  It takes in pictures of each side of the cube and processes the colors and positions. It does this with OpenCV in python.  Then it takes the position data and calculates the solution. The solving code is written in javascript.  It outputs each step of the solution by listing the color to turn clockwise or counterclockwise (if it says "inverted").  Examples of the cube pictures are in the cube folder.  You place the cube pictures in the cube folder, and it outputs the processed images with colored boxes around each color in the cube_res folder.

#### node solver.js to start the program

Dependencies: 
  * python-shell — npm install python-shell  
  * cv2 — pip install opencv-python 
