import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import Popover from 'antd/lib/popover'
import 'antd/lib/popover/style/index.css'
import EventItemPopover from './EventItemPopover'
import {CellUnits, DATETIME_FORMAT} from './index'
import {DnDTypes} from './DnDTypes'
const supportTouch = 'ontouchstart' in window;

class EventItem extends Component {
    constructor(props) {
        super(props);

        const {left, top, width} = props;
        this.state = {
            left: left,
            top: top,
            width: width,
        };
        this.startResizer = null;
        this.endResizer = null;
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        eventItem: PropTypes.object.isRequired,
        isStart: PropTypes.bool.isRequired,
        isEnd: PropTypes.bool.isRequired,
        left: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
        isInPopover: PropTypes.bool.isRequired,
        leftIndex: PropTypes.number.isRequired,
        rightIndex: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        connectDragPreview: PropTypes.func.isRequired,
        updateEventStart: PropTypes.func,
        updateEventEnd: PropTypes.func,
        moveEvent: PropTypes.func,
        subtitleGetter: PropTypes.func,
        eventItemClick: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText: PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
        conflictOccurred: PropTypes.func,
        eventItemTemplateResolver: PropTypes.func,
    }

    componentWillReceiveProps(np) {
        const {left, top, width} = np;
        this.setState({
            left: left,
            top: top,
            width: width,
        });

        this.subscribeResizeEvent(np);
    }

    componentDidMount() {
        this.subscribeResizeEvent(this.props);
    }

    initStartDrag = (ev) => {
        const {schedulerData} = this.props;
        if(schedulerData._isResizing()) return;

        ev.stopPropagation();
        let clientX = 0;
        if(supportTouch) {
            if(ev.changedTouches.length == 0) return;
            const touch = ev.changedTouches[0];
            clientX = touch.pageX;
        } else {
            if (ev.buttons !== undefined && ev.buttons !== 1) return;
            clientX = ev.clientX;
        }
        this.setState({
            startX: clientX
        });
        schedulerData._startResizing();
        if(supportTouch) {
            this.startResizer.addEventListener('touchmove', this.doStartDrag, false);
            this.startResizer.addEventListener('touchend', this.stopStartDrag, false);
            this.startResizer.addEventListener('touchcancel', this.cancelStartDrag, false);
        } else {
            document.documentElement.addEventListener('mousemove', this.doStartDrag, false);
            document.documentElement.addEventListener('mouseup', this.stopStartDrag, false);
        }
        document.onselectstart = function () {
			return false;
		};
		document.ondragstart = function () {
			return false;
		};
    }

    doStartDrag = (ev) => {
        ev.stopPropagation();

        let clientX = 0;
        if(supportTouch) {
            if(ev.changedTouches.length == 0) return;
            const touch = ev.changedTouches[0];
            clientX = touch.pageX;
        } else {
            clientX = ev.clientX;
        }
        const {left, width, leftIndex, rightIndex, schedulerData} = this.props;
        let cellWidth = schedulerData.getContentCellWidth();
        let offset = leftIndex > 0 ? 5 : 6;
        let minWidth = cellWidth - offset;
        let maxWidth = rightIndex * cellWidth - offset;
        const {startX} = this.state;
        let newLeft = left + clientX - startX;
        let newWidth = width + startX - clientX;
        if (newWidth < minWidth) {
            newWidth = minWidth;
            newLeft = (rightIndex - 1) * cellWidth + (rightIndex - 1 > 0 ? 2 : 3);
        }
        else if (newWidth > maxWidth) {
            newWidth = maxWidth;
            newLeft = 3;
        }

        this.setState({left: newLeft, width: newWidth});
    }

