import React, {Component, PropTypes} from 'react'

class ResourceList extends Component{
    constructor(props){
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        newEvent: PropTypes.func.isRequired,
        resourceDndSource: React.PropTypes.object.isRequired,
    }

    render(){
        const {schedulerData, newEvent, resourceDndSource} = this.props;
        let DnDResourceItem = resourceDndSource.getDragSource();
        let resources = schedulerData.resources;
        let resourceList = resources.map((item) => {
            return <DnDResourceItem key={item.id} resource={item} newEvent={newEvent} schedulerData={schedulerData} />
        });

        return (
            <ul>
                {resourceList}
            </ul>
        )
    }
}

export default ResourceList
