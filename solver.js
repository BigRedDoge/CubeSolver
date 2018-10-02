var CubeMap = require('./CubeMap.js');
var GetPositions = require('./Positions');

var options = {
  mode: 'json',
  pythonPath: 'path/to/python',
  pythonOptions: ['-u'],
  scriptPath: 'Full Path to CubeSolver Folder'
};
var { PythonShell } = require('python-shell', options);

var w, r, b, o, g, y;
var solution = [];

PythonShell.run('color_detection.py', options, function (err, results) {
    if (err) throw err;
    res = results[0];
    w = res.w;
    r = res.r;
    b = res.b;
    o = res.o;
    g = res.g;
    y = res.y;
    console.log('White Side: %s', w);
    console.log('Red Side: %s', r);
    console.log('Blue Side: %s', b);
    console.log('Orange Side: %s', o);
    console.log('Green Side: %s', g);
    console.log('Yellow Side: %s', y);
    cross();
});

function turn90(color) {
  var prev = new CubeMap(w, g, r, b, o, y);
  // Blue Clockwise
  if (color === 'blue') {
    //console.log('blue');
    solution.push("blue");

    // Blue Corners
    b.splice(0, 1, prev.bC[2]);
    b.splice(2, 1, prev.bC[0]);
    b.splice(8, 1, prev.bC[1]);
    b.splice(6, 1, prev.bC[3]);
    // Blue Edges
    b.splice(1, 1, prev.bE[1]);
    b.splice(5, 1, prev.bE[0]);
    b.splice(7, 1, prev.bE[2]);
    b.splice(3, 1, prev.bE[3]);

    // White Corners
    w.splice(2, 1, prev.rC[1]);
    w.splice(8, 1, prev.rC[3]);
    // White Edges
    w.splice(5, 1, prev.rE[2]);

    // Red Corners
    r.splice(2, 1, prev.yC[1]);
    r.splice(8, 1, prev.yC[3]);
    // Red Edges
    r.splice(5, 1, prev.yE[2]);

    // Orange Corners
    o.splice(6, 1, prev.wC[1]);
    o.splice(0, 1, prev.wC[3]);
    // Orange Edges
    o.splice(3, 1, prev.wE[2]);

    // Yellow Corners
    y.splice(2, 1, prev.oC[2]);
    y.splice(8, 1, prev.oC[0]);
    // Yellow Edges
    y.splice(5, 1, prev.oE[1]);

  //  console.log(cube);
  }
  // White Clockwise
  if (color === 'white') {
    //console.log('white');
    solution.push("white");

    // Blue Corners
    b.splice(0, 1, prev.oC[0]);
    b.splice(2, 1, prev.oC[1]);
    // Blue Edges
    b.splice(1, 1, prev.oE[0]);

    // White Corners
    w.splice(0, 1, prev.wC[2]);
    w.splice(2, 1, prev.wC[0]);
    w.splice(8, 1, prev.wC[1]);
    w.splice(6, 1, prev.wC[3]);
    // White Edges
    w.splice(1, 1, prev.wE[1]);
    w.splice(5, 1, prev.wE[0]);
    w.splice(7, 1, prev.wE[2]);
    w.splice(3, 1, prev.wE[3]);

    // Red Corners
    r.splice(0, 1, prev.bC[0]);
    r.splice(2, 1, prev.bC[1]);
    // Red Edges
    r.splice(1, 1, prev.bE[0]);

    // Orange Corners
    o.splice(0, 1, prev.gC[0]);
    o.splice(2, 1, prev.gC[1]);
    // Orange Edges
    o.splice(1, 1, prev.gE[0]);

    // Green Corners
    g.splice(0, 1, prev.rC[0]);
    g.splice(2, 1, prev.rC[1]);
    // Green Edges
    g.splice (1, 1, prev.rE[0]);

  //  console.log(cube);
  }

  if (color === 'green') {
    //console.log('green');
    solution.push("green");

    // Yellow Corners
    y.splice(0, 1, prev.rC[0]);
    y.splice(6, 1, prev.rC[2]);
    // Yellow Edges
    y.splice(3, 1, prev.rE[1]);

    // White Corners
    w.splice(0, 1, prev.oC[3]);
    w.splice(6, 1, prev.oC[1]);
    // White Edges
    w.splice(3, 1, prev.oE[2]);

    // Red Corners
    r.splice(0, 1, prev.wC[0]);
    r.splice(6, 1, prev.wC[2]);
    // Red Edges
    r.splice(3, 1, prev.wE[1]);

    // Orange Corners
    o.splice(2, 1, prev.yC[2]);
    o.splice(8, 1, prev.yC[0]);
    // Orange Edges
    o.splice(5, 1, prev.yE[1]);

    // Green Corners
    g.splice(0, 1, prev.gC[2]);
    g.splice(2, 1, prev.gC[0]);
    g.splice(8, 1, prev.gC[1]);
    g.splice(6, 1, prev.gC[3]);
    // Green Edges
    g.splice(1, 1, prev.gE[1]);
    g.splice(3, 1, prev.gE[3]);
    g.splice(5, 1, prev.gE[0]);
    g.splice(7, 1, prev.gE[2]);

//    console.log(cube);
  }

  if (color === 'red') {
    //console.log('red');
    solution.push("red");

    // Yellow Corners
    y.splice(0, 1, prev.bC[2]);
    y.splice(2, 1, prev.bC[0]);
    // Yellow Edges
    y.splice(1, 1, prev.bE[1]);

    // White Corners
    w.splice(6, 1, prev.gC[3]);
    w.splice(8, 1, prev.gC[1]);
    // White Edges
    w.splice(7, 1, prev.gE[2]);

    // Red Corners
    r.splice(0, 1, prev.rC[2]);
    r.splice(2, 1, prev.rC[0]);
    r.splice(8, 1, prev.rC[1]);
    r.splice(6, 1, prev.rC[3]);
    // Red Edges
    r.splice(1, 1, prev.rE[1]);
    r.splice(5, 1, prev.rE[0]);
    r.splice(7, 1, prev.rE[2]);
    r.splice(3, 1, prev.rE[3]);

    // Blue Corners
    b.splice(0, 1, prev.wC[2]);
    b.splice(6, 1, prev.wC[3]);
    // Blue Edges
    b.splice(3, 1, prev.wE[3]);

    // Green Corners
    g.splice(2, 1, prev.yC[0]);
    g.splice(8, 1, prev.yC[1]);
    // Green Edges
    g.splice(5, 1, prev.yE[0]);

  //  console.log(cube);
  }

  if (color === 'yellow') {
    //console.log('yellow');
    solution.push("yellow");

    // Yellow Corners
    y.splice(0, 1, prev.yC[2]);
    y.splice(2, 1, prev.yC[0]);
    y.splice(8, 1, prev.yC[1]);
    y.splice(6, 1, prev.yC[3]);
    // Yellow Edges
    y.splice(1, 1, prev.yE[1]);
    y.splice(5, 1, prev.yE[0]);
    y.splice(7, 1, prev.yE[2]);
    y.splice(3, 1, prev.yE[3]);

    // Orange Corners
    o.splice(8, 1, prev.bC[3]);
    o.splice(6, 1, prev.bC[2]);
    // Orange Edges
    o.splice(7, 1, prev.bE[3]);

    // Red Corners
    r.splice(8, 1, prev.gC[3]);
    r.splice(6, 1, prev.gC[2]);
    // Red Edges
    r.splice(7, 1, prev.gE[3]);

    // Blue Corners
    b.splice(8, 1, prev.rC[3]);
    b.splice(6, 1, prev.rC[2]);
    // Blue Edges
    b.splice(7, 1, prev.rE[3]);

    // Green Corners
    g.splice(8, 1, prev.oC[3]);
    g.splice(6, 1, prev.oC[2]);
    // Green Edges
    g.splice(7, 1, prev.oE[3]);

//    console.log(cube);
  }

  if (color === 'orange') {
    //console.log('orange');
    solution.push("orange");

    // Yellow Corners
    y.splice(6, 1, prev.gC[0]);
    y.splice(8, 1, prev.gC[2]);
    // Yellow Edges
    y.splice(7, 1, prev.gE[1]);

    // Orange Corners
    o.splice(0, 1, prev.oC[2]);
    o.splice(2, 1, prev.oC[0]);
    o.splice(8, 1, prev.oC[1]);
    o.splice(6, 1, prev.oC[3]);
    // Orange Edges
    o.splice(1, 1, prev.oE[1]);
    o.splice(5, 1, prev.oE[0]);
    o.splice(7, 1, prev.oE[2]);
    o.splice(3, 1, prev.oE[3]);

    // White Corners
    w.splice(0, 1, prev.bC[1]);
    w.splice(2, 1, prev.bC[3]);
    // White Edges
    w.splice(1, 1, prev.bE[2]);

    // Blue Corners
    b.splice(2, 1, prev.yC[3]);
    b.splice(8, 1, prev.yC[2]);
    // Blue Edges
    b.splice(5, 1, prev.yE[3]);

    // Green Corners
    g.splice(0, 1, prev.wC[1]);
    g.splice(6, 1, prev.wC[0]);
    // Green Edges
    g.splice(3, 1, prev.wE[0]);
  }
}

