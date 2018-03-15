import React, {Component, PropTypes} from 'react'
import {Popover} from 'antd'
import EventItemPopover from './EventItemPopover'

class AgendaEventItem extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        eventItem: PropTypes.object.isRequired,
        isStart: PropTypes.bool.isRequired,
        isEnd: PropTypes.bool.isRequired,
        subtitleGetter: PropTypes.func,
        eventItemClick: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText:PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
    }

    render() {
        const {eventItem, isStart, isEnd, eventItemClick, schedulerData} = this.props;
        const {config} = schedulerData;
        let roundCls = isStart ? (isEnd ? 'round-all' : 'round-head') : (isEnd ? 'round-tail' : 'round-none');
        let bgColor = config.defaultEventBgColor;
        if(eventItem.bgColor !== undefined)
            bgColor = eventItem.bgColor;

        let titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, eventItem);
        let content = (
            <EventItemPopover
                {...this.props}
                title={eventItem.title}
                startTime={eventItem.start}
                endTime={eventItem.end}
                statusColor={bgColor}
            />
        );

        return (
            <Popover placement="bottomLeft" content={content} trigger="hover">
                <a className="day-event" onClick={() => { if(!!eventItemClick) eventItemClick(schedulerData, eventItem);}}>
                    <div className={roundCls + ' event-item'} key={eventItem.id}
                         style={{height: config.eventItemHeight, maxWidth: config.agendaMaxEventWidth, backgroundColor: bgColor}}>
                        <span style={{marginLeft: '10px', lineHeight: `${config.eventItemHeight}px`}}>{titleText}</span>
                    </div>
                </a>
            </Popover>
        );
    }
}

export default AgendaEventItem