import React, {Component, PropTypes} from 'react'

class TaskItem extends Component
{
    constructor(props){
        super(props);
    }

    static propTypes = {
        task: PropTypes.object.isRequired,
    }

    render(){
        const {task, isDragging, connectDragSource, connectDragPreview} = this.props;
        let dragContent = <li style={{color: 'red', fontWeight: 'bold', fontSize: '20px'}}>{task.name}</li>;

        return (
            isDragging ? null : (
                <div>
                    {
                        connectDragPreview(
                            connectDragSource(dragContent)
                        )
                    }
                </div>
            )
        )
    }
}

export default TaskItem
