let rocks = 0

let obstaclearray = []

let cactis = 0



function generateWorld() {
    loot = [Meat, Meat, Wrench]

    W.add("big_rock", {
        vertices: [...'[5|a,~1b+},7\\8[5==II|0;I;4?7F0;I\nH\n...'].map(a => (a.codePointAt()) / 127),
        uv: [...'HO H O@H@O_H_H@0@0__o@@0@_0 @@@0@ OOo_'].map(a => (a.codePointAt()) / 127),
        indices: [0, 1, 2, 2, 3, 4, 4, 5, 6, 5, 7, 6, 8, 9, 10, 8, 10, 11, 12, 5, 3, 10, 13, 14, 9, 15, 10, 16, 17, 9, 18, 16, 19, 15, 7, 13, 17, 6, 15, 2, 17, 20, 0, 20, 18, 9, 17, 15, 2, 1, 3, 4, 3, 5, 16, 20, 17, 17, 4, 6, 2, 4, 17, 10, 15, 13, 18, 20, 16, 15, 6, 7, 0, 21, 1, 5, 22, 7, 12, 23, 5, 0, 2, 20]
    });

    let distance = -20

    while (distance < 14000) {
        distance += Math.random() * 140
        let y = (Math.random() - 0.5) * 300
        if (-10 < y && y < 10) continue
        obstaclearray.push([distance, y])
    }

    generateHouse(new Vec2(0, -50))
    generateGasStation(new Vec2(0, 50))

    for (let i = 0; i < 100; i++) {
        updateWorld()
    }
}

function generateRock(x, y, ry = Math.random() * 360, size = Math.random() * 7 + 3,) {
    W.big_rock({ n: "rock" + rocks, b: "#393939", x, z: y, size, ry })

    let collider = rect(new Vec2(x, y), size / 2)

    //transforming the points of the polygon
    let transformMatrices = collider.points.map(element => {
        return new DOMMatrix().rotateSelf(0, 0, -ry)
    });

    collider.points.forEach((e, i) => {
        let { x, y } = DOMPoint.fromPoint(e).matrixTransform(transformMatrices[i])
        let newpoint = new Vec2(x, y)
        collider.points[i] = newpoint
    })

    addStaticBody(collider)
    rocks++
    return "rock" + (rocks - 1)
}


function generateCactus(x, y, ry = Math.random() * 360) {
    //generating cacti
    W.group({ n: "cacti" + cactis, x, z: y, ry })
    W.cube({ g: "cacti" + cactis, h: 8, b: "045300", z: -.15 }) //stem

    W.cube({ g: "cacti" + cactis, y: 5, x: 1, h: 0.7, d: 0.7, w: 1.5, b: "045300" })
    W.cube({ g: "cacti" + cactis, y: 5, x: 2, h: 2, w: 0.7, d: 0.7, b: "045300" })

    W.cube({ g: "cacti" + cactis, y: 4, x: -1.65, h: 0.7, d: 0.7, w: 1.65, b: "045300" })
    W.cube({ g: "cacti" + cactis, y: 4, x: -1.65, h: 2, w: 0.7, d: 0.7, b: "045300" })

    let collider = rect(new Vec2(x, y), 1)

    //transforming the points of the polygon
    let transformMatrices = collider.points.map(element => {
        return new DOMMatrix().rotateSelf(0, 0, -ry)
    });

    collider.points.forEach((e, i) => {
        let { x, y } = DOMPoint.fromPoint(e).matrixTransform(transformMatrices[i])
        let newpoint = new Vec2(x, y)
        collider.points[i] = newpoint
    })


    addStaticBody(collider)

    cactis++
    return "cacti" + (cactis - 1)
}

let loot

let gasstations = []

function generateGasStation(pos) {
    let name = "gasstation" + gasstations.length

    for (let i = 0; i<Math.random() * 2; i++) {
        let bot
        if (Math.round(Math.random())) {
            bot = new Ball
        } else {
            bot = new Mouser
        }

        bot.spawn(new Vec2(Math.random()* 30 - 15, Math.random()*30 -15).add(pos))

        robots.push(bot)
    }

    W.group({ n: name, x: pos.x, z: pos.y })
    W.sphere({ g: name })
    W.plane({ y: .1, g: name, x: 15, z: 10, w: 30, h: 20, rx: -90 })
    W.cube({ g: name, x: 2, w: 26, z: 10, d: 8, h: 10 }) // cube that makes the body of the building
    W.cube({ g: name, w: 30, d: 20, y: 10 })
    W.cube({ g: name, x: 2, w: 1, z: 2, d: 1, h: 10 })
    W.cube({ g: name, x: 27, w: 1, z: 2, d: 1, h: 10 })

    W.cube({ g: name, z: 9.75, x: 20, h: 6, w: 0.5, d: 0.5, b: "#621616" })
    W.cube({ g: name, z: 9.75, x: 23, h: 6, w: 0.5, d: 0.5, b: "#621616" })
    W.cube({ g: name, z: 9.75, x: 20, y: 6, h: 0.5, w: 3.5, d: 0.5, b: "#621616" })

    //inverse cube functioning as the inside
    W.cube({ g: name, x: 2 + 26, w: -26, z: 10 + 8, d: -8, y: 10, h: -10 }) // cube that makes the body of the building

    // let doorpos = new Vec2(22, 9.75)

    const wallThickness = 1

    const buildingmin = pos.add(new Vec2(2, 10))
    const buildingmax = new Vec2(26, 8)

    addStaticBody(rect(buildingmin, buildingmax))

    addStaticBody(rect(pos.add(new Vec2(2, 2)), 1))
    addStaticBody(rect(pos.add(new Vec2(27, 2)), 1))

    W.cube({g:name, z:4, x:6, w:3, d:1.5, h:4, b:"#131313"})

    addStaticBody(rect(pos.add(new Vec2(6,4)), new Vec2(3,1.5)))

    let insideshift = new Vec2(0.3, 0.3)

    let inside = {
        bodies: [],
        min: buildingmin.add(insideshift),
        max: buildingmax.add(buildingmin).sub(insideshift)
    }

    gasstations.push({ name, pos, inside })

    //generate the items inside

    new loot[Math.round(Math.random()) * (loot.length -1)]().drop(new Vec2(5,5).add(buildingmin))
}

