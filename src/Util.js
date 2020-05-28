function getPos(element) {
  let x = 0,
    y = 0;
  if (!!element) {
    do {
      x += element.offsetLeft - element.scrollLeft;
      y += element.offsetTop - element.scrollTop;
    } while ((element = element.offsetParent));
  }
  return { x: x, y: y };
}

const checkConflicts = (eventItem, schedulerData) => {
  let slotId = schedulerData._getEventSlotId(eventItem);

  let start = localeMoment(eventItem.start),
    end = localeMoment(eventItem.end);

  schedulerData.events.forEach((e) => {
    if (schedulerData._getEventSlotId(e) === slotId && e.id !== eventItem.id) {
      let eStart = localeMoment(e.start),
        eEnd = localeMoment(e.end);
      if (
        (start >= eStart && start < eEnd) ||
        (end > eStart && end <= eEnd) ||
        (eStart >= start && eStart < end) ||
        (eEnd > start && eEnd <= end)
      )
        return true;
    }
  });
  return false;
};

export { getPos, checkConflicts };
