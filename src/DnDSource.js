import { DragSource } from 'react-dnd'
import {ViewTypes, DATETIME_FORMAT} from './index'
import {DnDTypes} from './DnDTypes'

export default class DnDSource {
    constructor(resolveDragObjFunc, DecoratedComponent, dndType = DnDTypes.EVENT) {
        this.resolveDragObjFunc = resolveDragObjFunc;
        this.DecoratedComponent = DecoratedComponent;
        this.dndType = dndType;
        this.dragSource = DragSource(this.dndType, this.getDragSpec(), this.getDragCollect)(this.DecoratedComponent);
    }

    getDragSpec = () => {
        return {
            beginDrag: (props, monitor, component) => {
                return this.resolveDragObjFunc(props);
            },
            endDrag: (props, monitor, component) => {
                if(!monitor.didDrop()) return;

                const {moveEvent, newEvent, schedulerData } = props;
                const {events, config, viewType, localeMoment} = schedulerData;
                const item = monitor.getItem();
                const type = monitor.getItemType();
                const dropResult = monitor.getDropResult();
                let slotId = dropResult.slotId, slotName = dropResult.slotName;
                let newStart = dropResult.start, newEnd = dropResult.end;
                let initialStart = dropResult.initialStart, initialEnd = dropResult.initialEnd;
                let action = 'New';

                let isEvent = type === DnDTypes.EVENT;
                if(isEvent) {
                    const event = item;
                    if(config.relativeMove) {
                        newStart = localeMoment(event.start).add(localeMoment(newStart).diff(localeMoment(initialStart)), 'ms').format(DATETIME_FORMAT);
                    } else {
                        if(viewType !== ViewTypes.Day) {
                            let tmpMoment = localeMoment(newStart);
                            newStart = localeMoment(event.start).year(tmpMoment.year()).month(tmpMoment.month()).date(tmpMoment.date()).format(DATETIME_FORMAT);
                        }
                    }
                    newEnd = localeMoment(newStart).add(localeMoment(event.end).diff(localeMoment(event.start)), 'ms').format(DATETIME_FORMAT);

                    //if crossResourceMove disabled, slot returns old value
                    if(config.crossResourceMove === false) {
                        slotId = schedulerData._getEventSlotId(item);
                        slotName = undefined;
                        let slot = schedulerData.getSlotById(slotId);
                        if(!!slot)
                            slotName = slot.name;
                    }

                    action = 'Move';
                }

                let hasConflict = false;
                if(config.checkConflict) {
                    let start = localeMoment(newStart),
                        end = localeMoment(newEnd);

                    events.forEach((e) =>{
                        if(schedulerData._getEventSlotId(e) === slotId && (!isEvent || e.id !== item.id)) {
                            let eStart = localeMoment(e.start),
                                eEnd = localeMoment(e.end);
                            if((start >= eStart && start < eEnd) || (end > eStart && end <= eEnd) || (eStart >= start && eStart < end) || (eEnd > start && eEnd <= end))
                                hasConflict = true;
                        }
                    });
                }

                if(hasConflict) {
                    const {conflictOccurred} = props;
                    if(conflictOccurred != undefined){
                        conflictOccurred(schedulerData, action, item, type, slotId, slotName, newStart, newEnd);
                    }
                    else {
                        console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
                    }
                }
                else {
                    if(isEvent) {
                        if (moveEvent !== undefined) {
                            moveEvent(schedulerData, item, slotId, slotName, newStart, newEnd);
                        }
                    }
                    else {
                        if(newEvent !== undefined)
                            newEvent(schedulerData, slotId, slotName, newStart, newEnd, type, item);
                    }
                }
            },

            canDrag: (props) => {
                const {schedulerData} = props;
                const item = this.resolveDragObjFunc(props);
                if(schedulerData._isResizing()) return false;
                const {config} = schedulerData;
                return config.movable && (item.movable == undefined || item.movable !== false);
            }
        }
    }

    getDragCollect = (connect, monitor) => {
        return {
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
            connectDragPreview: connect.dragPreview()
        };
    }

    getDragSource = () => {
        return this.dragSource;
    }
}
