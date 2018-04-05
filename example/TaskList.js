import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

class TaskList extends Component{
    constructor(props){
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        newEvent: PropTypes.func.isRequired,
        taskDndSource: PropTypes.object.isRequired,
    }

    render(){
        const {schedulerData, newEvent, taskDndSource} = this.props;
        let DnDTaskItem = taskDndSource.getDragSource();
        let tasks = schedulerData.eventGroups;
        let taskList = tasks.map((item) => {
            return <DnDTaskItem key={item.id} task={item} newEvent={newEvent} schedulerData={schedulerData} />
        });

        return (
            <ul>
                {taskList}
            </ul>
        )
    }
}

export default TaskList
