import React, {Component, PropTypes} from 'react'

class ResourceItem extends Component
{
    constructor(props){
        super(props);
    }

    static propTypes = {
        resource: PropTypes.object.isRequired,
    }

    render(){
        const {resource, isDragging, connectDragSource, connectDragPreview} = this.props;
        let dragContent = <li style={{color: 'red', fontWeight: 'bold', fontSize: '20px'}}>{resource.name}</li>;

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

export default ResourceItem