function turn270(color) {
  turn90(color);
  turn90(color);
  turn90(color);
}

function cross() {
  var edgepos = new GetPositions(w, g, r, b, o, y);
//  edgepos.updateSides(w, g, r, b, o, y);
  var edges = edgepos.getEdges();
  var edgecolors = edgepos.edgeColors();
  if (edgecolors[0].indexOf("White") === 0 && edgecolors[1].indexOf("White") === 0 && edgecolors[2].indexOf("White") === 0 && edgecolors[3].indexOf("White") === 0) {
    if (!(w[1].includes('w')) || !(w[1].includes('w')) || !(w[1].includes('w')) || !(w[1].includes('w'))) {
      crossOrientation();
      return;
    } else {
      solution.push("Finished Cross");
    }
  }
  edge4();
  function edge4() {
    if (edgecolors[4].indexOf("White") === 0) {
      if (edgecolors[1].indexOf("White") !== 0) {
        turn90('blue');
        edge6();
      } else if (edgecolors[2].indexOf("White") !== 0) {
        turn270('red');
        edge6();
      } else {
        turn90('white');
        cross();
      }
    } else {
      edge6();
    }
  }
  function edge6() {
    if (edgecolors[6].indexOf("White") === 0) {
      if (edgecolors[3].indexOf("White") !== 0) {
        turn90('green');
        edge7();
      } else if (edgecolors[0].indexOf("White") !== 0) {
        turn270('orange');
        edge7();
      } else {
        turn90('white');
        cross();
      }
    } else {
      edge7();
    }
  }
  function edge7() {
    if (edgecolors[7].indexOf("White") === 0) {
      if (edgecolors[2].indexOf("White") !== 0) {
        turn90('red');
        edge5()
      } else if (edgecolors[3].indexOf("White") !== 0) {
        turn270('green');
        edge5()
      } else {
        turn90('white');
        cross();
      }
    } else {
      edge5();
    }
  }
  function edge5() {
    if (edgecolors[5].indexOf("White") === 0) {
      if (edgecolors[0].indexOf("White") !== 0) {
        turn90('orange');
        cross();
      } else if (edgecolors[1].indexOf("White") !== 0) {
        turn270('blue');
        cross();
      } else {
        turn90('white');
        cross();
      }
    } else {
      edge8();
    }
  }
  function edge8() {
    if (edgecolors[8].indexOf("White") === 0) {
      if (edgecolors[2].indexOf("White") !== 0) {
        turn90('red');
        turn90('red');
        cross();
      } else {
        turn90('white');
        cross();
      }
    } else {
      edge9();
    }
  }
  function edge9() {
    if (edgecolors[9].indexOf("White") === 0) {
      if (edgecolors[1].indexOf("White") !== 0) {
        turn90('blue');
        turn90('blue');
        cross();
      } else {
        turn90('white');
        cross();
      }
    } else {
      edge10();
    }
  }
  function edge10() {
    if (edgecolors[10].indexOf("White") === 0) {
      if (edgecolors[1].indexOf("White") !== 0) {
        turn90('orange');
        turn90('orange');
        cross();
      } else {
        turn90('white');
        cross();
      }
    } else {
      edge11();
    }
  }
  function edge11() {
    if (edgecolors[11].indexOf("White") === 0) {
      if (edgecolors[3].indexOf("White") !== 0) {
        turn90('green');
        turn90('green');
        cross();
      } else {
        turn90('white');
        cross();
      }
    } else {
      cross();
    }
  }

}

