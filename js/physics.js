let kinetic = []

let place

function physicsInit() {
    player.collider = polygon(player.pos, [new Vec2(-1, -1), new Vec2(1, -1), new Vec2(1, 1), new Vec2(-1, 1)])
    player.collider.axes = calculateAxes(player.collider)

    for (const car of cars) {
        car.collider = polygon(car.pos, [new Vec2(2.3, -4), new Vec2(-2.3, -4), new Vec2(-2.3, 6), new Vec2(2.3, 6)])
        car.collider.axes = calculateAxes(car.collider)
    
        car.collider.originalpoints = JSON.parse(JSON.stringify(car.collider.points))
    }

    W.cube({x:1000, size:50, b:"#3511d3"})
    kinetic.push(polygon(new Vec2(10,0), [new Vec2(), new Vec2(10,0), new Vec2(10,10), new Vec2(0,10)]))

    for (const poly of kinetic) {
        poly.axes = calculateAxes(poly)
    }
}

function physicsUpdate() {
    player.collider.pos = player.pos
    
    //if the player is in the car it is moved in  the car update

    if (!player.currentCar) {
        if (!place) {
            const bodies = kinetic.filter(val => player.pos.distance(val.pos) < 30)
            for (const poly of bodies) {
                let collision = testPolygons(player.collider, poly)
                if (collision) {
                    player.pos = player.pos.add(collision)
                    if (poly.callback) poly.callback(collision)
                }
            }
        } else {
            for (const poly of place.bodies) {
                let collision = testPolygons(player.collider, poly)
                if (collision) {
                    player.pos = player.pos.add(collision)
                    if (poly.callback) poly.callback(collision)
                }
            }

            W.sphere({n:"min", x:place.min.x, z:place.min.y})
            W.sphere({n:"max", x:place.max.x, z:place.max.y})

            if (player.pos.x < place.min.x) {
                player.pos.x += place.min.x - player.pos.x
            }
            if (player.pos.y < place.min.y) {
                player.pos.y += place.min.y - player.pos.y
            }
            if (player.pos.x > place.max.x) {
                player.pos.x += place.max.x - player.pos.x
            }
            if (player.pos.y > place.max.y) {
                player.pos.y += place.max.y - player.pos.y
            }
        }
        //move everything
        W.move({n:"camera", x:player.pos.x, z:player.pos.y,  ry: player.rotationX, rx: player.rotationY})
    }


}

//funtions that for testing collisions

function polygon(pos, points = []) {
    return { pos, points }
}

function rect(pos, size) {
    if (size instanceof Vec2) return polygon(pos, [new Vec2(), new Vec2(size.x,0), new Vec2(size.x, size.y), new Vec2(0, size.y)])
    else if (typeof size == "number") return polygon(pos, [new Vec2(), new Vec2(size,0), new Vec2(size, size), new Vec2(0, size)])
    else throw new Error("Size must be a number or a Vec2");   
}

function addStaticBody(polygon) {
    polygon.axes = calculateAxes(polygon)
    kinetic.push(polygon)
}

function calculateAxes(poly) {
    //make the axes
    let axes = []
    poly.points.forEach((value, index) => {
        let dir
        if (index == poly.points.length - 1) {
            dir = poly.points[0]
        } else {
            dir = poly.points[index + 1]
        }
        dir = dir.sub(value).perp().normal()
        axes.push(dir)
    })
    return axes
}

function project(axis, polygon_1, polygon_2) {

    let proj1 = polygon_1.points.map((val) => {
        return axis.dot(val)
    })

    let proj2 = polygon_2.points.map((val) => {
        let offset = polygon_2.pos.sub(polygon_1.pos)
        return axis.dot(val.add(offset))
    })

    return [proj1, proj2]
}

function testAxis(axis, polygon_1, polygon_2) {
    let [proj1, proj2] = project(axis, polygon_1, polygon_2)

    //get min and max values
    let min1 = Math.min(...proj1)
    let max1 = Math.max(...proj1)
    let min2 = Math.min(...proj2)
    let max2 = Math.max(...proj2)

    // test for collision
    if (max1 > min2 && min1 < max2) {
        //if it collides calculate and return the overlap
        let dist1 = min2 - max1
        let dist2 = max2 - min1
        if (Math.abs(dist1) < Math.abs(dist2)) {
            return dist1
        } else return dist2
    } else return false
}

function testPolygons(poly1, poly2) {
    let MTV = { magnitude: Infinity }
    for (const axis of poly1.axes) {
        let test = testAxis(axis, poly1, poly2)
        if (!test) return false
        else if (Math.abs(test) < Math.abs(MTV.magnitude)) MTV = { magnitude: test, dir: axis }
    }
    for (const axis of poly2.axes) {
        let test = testAxis(axis, poly1, poly2)
        if (!test) return false
        else if (Math.abs(test) < Math.abs(MTV.magnitude)) MTV = { magnitude: test, dir: axis }
    }
    return MTV.dir.scale(MTV.magnitude)
}