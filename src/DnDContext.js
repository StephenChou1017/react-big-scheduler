import { DropTarget } from 'react-dnd'
import {getPos} from './Util'
import {DnDTypes} from './DnDTypes'
import {CellUnits, DATETIME_FORMAT} from './index'

export default class DnDContext {
    constructor(sources, DecoratedComponent) {
        this.sourceMap = new Map();
        sources.forEach((item) => {
            this.sourceMap.set(item.dndType, item);
        })
        this.DecoratedComponent = DecoratedComponent;
    }

    getDropSpec = () => {
        return {
            drop: (props, monitor, component) =>{
                const {schedulerData, resourceEvents} = props;
                const {cellUnit, localeMoment} = schedulerData;
                const type = monitor.getItemType();
                const pos = getPos(component.eventContainer);
                let cellWidth = schedulerData.getContentCellWidth();
                let initialStartTime = null, initialEndTime = null;
                if(type === DnDTypes.EVENT) {
                    const initialPoint = monitor.getInitialClientOffset();
                    let initialLeftIndex = Math.floor((initialPoint.x - pos.x)/cellWidth);
                    initialStartTime = resourceEvents.headerItems[initialLeftIndex].start;
                    initialEndTime = resourceEvents.headerItems[initialLeftIndex].end;
                    if(cellUnit !== CellUnits.Hour)
                        initialEndTime = localeMoment(resourceEvents.headerItems[initialLeftIndex].start).hour(23).minute(59).second(59).format(DATETIME_FORMAT);
                }
                const point = monitor.getClientOffset();                
                let leftIndex = Math.floor((point.x - pos.x)/cellWidth);
                let startTime = resourceEvents.headerItems[leftIndex].start;
                let endTime = resourceEvents.headerItems[leftIndex].end;
                if(cellUnit !== CellUnits.Hour)
                    endTime = localeMoment(resourceEvents.headerItems[leftIndex].start).hour(23).minute(59).second(59).format(DATETIME_FORMAT);

                return {
                    slotId: resourceEvents.slotId,
                    slotName: resourceEvents.slotName,
                    start: startTime,
                    end: endTime,
                    initialStart: initialStartTime,
                    initialEnd: initialEndTime
                };
            },

            hover: (props, monitor, component) => {
                const {schedulerData, resourceEvents, movingEvent} = props;
                const {cellUnit, config, viewType, localeMoment} = schedulerData;
                const item = monitor.getItem();
                const type = monitor.getItemType();
                const pos = getPos(component.eventContainer);
                let cellWidth = schedulerData.getContentCellWidth();
                let initialStart = null, initialEnd = null;
                if(type === DnDTypes.EVENT) {
                    const initialPoint = monitor.getInitialClientOffset();
                    let initialLeftIndex = Math.floor((initialPoint.x - pos.x)/cellWidth);
                    initialStart = resourceEvents.headerItems[initialLeftIndex].start;
                    initialEnd = resourceEvents.headerItems[initialLeftIndex].end;
                    if(cellUnit !== CellUnits.Hour)
                        initialEnd = localeMoment(resourceEvents.headerItems[initialLeftIndex].start).hour(23).minute(59).second(59).format(DATETIME_FORMAT);
                }
                const point = monitor.getClientOffset();                
                let leftIndex = Math.floor((point.x - pos.x)/cellWidth);
                let newStart = resourceEvents.headerItems[leftIndex].start;
                let newEnd = resourceEvents.headerItems[leftIndex].end;
                if(cellUnit !== CellUnits.Hour)
                    newEnd = localeMoment(resourceEvents.headerItems[leftIndex].start).hour(23).minute(59).second(59).format(DATETIME_FORMAT);
                let slotId = resourceEvents.slotId, slotName = resourceEvents.slotName;
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

                if(!!movingEvent) {
                    movingEvent(schedulerData, slotId, slotName, newStart, newEnd, action, type, item);
                }
            },

            canDrop: (props, monitor) => {
                const {schedulerData} = props;
                const item = monitor.getItem();
                if(schedulerData._isResizing()) return false;
                const {config} = schedulerData;
                return config.movable && (item.movable == undefined || item.movable !== false);
            }
        }
    }

    getDropCollect = (connect, monitor) => {
        return {
            connectDropTarget: connect.dropTarget(),
            isOver: monitor.isOver()
        };
    }

    getDropTarget = () => {
        return DropTarget([...this.sourceMap.keys()], this.getDropSpec(), this.getDropCollect)(this.DecoratedComponent);
    }

    getDndSource = (dndType = DnDTypes.EVENT) => {
        return this.sourceMap.get(dndType);
    }
}