//helper functions
const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

function Vec2(x = 0, y = 0) {
    this.x = x
    this.y = y
}

Vec2.prototype = {
    sub(vec) {return new Vec2(this.x - vec.x, this.y - vec.y)},
    add(vec) {return new Vec2(this.x + vec.x, this.y + vec.y)},
    scale(input) {
        if (input instanceof Vec2) {
            return new Vec2(this.x * input.x, this.y * input.y)
        } else if (typeof input == "number") {
            return new Vec2(this.x * input, this.y * input)
        }
    },
    abs() {return new Vec2(Math.sqrt(this.x ** 2), Math.sqrt(this.y ** 2))},
    len() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    },
    normal() {
        let magnitude = this.len()
        return new Vec2(this.x / magnitude, this.y / magnitude)
    },
    dot(vec) {
        return this.x * vec.x + this.y * vec.y
    },
    eq(vec) {return this.x == vec.x && this.y == vec.y},
    distance(vec) {return Math.sqrt(Math.pow(this.x - vec.x, 2) + Math.pow(this.y - vec.y, 2))},
    perp() {return new Vec2(this.y, -this.x)}
}