    stopStartDrag = (ev) => {
        ev.stopPropagation();
        if(supportTouch) {
            this.startResizer.removeEventListener('touchmove', this.doStartDrag, false);
            this.startResizer.removeEventListener('touchend', this.stopStartDrag, false);
            this.startResizer.removeEventListener('touchcancel', this.cancelStartDrag, false);
        } else {
            document.documentElement.removeEventListener('mousemove', this.doStartDrag, false);
            document.documentElement.removeEventListener('mouseup', this.stopStartDrag, false);
        }
        document.onselectstart = null;
        document.ondragstart = null;
        const {width, left, top, leftIndex, rightIndex, schedulerData, eventItem, updateEventStart, conflictOccurred} = this.props;
        schedulerData._stopResizing();
        if(this.state.width === width) return;

        let clientX = 0;
        if(supportTouch) {
            if(ev.changedTouches.length == 0) {
                this.setState({
                    left: left,
                    top: top,
                    width: width,
                });
                return;
            }
            const touch = ev.changedTouches[0];
            clientX = touch.pageX;
        } else {
            clientX = ev.clientX;
        }
        const {cellUnit, events, config, localeMoment} = schedulerData;
        let cellWidth = schedulerData.getContentCellWidth();
        let offset = leftIndex > 0 ? 5 : 6;
        let minWidth = cellWidth - offset;
        let maxWidth = rightIndex * cellWidth - offset;
        const {startX} = this.state;
        let newWidth = width + startX - clientX;
        let deltaX = clientX - startX;
        let sign = deltaX < 0 ? -1 : (deltaX === 0 ? 0 : 1);
        let count = (sign > 0 ? Math.floor(Math.abs(deltaX) / cellWidth) : Math.ceil(Math.abs(deltaX) / cellWidth)) * sign;
        if (newWidth < minWidth)
            count = rightIndex - leftIndex - 1;
        else if (newWidth > maxWidth)
            count = -leftIndex;
        let newStart = localeMoment(eventItem.start).add(cellUnit === CellUnits.Hour ? count * config.minuteStep : count, cellUnit === CellUnits.Hour ? 'minutes' : 'days').format(DATETIME_FORMAT);
        if(count !== 0 && cellUnit !== CellUnits.Hour && config.displayWeekend === false) {
            if(count > 0) {
                let tempCount = 0, i = 0;
                while (true) {
                    i++;
                    let tempStart = localeMoment(eventItem.start).add(i, 'days');
                    let dayOfWeek = tempStart.weekday();
                    if(dayOfWeek !== 0 && dayOfWeek !== 6) {
                        tempCount ++;
                        if(tempCount === count) {
                            newStart = tempStart.format(DATETIME_FORMAT);
                            break;
                        }
                    }

                }
            } else {
                let tempCount = 0, i = 0;
                while (true) {
                    i--;
                    let tempStart = localeMoment(eventItem.start).add(i, 'days');
                    let dayOfWeek = tempStart.weekday();
                    if(dayOfWeek !== 0 && dayOfWeek !== 6) {
                        tempCount --;
                        if(tempCount === count) {
                            newStart = tempStart.format(DATETIME_FORMAT);
                            break;
                        }
                    }
                }
            }
        }

        let hasConflict = false;
        let slotId = schedulerData._getEventSlotId(eventItem);
        let slotName = undefined;
        let slot = schedulerData.getSlotById(slotId);
        if(!!slot)
            slotName = slot.name;
        if (config.checkConflict) {
            let start = localeMoment(newStart),
                end = localeMoment(eventItem.end);

            events.forEach((e) => {
                if (schedulerData._getEventSlotId(e) === slotId && e.id !== eventItem.id) {
                    let eStart = localeMoment(e.start),
                        eEnd = localeMoment(e.end);
                    if ((start >= eStart && start < eEnd) || (end > eStart && end <= eEnd) || (eStart >= start && eStart < end) || (eEnd > start && eEnd <= end))
                        hasConflict = true;
                }
            });
        }

        if (hasConflict) {
            this.setState({
                left: left,
                top: top,
                width: width,
            });

            if (conflictOccurred != undefined) {
                conflictOccurred(schedulerData, 'StartResize', eventItem, DnDTypes.EVENT, slotId, slotName, newStart, eventItem.end);
            }
            else {
                console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
            }
            this.subscribeResizeEvent(this.props);
        }
        else {
            if (updateEventStart != undefined)
                updateEventStart(schedulerData, eventItem, newStart);
        }
    }