function crossOrientation() {
  var edgepos = new GetPositions(w, g, r, b, o, y);
  edgepos.updateSides(w, g, r, b, o, y);
  edgepos.getEdges();
  var edgecolors = edgepos.edgeColors();
  if (edgecolors[0] !== 'WhiteOrange') {
    if (edgecolors[0] === 'WhiteBlue') {
      turn90('orange');
      turn90('orange');
      turn90('blue');
      turn90('orange');
      turn270('blue');
      crossOrientation();
    } else if (edgecolors[0] === 'WhiteRed') {
      turn90('orange');
      turn90('orange');
      turn90('yellow');
      turn90('yellow');
      turn90('red');
      turn90('red');
      turn90('yellow');
      turn90('yellow');
      turn90('orange');
      turn90('orange');
      crossOrientation();
    } else if (edgecolors[0] === 'WhiteGreen') {
      turn90('orange');
      turn90('green');
      turn90('white');
      turn90('white');
      turn90('red');
      turn90('white');
      turn90('white');
      crossOrientation();
    }
  } else if (edgecolors[1] !== 'WhiteBlue') {
    if (edgecolors[1] === 'WhiteRed') {
      turn90('blue');
      turn90('blue');
      turn90('red');
      turn90('blue');
      turn270('red');
      crossOrientation();
    } else if (edgecolors[1] === 'WhiteOrange') {
      turn90('orange');
      turn90('orange');
      turn90('blue');
      turn90('orange');
      turn270('blue');
      crossOrientation();
    } else if (edgecolors[1] === 'WhiteGreen') {
      turn90('blue');
      turn90('blue');
      turn90('yellow');
      turn90('yellow');
      turn90('green');
      turn90('green');
      turn90('yellow');
      turn90('yellow');
      turn90('blue');
      turn90('blue');
      crossOrientation();
    }
  } else if (edgecolors[2] !== 'WhiteRed') {
    if (edgecolors[2] === 'WhiteBlue') {
      turn90('blue');
      turn90('blue');
      turn90('red');
      turn90('blue');
      turn270('red');
      crossOrientation();
    } else if (edgecolors[2] === 'WhiteOrange') {
      turn90('red');
      turn90('red');
      turn90('yellow');
      turn90('yellow');
      turn90('orange');
      turn90('orange');
      turn90('yellow');
      turn90('yellow');
      turn90('red');
      turn90('red');
      crossOrientation();
    } else if (edgecolors[2] === 'WhiteGreen') {
      turn90('red');
      turn90('red');
      turn90('green');
      turn90('red');
      turn270('green');
      crossOrientation();
    }
  } else if (edgecolors[3] !== 'WhiteGreen') {
    if (edgecolors[3] === 'WhiteBlue') {
      turn90('green');
      turn90('green');
      turn90('yellow');
      turn90('yellow');
      turn90('blue');
      turn90('blue');
      turn90('yellow');
      turn90('yellow');
      turn90('green');
      turn90('green');
      crossOrientation();
    } else if (edgecolors[3] === 'WhiteOrange') {
      turn90('green');
      turn90('green');
      turn90('orange');
      turn90('green');
      turn270('orange');
      crossOrientation();
    } else if (edgecolors[3] === 'WhiteRed') {
      turn90('red');
      turn90('red');
      turn90('green');
      turn90('red');
      turn270('green');
      crossOrientation();
    }
  } else {
    solution.push("Oriented Cross");
    crossColorOrientation();
  }
}
function crossColorOrientation() {
  var edgepos = new GetPositions(w, g, r, b, o, y);
  edgepos.updateSides(w, g, r, b, o, y);
  edgepos.getEdges();
  if (w[1] === 'w1' && w[5] === 'w5' && w[7] === 'w7' && w[3] === 'w3') {
    solution.push("Cross Completed!");
    firstLayerCorners();
  }
  if (w[1] !== 'w1') {
    turn90('orange');
    turn270('white');
    turn90('green');
    turn90('white');
    crossColorOrientation();
  } else if (w[5] !== 'w5') {
    turn90('blue');
    turn270('white');
    turn90('orange');
    turn90('white');
    crossColorOrientation();
  } else if (w[7] !== 'w7') {
    turn90('red');
    turn270('white');
    turn90('blue');
    turn90('white');
    crossColorOrientation();
  } else if (w[3] !== 'w3') {
    turn90('green');
    turn270('white');
    turn90('red');
    turn90('white');
    crossColorOrientation();
  }
}

