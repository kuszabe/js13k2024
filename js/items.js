let items = []

function updateHotbar() {
    for (i = 0; i < 7; i++) {
        if (player.inventory[i]) {
            document.getElementById("hotbar" + (i+1)).innerText = player.inventory[i].displayName
        } else {
            document.getElementById("hotbar" + (i+1)).innerText = ""
        }
    }

    for (i = 0; i < 7; i++) {
        if (i == player.selectedInventorySlot) {
            document.getElementById("hotbar" + (i+1)).style.border = "4px, solid, black"
        } else {
            document.getElementById("hotbar" + (i+1)).style.border = ""
        }
    }
}

class Item {
    constructor () {
        items.push(this)
        this.name = "item" + (items.length - 1)
        this.index = items.length - 1
    }
    drop(vec, y = 1) {
        this.dropped = true
        this.pos = Vec2.fromPoint(vec)
        W.delete(this.name + "held")
        W.billboard({n:this.name + "dropped", y, x:vec.x, size:2, z:vec.y, t:this.image})
        console.log({n:this.name + "dropped", y, x:vec.x, size:2, z:vec.y, t:this.image})
        console.log("dropping")
        if (player.equippedItem == this) {
            player.equippedItem = null
            player.inventory[player.selectedInventorySlot] = null
        }
            
    }
    pickUp() {
        let i = 0
        while (true) {
            if (!player.inventory[i]) break
            if (i > 6) return
            i++
        }
        this.dropped = false
        player.inventory[i] = this
        W.delete(this.name + "dropped")
        if (player.selectedInventorySlot == i) {
            this.equip()
        }
    }
    equip() {
        W.delete(player.equippedItem?.name + "held")
        player.equippedItem = this
        requestAnimationFrame(() => W.plane({g:"camera", n:this.name + "held", z:-1, rx:-25, y:-0.7, size: 1.2, ns:1, t:this.image}))
    }
    delete() {
        W.delete(this.name + "dropped")
        W.delete(this.name + "held")
        if (player.equippedItem == this) {
            player.equippedItem = null
            player.inventory[player.selectedInventorySlot] = null
        }
        delete items[this.index]
    }
}

class Meat extends Item {
    image = upscaleImage(meatsource)
    nutritionalvalue = 2
    displayName = "Meat"
    use() {
        console.log("nyam nyam")
        player.addHunger(this.nutritionalvalue)
        this.delete()
    }
}

function upscaleImage(imagesource, factor = 20) {
    let image = new OffscreenCanvas(imagesource.width * factor, imagesource.height * factor)
    let imagectx = image.getContext("2d")
    imagectx.imageSmoothingEnabled = false
    imagectx.drawImage(imagesource, 0,0, 160, 160)
    return image
}