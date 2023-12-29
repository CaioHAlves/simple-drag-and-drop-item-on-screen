const listItems = document.querySelectorAll('.draggable-list li')
let touchStartY;
let touchStartIndex;

function handleDragStart(event) {
  const target = event.target

  if (event.target.nodeName === "LI") {
    touchStartIndex = Array.from(event.target.parentNode.children).indexOf(event.target)
    
    target.setAttribute('data-dragged-item', 'true')
    target.style.opacity = 0.5
  }
}

function handleDragEnd(event) {
  event.preventDefault()
  event.target.style.opacity = 1
}

function handleDrop(event) {
  const target = event.target
  const draggedItem = document.querySelector('li[data-dragged-item')
  
  if (target.nodeName === "LI" && draggedItem) {
    const draggedIndex = Array.from(target.parentNode.children).indexOf(draggedItem)
    const droppedIndex = Array.from(target.parentNode.children).indexOf(target)
    
    if (draggedIndex < droppedIndex) {
      target.parentNode.insertBefore(draggedItem, target.nextSibling)
    } else {
      target.parentNode.insertBefore(draggedItem, target)
    }
    draggedItem.removeAttribute('data-dragged-item')
  }
}

function handleDragOver(event) {
  event.preventDefault()
}

// Functions for touchscreen
function handleTouchStart(event) {
  touchStartY = event.touches[0].clientY
  touchStartIndex = Array.from(event.target.parentNode.children).indexOf(event.target)
  event.target.classList.add('dragging')
}

function handleTouchMove(event) {
  event.preventDefault();

  const touchMoveY = event.touches[0].clientY
  const touchMoveDiff = touchMoveY - touchStartY

  const draggedElement = document.querySelector('.dragging')
  if (draggedElement) {
    draggedElement.style.transform = `translateY(${touchMoveDiff}px)`
  }
}

function handleTouchEnd(event) {
  const draggedElement = document.querySelector('.dragging')

  if (draggedElement) {
    draggedElement.style.transform = 'translateY(0)'
    draggedElement.classList.remove('dragging')

    const touchEndIndex = Math.floor((event.changedTouches[0].clientY - draggedElement.clientHeight / 2) / draggedElement.clientHeight)

    if (!isNaN(touchEndIndex)) {
      const parent = draggedElement.parentNode;
      parent.insertBefore(draggedElement, parent.children[touchEndIndex])
    }
  }
}

listItems.forEach(item => {
  item.addEventListener('dragstart', handleDragStart)
  item.addEventListener('dragover', handleDragOver)
  item.addEventListener('drop', handleDrop)
  item.addEventListener('dragend', handleDragEnd)

  item.addEventListener('touchstart', handleTouchStart)
  item.addEventListener('touchmove', handleTouchMove)
  item.addEventListener('touchend', handleTouchEnd)
})