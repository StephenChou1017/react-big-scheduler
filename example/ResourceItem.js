import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

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
        let dragContent = <li style={{color: 'red', fontWeight: 'bold', fontSize: '20px', listStyle: 'none'}}>{resource.name}</li>;

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
