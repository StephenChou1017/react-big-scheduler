import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import Scheduler, {DemoData, SchedulerData, ViewTypes} from '../src/index'
import Nav from './Nav'
import ViewSrcCode from './ViewSrcCode'
import withDragDropContext from './withDnDContext'

class CustomHeaders extends Component {
  constructor(props) {
    super(props);

    let schedulerData = new SchedulerData(Date.now(), ViewTypes.Week, false, false, {
      calendarPopoverEnabled: false,
    });
    schedulerData.localeMoment.locale('en');
    schedulerData.setResources(DemoData.resources);
    schedulerData.setEvents(DemoData.events);
    this.state = {
      viewModel: schedulerData
    }
  }

    nonAgendaCellHeaderTemplateResolver = (schedulerData, item, formattedDateItems, style) => {
      let datetime = schedulerData.localeMoment(item.time);
      let isCurrentDate = false;

      if (schedulerData.viewType === ViewTypes.Day) {
          isCurrentDate = datetime.isSame(new Date(), 'hour');
      }
      else {
          isCurrentDate = datetime.isSame(new Date(), 'day');
      }

      if (isCurrentDate) {
          style.backgroundColor = '#118dea';
          style.color = 'white';
      }

      return (
          <th key={item.time} className={`header3-text`} style={style}>
              {
                  formattedDateItems.map((formattedItem, index) => (
                      <div key={index}
                           dangerouslySetInnerHTML={{__html: formattedItem.replace(/[0-9]/g, '<b>$&</b>')}}/>
                  ))
              }
          </th>
      );
  }

  render() {
    const {viewModel} = this.state;

    return (
      <div>
        <Nav/>
        <div>
          <h3 style={{textAlign: 'center'}}>Custom table headers (with disabled calendar popup)<ViewSrcCode
            srcCodeUrl="https://github.com/StephenChou1017/react-big-scheduler/blob/master/example/CustomTableHeaders.js"/>
          </h3>
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
                     nonAgendaCellHeaderTemplateResolver = {this.nonAgendaCellHeaderTemplateResolver}
                     toggleExpandFunc={this.toggleExpandFunc}
          />
        </div>
      </div>
    )
  }

  prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    })
  }

  nextClick = (schedulerData) => {
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
    if (confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)) {

      let newFreshId = 0;
      schedulerData.events.forEach((item) => {
        if (item.id >= newFreshId)
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
    if (confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
      schedulerData.updateEventStart(event, newStart);
    }
    this.setState({
      viewModel: schedulerData
    })
  }

  updateEventEnd = (schedulerData, event, newEnd) => {
    if (confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
      schedulerData.updateEventEnd(event, newEnd);
    }
    this.setState({
      viewModel: schedulerData
    })
  }

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    if (confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
      schedulerData.moveEvent(event, slotId, slotName, start, end);
      this.setState({
        viewModel: schedulerData
      })
    }
  }

  toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    this.setState({
        viewModel: schedulerData
    });
  }
}

export default withDragDropContext(CustomHeaders)
