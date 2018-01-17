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

SchedulerData is the view model of Scheduler, we can modify it to control the view of the Scheduler. Below is the
 constructor function of SchedulerData: 
 ```
 constructor(date=moment().format(DATE_FORMAT), viewType = ViewTypes.Week,
                 showAgenda = false, isEventPerspective = false,
                 newConfig = undefined, newBehaviors=undefined) {
                 ...
     }
 ```
 `date` is a string in `YYYY-MM-DD` format, and is the initial date that Scheduler will render. Take the date `2017-12-20`
 for example, Scheduler will render the time window of the week from `2017-12-18` to `2017-12-24` in `ViewTypes.Week`
 view type, and will render the time window of the `2017-12` month in `ViewTypes.Month` view type. 