let buildings = []

function generateHouse(pos) {
    for (let i = 0; i<Math.random() * 2; i++) {
        let bot
        if (Math.round(Math.random())) {
            bot = new Ball
        } else {
            bot = new Mouser
        }

        bot.spawn(new Vec2(Math.random()* 30 - 15, Math.random()*30 -15).add(pos))

        robots.push(bot)
    }

    let name = "building" + buildings.length
    W.group({ n: name, x: pos.x, z: pos.y })
    W.cube({ g: name, w: 10, d: 15, h: 7 }) // cube that makes the body of the building

    //inverse cube functioning as the inside
    W.cube({ g: name, x: 10, w: -10, z: 15, d: -15, y: 7, h: -6.9  }) // cube that makes the body of the building

    let doorpos = new Vec2(-.25, 3)

    W.cube({ g: name, z: doorpos.y, x: doorpos.x, h: 5, w: 0.5, d: 0.5, b: "#621616" })
    W.cube({ g: name, z: doorpos.y + 3, x: doorpos.x, h: 5, w: 0.5, d: 0.5, b: "#621616" })
    W.cube({ g: name, z: doorpos.y, x: doorpos.x, y: 5, h: 0.5, w: .5, d: 3.5, b: "#621616" })

    const buildingmin = pos.add(new Vec2())
    const buildingmax = new Vec2(10, 15)

    addStaticBody(rect(buildingmin, buildingmax))

    W.cube({g:name, z:4, x:6, w:3, d:1.5, h:4, b:"#131313"})

    let insideshift = new Vec2(0.3, 0.3)

    let inside = {
        bodies: [],
        min: buildingmin.add(insideshift),
        max: buildingmax.add(buildingmin).sub(insideshift)
    }

    buildings.push({ name, pos, inside, doorpos })

    //generate the items inside
    new loot[Math.round(Math.random()) * (loot.length -1)]().drop(new Vec2(5,5).add(buildingmin))
}

let obstaclepointer = 0

let structuregen = 0

function updateWorld() {
    gasstations.forEach(val => {
        let distance = player.pos.distance(val.pos.add(new Vec2(22, 9.75)))
        let distanceFromTank = player.pos.distance(val.pos.add(new Vec2(6, 4)))
        if (distance < 2 && distance < currentAction.importance) {
            if (!place) {
                currentAction = {
                    importance: distance, text: "Press E to enter gas station", callback: () => {
                        place = val.inside
                        W.light({ x: -0.1, y: -0.2, z: -0.1 })
                        W.ambient(0.5)
                    }
                }
            } else {
                currentAction = {
                    importance: distance, text: "Press E to leave gas station", callback: () => {
                        place = false
                        W.light(normalLight)
                        W.ambient(normalAmbient)
                    }
                }
            }
        } else if (distanceFromTank < 3.5 && distanceFromTank < currentAction.importance) {
            currentAction = {
                importance: distanceFromTank, text: "Hold E to fill up gas tank", callback: () => {
                    cars.forEach(car => {
                        if (car.pos.distance(val.pos.add(new Vec2(6, 4))) < 15) car.fuel = Math.min(car.fuel + 0.1 * fpsfix, car.maxFuel)
                    })
                }
            }
        }
    })

    buildings.forEach(val => {
            let distance = player.pos.distance(val.pos.add(val.doorpos))
            if (distance < 2 && distance < currentAction.importance) {
                if (!place) {
                    currentAction = {
                        importance: distance, text: "Press E to enter building", callback: () => {
                            place = val.inside
                            W.light({ x: -0.1, y: -0.2, z: -0.1 })
                            W.ambient(0.5)
                        }
                    }
                } else {
                    currentAction = {
                        importance: distance, text: "Press E to leave building", callback: () => {
                            place = false
                            W.light(normalLight)
                            W.ambient(normalAmbient)
                        }
                    }
                }
            } 
    })

    if (player.pos.x > structuregen) {
        structuregen += Math.random() * 1000 + 100
        if (Math.round(Math.random())) {
            generateGasStation(new Vec2(structuregen, Math.random()* 200 + 20))
        } else {
            generateHouse(new Vec2(structuregen, Math.random() * 700 - 350))
        }
    }

    if (obstaclearray.length > obstaclepointer && obstaclearray[obstaclepointer][0] - player.pos.x < 700) {
        let choices = [generateCactus, generateRock]
        let choice = choices[Math.round(Math.random())]
        obstaclearray[obstaclepointer].push(choice(obstaclearray[obstaclepointer][0], obstaclearray[obstaclepointer][1]))
        obstaclepointer++
    }
    if (player.pos.x - 600 > obstaclearray[0][0]) {
        W.delete(obstaclearray[0][2])
        obstaclearray.shift()
        obstaclepointer--
    }
}