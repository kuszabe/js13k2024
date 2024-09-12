class Droid {
    constructor() {
        this.name = "droid" + time
    }
    spawn(vec) {
        this.pos = vec
        W[this.type]({ n: this.name, x: this.pos.x, z: this.pos.y, t: droidtexture, size:2 })
    }
    cooldown = false
}



let droidtexture

class Mouser extends Droid {
    type = "mouserdroid"
    spawn(vec) {
        super.spawn(vec)
        this.collider = rect(this.pos, 2)
        console.log("mouser")
    }
    angle = 90
    update() {
        if (player.pos.distance(this.pos) < 30) {
            this.collider.pos = this.pos
            this.collider.axes = calculateAxes(this.collider)
            let dir = player.pos.sub(this.pos).normal().scale(0.05)
            this.pos = this.pos.add(dir)
            for (const poly of kinetic) {
                let collision = testPolygons(this.collider, poly)
                if (collision) {
                    this.pos = this.pos.add(collision)
                }
            }
            this.angle = moveTowardsValueLoop(dir.angle() + 200, this.angle, 5, 360)
            W.move({n:this.name, x:this.pos.x, z:this.pos.y, ry:-this.angle - 90})
            if (player.pos.distance(this.pos) < 1 && !this.cooldown) {
                this.cooldown = true
                player.damage(1)
                setTimeout(() => this.cooldown = false)
            }
        }
    }
}

class Ball extends Droid {
    type = "trainingdroid"
    spawn(vec) {
        this.pos = vec
        W[this.type]({ n: this.name, x: this.pos.x, z: this.pos.y, y:2, t: droidtexture, size:2 })
        this.target = this.pos
    }
    update() {
        if (player.pos.distance(this.pos) < 50) {
            if (this.target.distance(this.pos) < 1) this.target = Vec2.fromPoint(player.pos)
            let dir = this.target.sub(this.pos).normal().scale(0.1)
            this.pos = this.pos.add(dir)
            W.move({n:this.name, x:this.pos.x, z:this.pos.y})
        }
    }
}

