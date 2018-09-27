class CubeMap {
  constructor(w, g, r, b, o, y) {
    // Blue
    this.bC = [b[0], b[2], b[6], b[8]];
    this.bE = [b[1], b[3], b[5], b[7]];
    // White
    this.wC = [w[0], w[2], w[6], w[8]];
    this.wE = [w[1], w[3], w[5], w[7]];
    // Red
    this.rC = [r[0], r[2], r[6], r[8]];
    this.rE = [r[1], r[3], r[5], r[7]];
    // Yellow
    this.yC = [y[0], y[2], y[6], y[8]];
    this.yE = [y[1], y[3], y[5], y[7]];
    // Orange
    this.oC = [o[0], o[2], o[6], o[8]];
    this.oE = [o[1], o[3], o[5], o[7]];
    // Green
    this.gC = [g[0], g[2], g[6], g[8]];
    this.gE = [g[1], g[3], g[5], g[7]];
  }
}

module.exports = CubeMap;
