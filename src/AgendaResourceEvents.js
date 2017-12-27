import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn'
import AgendaEventItem from './AgendaEventItem'
import {DATE_FORMAT} from './Scheduler'
import './Scheduler.css'

class AgendaResourceEvents extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        resourceEvents: PropTypes.object.isRequired,
        subtitleGetter: PropTypes.func,
        eventItemClick: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText:PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
        resourceClickedFunc: PropTypes.func,
    }

    render(){
        const {schedulerData, resourceEvents, resourceClickedFunc} = this.props;
        const {startDate, endDate, config} = schedulerData;
        let agendaResourceTableWidth = schedulerData.getResourceTableWidth();

        let events = [];
        resourceEvents.headerItems.forEach((item) => {
            let start = moment(startDate).format(DATE_FORMAT),
                end = moment(endDate).add(1, 'days').format(DATE_FORMAT),
                headerStart = moment(item.start).format(DATE_FORMAT),
                headerEnd = moment(item.end).format(DATE_FORMAT);

            if(start === headerStart && end === headerEnd) {
                item.events.forEach((evt) => {
                    let durationStart = moment(startDate);
                    let durationEnd = moment(endDate).add(1, 'days');
                    let eventStart = moment(evt.eventItem.start);
                    let eventEnd = moment(evt.eventItem.end);
                    let isStart = eventStart >= durationStart;
                    let isEnd = eventEnd < durationEnd;
                    let eventItem = <AgendaEventItem
                                        {...this.props}
                                        key={evt.eventItem.id}
                                        eventItem={evt.eventItem}
                                        isStart={isStart}
                                        isEnd={isEnd}
                                    />;
                    events.push(eventItem);
                });
            }
        });

        let a = resourceClickedFunc != undefined ? <a onClick={() => {
            resourceClickedFunc(schedulerData, resourceEvents);
        }}>{resourceEvents.slotName}</a>
            : <span>{resourceEvents.slotName}</span>;

        return (
            <tr style={{minHeight: config.eventItemLineHeight + 2}}>
                <td data-resource-id={resourceEvents.slotId} className="header2-text">
                    <div style={{width: agendaResourceTableWidth - 2}} title={resourceEvents.slotName} className="overflow-text">
                        {a}
                    </div>
                </td>
                <td>
                    <div className="day-event-container">
                        {events}
                    </div>
                </td>
            </tr>
        );
    }
}

export default AgendaResourceEvents
