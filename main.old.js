W.reset(c);

W.clearColor("#87CEEB")

W.add("car", {
    vertices: [...'707000009070977,799,7,9,9,07,0,,,0,,,0933070797799P33939P3[P3R09P37R09[7[[99999[7[[9[7i7[[i7ii777770/,,00/0iX[R0O0,//0,0P3O030X[O0O0XX//0/0///XXO07/07,09/07O090O0/0,09O07R00,0R0/09,07i7,7/7/077777,070707X7O07R077[9[9P39O0999X9,09/09/9,93909997/9/9X7X7/09/09/7/9X9O07O07X'].map(a => (a.codePointAt()) / 127),
    uv: [...'￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿￿'].map(a => (a.codePointAt()) / 127),
    indices: [0, 1, 2, 2, 3, 0, 4, 5, 6, 7, 8, 6, 6, 5, 7, 9, 10, 8, 8, 7, 9, 6, 11, 4, 12, 13, 14, 14, 15, 12, 16, 17, 18, 18, 19, 16, 20, 21, 22, 22, 23, 20, 24, 25, 26, 26, 27, 24, 28, 29, 30, 29, 31, 32, 28, 33, 34, 32, 30, 29, 30, 33, 28, 31, 35, 34, 34, 32, 31, 34, 35, 28, 36, 37, 38, 38, 39, 36, 40, 41, 42, 42, 43, 40, 44, 45, 46, 46, 47, 44, 48, 49, 50, 49, 51, 52, 52, 50, 49, 53, 54, 52, 52, 51, 53, 50, 55, 48, 56, 57, 58, 58, 59, 56, 60, 61, 62, 62, 63, 60, 64, 65, 66, 66, 67, 64, 65, 68, 66, 67, 69, 64, 70, 71, 72, 72, 73, 70, 74, 75, 76, 76, 77, 74, 78, 79, 80, 80, 81, 78, 82, 83, 84, 84, 85, 82, 86, 87, 88, 89, 88, 87, 89, 90, 91, 92, 91, 90, 87, 93, 89, 88, 94, 86, 90, 95, 92, 96, 97, 90, 86, 98, 87, 90, 89, 96, 97, 99, 100, 91, 88, 89, 97, 96, 99, 100, 101, 97, 102, 103, 104, 105, 104, 103, 103, 106, 105, 107, 108, 105, 103, 109, 110, 105, 106, 107, 110, 111, 103, 112, 113, 111, 112, 107, 106, 102, 114, 115, 115, 114, 108, 103, 102, 109, 106, 113, 112, 108, 107, 115, 111, 110, 112, 104, 114, 102, 115, 116, 102, 117, 118, 119, 119, 120, 117, 121, 122, 123, 123, 124, 121, 125, 126, 127, 127, 128, 125, 129, 130, 131, 132, 130, 133, 131, 134, 129, 130, 129, 133, 135, 129, 136, 134, 137, 136, 133, 138, 132, 139, 133, 129, 136, 129, 134, 140, 141, 137, 129, 142, 139, 137, 134, 140, 136, 143, 135, 131, 144, 134, 145, 146, 147, 148, 147, 146, 149, 150, 146, 145, 151, 152, 146, 153, 148, 152, 149, 145, 154, 155, 150, 156, 157, 158, 146, 145, 149, 150, 159, 154, 158, 160, 156, 150, 149, 159, 147, 156, 145, 160, 145, 156, 161, 162, 163, 164, 165, 161, 161, 166, 164, 162, 167, 168, 168, 163, 162, 169, 168, 167, 167, 170, 169, 164, 166, 169, 171, 172, 167, 171, 173, 174, 169, 170, 164, 174, 172, 171, 170, 174, 173, 167, 162, 171, 175, 164, 170, 173, 175, 170, 163, 166, 161, 176, 177, 178, 178, 179, 176, 180, 181, 182, 182, 183, 180, 184, 185, 186, 186, 187, 184]
});

W.add("big_rock", {
    vertices: [...'[5|a,~1b+},7\\8[5==II|0;I;4?7F0;I\nH\n...'].map(a => (a.codePointAt()) / 127),
    uv: [...'HO H O@H@O_H_H@0@0__o@@0@_0 @@@0@ OOo_'].map(a => (a.codePointAt()) / 127),
    indices: [0, 1, 2, 2, 3, 4, 4, 5, 6, 5, 7, 6, 8, 9, 10, 8, 10, 11, 12, 5, 3, 10, 13, 14, 9, 15, 10, 16, 17, 9, 18, 16, 19, 15, 7, 13, 17, 6, 15, 2, 17, 20, 0, 20, 18, 9, 17, 15, 2, 1, 3, 4, 3, 5, 16, 20, 17, 17, 4, 6, 2, 4, 17, 10, 15, 13, 18, 20, 16, 15, 6, 7, 0, 21, 1, 5, 22, 7, 12, 23, 5, 0, 2, 20]
});