function firstLayerCorners() {
  let cornerpos = new GetPositions(w, g, r, b, o, y);
  cornerpos.getCorners();
  let cornercolors = cornerpos.cornerColors();
  if (cornercolors[0] !== 'Corner0') {
    let index = cornercolors.indexOf('Corner0');
    if (index === 1) {
      turn90('blue');
      turn90('yellow');
      turn270('blue');
      turn90('yellow');
      turn90('orange');
      turn270('yellow');
      turn270('orange');
    } else if (index === 2) {
      turn90('red');
      turn90('orange');
      turn90('yellow');
      turn90('yellow');
      turn270('orange');
      turn270('red');
    } else if (index === 3) {
      turn90('green');
      turn90('yellow');
      turn90('green');
      turn90('green');
      turn90('yellow');
      turn90('yellow');
      turn90('green');
    } else if (index === 4) {
      turn90('orange');
      turn270('yellow');
      turn270('orange');
    } else if (index === 5) {
      turn90('orange');
      turn90('yellow');
      turn90('yellow');
      turn270('orange');
    } else if (index === 6) {
      turn270('green');
      turn90('yellow');
      turn90('green');
    } else if (index === 7) {
      turn270('yellow');
      turn270('green');
      turn90('yellow');
      turn90('green');
    }
    firstLayerCorners();
  } else if (cornercolors[1] !== 'Corner1') {
      let index = cornercolors.indexOf('Corner1');
      if (index === 0) {
        turn270('green');
        turn90('blue');
        turn270('yellow');
        turn270('blue');
        turn90('green');
      } else if (index === 2) {
        turn90('red');
        turn90('yellow');
        turn270('red');
        turn90('yellow');
        turn90('blue');
        turn270('yellow');
        turn270('blue');
      } else if (index === 3) {
        turn90('green');
        turn90('blue');
        turn90('yellow');
        turn90('yellow');
        turn270('blue');
        turn270('green');
      } else if (index === 4) {
        turn90('blue');
        turn90('yellow');
        turn90('yellow');
        turn270('blue');
      } else if (index === 5) {
        turn270('orange');
        turn90('yellow');
        turn90('orange');
      } else if (index === 6) {
        turn90('yellow');
        turn90('blue');
        turn270('yellow');
        turn270('blue');
      } else if (index === 7) {
        turn90('blue');
        turn270('yellow');
        turn270('blue');
      }
      firstLayerCorners();
    } else if (cornercolors[2] !== 'Corner2') {
        let index = cornercolors.indexOf('Corner2');
        if (index === 0) {
          turn90('orange');
          turn90('red');
          turn90('yellow');
          turn90('yellow');
          turn270('orange');
          turn270('red');
        } else if (index === 1) {
          turn90('red');
          turn270('orange');
          turn270('yellow');
          turn90('orange');
          turn270('red');
        } else if (index === 3) {
          turn90('green');
          turn90('yellow');
          turn90('yellow');
          turn270('green');
          turn90('red');
          turn270('yellow');
          turn270('red');
        } else if (index === 4) {
          turn270('blue');
          turn90('yellow');
          turn90('blue');
        } else if (index === 5) {
          turn270('yellow');
          turn270('blue');
          turn90('yellow');
          turn90('blue');
        } else if (index === 6) {
          turn90('red');
          turn270('yellow');
          turn270('red');
        } else if (index === 7) {
          turn90('red');
          turn90('yellow');
          turn90('yellow');
          turn270('red');
        }
        firstLayerCorners();
      } else if (cornercolors[3] !== 'Corner3') {
          let index = cornercolors.indexOf('Corner3');
          if (index === 0) {
            turn90('orange');
            turn270('red');
            turn90('yellow');
            turn270('orange');
            turn90('red');
          } else if (index === 1) {
            turn90('green');
            turn270('orange');
            turn90('yellow');
            turn90('yellow');
            turn90('orange');
            turn270('green');
          } else if (index === 2) {
            turn270('blue');
            turn90('green');
            turn270('yellow');
            turn90('blue');
            turn270('green');
          } else if (index === 4) {
            turn90('yellow');
            turn90('green');
            turn270('yellow');
            turn270('green');
          } else if (index === 5) {
            turn90('green');
            turn270('yellow');
            turn270('green');
          } else if (index === 6) {
            turn270('red');
            turn270('yellow');
            turn90('red');
          } else if (index === 7) {
            turn270('red');
            turn90('yellow');
            turn90('red');
          }
          firstLayerCorners();
      } else {
        solution.push("Corners");
        firstCornersOrientation();
      }
}

