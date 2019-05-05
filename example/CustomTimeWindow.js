import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import moment from 'moment'
import Scheduler, {SchedulerData, ViewTypes, CellUnits, DemoData, DATE_FORMAT} from '../src/index'
import Nav from './Nav'
import ViewSrcCode from './ViewSrcCode'
import withDragDropContext from './withDnDContext'

class CustomTimeWindow extends Component{
    constructor(props){
        super(props);

        let schedulerData = new SchedulerData(moment().format(DATE_FORMAT), ViewTypes.Custom, false, false, {
            customCellWidth: 30,
            nonAgendaDayCellHeaderFormat: 'M/D|HH:mm',
            views: [
                {viewName: 'Two days', viewType: ViewTypes.Custom, showAgenda: false, isEventPerspective: false},
                {viewName: 'Two weeks', viewType: ViewTypes.Custom1, showAgenda: false, isEventPerspective: false},
                {viewName: 'Two months', viewType: ViewTypes.Custom2, showAgenda: false, isEventPerspective: false},
            ],
        }, {
            getCustomDateFunc: this.getCustomDate,
            isNonWorkingTimeFunc: this.isNonWorkingTime
        });
        schedulerData.localeMoment.locale('en');
        schedulerData.setResources(DemoData.resources);
        schedulerData.setEvents(DemoData.events);
        this.state = {
            viewModel: schedulerData,
        }
    }

    render(){
        const {viewModel} = this.state;
        return (
            <div>
                <Nav />
                <div>
                    <h3 style={{textAlign: 'center'}}>Custom time window<ViewSrcCode srcCodeUrl="https://github.com/StephenChou1017/react-big-scheduler/blob/master/example/CustomTimeWindow.js" /></h3>
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
                               toggleExpandFunc={this.toggleExpandFunc}
                    />
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
        schedulerData.config.customCellWidth = view.viewType === ViewTypes.Custom ? 30 : 80;
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

    getCustomDate = (schedulerData, num, date = undefined) => {
        const {viewType} = schedulerData;
        let selectDate = schedulerData.startDate;
        if(date != undefined)
            selectDate = date;   

        let startDate = num === 0 ? selectDate : 
            schedulerData.localeMoment(selectDate).add(2*num, 'days').format(DATE_FORMAT),
            endDate = schedulerData.localeMoment(startDate).add(1, 'days').format(DATE_FORMAT),
            cellUnit = CellUnits.Hour;
        if(viewType === ViewTypes.Custom1) {
            let monday = schedulerData.localeMoment(selectDate).startOf('week').format(DATE_FORMAT);
            startDate = num === 0 ? monday : schedulerData.localeMoment(monday).add(2*num, 'weeks').format(DATE_FORMAT);
            endDate = schedulerData.localeMoment(startDate).add(1, 'weeks').endOf('week').format(DATE_FORMAT);
            cellUnit = CellUnits.Day;
        } else if(viewType === ViewTypes.Custom2) {
            let firstDayOfMonth = schedulerData.localeMoment(selectDate).startOf('month').format(DATE_FORMAT);
            startDate = num === 0 ? firstDayOfMonth : schedulerData.localeMoment(firstDayOfMonth).add(2*num, 'months').format(DATE_FORMAT);
            endDate = schedulerData.localeMoment(startDate).add(1, 'months').endOf('month').format(DATE_FORMAT);
            cellUnit = CellUnits.Day;
        }
            
        return {
            startDate,
            endDate,
            cellUnit
        };
    }

    isNonWorkingTime = (schedulerData, time) => {
        const { localeMoment } = schedulerData;
        if(schedulerData.cellUnit === CellUnits.Hour){
            let hour = localeMoment(time).hour();
            if(hour < 1)
                return true;
        }
        else {
            let dayOfWeek = localeMoment(time).weekday();
            if (dayOfWeek === 0 || dayOfWeek === 6)
                return true;
        }
    
        return false;
    }

    toggleExpandFunc = (schedulerData, slotId) => {
        schedulerData.toggleExpandStatus(slotId);
        this.setState({
            viewModel: schedulerData
        });
    }
}

export default withDragDropContext(CustomTimeWindow)
