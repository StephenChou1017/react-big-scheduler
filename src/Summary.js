import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {SummaryPos} from './index'

class Summary extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        summary: PropTypes.object.isRequired,
        left: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
    }

    render() {
        const {summary, left, width, top, schedulerData} = this.props;
        const {config} = schedulerData;
        let color = config.summaryColor;
        if(summary.color != undefined)
            color = summary.color;
        let textAlign = 'center';
        if(config.summaryPos === SummaryPos.TopRight || config.summaryPos === SummaryPos.BottomRight)
            textAlign = 'right';
        else if(config.summaryPos === SummaryPos.TopLeft || config.summaryPos === SummaryPos.BottomLeft)
            textAlign = 'left';
        let style = {height: config.eventItemHeight, color: color, textAlign: textAlign, marginLeft: '6px', marginRight: '6px'};
        if(summary.fontSize != undefined)
            style = {...style, fontSize: summary.fontSize};

        return (
            <a className="timeline-event header2-text" style={{left: left, width: width, top: top, cursor: 'default'}} >
                <div style={style}>
                    {summary.text}
                </div>
            </a>
        );
    }
}

export default Summary