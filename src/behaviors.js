import moment from 'moment'
import 'moment/locale/zh-cn'
import {ViewTypes} from './index'

//getSummaryFuncExample
export const getSummary = (schedulerData, headerEvents, slotId, slotName, headerStart, headerEnd) => {
    return {text: 'Summary', color: 'red', fontSize: '1.2rem'};
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
    if(schedulerData.viewType === ViewTypes.Day){
        let hour = moment(time).hour();
        if(hour < 9 || hour > 18)
            return true;
    }
    else {
        let dayOfWeek = moment(time).weekday();
        if (dayOfWeek === 5 || dayOfWeek === 6)
            return true;
    }

    return false;
}

export default {
    //getSummaryFunc: getSummary,
    getSummaryFunc: undefined,
    getEventTextFunc: getEventText,
    isNonWorkingTimeFunc: isNonWorkingTime,
}
