class Positions {
  constructor(w, g, r, b, o, y) {
    this.w = w;
    this.g = g;
    this.r = r;
    this.b = b;
    this.o = o;
    this.y = y;
    this.cube = [w, g, r, b, o, y];
    this.edgepos = [];
    this.cornerpos = [];
  }

  updateSides(w, g, r, b, o, y) {
    this.w = w;
    this.g = g;
    this.r = r;
    this.b = b;
    this.o = o;
    this.y = y;
  }

  getEdges() {
    /*
      Edge 0: w1, o1
      Edge 1: w5, b1
      Edge 2: w7, r1
      Edge 3: w3, g1
      Edge 4: r5, b3
      Edge 5: b5, o3
      Edge 6: o5, g3
      Edge 7: g5, r3
      Edge 8: y1, r7
      Edge 9: y5, b7
      Edge 10: y7, o7
      Edge 11: y3, g7
    */
    this.edgepos.push(
      [this.w[1], this.o[1]],
      [this.w[5], this.b[1]],
      [this.w[7], this.r[1]],
      [this.w[3], this.g[1]],
      [this.r[5], this.b[3]],
      [this.b[5], this.o[3]],
      [this.o[5], this.g[3]],
      [this.g[5], this.r[3]],
      [this.y[1], this.r[7]],
      [this.y[5], this.b[7]],
      [this.y[7], this.o[7]],
      [this.y[3], this.g[7]]
    );

    return this.edgepos;
  }

  edgeColors() {
    var edges = [];
    for (var i = 0; i < this.edgepos.length; i++) {
      let color1 = this.edgepos[i][0];
      if (color1 === 'w1' || color1 === 'o1') {
        edges.push("WhiteOrange");
      } else if (color1 === 'w5' || color1 === 'b1') {
        edges.push("WhiteBlue");
      } else if (color1 === 'w7' || color1 === 'r1') {
        edges.push("WhiteRed");
      } else if (color1 === 'w3' || color1 === 'g1') {
        edges.push("WhiteGreen");
      } else if (color1 === 'r5' || color1 === 'b3') {
        edges.push("RedBlue");
      } else if (color1 === 'b5' || color1 === 'o3') {
        edges.push("BlueOrange");
      } else if (color1 === 'o5' || color1 === 'g3') {
        edges.push("OrangeGreen");
      } else if (color1 === 'g5' || color1 === 'r3') {
        edges.push("GreenRed");
      } else if (color1 === 'y1' || color1 === 'r7') {
        edges.push("YellowRed");
      } else if (color1 === 'y5' || color1 === 'b7') {
        edges.push("YellowBlue");
      } else if (color1 === 'y7' || color1 === 'o7') {
        edges.push("YellowOrange");
      } else if (color1 === 'y3' || color1 === 'g7') {
        edges.push("YellowGreen");
      }
      if (i + 1 === this.edgepos.length) {
        return edges;
      }
    }
  }

  getCorners() {
    /*
    Corner 0: w0, g0, o2
    Corner 1: w2, o0, b2
    Corner 2: w8, b0, r2
    Corner 3: w6, r0, g2
    Corner 4: y0, g8, r6
    Corner 5: y2, r8, b6
    Corner 6: y8, b8, o6
    Corner 7: y6, o8, g6
    */
    this.cornerpos.push(
      [this.w[0], this.g[0], this.o[2]],
      [this.w[2], this.o[0], this.b[2]],
      [this.w[8], this.b[0], this.r[2]],
      [this.w[6], this.r[0], this.g[2]],
      [this.y[0], this.g[8], this.r[6]],
      [this.y[2], this.r[8], this.b[6]],
      [this.y[8], this.b[8], this.o[6]],
      [this.y[6], this.o[8], this.g[6]]
    );

    return this.cornerpos;
  }

  cornerColors() {
    var corners = [];
    for (var x = 0; x < this.cornerpos.length; x++) {
      let color = this.cornerpos[x][0];
      if (color === 'w0' || color === 'g0' || color === 'o2') {
        corners.push("Corner0");
      } else if (color === 'w2' || color === 'o0' || color === 'b2') {
        corners.push("Corner1");
      } else if (color === 'w8' || color === 'b0' || color === 'r2') {
        corners.push("Corner2");
      } else if (color === 'w6' || color === 'r0' || color === 'g2') {
        corners.push("Corner3");
      } else if (color === 'y0' || color === 'g8' || color === 'r6') {
        corners.push("Corner4");
      } else if (color === 'y2' || color === 'r8' || color === 'b6') {
        corners.push("Corner5");
      } else if (color === 'y8' || color === 'b8' || color === 'o6') {
        corners.push("Corner6");
      } else if (color === 'y6' || color === 'o8' || color === 'g6') {
        corners.push("Corner7");
      }
      if (x + 1 === this.cornerpos.length) {
        return corners;
      }
    }
  }

}

module.exports = Positions;
