let rocks = 0

let obstaclearray = []

let cactis = 0

function generateWorld() {
    W.add("big_rock", {
        vertices: [...'[5|a,~1b+},7\\8[5==II|0;I;4?7F0;I\nH\n...'].map(a => (a.codePointAt()) / 127),
        uv: [...'HO H O@H@O_H_H@0@0__o@@0@_0 @@@0@ OOo_'].map(a => (a.codePointAt()) / 127),
        indices: [0, 1, 2, 2, 3, 4, 4, 5, 6, 5, 7, 6, 8, 9, 10, 8, 10, 11, 12, 5, 3, 10, 13, 14, 9, 15, 10, 16, 17, 9, 18, 16, 19, 15, 7, 13, 17, 6, 15, 2, 17, 20, 0, 20, 18, 9, 17, 15, 2, 1, 3, 4, 3, 5, 16, 20, 17, 17, 4, 6, 2, 4, 17, 10, 15, 13, 18, 20, 16, 15, 6, 7, 0, 21, 1, 5, 22, 7, 12, 23, 5, 0, 2, 20]
    });

    let distance = 100

    while (distance < 130000) {
        distance += Math.random() * 70
        let y = (Math.random() - 0.5) * 200
        if (-10 < y && y < 10) continue
        obstaclearray.push([distance, y])
    }
}

function generateRock(x, y, ry = Math.random() * 360, size = Math.random() * 7 + 3,) {
    W.big_rock({ n: "rock" + rocks, b: "#332a2a", x, z:y, size, ry })

    let collider = rect(new Vec2(x,y), size/2)

    //transforming the points of the polygon
    let transformMatrices = collider.points.map(element => {
        return new DOMMatrix().rotateSelf(0,0, -ry)
    });

    collider.points.forEach((e, i) => {
        let {x,y} = DOMPoint.fromPoint(e).matrixTransform(transformMatrices[i])
        let newpoint = new Vec2(x,y)
        collider.points[i] = newpoint
    })

    addStaticBody(collider)
    rocks++
    return "rock" + (rocks - 1)
}


function generateCactus(x, y, ry = Math.random() * 360) {
    //generating cacti
    W.group({ n: "cacti" + cactis, x, z: y, ry })
    W.cube({ g: "cacti" + cactis, h: 8, b: "045300", z:-.15 }) //stem

    W.cube({ g: "cacti" + cactis, y: 5, x:1, h: 0.7, d: 0.7, w: 1.5, b: "045300" })
    W.cube({ g: "cacti" + cactis, y: 5, x: 2, h: 2, w: 0.7, d: 0.7, b: "045300" })

    W.cube({ g: "cacti" + cactis, y: 4, x: -1.65, h: 0.7, d: 0.7, w: 1.65, b: "045300" })
    W.cube({ g: "cacti" + cactis, y: 4, x: -1.65, h: 2, w: 0.7, d: 0.7, b: "045300" })

    let collider = rect(new Vec2(x,y), 1)

    //transforming the points of the polygon
    let transformMatrices = collider.points.map(element => {
        return new DOMMatrix().rotateSelf(0,0, -ry)
    });

    collider.points.forEach((e, i) => {
        let {x,y} = DOMPoint.fromPoint(e).matrixTransform(transformMatrices[i])
        let newpoint = new Vec2(x,y)
        collider.points[i] = newpoint
    })


    addStaticBody(collider)

    cactis++
    return "cacti" + (cactis - 1)
}



let obstaclepointer = 0

function updateWorld() {
    if (obstaclearray.length > obstaclepointer) {   
        if (obstaclearray[obstaclepointer][0] - player.pos.x < 500) {
            let choices = [generateCactus, generateRock]
            let choice = choices[Math.round(Math.random())]
            obstaclearray[obstaclepointer].push(choice(obstaclearray[obstaclepointer][0], obstaclearray[obstaclepointer][1]))
            obstaclepointer++
        }
        if (player.pos.x - 600 > obstaclearray[0][0]) {
            console.log("deleting", obstaclearray[0])
            W.delete(obstaclearray[0][2])
            obstaclearray.shift()
            obstaclepointer--
        }
    }
}