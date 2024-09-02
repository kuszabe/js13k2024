//helper functions
const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

function Vec2(x = 0, y = 0) {
    this.x = x
    this.y = y
}

Vec2.prototype = {
    sub: (vec) => { return { x: this.x - vec.x, y: this.y - vec.y } },
    add: (vec) => { return { x: this.x + vec.x, y: this.y + vec.y } },
    eq: (vec) => this.x == vec.x && this.y == vec.y,
    distance: (vec) => Math.sqrt(Math.pow(this.x - vec.x, 2) + Math.pow(this.y - vec.y, 2))
}