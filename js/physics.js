let kinetic = []

function physicsInit() {
    player.collider = polygon(player.pos, [new Vec2(-0.5, -0.5), new Vec2(0.5, -0.5), new Vec2(0.5, 0.5), new Vec2(-0.5, 0.5)])
    player.collider.axes = calculateAxes(player.collider)

    maincar.collider = polygon(maincar.pos, [new Vec2(2.3, -4), new Vec2(-2.3, -4), new Vec2(-2.3, 6), new Vec2(2.3, 6)])
    maincar.collider.axes = calculateAxes(maincar.collider)

    maincar.collider.points.forEach((point, index) => {
        W.sphere({n:"carmarker" + index, x:point.x + maincar.pos.x, z:point.y + maincar.pos.y})
    })

    maincar.collider.originalpoints = JSON.parse(JSON.stringify(maincar.collider.points))

    W.cube({x:10, size:10, b:"#3511d3"})
    kinetic.push(polygon(new Vec2(10,0), [new Vec2(), new Vec2(10,0), new Vec2(10,10), new Vec2(0,10)]))

    for (const poly of kinetic) {
        poly.axes = calculateAxes(poly)
    }
}

function physicsUpdate() {
    player.collider.pos = player.pos
    
    if (!player.currentCar) {
        for (const poly of kinetic) {
            let collision = testPolygons(player.collider, poly)
            if (collision) {
                player.pos = player.pos.add(collision)
                if (poly.callback) poly.callback(collision)
            }
        }
    }

    //move everything
    W.move({n:"camera", x:player.pos.x, z:player.pos.y,  ry: player.rotationX, rx: player.rotationY})

}

//funtions that for testing collisions

function polygon(pos, points = []) {
    return { pos, points }
}

function rect(pos, size) {
    if (typeof size == "number")  return polygon(pos, [new Vec2(), new Vec2(size,0), new Vec2(size, size), new Vec2(0, size)])
    else if (size instanceof Vec2) return polygon(pos, [new Vec2(), new Vec2(size.x,0), new Vec2(size.x, size.y), new Vec2(0, size.y)])
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