function droidsInit() {
    const colors = [
        "blue",
        "red",
        "green"
    ]

    let dctx = document.createElement("canvas").getContext("2d")
    dctx.fillStyle = "black"
    dctx.fillRect(0,0, 300, 150)
    // droidtexture = document.createElement("img")
    // droidtexture.src = dctx.canvas.toDataURL()
    droidtexture = dctx.canvas
    W.add("mouserdroid", {
        vertices: [...'\\\\\\\\\\!!\\""\\\r!\r!\\\\\\\\\\\r\\\\\\\r!\\"\\!\\\\\\\r\r\\!"\r!\rR`\n`\n`sR`sZ\n`s\n`s\n`Z]\\]\\__\\cc\\hh\\mm\\nn\\\rm\rm\\hh\\cc\\_\\]\\\r_\\c\\h\\\rm\\n\\m\\h\\c\\\r_\r_\\]]]_chmn\rmhc\r_'].map(a => (a.codePointAt()) / 127),
        uv: [...'@rr@ff@YY@LL@@@@33@&&@@28 >8) 2==)\r\r@@_>q8|)|q_MBB)M8O@o@o_O_0_O00OO 0 @0@_@rr@ff@YY@LL@@@@33@&&@@28 >8) 2==)\r\r@@_>q8|)|q_MBB)M8'].map(a => (a.codePointAt()) / 127),
        indices: [0, 1, 2, 0, 2, 3, 3, 2, 4, 3, 4, 5, 5, 4, 6, 5, 6, 7, 7, 6, 8, 7, 8, 9, 9, 8, 10, 9, 10, 11, 11, 10, 12, 11, 12, 13, 13, 12, 14, 13, 14, 15, 15, 14, 16, 15, 16, 17, 18, 19, 20, 18, 20, 21, 18, 21, 22, 18, 22, 23, 18, 23, 24, 18, 24, 25, 18, 25, 26, 18, 26, 27, 17, 16, 28, 17, 28, 29, 29, 28, 30, 29, 30, 31, 32, 33, 34, 32, 34, 35, 32, 35, 36, 32, 36, 37, 32, 37, 38, 32, 38, 39, 32, 39, 40, 32, 40, 41, 42, 43, 44, 42, 44, 45, 46, 45, 47, 46, 47, 48, 49, 50, 51, 49, 51, 52, 53, 54, 46, 53, 46, 55, 54, 42, 45, 54, 45, 46, 52, 51, 42, 52, 42, 54, 56, 57, 58, 56, 58, 59, 59, 58, 60, 59, 60, 61, 61, 60, 62, 61, 62, 63, 63, 62, 64, 63, 64, 65, 65, 64, 66, 65, 66, 67, 67, 66, 68, 67, 68, 69, 69, 68, 70, 69, 70, 71, 71, 70, 72, 71, 72, 73, 74, 75, 76, 74, 76, 77, 74, 77, 78, 74, 78, 79, 74, 79, 80, 74, 80, 81, 74, 81, 82, 74, 82, 83, 73, 72, 84, 73, 84, 85, 85, 84, 86, 85, 86, 87, 88, 89, 90, 88, 90, 91, 88, 91, 92, 88, 92, 93, 88, 93, 94, 88, 94, 95, 88, 95, 96, 88, 96, 97]
    });
    W.add("trainingdroid", {
        vertices: [...'4e4xFx"Te4KYK44Nx4ae4hK444TeTYKY44FxF4ea4Kh444xNeTKY44"xFe4K444x4K4e4eKx444"x"44444F"444Y4Ta4N444h44TTFF44Y4Y4a4N4444hT"F444Y444444444""4444444 4UMUM XU4X 4MUMM M4UX4 XUM MU4 4U 4U4 '].map(a=>(a.codePointAt())/127),
        uv: [...'_U_jOjOU_@O@W@j@U@@G0U0@80j U @( jU@jU@j@UoUo@jwojgW_O_*_@O@O*@*@G@@0*080@ * ( @*@*@wo*@o@o*goo__OO@@00  '].map(a=>(a.codePointAt())/127),
        indices: [0,1,2,0,2,3,4,0,3,4,3,5,1,6,2,3,2,7,3,7,8,5,3,8,5,8,9,2,10,7,9,8,11,9,11,12,7,13,14,8,7,14,8,14,11,12,11,15,12,15,16,14,17,18,11,14,18,11,18,15,16,15,19,16,19,20,18,21,22,15,18,22,15,22,19,20,19,23,20,23,24,22,25,26,19,22,26,19,26,23,27,28,29,27,29,30,31,32,33,28,31,33,28,33,29,33,34,1,29,33,1,29,1,0,30,29,0,30,0,4,9,12,16,9,16,20,9,20,24,9,24,30,9,30,4,9,4,5,35,36,37,38,39,40,38,40,41,36,38,41,36,41,37,37,41,42,37,42,43,44,37,43,41,40,45,41,45,42,43,42,46,43,46,47,48,43,47,42,45,49,42,49,46,47,46,50,47,50,51,52,47,51,46,49,53,46,53,50,51,50,54,51,54,55,56,51,55,50,53,57,50,57,54,55,54,58,55,58,59,60,55,59,54,57,61,54,61,58,62,63,64,65,66,67,65,67,68,63,65,68,63,68,64,69,64,36,68,67,39,68,39,38,64,68,38,64,38,36,45,40,39,45,39,67,45,67,61,45,61,57,45,57,53,45,53,49,70,71,72,70,72,73,73,72,74,73,74,75,75,74,76,75,76,77,77,76,78,77,78,79,79,78,80,79,80,81,81,80,82,81,82,83,83,82,84,83,84,85,85,84,86,85,86,87]
    });

}