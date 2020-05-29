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

function checkConflict(eventItem, schedulerData) {
  const { localeMoment } = schedulerData;
  const slotId = schedulerData._getEventSlotId(eventItem);

  const start = localeMoment(eventItem.start);
  const end = localeMoment(eventItem.end);

  return schedulerData.events.some((e) => {
    if (schedulerData._getEventSlotId(e) === slotId && e.id !== eventItem.id) {
      const eStart = localeMoment(e.start);
      const eEnd = localeMoment(e.end);
      if (
        (start >= eStart && start < eEnd) ||
        (end > eStart && end <= eEnd) ||
        (eStart >= start && eStart < end) ||
        (eEnd > start && eEnd <= end)
      )
        return e;
    }
  });
}

export { getPos, checkConflict };
