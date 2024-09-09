W.reset(c)

W.clearColor("#00000000")

W.camera({ y: 3, fov: 50 })

W.plane({ n: "ground", size: 500, rx: -90, b: "#C2B280" })

W.ambient(1)

W.light({ x: 0.5, y: .5, z: 0.7 })

// W.plane({g:"camera", z:-1, rx:-20, y:-1, size:2, ns:1, t:upscaleImage(meatsource)})

const nothingAction = { importance: Infinity, callback: () => {console.log("hello")}, text: "" }

const leaveCarAction = { text: "press E to leave the car", callback: leaveCar, importance: -1 }

let currentAction = nothingAction

//#region player controls

let controls = {
    w: false,
    a: false,
    s: false,
    d: false,
    e: false,
    q: false,
}

onkeydown = (e) => {
    controls[e.key] = true
}

onkeyup = (e) => {
    controls[e.key] = false
}

onclick = () => {
    if (!document.pointerLockElement) document.body.requestPointerLock()
    if (player.equippedItem) {
        console.log("megnyomtak")
        player.equippedItem.use()
    }
}

onmousemove = (e) => {
    if (!document.pointerLockElement) return
    player.rotationX = (player.rotationX + e.movementX * settings.sensitivity) % 360
    player.rotationY = clamp(player.rotationY + e.movementY * settings.sensitivity, -90, 90)
}

const player = {
    rotationX: 0,
    rotationY: 0,
    pos: new Vec2(),
    speed: 0.2,
    currentCar: null,
    collider: polygon(),
    hunger: 5,
    addHunger(amount) {
        this.hunger = clamp(this.hunger + amount, 0, 10)
        hungerdisplay.innerText = this.hunger
        if (this.hunger == 0) hungerdisplay.innerText = "you died"
    },
    equippedItem: null
}

setInterval(() => {
    player.addHunger(-1)
}, 60000);

player.addHunger(2)

const settings = {
    sensitivity: -0.1,
}

//#endregion

//i was bored because i didn't understand the matrix math
class AndrewTate {
    escape(matrix) {
        return "-$90"
    }
}

//road that moves with the player on the x axis
W.plane({ n: "road", w: 500, h: 20, y: 0.1, rx: -90, b: "#2c2c2c" })

//#region car
W.add("car", {
    vertices: [...'707000009070977,799,7,9,9,07,0,,,0,,,0933070797799P33939P3[P3R09P37R09[7[[99999[7[[9[7i7[[i7ii777770/,,00/0iX[R0O0,//0,0P3O030X[O0O0XX//0/0///XXO07/07,09/07O090O0/0,09O07R00,0R0/09,07i7,7/7/077777,070707X7O07R077[9[9P39O0999X9,09/09/9,93909997/9/9X7X7/09/09/7/9X9O07O07X'].map(a => (a.codePointAt()) / 127),
    uv: [...'￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿'].map(a => (a.codePointAt()) / 127),
    indices: [0, 1, 2, 2, 3, 0, 4, 5, 6, 7, 8, 6, 6, 5, 7, 9, 10, 8, 8, 7, 9, 6, 11, 4, 12, 13, 14, 14, 15, 12, 16, 17, 18, 18, 19, 16, 20, 21, 22, 22, 23, 20, 24, 25, 26, 26, 27, 24, 28, 29, 30, 29, 31, 32, 28, 33, 34, 32, 30, 29, 30, 33, 28, 31, 35, 34, 34, 32, 31, 34, 35, 28, 36, 37, 38, 38, 39, 36, 40, 41, 42, 42, 43, 40, 44, 45, 46, 46, 47, 44, 48, 49, 50, 49, 51, 52, 52, 50, 49, 53, 54, 52, 52, 51, 53, 50, 55, 48, 56, 57, 58, 58, 59, 56, 60, 61, 62, 62, 63, 60, 64, 65, 66, 66, 67, 64, 65, 68, 66, 67, 69, 64, 70, 71, 72, 72, 73, 70, 74, 75, 76, 76, 77, 74, 78, 79, 80, 80, 81, 78, 82, 83, 84, 84, 85, 82, 86, 87, 88, 89, 88, 87, 89, 90, 91, 92, 91, 90, 87, 93, 89, 88, 94, 86, 90, 95, 92, 96, 97, 90, 86, 98, 87, 90, 89, 96, 97, 99, 100, 91, 88, 89, 97, 96, 99, 100, 101, 97, 102, 103, 104, 105, 104, 103, 103, 106, 105, 107, 108, 105, 103, 109, 110, 105, 106, 107, 110, 111, 103, 112, 113, 111, 112, 107, 106, 102, 114, 115, 115, 114, 108, 103, 102, 109, 106, 113, 112, 108, 107, 115, 111, 110, 112, 104, 114, 102, 115, 116, 102, 117, 118, 119, 119, 120, 117, 121, 122, 123, 123, 124, 121, 125, 126, 127, 127, 128, 125, 129, 130, 131, 132, 130, 133, 131, 134, 129, 130, 129, 133, 135, 129, 136, 134, 137, 136, 133, 138, 132, 139, 133, 129, 136, 129, 134, 140, 141, 137, 129, 142, 139, 137, 134, 140, 136, 143, 135, 131, 144, 134, 145, 146, 147, 148, 147, 146, 149, 150, 146, 145, 151, 152, 146, 153, 148, 152, 149, 145, 154, 155, 150, 156, 157, 158, 146, 145, 149, 150, 159, 154, 158, 160, 156, 150, 149, 159, 147, 156, 145, 160, 145, 156, 161, 162, 163, 164, 165, 161, 161, 166, 164, 162, 167, 168, 168, 163, 162, 169, 168, 167, 167, 170, 169, 164, 166, 169, 171, 172, 167, 171, 173, 174, 169, 170, 164, 174, 172, 171, 170, 174, 173, 167, 162, 171, 175, 164, 170, 173, 175, 170, 163, 166, 161, 176, 177, 178, 178, 179, 176, 180, 181, 182, 182, 183, 180, 184, 185, 186, 186, 187, 184]
});

