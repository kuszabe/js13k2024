function drawLine({points, color = ctx.strokeStyle, width = ctx.lineWidth, closed = false}) {
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    let pointer = 1
    while (pointer < points.length) {
        ctx.lineTo(points[pointer].x,points[pointer].y)
        pointer++
    }
    if (closed) ctx.closePath()
    ctx.stroke()
}

const offsets = {
    center: {x:0.5, y:0.5},
    topright: {x:0,y:0}
}


function drawRect({fill, stroke, x, y, width, height, linewidth = 3, offset = offsets.topright}) {
    x -= width * offset.x
    y -= height * offset.y
    if (fill) {
        ctx.fillStyle = fill
        ctx.fillRect(x,y,width,height)
    }
    if (stroke) {
        ctx.lineWidth = linewidth
        ctx.strokeStyle = stroke
        ctx.strokeRect(x,y,width,height)
    }
    
}