function getPos(element) {
    let x = 0, y = 0;
    if(!!element) {
        do {
            x += element.offsetLeft - element.scrollLeft;
            y += element.offsetTop - element.scrollTop;
        } while (element = element.offsetParent);
    }
    return { 'x': x, 'y': y };
}

export {
    getPos
}