W.group({ n: "car" })

W.car({ g: "car", n: "carbody", size: 10, rx: -90, x: -2.3, z: 6, b: "#380303" })

let maincar = {
    pos: new Vec2(),
    velocity: 0,
    rotation: 20,
    handling: 0.1,
    acceleration: 0.003,
    drag: 1.005,
    name: "car",
    turn: 0
}

let cars = [maincar]

function moveTowardsValue(target, current, acceleration) {
    if (Math.abs(target - current) < acceleration) return target
    if (target > current) current += acceleration
    else if (target < current) current -= acceleration
    return current
}

function enterCar(car) {
    // W.move({
    //     n:"p",
    //     g:car.name,
    // })
    player.currentCar = car
}

function leaveCar() {
    if (!player.currentCar) return
    player.pos.x = player.currentCar.pos.x + 5
    player.pos.y = player.currentCar.pos.y + 5
    player.currentCar = null
}

//updates the car
//takes in a car object, like maincar, so that cars can be swapped
function updateCar(car) {
    if (player.currentCar == car) {
        currentAction = leaveCarAction
        //car acceleration
        car.velocity += (controls.w - controls.s) * car.acceleration / Math.max(Math.abs(car.turn), 1)

        //car rotation
        car.turn = moveTowardsValue((controls.a - controls.d) * 10, car.turn, car.handling)
        player.rotationX = (player.rotationX + car.turn * Math.min(car.velocity, 0.5)) % 360
        car.rotation += car.turn * Math.min(car.velocity, 0.5)
    } else if (car.pos.distance(player.pos) < 4 && car.pos.distance(player.pos) < currentAction.importance) currentAction = { text: "Press E to enter the car", callback: () => enterCar(car), importance: car.pos.distance(player.pos) }
    car.velocity = clamp((car.velocity / (controls.w && player.currentCar == car ? 1 : car.drag)), -0.1, 1)
    if (Math.abs(0 - car.velocity) < car.acceleration * 0.9) car.velocity = 0
    car.pos.x -= car.velocity * Math.sin(car.rotation * Math.PI / 180)
    car.pos.y -= car.velocity * Math.cos(car.rotation * Math.PI / 180)

    //transforming the points of the polygon
    let transformMatrices = car.collider.originalpoints.map(() => {
        return new DOMMatrix().rotate(0, 0, -car.rotation)
    });

    car.collider.originalpoints.forEach((e, i) => car.collider.points[i] = Vec2.fromPoint(DOMPoint.fromPoint(e).matrixTransform(transformMatrices[i])))

    car.collider.points.forEach((point, index) => {
        W.move({ n: "carmarker" + index, x: point.x + car.pos.x, z: point.y + car.pos.y })
    })

    car.collider.axes = calculateAxes(car.collider)

    for (const poly of kinetic) {
        maincar.collider.pos = car.pos
        let collision = testPolygons(car.collider, poly)
        if (collision) {
            //TODO: measure angle between the car and the MTV and slow down the car based on that, so it will come to a complete stop on a frontal colloison but can still move when scratching a wall sideways
            car.velocity = car.velocity / 2
            car.pos = car.pos.add(collision)
            if (poly.callback) poly.callback(collision)
        }
    }


    W.move({ n: car.name, ry: car.rotation, x: car.pos.x, z: car.pos.y })

    if (player.currentCar == car) {
        //for some reason when grouping the player with the car, it slowly shifts off from the right position, so I set the player's position to the car manually
        player.pos.x = car.pos.x
        player.pos.y = car.pos.y
    }
}

//#endregion car


function update() {
    updateWorld()

    kmcounter.innerText = Math.round(player.pos.x / 1000)

    if (controls.w || controls.s) {
        player.pos.x -= (controls.w - controls.s) * Math.sin(player.rotationX * Math.PI / 180) * player.speed
        player.pos.y -= (controls.w - controls.s) * Math.cos(player.rotationX * Math.PI / 180) * player.speed
    }
    if (controls.a || controls.d) {
        player.pos.x -= (controls.a - controls.d) * Math.sin((player.rotationX + 90) * Math.PI / 180) * player.speed
        player.pos.y -= (controls.a - controls.d) * Math.cos((player.rotationX + 90) * Math.PI / 180) * player.speed
    }

    W.move({ n: "ground", x: player.pos.x, z: player.pos.y })
    W.move({ n: "road", x: player.pos.x, })

    cars.forEach(updateCar)

    physicsUpdate()

    if (currentAction.importance >= 0 && !player.equippedItem) {
        items.forEach((item) => {
            if (item.dropped) {
                let dist = player.pos.distance(item.pos)
                if (dist < currentAction.importance && dist < 2) {
                    currentAction = {text: "press E to pick up" + item.displayName, callback: () => item.equip(), importance: 2}
                }
            }
        })
    }

    if (player.equippedItem && controls.q) {
        player.equippedItem.drop(player.pos)
    }
    controls.q = false

    tooltip.innerText = currentAction.text
    if (controls.e) currentAction.callback()
    controls.e = false
    currentAction = nothingAction


    requestAnimationFrame(update)
}

generateWorld()

physicsInit()

let meat2 = new Meat
meat2.drop(new Vec2(-5,0))

//start the game loop
requestAnimationFrame(update)

