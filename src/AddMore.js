import React, {Component} from 'react'
import {PropTypes} from 'prop-types' 

class AddMore extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        number: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
        clickAction: PropTypes.func.isRequired,
        headerItem: PropTypes.object.isRequired,
    }

    render() {
        const {number, left, width, top, clickAction, headerItem, schedulerData} = this.props;
        const {config} = schedulerData;
        let content = '+'+number+'more';

        return (
        <a className="timeline-event" style={{left: left, width: width, top: top}} onClick={() => {clickAction(headerItem);}} >
            <div style={{height: config.eventItemHeight, color: '#999', textAlign: 'center'}}>
                {content}
            </div>
        </a>
        );
    }
}

export default AddMore