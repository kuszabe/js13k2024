let items = []

class Item {
    constructor () {
        items.push(this)
        this.name = "item" + (items.length - 1)
    }
    drop(vec) {
        this.dropped = true
        this.pos = vec
        W.delete(this.name + "held")
        W.billboard({n:this.name + "dropped", y:1, x:vec.x, size:2, z:vec.y, t:this.image})
        console.log({n:this.name + "dropped", y:1, x:vec.x, size:2, z:vec.y, t:this.image})
        console.log("dropping")
        player.equippedItem = null
    }
    equip() {
        this.dropped = false
        player.equippedItem = this
        W.delete(this.name + "dropped")
        W.plane({g:"camera", n:this.name + "held", z:-1, rx:-25, y:-0.7, size: 1.2, ns:1, t:this.image})
    }
}

class Meat extends Item {
    image = upscaleImage(meatsource)
    nutritionalvalue = 2
    displayName = "Meat"
    use() {
        console.log("nyam nyam")
        player.addHunger(this.nutritionalvalue)
    }
}

function upscaleImage(imagesource, factor = 20) {
    let image = new OffscreenCanvas(imagesource.width * factor, imagesource.height * factor)
    let imagectx = image.getContext("2d")
    imagectx.imageSmoothingEnabled = false
    imagectx.drawImage(imagesource, 0,0, 160, 160)
    return image
}
