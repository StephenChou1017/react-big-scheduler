react-big-scheduler
========================

A scheduler and resource planning component built for React and made for modern browsers (IE10+) .

[Online demo](https://stephenchou1017.github.io/scheduler/#/)

Inspired by [Full Calendar Scheduler](https://fullcalendar.io/scheduler/).

## Use and Setup

`npm install react-big-scheduler --save`

```
//1. import
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
//include `react-big-scheduler/lib/css/style.css` for styles, link it in html or import it here 
import 'react-big-scheduler/lib/css/style.css'

...

//2. create the view model, put it in the props obj
let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week);
//set resources here or later
let resources = [
                    {
                       id: 'r1',
                       name: 'Resource1'
                    },
                    {
                       id: 'r2',
                       name: 'Resource2'
                    },
                    {
                       id: 'r3',
                       name: 'Resource3'
                    }
                ];
schedulerData.setResources(resources);
//set events here or later, 
//the event array should be sorted in ascending order by event.start property, otherwise there will be some rendering errors
let events = [
                {
                     id: 1,
                     start: '2017-12-18 09:30:00',
                     end: '2017-12-19 23:30:00',
                     resourceId: 'r1',
                     title: 'I am finished',
                     bgColor: '#D9D9D9'
                 }, 
                 {
                     id: 2,
                     start: '2017-12-18 12:30:00',
                     end: '2017-12-26 23:30:00',
                     resourceId: 'r2',
                     title: 'I am not resizable',
                     resizable: false
                 }, 
                 {
                     id: 3,
                     start: '2017-12-19 12:30:00',
                     end: '2017-12-20 23:30:00',
                     resourceId: 'r3',
                     title: 'I am not movable',
                     movable: false
                 }, 
                 {
                     id: 4,
                     start: '2017-12-19 14:30:00',
                     end: '2017-12-20 23:30:00',
                     resourceId: 'r1',
                     title: 'I am not start-resizable',
                     startResizable: false
                 }, 
                 {
                     id: 5,
                     start: '2017-12-19 15:30:00',
                     end: '2017-12-20 23:30:00',
                     resourceId: 'r2',
                     title: 'I am not end-resizable',
                     endResizable: false
                 }
             ];
schedulerData.setEvents(events);

...

//3. render the scheduler component
...
const {schedulerData} = this.props;
<Scheduler schedulerData={schedulerData}
           prevClick={this.prevClick}
           nextClick={this.nextClick}
           onSelectDate={this.onSelectDate}
           onViewChange={this.onViewChange}
           eventItemClick={this.eventClicked}
/>
...
```

## Run examples locally

* Clone this repository
* Retrieve dependencies: `npm install`
* Start: `npm run example`
* Open [http://localhost:8081/example/#/](http://localhost:8081/example/#/).

## API

### SchedulerData

SchedulerData is the view model of Scheduler, we can modify it to control the view of the Scheduler. 

#### constructor

 ```
 constructor(date=moment().format(DATE_FORMAT), viewType = ViewTypes.Week,
                 showAgenda = false, isEventPerspective = false,
                 newConfig = undefined, newBehaviors=undefined)
 ```
 * `date` is a string in `YYYY-MM-DD` format, and is the initial date Scheduler will render. Take the date `2017-12-20`
 for example, Scheduler will render the time window of the week from `2017-12-18` to `2017-12-24` in `ViewTypes.Week`
 view type, and will render the time window of the `2017-12` month in `ViewTypes.Month` view type. 
 * `viewType` is the initial view type, now Scheduler supports `Day`, `Week`, `Month`, `Year` 4 view types, and will 
 support `Quarter` later. `viewType`, `showAgenda` and `isEventPerspective` are a group which should be contained in 
 the SchedulerData.config.views array, and they together decide which view should be rendered. When `showAgenda` and 
 `isEventPerspective` are both `false`, Scheduler will render the resource view, refer 
 to [this example](https://stephenchou1017.github.io/scheduler/#/views).
 * `showAgenda` is a bool value, if true, Scheduler will display the agenda view of current view type.
 * `isEventPerspective` is a bool value, if true, Scheduler will display the task view of current view type. In the 
 resource view, every slot(row) describes how many events a resource does in the time window, while in the task view, 
  every slot describes how many events a big task is divided into and who will make it done. Add a `groupId` and 
  `groupName` property to every event object, so that the events having the same `groupId` will belong to the same big task and
  be rendered in the same slot in the task view. If `groupId` and `groupName` are not provided, SchedulerData will take
  the `id` as the `groupId`, and take the `title` as the `groupName`. See the `eventsForTaskView` in the 
  [DemoData.js](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/DemoData.js) for details.
  * `newConfig` is a config object, used to override the [default config](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/config.js)
  fully or partly.
  * `newBehaviors` is a config object, used to override the [default behaviors](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/behaviors.js)
  fully or partly.
  
  #### setResources
   ```
   setResources(resources)
   ```
   Used to set the resources(the slots in the resource view), make sure that there are no duplicated `resource.id` in the `resources`.
   See the demo `resources` in the [DemoData.js](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/DemoData.js).
  
  #### setEvents
  ```
  setEvents(events)
  ```
  Used to set the events. the event array should be sorted in ascending order by event.start property.
  See the demo `events` in the [DemoData.js](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/DemoData.js).
  If we use the task view, we'd better add the `groupId` and the `groupName` property to each event object, see the 
  `eventsForTaskView` in the [DemoData.js](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/DemoData.js) for details.
  
  #### prev
  ```
  prev()
  ```
  Let the time window scroll to the left once. When `SchedulerData,viewType` is `ViewTypes.Month`, the time window will
  scroll a month, when `SchedulerData,viewType` is `ViewTypes.Week`, the time window will scroll a week. `SchedulerData.events` 
  will be clear after calling this method.
  
  #### next
  ```
  next()
  ```
  Let the time window scroll to the right once. `SchedulerData.events` will be clear after calling this method.
  
  #### setDate
  ```
  setDate(date=moment().format(DATE_FORMAT))
  ```
  Let the time window jump to the provided `date` directly. `SchedulerData.events` will be clear after calling this method.
  
  #### setViewType
  ```
  setViewType(viewType = ViewTypes.Week, showAgenda = false, isEventPerspective = false)
  ```
  Tell SchedulerData to change current view, the `viewType`, `showAgenda` and `isEventPerspective` group should be 
  provided, and should be contained in the `SchedulerData.config.views` array. `SchedulerData.events` will be clear 
  after calling this method.
  
  #### setEventGroups
  ```
  setEventGroups(eventGroups)
  ```
  Used to set the event groups(the slots in the task view), make sure that there are no duplicated `eventGroup.id` in the `eventGroups`.
  This method is optional, and is needed only when `SchedulerData.eventGroupsAutoGenerated` is `false`.
  
  #### setEventGroupsAutoGenerated
  ```
  setEventGroupsAutoGenerated(autoGenerated)
  ```
  Tell SchedulerData to generate `SchedulerData.eventGroups` automatically or not. If `true`, SchedulerData will generate the event 
  groups(slots) automatically according to the `event.groupId` and 'event.groupName' automatically. If `groupId` and 'groupName' are
  not provided, SchedulerData will take `event.id` and `event.title` instead.
  
  #### addResource
  ```
  addResource(resource)
  ```
  Add the `resource` to the `SchedulerData.resources`, make sure that `resource.id` is not existed.
  
  #### addEvent
  ```
  addEvent(newEvent)
  ```
  Add the `newEvent` to the `SchedulerData.events`, make sure that `newEvent.id` is not existed. SchedulerData will 
  place the `newEvent` in the right index according to the `newEvent.start` property.
  
  #### updateEventStart
  ```
  updateEventStart(event, newStart)
  ```
  Update the `newStart` to the `event.start`. SchedulerData will replace the `event` in the right index according 
  to the `newStart` value.
  
  #### updateEventEnd
  ```
  updateEventEnd(event, newEnd)
  ```
  Update the `newEnd` to the `event.end`. 
  
  #### moveEvent
  ```
  moveEvent(event, newSlotId, newSlotName, newStart, newEnd)
  ```
  Update the `newSlotId`, `newSlotName`, `newStart`, `newEnd` of the `event`. In the resource view,  new slot is a resource,
  while in the task view, new slot is a event group. SchedulerData will replace the `event` in the right index according 
  to the `newStart` value.
