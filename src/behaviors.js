import {ViewTypes} from './index'

//getSummaryFuncExample
export const getSummary = (schedulerData, headerEvents, slotId, slotName, headerStart, headerEnd) => {
    return {text: 'Summary', color: 'red', fontSize: '1.2rem'};
}

//getDateLabelFuncExample
export const getDateLabel = (schedulerData, viewType, startDate, endDate) => {
    let start = schedulerData.localeMoment(startDate);
    let end = schedulerData.localeMoment(endDate);
    let dateLabel = start.format('MMM D, YYYY');

    if(viewType === ViewTypes.Week) {
        dateLabel = `${start.format('MMM D')}-${end.format('D, YYYY')}`;
        if(start.month() !== end.month())
            dateLabel = `${start.format('MMM D')}-${end.format('MMM D, YYYY')}`;
        if(start.year() !== end.year())
            dateLabel = `${start.format('MMM D, YYYY')}-${end.format('MMM D, YYYY')}`;
    }
    else if(viewType === ViewTypes.Month){
        dateLabel = start.format('MMMM YYYY');
    }
    else if(viewType === ViewTypes.Quarter){
        dateLabel = `${start.format('MMM D')}-${end.format('MMM D, YYYY')}`;
    }
    else if(viewType === ViewTypes.Year) {
        dateLabel = start.format('YYYY');
    }

    return dateLabel;
}

export const getEventText = (schedulerData, event) => {
    if(!schedulerData.isEventPerspective) return event.title;

    let eventText = event.title;
    schedulerData.resources.forEach((item) => {
        if(item.id === event.resourceId) {
            eventText = item.name;
        }
    })

    return eventText;
}

export const isNonWorkingTime = (schedulerData, time) => {
    const { localeMoment } = schedulerData;
    if(schedulerData.viewType === ViewTypes.Day){
        let hour = localeMoment(time).hour();
        if(hour < 9 || hour > 18)
            return true;
    }
    else {
        let dayOfWeek = localeMoment(time).weekday();
        if (dayOfWeek === 0 || dayOfWeek === 6)
            return true;
    }

    return false;
}

export default {
    //getSummaryFunc: getSummary,
    getSummaryFunc: undefined,
    getDateLabelFunc: getDateLabel,
    getEventTextFunc: getEventText,
    isNonWorkingTimeFunc: isNonWorkingTime,
}
