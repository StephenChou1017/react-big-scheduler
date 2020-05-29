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

function checkConflict(eventParameter, schedulerData) {
  let event = null;
  const { localeMoment } = schedulerData;
  const slotId = schedulerData._getEventSlotId(eventParameter);

  const start = localeMoment(eventParameter.start);
  const end = localeMoment(eventParameter.end);

  if (
    schedulerData.events.some((event) => {
      if (
        schedulerData._getEventSlotId(event) === slotId &&
        event.id !== eventParameter.id
      ) {
        const eStart = localeMoment(event.start);
        const eEnd = localeMoment(event.end);
        if (
          (start >= eStart && start < eEnd) ||
          (end > eStart && end <= eEnd) ||
          (eStart >= start && eStart < end) ||
          (eEnd > start && eEnd <= end)
        ) {
          return true;
        }
      }
    })
  )
    return event;
  else return null;
}

export { getPos, checkConflict };
