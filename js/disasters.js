let thunderStorm = {
    name: "Thunder storm",
    start() {
        let lightingcount = 0
        //set the light and sky
        normalLight = { x: -0.1, y: -0.1, z: -0.1}
        W.light({...normalLight, a: 2000})
        normalAmbient = .2
        setTimeout(() => {
            W.clearColor("#1b1a1d")
            W.ambient(normalAmbient)
        }, 2500);
        while (lightingcount < 20)
        {
            setTimeout(() => lightningCycle(), Math.random() * 60000)
            lightingcount++
        }

        function lightningCycle() {
            let position = player.pos.add(new Vec2(Math.random() * 60 - 15, Math.random() * 60 - 30));
            spawnLightning(position)
            lightingcount--;
            if (lightingcount <= 0) {
                normalAmbient = 0.7
                normalLight = { x: -0.5, y: -.7, z: -0.5 }
                if (!place) {
                    setTimeout(() => {
                        W.ambient(normalAmbient)
                        W.light(normalLight)
                    }, 1000);
                }
                setTimeout(() => {
                    W.clearColor("#87CEEB")
                }, 1000);
            }
        }
    }
}

function spawnLightning(pos) {
    zzfx(1,.05,471,0,.03,.8,4,1.06,-6.7,0,0,0,0,.9,61,.1,0,.82,.05,.13,0); // Loaded Sound 38    W.cube({ n: "lightning1",b:"FFFFFF", x: pos.x + 5, z: pos.y + 5, y: 100, w: 10, d: 10, h: 200 })
    W.cube({ n: "lightning2",b:"FFFFFF", x: pos.x + 7.5, z: pos.y + 7.5, w: 5, y: 50, d: 5, h: 50 })
    W.cube({ n: "lightning3",b:"FFFFFF", x: pos.x + 8.5, z: pos.y + 8.5, w: 3, d: 3, h: 50 })

    W.ambient(1)
    W.clearColor("#949398")
    setTimeout(() => {
        W.delete("lightning1")
        W.delete("lightning2")
        W.delete("lightning3")
        W.clearColor("#1b1a1d")
        W.ambient(0.2)
    }, 200)
}

let robots = []

let attackOfTheDroids = {
    name: "Attack of the droids",
    start() {
        for (let i = 0; i<50; i++) {
            let bot
            if (Math.round(Math.random())) {
                bot = new Ball
            } else {
                bot = new Mouser
            }

            bot.spawn(new Vec2(Math.random()* 150 - 20, Math.random()*50 -25).add(player.pos))

            robots.push(bot)
        }
    }
}

let disasters = [thunderStorm, attackOfTheDroids]

function triggerDisaster() {
    let timeout = 1
    let max = 1000
    let i = Math.round(Math.random() * (disasters.length - 1))

    function roll() {
        let chosen = disasters[i % (disasters.length)]
        disaster.innerText = chosen.name
        
        console.log(i % (disasters.length - 1), i)
        
        timeout += 50
        if (timeout < max) {
            i++
            setTimeout(roll, timeout)
        } else {
            chosen.start()
            setTimeout(() => disaster.innerText = "", 5000)
        }
    }

    roll()
}