    cancelStartDrag = (ev) => {
        ev.stopPropagation();

        this.startResizer.removeEventListener('touchmove', this.doStartDrag, false);
        this.startResizer.removeEventListener('touchend', this.stopStartDrag, false);
        this.startResizer.removeEventListener('touchcancel', this.cancelStartDrag, false);
        document.onselectstart = null;
        document.ondragstart = null;
        const {schedulerData, left, top, width} = this.props;
        schedulerData._stopResizing();
        this.setState({
            left: left,
            top: top,
            width: width,
        });
    }

    initEndDrag = (ev) => {
        const {schedulerData} = this.props;
        if(schedulerData._isResizing()) return;

        ev.stopPropagation();
        let clientX = 0;
        if(supportTouch) {
            if(ev.changedTouches.length == 0) return;
            const touch = ev.changedTouches[0];
            clientX = touch.pageX;
        } else {
            if (ev.buttons !== undefined && ev.buttons !== 1) return;
            clientX = ev.clientX;
        }
        this.setState({
            endX: clientX
        });

        schedulerData._startResizing();
        if(supportTouch) {
            this.endResizer.addEventListener('touchmove', this.doEndDrag, false);
            this.endResizer.addEventListener('touchend', this.stopEndDrag, false);
            this.endResizer.addEventListener('touchcancel', this.cancelEndDrag, false);
        } else {
            document.documentElement.addEventListener('mousemove', this.doEndDrag, false);
            document.documentElement.addEventListener('mouseup', this.stopEndDrag, false);
        }
        document.onselectstart = function () {
			return false;
		};
		document.ondragstart = function () {
			return false;
		};
    }

    doEndDrag = (ev) => {
        ev.stopPropagation();
        let clientX = 0;
        if(supportTouch) {
            if(ev.changedTouches.length == 0) return;
            const touch = ev.changedTouches[0];
            clientX = touch.pageX;
        } else {
            clientX = ev.clientX;
        }
        const {width, leftIndex, schedulerData} = this.props;
        const {headers} = schedulerData;
        let cellWidth = schedulerData.getContentCellWidth();
        let offset = leftIndex > 0 ? 5 : 6;
        let minWidth = cellWidth - offset;
        let maxWidth = (headers.length - leftIndex) * cellWidth - offset;
        const {endX} = this.state;

        let newWidth = (width + clientX - endX);
        if (newWidth < minWidth)
            newWidth = minWidth;
        else if (newWidth > maxWidth)
            newWidth = maxWidth;

        this.setState({width: newWidth});
    }

