import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import 'antd/lib/grid/style/index.css'

class EventItemPopover extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        eventItem: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
        statusColor: PropTypes.string.isRequired,
        subtitleGetter: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText:PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
    }

    render(){
        const {schedulerData, eventItem, title, startTime, endTime, statusColor,subtitleGetter, viewEventClick, viewEventText, viewEvent2Click, viewEvent2Text} = this.props;
        return (
            <div style={{width: '400px'}}>
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div className="status-dot" style={{backgroundColor: eventItem.backgroundColor}} />
                    </Col>
                    <Col span={22} className="overflow-text">
                        <span className="header2-text" title={eventItem.status}>{eventItem.status}</span>
                    </Col>
                </Row>

                <Row type="flex" align="middle">
                    <Col span={22}>
                        <div>  <strong>Guest:</strong> {eventItem.guest} </div>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={22}>
                        <div>  <strong>Phone:</strong> {eventItem.phone} </div>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={22}>
                        <div>  <strong>Email:</strong> {eventItem.email} </div>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={10}>
                        <div>  <strong>CheckIn:</strong> {eventItem.start} </div>
                    </Col>
                    <Col span={10}>
                        <div>  <strong>CheckOut:</strong> {eventItem.end} </div>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={10}>
                        <div>  <strong>Nights:</strong> {eventItem.nights} </div>
                    </Col>
                    <Col span={10}>
                        <div>  <strong>Guests:</strong> {eventItem.guests} </div>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={10}>
                        <div>    <strong>ETA:</strong> {(eventItem.eta == null ? '-' : eventItem.eta)} </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default EventItemPopover
