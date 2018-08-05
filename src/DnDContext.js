import { DropTarget } from 'react-dnd'
import {getPos} from './Util'
import {DnDTypes} from './DnDTypes'
import {ViewTypes, DATETIME_FORMAT} from './index'

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
                const {viewType, localeMoment} = schedulerData;
                const type = monitor.getItemType();
                const pos = getPos(component.eventContainer);
                let cellWidth = schedulerData.getContentCellWidth();
                let initialStartTime = null, initialEndTime = null;
                if(type === DnDTypes.EVENT) {
                    const initialPoint = monitor.getInitialClientOffset();
                    let initialLeftIndex = Math.floor((initialPoint.x - pos.x)/cellWidth);
                    initialStartTime = resourceEvents.headerItems[initialLeftIndex].start;
                    initialEndTime = resourceEvents.headerItems[initialLeftIndex].end;
                    if(viewType !== ViewTypes.Day)
                        initialEndTime = localeMoment(resourceEvents.headerItems[initialLeftIndex].start).hour(23).minute(59).second(59).format(DATETIME_FORMAT);
                }
                const point = monitor.getClientOffset();                
                let leftIndex = Math.floor((point.x - pos.x)/cellWidth);
                let startTime = resourceEvents.headerItems[leftIndex].start;
                let endTime = resourceEvents.headerItems[leftIndex].end;
                if(viewType !== ViewTypes.Day)
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