function firstCornersOrientation() {
  if (w[0] !== 'w0') {
    if (w[0] === 'o2') {
      turn270('green');
      turn270('yellow');
      turn90('green');
      turn90('yellow');
      turn270('green');
      turn270('yellow');
      turn90('green');
    } else if (w[0] === 'g0') {
      turn90('orange');
      turn90('yellow');
      turn270('orange');
      turn90('yellow');
      turn90('yellow');
      turn270('green');
      turn90('yellow');
      turn90('green');
    }
    firstCornersOrientation();
  } else if (w[2] !== 'w2') {
    if (w[2] === 'o0') {
      turn90('blue');
      turn90('yellow');
      turn270('blue');
      turn90('yellow');
      turn90('yellow');
      turn270('orange');
      turn90('yellow');
      turn90('orange');
    } else if (w[2] === 'b2') {
      turn270('orange');
      turn270('yellow');
      turn90('orange');
      turn90('yellow');
      turn270('orange');
      turn270('yellow');
      turn90('orange');
    }
    firstCornersOrientation();
  } else if (w[8] !== 'w8') {
    if (w[8] === 'r2') {
      turn270('blue');
      turn270('yellow');
      turn90('blue');
      turn90('yellow');
      turn270('blue');
      turn270('yellow');
      turn90('blue');
    } else if (w[8] === 'b0') {
      turn90('red');
      turn90('yellow');
      turn90('yellow');
      turn270('red');
      turn270('blue');
      turn90('yellow');
      turn90('yellow');
      turn90('blue');
    }
    firstCornersOrientation();
  } else if (w[6] !== 'w6') {
    if (w[6] === 'r0') {
      turn90('green');
      turn90('yellow');
      turn90('yellow');
      turn270('green');
      turn270('red');
      turn90('yellow');
      turn90('yellow');
      turn90('red');
    } else if (w[6] === 'g2') {
      turn270('red');
      turn270('yellow');
      turn90('red');
      turn90('yellow');
      turn270('red');
      turn270('yellow');
      turn90('red');
    }
    firstCornersOrientation();
  } else {
    solution.push("Corners Oriented");
    secondLayerEdges();
  }
}

