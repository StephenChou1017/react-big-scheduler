import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn';
import {ViewTypes} from './Scheduler'
import './style.css'

class HeaderView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
    }

    render() {
        const {schedulerData} = this.props;
        const {headers, viewType, config} = schedulerData;
        let headerHeight = schedulerData.getTableHeaderHeight();
        let cellWidth = schedulerData.getContentCellWidth();

        let headerList = [];
        let style = {};
        if(viewType === ViewTypes.Day){
            headers.forEach((item, index) => {
                if(index % 2 === 0){
                    let datetime = moment(item.time);
                    let time = datetime.format('HH:mm');
                    style = !!item.nonWorkingTime ? {width: cellWidth*2, color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor} : {width: cellWidth*2};
                    if(index === headers.length - 2)
                        style = !!item.nonWorkingTime ? {color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor} : {};
                    let element = (
                        <th key={item.time} className="header3-text" style={style}>
                            <div>
                                <p>{time}</p>
                            </div>
                        </th>
                    );

                    headerList.push(element);
                }
            })
        }
        else {
            headerList = headers.map((item, index) => {
                let time = moment(item.time);
                let weekDay = time.format('ddd');
                let date = time.format('M/D');
                style = !!item.nonWorkingTime ? {width: cellWidth, color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor} : {width: cellWidth};
                if(index === headers.length - 1)
                    style = !!item.nonWorkingTime ? {color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor} : {};
                return (
                    <th key={item.time} className="header3-text" style={style}>
                        <div>
                            <p>{weekDay}</p>
                            <p>{date}</p>
                        </div>
                    </th>
                );
            });
        }

        return (
            <thead>
                <tr style={{height: headerHeight}}>
                    {headerList}
                </tr>
            </thead>
        );
    }
}

export default HeaderView