const steps = [step1]

let boxes = []
let main

document.addEventListener("DOMContentLoaded", () => {
  main = document.querySelector("#main-entity")
  document.body.addEventListener("click", () => {
    const step = steps.shift()
    if (step) {
      step()
    }
  })
})

const setAttrs = (el, attrs) => {
  attrs.forEach(([attr, value]) => {
    el.setAttribute(attr, value)
  })
}

let cargo = [
  { width: 0.23, height: 0.2, depth: 0.4, quantity: 15, color: "#008cc2" },
  { width: 0.25, height: 0.5, depth: 0.2, quantity: 14, color: "#149eb3" },
  { width: 0.3, height: 0.4, depth: 0.4, quantity: 5, color: "#00bf9a" }
]

function step1() {
  const entity = document.createElement("a-entity")
  const padding = 0.05
  const offsetX = -0.7
  const offsetY = -0.6

  cargo.reduce((offset, item) => {
    const { width, depth, height } = item
    let xPos
    let yPos
    for (let i = 0; i < item.quantity; i++) {
      const box = document.createElement("a-box")
      let x = i % 5
      let y = Math.floor(i / 5)
      xPos = -x * width - x * padding + offsetX
      yPos = -y * depth - y * padding + offsetY + offset
      let initialPosition = `${xPos} 0 ${yPos}`
      setAttrs(box, [
        ["width", width],
        ["height", height],
        ["depth", depth],
        ["color", item.color],
        ["position", initialPosition]
      ])

      const animation = document.createElement("a-animation")
      setAttrs(animation, [
        ["attribute", "position"],
        ["from", initialPosition],
        ["to", `${xPos} 0.2 ${yPos}`],
        ["easing", "ease-in-out"],
        ["dur", 400],
        ["direction", "alternate"],
        ["repeat", "1"],
        ["delay", 33 * i]
      ])
      box.appendChild(animation)
      entity.appendChild(box)
      boxes.push({
        box,
        animation,
        position: { x: xPos, y: yPos }
      })
    }
    return yPos
  }, 0)
  main.appendChild(entity)
}

// function step2() {
//   boxes.forEach(box => {})
// }