function secondLayerEdges() {
  var edgepos = new GetPositions(w, g, r, b, o, y);
  edgepos.getEdges();
  var edgecolors = edgepos.edgeColors();
  if (edgecolors[4] !== "RedBlue") {
    let index = edgecolors.indexOf("RedBlue");
    let alignEdge = new Promise ((resolve, reject) => {
      if (index >= 5 && index <= 7) {
        if (index === 5) {
          turn90('blue');
          turn270('yellow');
          turn270('blue');
          turn270('yellow');
          turn270('orange');
          turn90('yellow');
          turn90('orange');
          resolve();
        } else if (index === 6) {
          turn90('orange');
          turn270('yellow');
          turn270('orange');
          turn270('yellow');
          turn270('green');
          turn90('yellow');
          turn90('green');
          resolve();
        } else {
          turn90('green');
          turn270('yellow');
          turn270('green');
          turn270('yellow');
          turn270('red');
          turn90('yellow');
          turn90('red');
          resolve();
        }
      } else {
        if (index === 8) {
          if (r[7] === 'r5') {
            resolve('red');
          } else {
            turn90('yellow');
            resolve('blue');
          }
        } else if (index === 9) {
          if (b[7] === 'b5') {
            resolve('blue');
          } else {
            turn270('yellow');
            resolve('red');
          }
        } else if (index === 10) {
          if (o[7] === 'r5') {
            turn90('yellow');
            turn90('yellow');
            resolve('red');
          } else {
            turn270('yellow');
            resolve('blue');
          }
        } else {
          if (g[7] === 'r5') {
            turn90('yellow');
            resolve('red');
          } else {
            turn90('yellow');
            turn90('yellow');
            resolve('blue');
          }
        }

      }
    });
    alignEdge.then((color) => {
      if (color === 'red') {
        turn270('yellow');
        turn270('blue');
        turn90('yellow');
        turn90('blue');
        turn90('yellow');
        turn90('red');
        turn270('yellow');
        turn270('red');
        secondLayerEdges();
      } else if (color === 'blue') {
        turn90('yellow');
        turn90('red');
        turn270('yellow');
        turn270('red');
        turn270('yellow');
        turn270('blue');
        turn90('yellow');
        turn90('blue');
        secondLayerEdges();
      } else {
        secondLayerEdges();
      }
    });
  } else if (edgecolors[4] === "RedBlue" && r[5] !== 'r5') {
    turn90('red');
    turn270('yellow');
    turn270('red');
    turn270('yellow');
    turn270('blue');
    turn90('yellow');
    turn90('blue');
    turn270('yellow');
    turn90('red');
    turn270('yellow');
    turn270('red');
    turn270('yellow');
    turn270('blue');
    turn90('yellow');
    turn90('blue');
    secondLayerEdges();
  } else if (edgecolors[5] !== "BlueOrange") {
    let index = edgecolors.indexOf("BlueOrange");
    let alignEdge = new Promise ((resolve, reject) => {
      if (index === 4 || index === 6 || index === 7) {
        if (index === 4) {
          turn90('red');
          turn270('yellow');
          turn270('red');
          turn270('yellow');
          turn270('blue');
          turn90('yellow');
          turn90('blue');
          resolve();
        } else if (index === 6) {
          turn90('orange');
          turn270('yellow');
          turn270('orange');
          turn270('yellow');
          turn270('green');
          turn90('yellow');
          turn90('green');
          resolve();
        } else {
          turn90('green');
          turn270('yellow');
          turn270('green');
          turn270('yellow');
          turn270('red');
          turn90('yellow');
          turn90('red');
          resolve();
        }
      } else {
        if (index === 8) {
          if (r[7] === 'b5') {
            turn90('yellow');
            resolve('blue');
          } else {
            turn90('yellow');
            turn90('yellow');
            resolve('orange');
          }
        } else if (index === 9) {
          if (b[7] === 'b5') {
            resolve('blue');
          } else {
            turn90('yellow');
            resolve('orange');
          }
        } else if (index === 10) {
          if (o[7] === 'o5') {
            resolve('orange');
          } else {
            turn270('yellow');
            resolve('blue');
          }
        } else {
          if (g[7] === 'b5') {
            turn90('yellow');
            turn90('yellow');
            resolve('blue');
          } else {
            turn270('yellow');
            resolve('orange');
          }
        }
      }
    });
    alignEdge.then((color) => {
      if (color === 'blue') {
        turn270('yellow');
        turn270('orange');
        turn90('yellow');
        turn90('orange');
        turn90('yellow');
        turn90('blue');
        turn270('yellow');
        turn270('blue');
        secondLayerEdges();
      } else if (color === 'orange') {
        turn90('yellow');
        turn90('blue');
        turn270('yellow');
        turn270('blue');
        turn270('yellow');
        turn270('orange');
        turn90('yellow');
        turn90('orange');
        secondLayerEdges();
      } else {
        secondLayerEdges();
      }
    });
  } else if (edgecolors[5] === "BlueOrange" && b[5] !== 'b5') {
    turn90('blue');
    turn270('yellow');
    turn270('blue');
    turn270('yellow');
    turn270('orange');
    turn90('yellow');
    turn90('orange');
    turn270('yellow');
    turn90('blue');
    turn270('yellow');
    turn270('blue');
    turn270('yellow');
    turn270('orange');
    turn90('yellow');
    turn90('orange');
    secondLayerEdges();
  } else if (edgecolors[6] !== "OrangeGreen") {
    let index = edgecolors.indexOf("OrangeGreen");
    let alignEdge = new Promise ((resolve, reject) => {
      if (index === 4 || index === 5 || index === 7) {
        if (index === 4) {
          turn90('red');
          turn270('yellow');
          turn270('red');
          turn270('yellow');
          turn270('blue');
          turn90('yellow');
          turn90('blue');
          resolve();
        } else if (index === 5) {
          turn90('blue');
          turn270('yellow');
          turn270('blue');
          turn270('yellow');
          turn270('orange');
          turn90('yellow');
          turn90('orange');
          resolve();
        } else {
          turn90('green');
          turn270('yellow');
          turn270('green');
          turn270('yellow');
          turn270('red');
          turn90('yellow');
          turn90('red');
          resolve();
        }
      } else {
        if (index === 8) {
          if (r[7] === 'o5') {
            turn90('yellow');
            turn90('yellow');
            resolve('orange');
          } else {
            turn270('yellow');
            resolve('green');
          }
        } else if (index === 9) {
          if (b[7] === 'o5') {
            turn90('yellow');
            resolve('orange');
          } else {
            turn90('yellow');
            turn90('yellow');
            resolve('green');
          }
        } else if (index === 10) {
          if (o[7] === 'o5') {
            resolve('orange');
          } else {
            turn90('yellow');
            resolve('green');
          }
        } else {
          if (g[7] === 'g5') {
            resolve('green');
          } else {
            turn270('yellow');
            resolve('orange');
          }
        }
      }
    });
    alignEdge.then((color) => {
      if (color === 'orange') {
        turn270('yellow');
        turn270('green');
        turn90('yellow');
        turn90('green');
        turn90('yellow');
        turn90('orange');
        turn270('yellow');
        turn270('orange');
        secondLayerEdges();
      } else if (color === 'green') {
        turn90('yellow');
        turn90('orange');
        turn270('yellow');
        turn270('orange');
        turn270('yellow');
        turn270('green');
        turn90('yellow');
        turn90('green');
        secondLayerEdges();
      } else {
        secondLayerEdges();
      }
    });
  } else if (edgecolors[6] === "OrangeGreen" && o[5] !== 'o5') {
    turn90('orange');
    turn270('yellow');
    turn270('orange');
    turn270('yellow');
    turn270('green');
    turn90('yellow');
    turn90('green');
    turn270('yellow');
    turn90('orange');
    turn270('yellow');
    turn270('orange');
    turn270('yellow');
    turn270('green');
    turn90('yellow');
    turn90('green');
    secondLayerEdges();
  } else if (edgecolors[7] !== "GreenRed") {
    let index = edgecolors.indexOf("GreenRed");
    let alignEdge = new Promise ((resolve, reject) => {
      if (index === 4 || index === 5 || index === 6) {
        if (index === 4) {
          turn90('red');
          turn270('yellow');
          turn270('red');
          turn270('yellow');
          turn270('blue');
          turn90('yellow');
          turn90('blue');
          resolve();
        } else if (index === 5) {
          turn90('blue');
          turn270('yellow');
          turn270('blue');
          turn270('yellow');
          turn270('orange');
          turn90('yellow');
          turn90('orange');
          resolve();
        } else {
          turn90('green');
          turn270('yellow');
          turn270('green');
          turn270('yellow');
          turn270('red');
          turn90('yellow');
          turn90('red');
          resolve();
        }
      } else {
        if (index === 8) {
          if (r[7] === 'r5') {
            resolve('red');
          } else {
            turn270('yellow');
            resolve('green');
          }
        } else if (index === 9) {
          if (b[7] === 'r5') {
            turn270('yellow');
            resolve('red');
          } else {
            turn90('yellow');
            turn90('yellow');
            resolve('green');
          }
        } else if (index === 10) {
          if (o[7] === 'r5') {
            turn90('yellow');
            turn90('yellow');
            resolve('red');
          } else {
            turn90('yellow');
            resolve('green');
          }
        } else {
          if (g[7] === 'g5') {
            resolve('green');
          } else {
            turn90('yellow');
            resolve('red');
          }
        }
      }
    });
    alignEdge.then((color) => {
      if (color === 'green') {
        turn270('yellow');
        turn270('red');
        turn90('yellow');
        turn90('red');
        turn90('yellow');
        turn90('green');
        turn270('yellow');
        turn270('green');
        secondLayerEdges();
      } else if (color === 'red') {
        turn90('yellow');
        turn90('green');
        turn270('yellow');
        turn270('green');
        turn270('yellow');
        turn270('red');
        turn90('yellow');
        turn90('red');
        secondLayerEdges();
      } else {
        secondLayerEdges();
      }
    });
  } else if (edgecolors[7] === "GreenRed" && g[5] !== 'g5') {
    turn90('orange');
    turn270('yellow');
    turn270('orange');
    turn270('yellow');
    turn270('green');
    turn90('yellow');
    turn90('green');
    turn270('yellow');
    turn90('orange');
    turn270('yellow');
    turn270('orange');
    turn270('yellow');
    turn270('green');
    turn90('yellow');
    turn90('green');
    secondLayerEdges();
  } else if (edgecolors[7] === "GreenRed" && g[5] !== 'g5') {
    turn90('green');
    turn270('yellow');
    turn270('green');
    turn270('yellow');
    turn270('red');
    turn90('yellow');
    turn90('red');
    turn270('yellow');
    turn90('green');
    turn270('yellow');
    turn270('green');
    turn270('yellow');
    turn270('red');
    turn90('yellow');
    turn90('red');
    secondLayerEdges();
  } else {
    solution.push("Finished Second Layer Edges!");
    thirdLayerCross();
  }

}