    stopEndDrag = (ev) => {
        ev.stopPropagation();

        if(supportTouch) {
            this.endResizer.removeEventListener('touchmove', this.doEndDrag, false);
            this.endResizer.removeEventListener('touchend', this.stopEndDrag, false);
            this.endResizer.removeEventListener('touchcancel', this.cancelEndDrag, false);
        } else {
            document.documentElement.removeEventListener('mousemove', this.doEndDrag, false);
            document.documentElement.removeEventListener('mouseup', this.stopEndDrag, false);
        }
        document.onselectstart = null;
        document.ondragstart = null;
        const {width, left, top, leftIndex, rightIndex, schedulerData, eventItem, updateEventEnd, conflictOccurred} = this.props;
        schedulerData._stopResizing();
        if(this.state.width === width) return;

        let clientX = 0;
        if(supportTouch) {
            if(ev.changedTouches.length == 0) {
                this.setState({
                    left: left,
                    top: top,
                    width: width,
                });
                return;
            }
            const touch = ev.changedTouches[0];
            clientX = touch.pageX;
        } else {
            clientX = ev.clientX;
        }
        const {headers, cellUnit, events, config, localeMoment} = schedulerData;
        let cellWidth = schedulerData.getContentCellWidth();
        let offset = leftIndex > 0 ? 5 : 6;
        let minWidth = cellWidth - offset;
        let maxWidth = (headers.length - leftIndex) * cellWidth - offset;
        const {endX} = this.state;

        let newWidth = (width + clientX - endX);
        let deltaX = newWidth - width;
        let sign = deltaX < 0 ? -1 : (deltaX === 0 ? 0 : 1);
        let count = (sign < 0 ? Math.floor(Math.abs(deltaX) / cellWidth) : Math.ceil(Math.abs(deltaX) / cellWidth)) * sign;
        if (newWidth < minWidth)
            count = leftIndex - rightIndex + 1;
        else if (newWidth > maxWidth)
            count = headers.length - rightIndex;
        let newEnd = localeMoment(eventItem.end).add(cellUnit === CellUnits.Hour ? count * config.minuteStep : count, cellUnit === CellUnits.Hour ? 'minutes' : 'days').format(DATETIME_FORMAT);
        if(count !== 0 && cellUnit !== CellUnits.Hour && config.displayWeekend === false) {
            if(count > 0) {
                let tempCount = 0, i = 0;
                while (true) {
                    i++;
                    let tempEnd = localeMoment(eventItem.end).add(i, 'days');
                    let dayOfWeek = tempEnd.weekday();
                    if(dayOfWeek !== 0 && dayOfWeek !== 6) {
                        tempCount ++;
                        if(tempCount === count) {
                            newEnd = tempEnd.format(DATETIME_FORMAT);
                            break;
                        }
                    }

                }
            } else {
                let tempCount = 0, i = 0;
                while (true) {
                    i--;
                    let tempEnd = localeMoment(eventItem.end).add(i, 'days');
                    let dayOfWeek = tempEnd.weekday();
                    if(dayOfWeek !== 0 && dayOfWeek !== 6) {
                        tempCount --;
                        if(tempCount === count) {
                            newEnd = tempEnd.format(DATETIME_FORMAT);
                            break;
                        }
                    }
                }
            }
        }

        let hasConflict = false;
        let slotId = schedulerData._getEventSlotId(eventItem);
        let slotName = undefined;
        let slot = schedulerData.getSlotById(slotId);
        if(!!slot)
            slotName = slot.name;
        if (config.checkConflict) {
            let start = localeMoment(eventItem.start),
                end = localeMoment(newEnd);

            events.forEach((e) => {
                if (schedulerData._getEventSlotId(e) === slotId && e.id !== eventItem.id) {
                    let eStart = localeMoment(e.start),
                        eEnd = localeMoment(e.end);
                    if ((start >= eStart && start < eEnd) || (end > eStart && end <= eEnd) || (eStart >= start && eStart < end) || (eEnd > start && eEnd <= end))
                        hasConflict = true;
                }
            });
        }

        if (hasConflict) {
            this.setState({
                left: left,
                top: top,
                width: width,
            });

            if (conflictOccurred != undefined) {
                conflictOccurred(schedulerData, 'EndResize', eventItem, DnDTypes.EVENT, slotId, slotName, eventItem.start, newEnd);
            }
            else {
                console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
            }
            this.subscribeResizeEvent(this.props);
        }
        else {
            if (updateEventEnd != undefined)
                updateEventEnd(schedulerData, eventItem, newEnd);
        }
    }

    cancelEndDrag = (ev) => {
        ev.stopPropagation();

        this.endResizer.removeEventListener('touchmove', this.doEndDrag, false);
        this.endResizer.removeEventListener('touchend', this.stopEndDrag, false);
        this.endResizer.removeEventListener('touchcancel', this.cancelEndDrag, false);
        document.onselectstart = null;
        document.ondragstart = null;
        const {schedulerData, left, top, width} = this.props;
        schedulerData._stopResizing();
        this.setState({
            left: left,
            top: top,
            width: width,
        });
    }

