const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

W.reset(c);

//player
W.group({n:"p"})
W.camera({g:"p", y:5})
W.plane({g:"p",  rx: -90,z:50, size: 500, b:"3d2"})

W.light({x:.5,y:-.3,z:-.5});

let controls = {
    w: false,
    s: false,
    a: false,
    d: false,
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
    posX: 0,
    posY: 0,
    speed: 20
}

let settings = {
    sensitivity: 0.1
}

requestAnimationFrame(update)

function update() {

    if (controls.w || controls.s) {
        W.move({
            n:"p",
            z: player.posX -= (controls.w - controls.s) * Math.cos(player.rotationX*Math.PI/180) / player.speed,
            x: player.posY -= (controls.w - controls.s) * Math.sin(player.rotationX*Math.PI/180) / player.speed
        });
    }
    if (controls.a || controls.d) {
        W.move({
            n:"p",
            z: player.posX -= (controls.a - controls.d) * Math.cos((player.rotationX+90)*Math.PI/180) / player.speed,
            x: player.posY -= (controls.a - controls.d) * Math.sin((player.rotationX+90)*Math.PI/180) / player.speed
        });
    } 


    requestAnimationFrame(update)
}