const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

W.reset(c);

W.group({n:"p"})
W.camera({g:"p", y:5})
W.plane({g:"p",  rx: -90,z:50, size: 200, b:"3d2"})

W.sphere({n: "nigga1" , z: -5, x: 0, y: 3, b:"#d6b8b8"})
W.sphere({n: "nigga2" , z: 0, x: 2, y: 3, b:"#d6b8b8"})
W.sphere({n: "nigga3" , z: -5, x: 5, y: 3, b:"#d6b8b8"})
W.sphere({n: "nigga4" , z: 3, x: 2, y: 3, b:"#d6b8b8"})

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

onclick = async () => {
    await document.body.requestPointerLock()
}

onmousemove = (e) => {
    player.rotationX = (player.rotationX + e.movementX) % 360
    player.rotationY = clamp(player.rotationY + e.movementY, -90, 90)
    W.camera({ry: player.rotationX, rx: player.rotationY})
}


let player = {
    rotationX: 0,
    rotationY: 0,
    posX: 0,
    posY: 0,
    speed: 20
}

let settings = {
    sensitivity: 0.05
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