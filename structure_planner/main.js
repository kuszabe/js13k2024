let canvas = document.createElement("canvas")
document.body.appendChild(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.height = "100%"
canvas.style.width = "100%"
document.body.style.margin = "0px"
document.body.style.overflow = "hidden"
let ctx = canvas.getContext("2d")
ctx.lineJoin = "round"
ctx.lineCap = "round"
// begin vec2, end vec2,
let walls = [{ begin: { x: 100, y: 100 }, end: { x: 200, y: 100 } },]
let placingwall = false
let firstcorner

onclick = (e) => {
    if (tool == "wall") {
        if (!placingwall) {
            placingwall = true
            firstcorner = mousepos
        } else {
            walls.push({ begin: firstcorner, end: mousepos })
            placingwall = false
        }
    }
}

onmousedown = (e) => {
    if (tool == "select" && !dragging) {
        dragging = "move"

        dragstart = mousepos

        let begin = walls.findIndex((value) => value.begin.x == mousepos.x && value.begin.y == mousepos.y)
        let end = walls.findIndex((value) => value.end.x == mousepos.x && value.end.y == mousepos.y)
        if (begin != -1) {
            if (selected.find(e => e.i == begin)) return
            selected = [{ i: begin, type: "wall_begin", originalpos: walls[begin].begin }]
        } else if (end != -1) {
            if (selected.find(e => e.i == end)) return
            selected = [{ i: end, type: "wall_end", originalpos: walls[end].end }]
        } else {
            selected = []
            dragging = "select"
        }

        console.log(selected)
    }
}


onmouseup = () => {
    //if dragging a selection box adds everything that's inside it to the selected array
    if (dragging == "select") {
        walls.forEach((e,i) => {
            if (dragstart.x < e.begin.x < mousepos.x || dragstart.x > e.begin.x > mousepos.x) {
                if (dragstart.y < e.begin.y < mousepos.y || dragstart.y > e.begin.y > mousepos.y) {
                    selected.push({ i, type: "wall_begin"})
                }
            }
        })
        walls.forEach((e,i) => {
            if (dragstart.x < e.end.x < mousepos.x || dragstart.x > e.end.x > mousepos.x) {
                if (dragstart.y < e.end.y < mousepos.y || dragstart.y > e.end.y > mousepos.y) {
                    selected.push({ i, type: "wall_end"})
                }
            }
        })
    }
    //sets everything's original pos to be their current pos
    selected.forEach(e => {
        if (e.type == "wall_begin") {
            e.originalpos = walls[e.i].begin
            console.log("I'm a the beggining")
        } else if (e.type == "wall_end") {
            console.log("And yet there is an end")
            e.originalpos = walls[e.i].end
        }
    })
    dragging = false
}

let dragging = false

let dragstart

let selected = []

onkeydown = (e) => {
    if (e.key == "w") {
        tool = "select"
        canvas.style.cursor = "default"
    } else if (e.key == "e") {
        tool = "wall"
        canvas.style.cursor = "cell"
    }
}

let tool = "wall"

canvas.style.cursor = "cell"

let mousepos

let t = 0


onmousemove = (e) => mousepos = { x: Math.round(e.clientX / 10) * 10, y: Math.round(e.clientY / 10) * 10 }


function update() {
    t++
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    walls.forEach((e, i) => {
        if (selected.find(z => z.i == i && z.type == "wall_begin")) ctx.setLineDash([5,5])
        drawRect({ stroke: "blue", offset: offsets.center, x: e.begin.x, y: e.begin.y, height: 20, width: 20 })
        if (selected.find(z => z.i == i && z.type == "wall_end")) ctx.setLineDash([5,5]); else ctx.setLineDash([])
        drawRect({ stroke: "blue", offset: offsets.center, x: e.end.x, y: e.end.y, height: 20, width: 20 })
        drawLine({ points: [e.begin, e.end], color: "black" })
        ctx.setLineDash([])
    });

    if (placingwall) {
        ctx.setLineDash([5, 5])
        drawRect({ stroke: "black", offset: offsets.center, x: firstcorner.x, y: firstcorner.y, height: 20, width: 20 })
        drawRect({ stroke: "black", offset: offsets.center, x: mousepos.x, y: mousepos.y, height: 20, width: 20 })
        drawLine({ points: [firstcorner, mousepos], color: "black" })
        ctx.setLineDash([])
    }

    if (dragging == "move" && selected) {
        selected.forEach((value) => {
            switch (value.type) {
                case "wall_begin": {
                    walls[value.i].begin = vec2.add(value.originalpos, vec2.sub(mousepos, dragstart))
                    break
                }
                case "wall_end": {
                    walls[value.i].end = vec2.add(value.originalpos, vec2.sub(mousepos, dragstart))
                    break
                }
            }
        })
    } else if (dragging == "select") {
        ctx.globalAlpha = 0.3
        drawRect({fill: "blue", x: dragstart.x, y: dragstart.y, width: mousepos.x - dragstart.x, height: mousepos.y - dragstart.y })
        ctx.globalAlpha = 0.5
        drawRect({stroke: "blue", x: dragstart.x, y: dragstart.y, width: mousepos.x - dragstart.x, height: mousepos.y - dragstart.y })
        ctx.globalAlpha = 1
    }
    requestAnimationFrame(update)
}

let vec2 = {
    sub: (op1, op2) => { return { x: op1.x - op2.x, y: op1.y - op2.y } },
    add: (op1, op2) => { return { x: op1.x + op2.x, y: op1.y + op2.y } },
    eq: (op1, op2) => op1.x == op2.x && op1.y == op2.y
}

function Vec2(x = 0, y = 0) {
    this.x = x
    this.y = y
}

Vec2.prototype.sub = (vec) => vec2.sub(this, vec)
Vec2.prototype.add = (vec) => vec2.add(this, vec)
Vec2.prototype.eq = (vec) => vec2.eq(this, vec)

requestAnimationFrame(update)