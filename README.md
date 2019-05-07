react-big-scheduler
========================

A scheduler and resource planning component built for React and made for modern browsers (IE10+), IE needs babel-polyfill.
**From the npm version 0.2.6, Scheduler will use responsive layout by default(set SchedulerData.config.schedulerWidth to a percentage instead of a number).**

[Online demo](https://stephenchou1017.github.io/scheduler/#/)

Inspired by [Full Calendar Scheduler](https://fullcalendar.io/scheduler/).

## Version selection

* antd >= 3.9.0 ? react-big-scheduler@0.2.7 : react-big-scheduler@0.2.4

## Use and Setup

`npm install react-big-scheduler --save`

```js
//1. import
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
//include `react-big-scheduler/lib/css/style.css` for styles, link it in html or import it here 
import 'react-big-scheduler/lib/css/style.css'
import moment from 'moment'
...

//2. create the view model, put it in the props obj
let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week);
//set locale moment to the schedulerData, if your locale isn't English. By default, Scheduler comes with English(en, United States).
moment.locale('zh-cn');
schedulerData.setLocaleMoment(moment);
//set resources here or later
let resources = [
                    {
                       id: 'r0',
                       name: 'Resource0',
                       groupOnly: true
                    },
                    {
                       id: 'r1',
                       name: 'Resource1'
                    },
                    {
                       id: 'r2',
                       name: 'Resource2',
                       parentId: 'r0'
                    },
                    {
                       id: 'r3',
                       name: 'Resource3',
                       parentId: 'r4'
                    },
                    {
                       id: 'r4',
                       name: 'Resource4',
                       parentId: 'r2'
                    },
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
                     title: 'R2 has recurring tasks every week on Tuesday, Friday',
                     rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
                     bgColor: '#f759ab'
                 }
             ];
schedulerData.setEvents(events);

...

//3. render the scheduler component, mind that the Scheduler component should be placed in a DragDropContext(father or ancestor).
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
* Open [http://localhost:8080/example/#/](http://localhost:8080/example/#/).

If you fail to execute the `npm install` command, remove the package-lock.json file and try again.

## API

### 1.SchedulerData

SchedulerData is the view model of Scheduler, we can modify it to control the view of the Scheduler. 

#### constructor

 ```js
 constructor(date=moment().format(DATE_FORMAT), viewType = ViewTypes.Week,
                 showAgenda = false, isEventPerspective = false,
                 newConfig = undefined, newBehaviors=undefined
                 localeMoment = undefined)
 ```
 * `date` is a string in `YYYY-MM-DD` format, and is the initial date Scheduler will render. Take the date `2017-12-20`
 for example, Scheduler will render the time window of the week from `2017-12-18` to `2017-12-24` in `ViewTypes.Week`
 view type, and will render the time window of the `2017-12` month in `ViewTypes.Month` view type. 
 * `viewType` is the initial view type, now Scheduler supports `Day`, `Week`, `Month`, `Quarter`, `Year` 5 built-in view types,
 in addition Scheduler now supports `Custom`, `Custom1`, `Custom2` 3 custom view types at the same time, in which you can control 
 the time window yourself, refer to [this example](https://stephenchou1017.github.io/scheduler/#/customtimewindow). `viewType`, 
 `showAgenda` and `isEventPerspective` are a group which should be contained in the SchedulerData.config.views array, 
 and they together decide which view should be rendered. When `showAgenda` and `isEventPerspective` are both `false`, 
 Scheduler will render the resource view, refer to [this example](https://stephenchou1017.github.io/scheduler/#/views).
 * `showAgenda` is a bool value, if true, Scheduler will display the agenda view of current view type. Agenda view is 
 read only.
 * `isEventPerspective` is a bool value, if true, Scheduler will display the task view of current view type. In 
 resource view, every slot(row) describes how many events a resource does in the time window, while in task view, 
  every slot describes how many events a big task is divided into and who will make it done. Add a `groupId` and 
  `groupName` property to every event object, so that the events having the same `groupId` will belong to the same big task and
  be rendered in the same slot in task view. If `groupId` and `groupName` are not provided, SchedulerData will take
  the `id` as the `groupId`, and take the `title` as the `groupName`. See the `eventsForTaskView` in the 
  [DemoData.js](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/DemoData.js) for details.
  * `newConfig` is a config object, used to override the [default config](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/config.js)
  fully or partly.
  * `newBehaviors` is a config object, used to override the [default behaviors](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/behaviors.js)
  fully or partly.
  * `localeMoment` is a locale moment object, which is unified used in react-big-scheduler. If not provided, Scheduler will come 
  with English(en, United States) locale strings.
  
  #### setLocaleMoment
  ```js
  setLocaleMoment(localeMoment)
  ```
  Used to set locale moment to the schedulerData, if your locale isn't English. By default, Scheduler comes with English(en, United States)
  
  #### setResources
  ```js
  setResources(resources)
  ```
  Used to set the resources(the slots in resource view), make sure that there are no duplicated `resource.id` in the `resources`.
  See the demo `resources` in the [DemoData.js](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/DemoData.js).
  
  #### setEvents
  ```js
  setEvents(events)
  ```
  Used to set the events. the event array should be sorted in ascending order by event.start property.
  See the demo `events` in the [DemoData.js](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/DemoData.js).
  If we use the task view, we'd better add the `groupId` and the `groupName` property to each event object, see the 
  `eventsForTaskView` in the [DemoData.js](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/DemoData.js) for details.
  
  #### prev
  ```js
  prev()
  ```
  Let the time window scroll to the left once. When `SchedulerData,viewType` is `ViewTypes.Month`, the time window will
  scroll a month, when `SchedulerData,viewType` is `ViewTypes.Week`, the time window will scroll a week. `SchedulerData.events` 
  will be clear after calling this method.
  
  #### next
  ```js
  next()
  ```
  Let the time window scroll to the right once. `SchedulerData.events` will be clear after calling this method.
  
  #### setDate
  ```js
  setDate(date=moment().format(DATE_FORMAT))
  ```
  Let the time window jump to the provided `date` directly. `SchedulerData.events` will be clear after calling this method.
  
  #### setViewType
  ```js
  setViewType(viewType = ViewTypes.Week, showAgenda = false, isEventPerspective = false)
  ```
  Tell SchedulerData to change current view, the `viewType`, `showAgenda` and `isEventPerspective` group should be 
  provided, and should be contained in the `SchedulerData.config.views` array. `SchedulerData.events` will be clear 
  after calling this method.
  
  #### setEventGroups
  ```js
  setEventGroups(eventGroups)
  ```
  Used to set the event groups(the slots in task view), make sure that there are no duplicated `eventGroup.id` in the `eventGroups`.
  This method is optional, and is needed only when `SchedulerData.eventGroupsAutoGenerated` is `false`.
  
  #### setEventGroupsAutoGenerated
  ```js
  setEventGroupsAutoGenerated(autoGenerated)
  ```
  Tell SchedulerData to generate `SchedulerData.eventGroups` automatically or not. If `true`, SchedulerData will generate the event 
  groups(slots) automatically according to the `event.groupId` and 'event.groupName' automatically. If `groupId` and 'groupName' are
  not provided, SchedulerData will take `event.id` and `event.title` instead.

  #### setMinuteStep
  ```js
  setMinuteStep(minuteStep)
  ```
  Used to set minute step for daily view and refresh the render data.

  #### toggleExpandStatus
  ```js
  toggleExpandStatus(slotId)
  ```
  Used to toggle slot's(and its children's) expand status.

  #### getMinuteStepsInHour
  ```js
  getMinuteStepsInHour()
  ```
  Used to get minute steps in an hour, it equals 60 / SchedulerData.config.minuteStep.
  
  #### addResource
  ```js
  addResource(resource)
  ```
  Add the `resource` to the `SchedulerData.resources`, make sure that `resource.id` is not duplicated. Refer 
  to [this example](https://stephenchou1017.github.io/scheduler/#/addresource).
  
  #### addEventGroup
  ```js
  addEventGroup(eventGroup)
  ```
  Add the `eventGroup` to the `SchedulerData.eventGroups`, make sure that `eventGroup.id` is not duplicated. Please note
  that the `eventGroup` added may be override when `SchedulerData.eventGroupsAutoGenerated` is `true` and 
  `SchedulerData.eventGroups` is auto-generated.
  
  #### addEvent
  ```js
  addEvent(newEvent)
  ```
  Add the `newEvent` to the `SchedulerData.events`, make sure that `newEvent.id` is not duplicated. SchedulerData will 
  place the `newEvent` in the right index according to the `newEvent.start` property.
  
  #### updateEventStart
  ```js
  updateEventStart(event, newStart)
  ```
  Update the `newStart` to the `event.start`, `newStart` is a string in `YYYY-MM-DD HH:mm:ss` format(similarly hereinafter). 
  SchedulerData will replace the `event` in the right index according to the `newStart` value.
  
  #### updateEventEnd
  ```js
  updateEventEnd(event, newEnd)
  ```
  Update the `newEnd` to the `event.end`. 
  
  #### moveEvent
  ```js
  moveEvent(event, newSlotId, newSlotName, newStart, newEnd)
  ```
  Update the `newSlotId`, `newSlotName`, `newStart`, `newEnd` of the `event`. In resource view,  new slot is a resource,
  while in task view, new slot is a event group. SchedulerData will replace the `event` in the right index according 
  to the `newStart` value.

  #### removeEvent
  ```js
  removeEvent(event)
  ```
  Remove the given event from `SchedeulerData.events`.

  #### removeEventById
  ```js
  removeEventById(eventId)
  ```
  Remove event from `SchedeulerData.events` by the given event id.
  
  #### getSlots
  ```js
  getSlots()
  ```
  Returns the slot array, `SchedulerData.resources` in resource view, `SchedulerData.eventGroups` in task view.
  
  #### getSlotById
  ```js
  getSlotById(slotId)
  ```
  Returns the slot by `slotId`, returns `undefined` if not found.
  
  #### getResourceById
  ```js
  getResourceById(resourceId)
  ```
  Returns the resource by `resourceId`, returns `undefined` if not found.

  #### isEventInTimeWindow
  ```js
  isEventInTimeWindow(eventStart, eventEnd, windowStart, windowEnd)
  ```
  Returns whether an event is in the time window or not, remind that `eventStart`, `eventEnd`, `windowStart`, `windowEnd` 
  are all moment objects.
  
  ### 2.Locale support(Refer to [this example](https://stephenchou1017.github.io/scheduler/#/locale) for details.)
  
  #### SchedulerData.config.resourceName
  The locale string of resource name.
  
  #### SchedulerData.config.taskName
  The locale string of task name.
  
  #### SchedulerData.config.agendaViewHeader
  The locale string of agenda view header.
  
  #### SchedulerData.config.addMorePopoverHeaderFormat
  The locale string of add more popover header format.
  
  #### SchedulerData.config.eventItemPopoverDateFormat
  The locale string of event item popover date format.
    
  #### SchedulerData.config.nonAgendaDayCellHeaderFormat
  The locale string of non-agenda view cell header format of day view type.
      
  #### SchedulerData.config.nonAgendaOtherCellHeaderFormat
  The locale string of non-agenda view cell header format of other view types.
  
  #### SchedulerData.behaviors.getDateLabelFunc
  Used to resolve the locale string of date label of Scheduler component.(Refer to the [getDateLabel](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/behaviors.js) func for example)
  
  ### 3.SchedulerData.config(See the [config.js](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/config.js) for details.)
  
  #### schedulerWidth
  The width of Scheduler. If schedulerWidth is a number, Scheduler will use fixed width layout, while if schedulerWidth is a percentage, 
  Scheduler will use responsive layout. And in the responsive layout:
  ```actual width of Scheduler = (SchedulerData.documentWidth - SchedulerData.config.besidesWidth) * SchedulerData.config.schedulerWidth```
  `SchedulerData.documentWidth` is the window width of browser and will change automatically when resized.
  
  #### schedulerMaxHeight
  The max height of Scheduler. If the desired height is bigger than the max height, the header row of Scheduler will be
  frozen and vertical scroll bar will appear, but this won't happen when the max height is set to `0`. Refer 
  to [this example](https://stephenchou1017.github.io/scheduler/#/freezefirstrow).
   
  #### tableHeaderHeight
  Height of Scheduler table header.
  
  #### agendaResourceTableWidth
  Width of the left Scheduler resource column in agenda view.
   
  #### agendaMaxEventWidth
  Max width of an event item in agenda view.
  
  #### dayResourceTableWidth, weekResourceTableWidth, monthResourceTableWidth, yearResourceTableWidth, quarterResourceTableWidth
  Width of the left Scheduler resource column in resource view and task view of different view types.
  
  #### dayCellWidth, weekCellWidth, monthCellWidth, yearCellWidth, quarterCellWidth
  Width of Scheduler table cells in resource view and task view of different view types.
  
  #### dayMaxEvents, weekMaxEvents, monthMaxEvents, yearMaxEvents, quarterMaxEvents
  Max events count of a cell in resource view and task view of different view types. A '+N more' will appear when exceeded.
  Refer to [this example](https://stephenchou1017.github.io/scheduler/#/addmore).
   
  #### eventItemHeight
  Height of an event item in 3 views.
  
  #### eventItemLineHeight
  Line height of an event item in 3 views.

  #### nonAgendaSlotMinHeight
  Min height of a slot in non-agenda views, default 0, means there is no min height.
  
  #### dayStartFrom
  Start hour rendered from in `ViewTypes.Day` in resource view and task view, default 0.
  
  #### dayStopTo
  End hour rendered to in `ViewTypes.Day` in resource view and task view, default 23.
  
  #### defaultEventBgColor
  Default event item background color in 3 views, will be override if there is a `bgColor` property in event object.
  
  #### selectedAreaColor
  Selected cells color in resource view and task view, cells are selectable only when `creatable` is `true`.
  
  #### nonWorkingTimeHeadColor
  Color of non-working time head cells. Modify `SchedulerData.behaviors.isNonWorkingTimeFunc` to re-define non-working time.
  Refer the `isNonWorkingTime` func in the [behaviors.js](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/behaviors.js).
  
  #### nonWorkingTimeHeadBgColor
  Background color of non-working time head cells.
  
  #### nonWorkingTimeBodyBgColor
  Background color of non-working time body cells.
  
  #### summaryColor
  Color of cell summary. Modify `SchedulerData.behaviors.getSummaryFunc` to display summary in a cell.
  Refer the `getSummary` func in the [behaviors.js](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/behaviors.js).
  
  #### summaryPos
  Position of cell summary, supports `SummaryPos.Top`, `SummaryPos.TopRight`, `SummaryPos.TopLeft`, `SummaryPos.Bottom`,
  `SummaryPos.BottomRight` and `SummaryPos.BottomLeft`.
  
  #### startResizable
  Controls whether to resize the start of every event item in resource view and task view. If `false`, all item starts are
  non-resizable, if `true`, all item starts are resizable except those who have a `resizable` or `startResizable`
  property and its value is `false`.
  
  #### endResizable
  Controls whether to resize the end of every event item in resource view and task view. If `false`, all item ends are
  non-resizable, if `true`, all item ends are resizable except those who have a `resizable` or `endResizable`
  property and its value is `false`.
  
  #### movable
  Controls whether to move every event item in resource view and task view. If `false`, all items are
  non-movable, if `true`, all items are movable except those who have a `movable` property and its value is `false`.
  
  #### creatable
  Controls whether to create new event item in resource view and task view.
  
  #### crossResourceMove
  Controls whether to cross-slot move an event item in resource view and task view. If `false`, the `slotId` and `slotName`
  won't change in the `moveEvent` method. Refer to [this example](https://stephenchou1017.github.io/scheduler/#/nocrossslotmove).
  
  #### checkConflict
  Controls whether to check conflicts when creating, resizing or moving an event item in resource view and task view. If
  `true`, Scheduler will call the `conflictOccurred` function if given. Refer to 
  [this example](https://stephenchou1017.github.io/scheduler/#/overlapcheck).
  
  #### scrollToSpecialMomentEnabled
  Controls Scheduler whether to scroll to special moment automatically when the time window contains special moment. If `true`, Scheduler 
  horizontal bar will scroll to special moment after calling `setScrollToSpecialMoment(true)` to SchedulerData. Use `SchedulerData.behaviors.getScrollSpecialMomentFunc`
  to tell Scheduler what time the special moment is.
  
  #### eventItemPopoverEnabled
  Controls Scheduler whether to display event item popover when moving mouse on an event item, default `true`.
  
  #### calendarPopoverEnabled
  Controls Scheduler whether to display calendar popover when clicking on a date label in header, default `true`.

  #### recurringEventsEnabled
  Controls Scheduler whether to support recurring event, refer to [this feature request](https://github.com/StephenChou1017/react-big-scheduler/issues/8), default `true`.
  If `true`, SchedulerData will filter out those template events who has a `rrule` string property in `setEvents` method, 
  generate the recurring events in the time window, and insert them into the event array in the right orders. The recurring events 
  generated from the same template event, all have a new id like ``${templateEvent.id}-${number}``, and have a `recurringEventId` 
  property with the value `templateEvent.id`.

  #### headerEnabled
  Controls Scheduler whether to display header, default `true`.

  #### displayWeekend
  Controls Scheduler whether to display weekends in non-agenda view, default `true`.

  #### relativeMove
  Controls Scheduler whether to move events(only DnDTypes.EVENT type) relatively or absolutely, default `true`, means relatively.

  #### minuteStep
  Minute step for day view type in non-agenda view, can be 10, 12, 15, 20, 30, 60, etc, default 30.
  
  #### views
  Array of view that Scheduler will support.
  
  ### 4.SchedulerData.behaviors(See the [behaviors.js](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/behaviors.js) for details.)
  
  #### getEventTextFunc
  ```js
  getEventTextFunc(schedulerData, event)
  ```
  Method that defines the text displayed in the `event`.
  
  #### isNonWorkingTimeFunc 
  ```js
  isNonWorkingTimeFunc(schedulerData, time)
  ```
  Method that defines non-working time.
  
  #### getSummaryFunc
  ```js
  getSummary(schedulerData, headerEvents, slotId, slotName, headerStart, headerEnd)
  ```
  Method that defines the summary text displayed in the Scheduler cells.Refer 
  to [this example](https://stephenchou1017.github.io/scheduler/#/summary).
    
  #### getCustomDateFunc
  ```js
  getCustomDate(schedulerData, num, date = undefined)
  ```
  Method that controls the start and end of time window when current view type is Custom, Custom1 or Custom2.Refer 
  to [this example](https://stephenchou1017.github.io/scheduler/#/customtimewindow).

  #### getNonAgendaViewBodyCellBgColorFunc
  ```js
  getNonAgendaViewBodyCellBgColor(schedulerData, slotId, header)
  ```
  Method that sets the background color of cells dynamically.

  #### getScrollSpecialMomentFunc
  ```js
  getScrollSpecialMoment(schedulerData, startMoment, endMoment)
  ```
  Method that defines the special moment Scheduler will scroll to automatically, when the time window contains that moment.
  
  ### 5.Scheduler.propTypes
  
  #### schedulerData
  ```js
  schedulerData: PropTypes.object.isRequired
  ```
  View model of the Scheduler component, provides data.
  
  #### prevClick
  ```js
  prevClick: PropTypes.func.isRequired
  prevClick(schedulerData)
  ```
  Callback function fired when the left point bracket '<' is clicked.
  
  #### nextClick
  ```js
  nextClick: PropTypes.func.isRequired
  nextClick(schedulerData)
  ```
  Callback function fired when the right point bracket '>' is clicked.
  
  #### onViewChange
  ```js
  onViewChange: PropTypes.func.isRequired
  onViewChange(schedulerData, view)
  ```
  Callback function fired when the Scheduler view changed. `view` is a json such as { viewType: ViewTypes.Month, 
  showAgenda: true, isEventPerspective: false}.
  
  #### onSelectDate
  ```js
  onSelectDate: PropTypes.func.isRequired
  onSelectDate(schedulerData, date)
  ```
  Callback function fired when a new date is selected. `date` is the new selected data, a string in `YYYY-MM-DD` format.
  
  #### eventItemClick
  ```js
  eventItemClick: PropTypes.func
  eventItemClick(schedulerData, event)
  ```
  Callback function fired when you click an event item.
  
  #### updateEventStart
  ```js
  updateEventStart: PropTypes.func
  updateEventStart(schedulerData, event, newStart)
  ```
  Callback function fired when resizing the start of the `event`, `newStart` is a string in `YYYY-MM-DD HH:mm:ss` format.
  
  #### updateEventEnd
  ```js
  updateEventEnd: PropTypes.func
  updateEventEnd(schedulerData, event, newEnd)
  ```
  Callback function fired when resizing the end of the `event`, `newEnd` is a string in `YYYY-MM-DD HH:mm:ss` format.
  
  #### moveEvent
  ```js
  moveEvent: PropTypes.func
  moveEvent((schedulerData, event, slotId, slotName, newStart, newEnd))
  ```
  Callback function fired when moving the `event`. `slotId`, `slotName` are the new `id` and `name` of the slot moving into, 
  but they won't change if the `SchedulerData.config.crossResourceMove` is `false`. `newStart`, `newEnd` are the new beginning 
  and ending of the `event`.
  
  #### newEvent
  ```js
  newEvent: PropTypes.func
  newEvent(schedulerData, slotId, slotName, start, end, type, item)
  ```
  Callback function fired when creating a new event, or dragging an external item and dropping it into the resource view or task
  view. `slotId` and `slotName` are the slot creating in or dropping into, `start`, `end` are the beginning and ending of the 
  event. If it's a drag&drop operation, the `type` is the DnDType of DnDSource registered to Scheduler, and the `item` is the 
  external item.
  
  #### leftCustomHeader, rightCustomHeader
  ```js
  leftCustomHeader: PropTypes.object
  rightCustomHeader: PropTypes.object
  ```
  Component you need to put in the Scheduler header, it could be a div or a react component. Refer 
  to [this example](https://stephenchou1017.github.io/scheduler/#/customheader).
  
  #### conflictOccurred
  ```js
  conflictOccurred: PropTypes.func
  conflictOccurred(schedulerData, action, event, type, slotId, slotName, start, end)
  ```
  Callback function fired when there is a conflict. This could happen when creating, resizing or moving an event, and when  
  `SchedulerData.config.checkConflict` is `true`.
  
  #### eventItemTemplateResolver
  ```js
  eventItemTemplateResolver: PropTypes.func
  eventItemTemplateResolver(schedulerData, event, bgColor, isStart, isEnd, mustAddCssClass, mustBeHeight, agendaMaxEventWidth)
  ```
  Use this function, you can customize the event style. Refer to [this example](https://stephenchou1017.github.io/scheduler/#/customeventstyle).
  
  ### eventItemPopoverTemplateResolver
  ```js
  eventItemPopoverTemplateResolver: PropTypes.func
  eventItemPopoverTemplateResolver(schedulerData, eventItem, title, start, end, statusColor)
  ```
  Use this function, you can customize the event's popover style. Refer to [this example](https://stephenchou1017.github.io/scheduler/#/custompopover).
  
  #### slotItemTemplateResolver
  ```js
  slotItemTemplateResolver: PropTypes.func
  slotItemTemplateResolver(schedulerData, slot, slotClickedFunc, width, clsName)
  ```
  Use this function, you can customize the left slot style. 
  
  #### nonAgendaCellHeaderTemplateResolver
  ```js
  nonAgendaCellHeaderTemplateResolver: PropTypes.func
  nonAgendaCellHeaderTemplateResolver(schedulerData, item, formattedDateItems, style)
  ```
  Use this function, you can customize the table header cell style.  Refer to [this example](https://stephenchou1017.github.io/scheduler/#/customtableheaders).

  #### onScrollLeft, onScrollRight
  ```js
  onScrollLeft: PropTypes.func
  onScrollLeft(schedulerData, schedulerContent, maxScrollLeft)
  onScrollRight: PropTypes.func
  onScrollRight(schedulerData, schedulerContent, maxScrollLeft)
  ```
  Callback function fired when the scheduler content div scrolls to leftmost or rightmost. Refer to [this example](https://stephenchou1017.github.io/scheduler/#/infinitescroll).

  #### onScrollTop, onScrollBottom
  ```js
  onScrollTop: PropTypes.func
  onScrollTop(schedulerData, schedulerContent, maxScrollTop)
  onScrollBottom: PropTypes.func
  onScrollBottom(schedulerData, schedulerContent, maxScrollTop)
  ```
  Callback function fired when the scheduler content div scrolls to topmost or bottommost. Refer to [this example](https://stephenchou1017.github.io/scheduler/#/infinitescroll).
  
  #### slotClickedFunc
  ```js
  slotClickedFunc: PropTypes.func
  ```
  If it's set, slots will be clickable, and will fire this function when a slot is clicked. Refer 
  to [this example](https://stephenchou1017.github.io/scheduler/#/resourceclickable).
  
  #### dndSources
  ```js
  dndSources: PropTypes.array
  ```
  DnDSource array that registered to Scheduler. Use [DnDSource](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/DnDSource.js), 
  we can simplify the drag and drop coding in React-Big-Scheduler. Refer 
  to [this example](https://stephenchou1017.github.io/scheduler/#/draganddrop).
  
  #### onSetAddMoreState
  ```js
  onSetAddMoreState: PropTypes.func
  onSetAddMoreState(newState)
  ```
  Callback function fired when a '+N more' is clicked, is used to control the visibility and the position of the `AddMorePopover`.
  `newState` is a json such as {headerItem: headerItem, left: 20, top: 20, height: 100}. Refer 
  to [this example](https://stephenchou1017.github.io/scheduler/#/addmore).
  
  #### subtitleGetter
  ```js
  subtitleGetter: PropTypes.func
  subtitleGetter(schedulerData, event)
  ```
  Use this function, you can display a subtitle in the `EventItemPopover`. 
  
  #### viewEventClick
  ```js
  viewEventClick: PropTypes.func
  viewEventClick(schedulerData, event)
  ```
  Callback function fired when you click one operation link in the `EventItemPopover`. The operation link won't appear if this
  function isn't set.
  
  #### viewEventText
  ```js
  viewEventText: PropTypes.string
  ```
  Text of one operation link in the `EventItemPopover`. The operation link won't appear if this text isn't set.
  
  #### viewEvent2Click
  ```js
  viewEvent2Click: PropTypes.func
  viewEvent2Click(schedulerData, event)
  ```
  Callback function fired when you click the other operation link in the `EventItemPopover`. The other operation link won't 
  appear if this function isn't set.
  
  #### viewEvent2Text
  ```js
  viewEvent2Text: PropTypes.string
  ```
  Text of the other operation link in the `EventItemPopover`. The other operation link won't appear if this text isn't set.
  
  
  
