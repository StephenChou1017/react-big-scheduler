import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import moment from 'moment'
import Scheduler, {SchedulerData, ViewTypes, AddMorePopover, DemoData} from '../src/index'
import Nav from './Nav'
import ViewSrcCode from './ViewSrcCode'
import withDragDropContext from './withDnDContext'

class Locale extends Component{
    constructor(props){
        super(props);

        moment.locale('zh-cn');
        let schedulerData = new SchedulerData('2017-12-18', ViewTypes.Week, false, false, {
            dayMaxEvents: 2,
            weekMaxEvents: 4,
            monthMaxEvents: 4,
            yearMaxEvents: 4,
            resourceName: '资源名称',
            taskName: '任务名称',
            agendaViewHeader: '工作事项',
            addMorePopoverHeaderFormat: 'YYYY年M月D日 dddd',
            eventItemPopoverDateFormat: 'M月D日',
            nonAgendaDayCellHeaderFormat: 'HH:mm',
            nonAgendaOtherCellHeaderFormat: 'ddd|M/D',
            views: [
                {viewName: '天', viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false},
                {viewName: '周', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false},
                {viewName: '月', viewType: ViewTypes.Month, showAgenda: false, isEventPerspective: false},
                {viewName: '季', viewType: ViewTypes.Quarter, showAgenda: false, isEventPerspective: false},
                {viewName: '年', viewType: ViewTypes.Year, showAgenda: false, isEventPerspective: false},
            ],
        }, {
            getDateLabelFunc: this.getDateLabel,
            isNonWorkingTimeFunc: this.isNonWorkingTime
        }, moment);
        schedulerData.setResources(DemoData.resources);
        schedulerData.setEvents(DemoData.events);
        this.state = {
            viewModel: schedulerData,
            headerItem: undefined,
            left: 0,
            top: 0,
            height: 0,
        }
    }

    render(){
        const {viewModel} = this.state;
        let popover = <div />;
        if (this.state.headerItem !== undefined) {
            popover =
                <AddMorePopover headerItem={this.state.headerItem} eventItemClick={this.eventClicked}
                                viewEventClick={this.ops1} viewEventText="Ops 1"
                                viewEvent2Click={this.ops2} viewEvent2Text="Ops 2"
                                schedulerData={viewModel}
                                closeAction={this.onSetAddMoreState} left={this.state.left} top={this.state.top}
                                height={this.state.height} moveEvent={this.moveEvent}/>;
        }
        return (
            <div>
                <Nav />
                <div>
                    <h3 style={{textAlign: 'center'}}>Locale<ViewSrcCode srcCodeUrl="https://github.com/StephenChou1017/react-big-scheduler/blob/master/example/Locale.js" /></h3>
                    <Scheduler schedulerData={viewModel}
                               prevClick={this.prevClick}
                               nextClick={this.nextClick}
                               onSelectDate={this.onSelectDate}
                               onViewChange={this.onViewChange}
                               eventItemClick={this.eventClicked}
                               viewEventClick={this.ops1}
                               viewEventText="Ops 1"
                               viewEvent2Text="Ops 2"
                               viewEvent2Click={this.ops2}
                               updateEventStart={this.updateEventStart}
                               updateEventEnd={this.updateEventEnd}
                               moveEvent={this.moveEvent}
                               newEvent={this.newEvent}
                               onSetAddMoreState={this.onSetAddMoreState}
                               toggleExpandFunc={this.toggleExpandFunc}
                    />
                    {popover}
                </div>
            </div>
        )
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops1 = (schedulerData, event) => {
        alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops2 = (schedulerData, event) => {
        alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        if(confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)){

            let newFreshId = 0;
            schedulerData.events.forEach((item) => {
                if(item.id >= newFreshId)
                    newFreshId = item.id + 1;
            });

            let newEvent = {
                id: newFreshId,
                title: 'New event you just created',
                start: start,
                end: end,
                resourceId: slotId,
                bgColor: 'purple'
            }
            schedulerData.addEvent(newEvent);
            this.setState({
                viewModel: schedulerData
            })
        }
    }

    updateEventStart = (schedulerData, event, newStart) => {
        if(confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
            schedulerData.updateEventStart(event, newStart);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        if(confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
            schedulerData.updateEventEnd(event, newEnd);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        if(confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
            schedulerData.moveEvent(event, slotId, slotName, start, end);
            this.setState({
                viewModel: schedulerData
            })
        }
    }

    getDateLabel = (schedulerData, viewType, startDate, endDate) => {
        let start = schedulerData.localeMoment(startDate);
        let end = schedulerData.localeMoment(endDate);
        let dateLabel = start.format('YYYY年M月D日');

        if(viewType === ViewTypes.Week) {
            dateLabel = `${start.format('YYYY年M月D日')}-${end.format('D日')}`;
            if(start.month() !== end.month())
                dateLabel = `${start.format('YYYY年M月D日')}-${end.format('M月D日')}`;
            if(start.year() !== end.year())
                dateLabel = `${start.format('YYYY年M月D日')}-${end.format('YYYY年M月D日')}`;
        }
        else if(viewType === ViewTypes.Month){
            dateLabel = start.format('YYYY年M月');
        }
        else if(viewType === ViewTypes.Quarter){
            dateLabel = `${start.format('YYYY年M月D日')}-${end.format('M月D日')}`;
        }
        else if(viewType === ViewTypes.Year) {
            dateLabel = start.format('YYYY年');
        }

        return dateLabel;
    }

    isNonWorkingTime = (schedulerData, time) => {
        const { localeMoment } = schedulerData;
        if(schedulerData.viewType === ViewTypes.Day){
            let hour = localeMoment(time).hour();
            if(hour < 9 || hour > 18)
                return true;
        }
        else {
            let dayOfWeek = localeMoment(time).weekday();
            if (dayOfWeek === 5 || dayOfWeek === 6)
                return true;
        }
    
        return false;
    }

    onSetAddMoreState = (newState) => {
        if (newState === undefined) {
            this.setState({
                headerItem: undefined,
                left: 0,
                top: 0,
                height: 0
            });
        }
        else {
            this.setState({
                ...newState,
            });
        }
    }

    toggleExpandFunc = (schedulerData, slotId) => {
        schedulerData.toggleExpandStatus(slotId);
        this.setState({
            viewModel: schedulerData
        });
    }
}

export default withDragDropContext(Locale)