    render() {
        const {eventItem, isStart, isEnd, isInPopover, eventItemClick, schedulerData, isDragging, connectDragSource, connectDragPreview, eventItemTemplateResolver} = this.props;
        const {config, localeMoment} = schedulerData;
        const {left, width, top} = this.state;
        let roundCls = isStart ? (isEnd ? 'round-all' : 'round-head') : (isEnd ? 'round-tail' : 'round-none');
        let bgColor = config.defaultEventBgColor;
        if (!!eventItem.bgColor)
            bgColor = eventItem.bgColor;

        let titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, eventItem);
        let content = (
            <EventItemPopover
                {...this.props}
                eventItem={eventItem}
                title={eventItem.title}
                startTime={eventItem.start}
                endTime={eventItem.end}
                statusColor={bgColor}/>
        );

        let start = localeMoment(eventItem.start);
        let eventTitle = isInPopover ? `${start.format('HH:mm')} ${titleText}` : titleText;
        let startResizeDiv = <div />;
        if (this.startResizable(this.props))
            startResizeDiv = <div className="event-resizer event-start-resizer" ref={(ref) => this.startResizer = ref}></div>;
        let endResizeDiv = <div />;
        if (this.endResizable(this.props))
            endResizeDiv = <div className="event-resizer event-end-resizer" ref={(ref) => this.endResizer = ref}></div>;

        let eventItemTemplate = (
            <div className={roundCls + ' event-item'} key={eventItem.id}
                 style={{height: config.eventItemHeight, backgroundColor: bgColor}}>
                <span style={{marginLeft: '10px', lineHeight: `${config.eventItemHeight}px` }}>{eventTitle}</span>
            </div>
        );
        if(eventItemTemplateResolver != undefined)
            eventItemTemplate = eventItemTemplateResolver(schedulerData, eventItem, bgColor, isStart, isEnd, 'event-item', config.eventItemHeight, undefined);

        let a = <a className="timeline-event" style={{left: left, width: width, top: top}} onClick={() => { if(!!eventItemClick) eventItemClick(schedulerData, eventItem);}}>
            {eventItemTemplate}
            {startResizeDiv}
            {endResizeDiv}
        </a>;

        return (
            isDragging ? null : ( schedulerData._isResizing() || config.eventItemPopoverEnabled == false || eventItem.showPopover == false ?
                    <div>
                        {
                            connectDragPreview(
                                connectDragSource(a)
                            )
                        }
                    </div> :
                    <Popover placement="bottomLeft" content={content} trigger="hover">
                        {
                            connectDragPreview(
                                connectDragSource(a)
                            )
                        }
                    </Popover>
            )
        );
    }

    startResizable = (props) => {
        const {eventItem, isInPopover, schedulerData} = props;
        const {config} = schedulerData;
        return config.startResizable === true && isInPopover === false
            && (eventItem.resizable == undefined || eventItem.resizable !== false)
            && (eventItem.startResizable == undefined || eventItem.startResizable !== false);
    }

    endResizable = (props) => {
        const {eventItem, isInPopover, schedulerData} = props;
        const {config} = schedulerData;
        return config.endResizable === true && isInPopover === false
            && (eventItem.resizable == undefined || eventItem.resizable !== false)
            && (eventItem.endResizable == undefined || eventItem.endResizable !== false);
    }

    subscribeResizeEvent = (props) => {
        if (this.startResizer != undefined) {
            if(supportTouch) {
                // this.startResizer.removeEventListener('touchstart', this.initStartDrag, false);
                // if (this.startResizable(props))
                //     this.startResizer.addEventListener('touchstart', this.initStartDrag, false);
            } else {
                this.startResizer.removeEventListener('mousedown', this.initStartDrag, false);
                if (this.startResizable(props))
                    this.startResizer.addEventListener('mousedown', this.initStartDrag, false);
            }
        }
        if (this.endResizer != undefined) {
            if(supportTouch) {
                // this.endResizer.removeEventListener('touchstart', this.initEndDrag, false);
                // if (this.endResizable(props))
                //     this.endResizer.addEventListener('touchstart', this.initEndDrag, false);
            } else {
                this.endResizer.removeEventListener('mousedown', this.initEndDrag, false);
                if (this.endResizable(props))
                    this.endResizer.addEventListener('mousedown', this.initEndDrag, false);
            }
        }
    }
}

export default EventItem