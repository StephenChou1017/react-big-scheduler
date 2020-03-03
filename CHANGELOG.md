## Coming npm version

### Some day
* An add-more data bug

## npm v0.2.7

### 2019-05-04
* Add inner resources
* Update dependencies version
* Optimize the SchedulerData._createRenderData function

## npm v0.2.6

### 2019-02-17
* Fix the dayStartFrom and dayStopTo bug in custom view type([Report by ZomerVinicius](https://github.com/StephenChou1017/react-big-scheduler/issues/73))

### 2019-02-14
* Responsive layout support, by setting SchedulerData.config.schedulerWidth to a percentage instead of a number
* Add SchedulerData.isSchedulerResponsive, SchedulerData.isResourceViewResponsive, SchedulerData.isContentViewResponsive, SchedulerData.getSchedulerWidth, SchedulerData.getResourceTableConfigWidth, SchedulerData.getContentCellConfigWidth func
* Add SchedulerData.config.besidesWidth property

### 2019-01-23
* Add SchedulerData.removeEvent, SchedulerData.removeEventById func

### 2019-01-08
* Add Scheduler.eventItemPopoverTemplateResolver func to customize the event popover style([MikeDev96](https://github.com/MikeDev96))

### 2018-12-03
* Check showPopover property on event level to disable popover
* Update Scheduler.conflictOccurred

## npm v0.2.5

### 2018-11-29
* Upgrade antd from 3.2.3 to 3.9.0

## npm v0.2.4

### 2018-11-23
* Upgrade react-dnd from 2.6.0 to 5.0.0, upgrade react-dnd-html5-backend from 2.6.0 to 5.0.1
* Upgrade webpack-cli from 2.0.14 to 3.1.1
* Upgrade dependencies to avoid potential security vulnerabilities: mime, hoek, cryptiles, macaddress, url-parse, randomatic, deep-extend, lodash

### 2018-11-13
* Add SchedulerData.behaviors.getNonAgendaViewBodyCellBgColorFunc
* Add SchedulerData.behaviors.getScrollSpecialMomentFunc
* Rename SchedulerData.config.scrollToTodayEnabled to SchedulerData.config.scrollToSpecialMomentEnabled
* Rename SchedulerData.setScrollToToday to SchedulerData.setScrollToSpecialMoment
* Rename SchedulerData.getScrollToToday to SchedulerData.getScrollToSpecialMoment

## npm v0.2.3(beta)

### 2018-11-09
* Fix leaking antd global CSS rules

## npm v0.2.2

### 2018-10-24
* Resource view scrollable

### 2018-10-19
* Add SchedulerData.config.relativeMove

### 2018-10-02
* Add Custom, Custom1, Custom2 view types in [ViewTypes.js](https://github.com/StephenChou1017/react-big-scheduler/blob/master/src/ViewTypes.js) to support custom time window(most 3 custom view types in the same scheduler)
* Add [Custom time window example](https://stephenchou1017.github.io/scheduler/#/customtimewindow)
* Add [Infinite scroll 2 example](https://stephenchou1017.github.io/scheduler/#/infinitescroll2)

### 2018-09-28
* Add onScrollLeft, onScrollRight, onScrollTop and onScrollBottom of Scheduler([Feature request by wojcechgk](https://github.com/StephenChou1017/react-big-scheduler/issues/42))
* Add [Infinite scroll example](https://stephenchou1017.github.io/scheduler/#/infinitescroll)

### 2018-09-18
* Add SchedulerData.config.displayWeekend([Feature request by Subwater](https://github.com/StephenChou1017/react-big-scheduler/issues/21))
* Add [Hide weekends example](https://stephenchou1017.github.io/scheduler/#/hideweekends)

### 2018-09-13
* Support for rruleset => exrule,exdate([mongrelx](https://github.com/mongrelx))

## npm v0.2.1

### 2018-08-10
* Add SchedulerData.config.nonAgendaSlotMinHeight

### 2018-08-06
* Optimize moving events behavior

### 2018-07-22
* Add SchedulerData.config.headerEnabled

### 2018-07-09
* Add SchedulerData.config.recurringEventsEnabled
* Support recurring events([Feature request by tgBryanBailes](https://github.com/StephenChou1017/react-big-scheduler/issues/8))

### 2018-06-18
* Change Scheduler table line color from '#cccccc' to '#e9e9e9'
* Update the [Online demo](https://stephenchou1017.github.io/scheduler/#/)

### 2018-06-09
* Add SchedulerData.config.calendarPopoverEnabled([DadUndead](https://github.com/DadUndead))
* Add Scheduler.nonAgendaCellHeaderTemplateResolver func to customize the table header cell style([DadUndead](https://github.com/DadUndead))

### 2018-05-07
* Add SchedulerData.config.minuteStep for daily view([henryroach](https://github.com/henryroach))

## npm v0.2.0

### 2018-04-11
* Migration to react 16([henryroach](https://github.com/henryroach))
* Rename Scheduler.resourceClickedFunc to Scheduler.slotClickedFunc 
* Add Scheduler.slotItemTemplateResolver func to customize slot item style

### 2018-04-03
* ViewTypes.Quarter

### 2018-03-26
* Custom event style in agenda view
* Add SchedulerData.config.eventItemPopoverEnabled

### 2018-03-15
* Locale support

### 2018-02-07
* Rename Scheduler.customHeader to Scheduler.leftCustomHeader 
* Add Scheduler.rightCustomHeader
* Add SchedulerData.config.resourceName, SchedulerData.config.taskName

## npm v0.1.0

### 2017-12-20

* Initial commit