function thirdLayerCross() {
  var crossColors = [
    (y[1].replace(/[0-9]/, '')),
    (y[3].replace(/[0-9]/, '')),
    (y[5].replace(/[0-9]/, '')),
    (y[7].replace(/[0-9]/, ''))
  ];
  var adjust = 0;
  function checkElbow() {
    if (crossColors[0] === 'y' && crossColors[1] !== 'y' && crossColors[2] === 'y' && crossColors[3] !== 'y') {
      adjust += 3;
      return true;
    } else if (crossColors[0] !== 'y' && crossColors[1] !== 'y' && crossColors[2] === 'y' && crossColors[3] === 'y') {
      adjust += 2;
      return true;
    } else if (crossColors[0] !== 'y' && crossColors[1] === 'y' && crossColors[2] !== 'y' && crossColors[3] === 'y') {
      adjust += 1;
      return true;
    } else if (crossColors[0] === 'y' && crossColors[1] === 'y' && crossColors[2] !== 'y' && crossColors[3] !== 'y') {
      return true;
    } else {
      return false;
    }
  }
  function checkLine() {
    if (crossColors[0] === 'y' && crossColors[1] !== 'y' && crossColors[2] !== 'y' && crossColors[3] === 'y') {
      adjust += 1;
      return true;
    } else if (crossColors[0] !== 'y' && crossColors[1] === 'y' && crossColors[2] === 'y' && crossColors[3] !== 'y') {
      return true;
    } else {
      return false;
    }
  }

  if (crossColors[0] === 'y' && crossColors[1] === 'y' && crossColors[2] === 'y' && crossColors[3] === 'y') {
    solution.push("Finished Third Layer Cross");
    orientThirdCross();
  } else if (crossColors[0] !== 'y' && crossColors[1] !== 'y' && crossColors[2] !== 'y' && crossColors[3] !== 'y') {
    dot();
  } else if (checkElbow()) {
    switch(adjust) {
      case 0:
        elbow();
        break;
      case 1:
        turn90('yellow');
        elbow();
        break;
      case 2:
        turn90('yellow');
        turn90('yellow');
        elbow();
        break;
      case 3:
        turn270('yellow');
        elbow();
        break;
    }
  } else if (checkLine()) {
    switch(adjust) {
      case 0:
        line();
        break;
      case 1:
        turn90('yellow');
        line();
        break;
    }
  }
  function dot() {
    turn90('red');
    turn90('green');
    turn90('yellow');
    turn270('green');
    turn270('yellow');
    turn90('green');
    turn90('yellow');
    turn270('green');
    turn270('yellow');
    turn270('red');
    turn90('yellow');
    turn90('red');
    turn90('green');
    turn90('yellow');
    turn270('green');
    turn270('yellow');
    turn270('red');
    solution.push("Third Layer Cross");
    orientThirdCross();
  }

  function elbow() {
    turn90('red');
    turn90('green');
    turn90('yellow');
    turn270('green');
    turn270('yellow');
    turn270('red');
    if (y[1].includes('y') && y[7].includes('y')) {
      turn90('yellow');
      line();
    } else {
      line();
    }
  }

  function line() {
    turn90('red');
    turn90('green');
    turn90('yellow');
    turn270('green');
    turn270('yellow');
    turn270('red');
    solution.push("Third Layer Cross");
    orientThirdCross();
  }

}