//player
W.group({ n: "p" })
W.camera({ g: "p", y: 3.2, fov: 50 })
W.plane({ g: "p", rx: -90, size: 1000, b: "3d1" })

W.plane({g:"p", z:-1})

W.light({ x: -.5, y: -.3, z: -.5 });

W.ambient(0.5)

W.group({ n: "car" })

W.car({ g: "car", n: "carbody", size: 10, rx: -90, x: -2.3, z: 6, b: "#380303" })

let controls = {
    w: false,
    s: false,
    a: false,
    d: false,
    e: false
}

onkeydown = (e) => {
    controls[e.key] = true
}

onkeyup = (e) => {
    controls[e.key] = false
}

onclick = () => {
    if (!document.pointerLockElement) document.body.requestPointerLock()
}

onmousemove = (e) => {
    if (!document.pointerLockElement) return
    player.rotationX = (player.rotationX + e.movementX * settings.sensitivity) % 360
    player.rotationY = clamp(player.rotationY + e.movementY * settings.sensitivity, -90, 90)
    W.camera({ ry: player.rotationX, rx: player.rotationY })
}


let player = {
    rotationX: 0,
    rotationY: 0,
    x: 0,
    y: 0,
    speed: 0.2,
    currentCar: null
}

const settings = {
    sensitivity: -0.1,
}



//i was bored because i didn't understand the matrix math
class AndrewTate {
    escape(matrix) {
        return "-$90"
    }
}

let maincar = {
    // matrix: new DOMMatrix().rotate(360-90,360-90,0).scale(10,10,10),
    // matrix: carMatrix,
    x: 0,
    y: 0,
    velocity: 0,
    rotation: 20,
    handling: 0.05,
    acceleration: 0.005,
    drag: 1.005,
    steeringpower: 0.5,
    name: "car",
    turn: 0
}

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
    useCoolDown = true
    setTimeout(() => useCoolDown = false, 500)
}

let useCoolDown = false

function leaveCar() {
    if (!player.currentCar) return
    player.x = player.currentCar.x + 5
    player.y = player.currentCar.y + 5
    player.currentCar = null
    W.move({ n: "p", x: player.x, z: player.y })
}

//updates the car
//takes in a car object, like maincar, so that cars can be swapped
function updateCar(car) {
    if (player.currentCar == car) {
        if (!useCoolDown && controls.e) leaveCar()
        //car acceleration
        car.velocity += (controls.w - controls.s) * car.acceleration / Math.max(Math.abs(car.turn), 1)

        //car rotation
        car.turn = moveTowardsValue((controls.a - controls.d) * 5, car.turn, car.handling)
        player.rotationX = (player.rotationX + car.turn * Math.min(car.velocity, 0.5)) % 360
        W.camera({ ry: player.rotationX })
        car.rotation += car.turn * Math.min(car.velocity, 0.5)
    } else if (distance(player.x, player.y, car.x, car.y) < 4 && controls.e && !useCoolDown) enterCar(car)
    car.velocity = clamp((car.velocity / (controls.w && player.currentCar == car ? 1 : car.drag)), -0.3, 2)
    if (Math.abs(0 - car.velocity) < 0.0049) car.velocity = 0



    W.move({
        n: "car",
        x: car.x -= car.velocity * Math.sin(car.rotation * Math.PI / 180),
        z: car.y -= car.velocity * Math.cos(car.rotation * Math.PI / 180),
        ry: car.rotation,
    })
    if (player.currentCar == car) {
        //for some reason when grouping the player with the car, it slowly shifts off from the right position, so I set the player's position to the car manually
        W.move({
            n: "p",
            x: car.x,
            z: car.y,
        })
        player.x = car.x
        player.y = car.y
    }
}

let lastFrame

let timeElapsedSinceLastFrame

function update(timeStamp) {
    timeElapsedSinceLastFrame = timeStamp - lastFrame
    lastFrame = timeStamp
    if (!player.currentCar) {
        if (controls.w || controls.s) {
            W.move({
                n: "p",
                x: player.x -= (controls.w - controls.s) * Math.sin(player.rotationX * Math.PI / 180) * player.speed,
                z: player.y -= (controls.w - controls.s) * Math.cos(player.rotationX * Math.PI / 180) * player.speed
            });
        }
        if (controls.a || controls.d) {
            W.move({
                n: "p",
                x: player.x -= (controls.a - controls.d) * Math.sin((player.rotationX + 90) * Math.PI / 180) * player.speed,
                z: player.y -= (controls.a - controls.d) * Math.cos((player.rotationX + 90) * Math.PI / 180) * player.speed
            });
        }
    }

    updateCar(maincar)

    updateWorld()

    requestAnimationFrame(update)
}

// enterCar(maincar)

generateWorld()

//start the game loop
requestAnimationFrame(update)