function orientThirdCross() {
  // Line up red edge
  if (r[7] === 'r7') {
    thirdCross();
  } else if (g[7] === 'r7') {
    turn90('yellow');
    thirdCross();
  } else if (o[7] === 'r7') {
    turn90('yellow');
    turn90('yellow');
    thirdCross();
  } else if (b[7] === 'r7') {
    turn270('yellow');
    thirdCross();
  }

  function thirdCross() {
    if (g[7] === 'o7' && o[7] === 'g7' && b[7] === 'b7') {
      turn90('yellow');
      turn90('yellow');
      baseMove();
      turn270('yellow');
      solution.push("Oriented Third Layer Cross");
      thirdLayerCorners();
    } else if (g[7] === 'o7' && o[7] === 'b7' && b[7] === 'g7') {
      baseMove();
      solution.push("Oriented Third Layer Cross");
      thirdLayerCorners();
    } else if (g[7] === 'g7' && o[7] === 'b7' && b[7] === 'o7') {
      turn270('yellow');
      baseMove();
      turn90('yellow');
      turn90('yellow');
      solution.push("Oriented Third Layer Cross");
      thirdLayerCorners();
    } else if (g[7] === 'g7' && o[7] === 'o7' && b[7] === 'b7') {
      solution.push("Oriented Third Layer Cross");
      thirdLayerCorners();
    } else if (g[7] === 'b7' && o[7] === 'g' && b[7] === 'o7') {
      turn90('yellow');
      baseMove();
      turn90('yellow');
      solution.push("Oriented Third Layer Cross");
      thirdLayerCorners();
    } else if (g[7] === 'b7' && o[7] === 'o7' && b[7] === 'g7') {
      baseMove();
      turn270('yellow');
      baseMove();
      turn90('yellow');
      turn90('yellow');
      solution.push("Oriented Third Layer Cross");
      thirdLayerCorners();
    }
  }
  function baseMove() {
    turn90('green');
    turn90('yellow');
    turn270('green');
    turn90('yellow');
    turn90('green');
    turn90('yellow');
    turn90('yellow');
    turn270('green');
  }
}

function thirdLayerCorners() {
  let corners = new GetPositions(w, g, r, b, o, y);
  corners.getCorners();
  let cornerColors = corners.cornerColors();
  if (cornerColors[4] === "Corner4" && cornerColors[5] === "Corner5" && cornerColors[6] === "Corner6" && cornerColors[7] === "Corner7") {
    solution.push("Third Layer Corners");
    orientThirdCorners();
  } else if (cornerColors[4] === "Corner4") {
    turn90('yellow');
    cornerSwap();
    thirdLayerCorners();
  } else if (cornerColors[5] === "Corner5") {
    cornerSwap();
    turn90('yellow');
    thirdLayerCorners();
  } else if (cornerColors[6] === "Corner6") {
    turn270('yellow');
    cornerSwap();
    turn90('yellow');
    turn90('yellow');
    thirdLayerCorners();
  } else if (cornerColors[7] === "Corner7") {
    turn90('yellow');
    turn90('yellow');
    cornerSwap();
    turn270('yellow');
    thirdLayerCorners();
  } else {
    cornerSwap();
    thirdLayerCorners();
  }

  function cornerSwap() {
    turn90('green');
    turn270('yellow');
    turn270('blue');
    turn90('yellow');
    turn270('green');
    turn270('yellow');
    turn90('blue');
  }
}

function orientThirdCorners() {
  let corners = new GetPositions(w, g, r, b, o, y);
  let cornerPos = corners.getCorners();
  let corner4 = cornerPos[4][0];
  let corner5 = cornerPos[5][0];
  let corner6 = cornerPos[6][0];
  let corner7 = cornerPos[7][0];
  if (corner4 === 'y0' && corner5 === 'y2' && corner6 === 'y8' && cornerPos7 === 'y6') {
    solution.push('Oriented Last Corners!');
    solve();
  }
  orient4();
  function orient4() {
    if (corner4 === 'y0') {
      turn90('yellow');
      orient7();
    } else if (corner4 === 'g8') {
      cornerOrient();
      cornerOrient();
      turn90('yellow');
      orient7();
    } else if (corner4 === 'r6') {
      cornerOrient();
      turn90('yellow');
      orient7();
    }
  }

  function orient7() {
    if (corner7 === 'y6') {
      turn90('yellow');
      orient6();
    } else if (corner7 === 'o8') {
      cornerOrient();
      cornerOrient();
      turn90('yellow');
      orient6();
    } else if (corner7 === 'g6') {
      cornerOrient();
      turn90('yellow');
      orient6();
    }
  }

  function orient6() {
    if (corner6 === 'y8') {
      turn90('yellow');
      orient5();
    } else if (corner6 === 'b8') {
      cornerOrient();
      cornerOrient();
      turn90('yellow');
      orient5();
    } else if (corner6 === 'o6') {
      cornerOrient();
      turn90('yellow');
      orient5();
    }
  }

  function orient5() {
    if (corner5 === 'y2') {
      turn90('yellow');
      solution.push("Oriented Last Corners!");
      solve();
    } else if (corner5 === 'r8') {
      cornerOrient();
      cornerOrient();
      turn90('yellow');
      solution.push("Oriented Last Corners!");
      solve();
    } else if (corner5 === 'b6') {
      cornerOrient();
      turn90('yellow');
      solution.push("Oriented Last Corners!");
      solve();
    }
  }

  function cornerOrient(corner) {
    turn270('green');
    turn270('white');
    turn90('green');
    turn90('white');
    turn270('green');
    turn270('white');
    turn90('green');
    turn90('white');
  }
}

function solve() {
  solution.push("Solved!");

  for (let i = 0; i < solution.length; i++) {
    if (solution[i] === solution[i + 1] && solution[i] === solution[i + 2] && solution[i] === solution[i + 3] && solution[i] === solution[i + 4]) {
      solution.splice(i, 5, solution[i]);
    } else if (solution[i] === solution[i + 1] && solution[i] === solution[i + 2] && solution[i] === solution[i + 3]) {
      solution.splice(i, 4);
    } else if (solution[i] === solution[i + 1] && solution[i] === solution[i + 2]) {
      solution.splice(i, 3, solution[i] + " inverted");
    }
    if (i === solution.length - 1) {
      logSolution();
    }
  }

  function logSolution() {
    for (let x = 0; x < solution.length; x++) {
      console.log(`${x + 1}. ${solution[x]}`);
    }
  }
}
