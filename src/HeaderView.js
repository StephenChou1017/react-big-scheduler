import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {ViewTypes} from './index'

class HeaderView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
    }

    render() {
        const {schedulerData} = this.props;
        const {headers, viewType, config, localeMoment} = schedulerData;
        let headerHeight = schedulerData.getTableHeaderHeight();
        let cellWidth = schedulerData.getContentCellWidth();
        let minuteStepsInHour = schedulerData.getMinuteStepsInHour();

        let headerList = [];
        let style = {};
        if(viewType === ViewTypes.Day){
            headers.forEach((item, index) => {
                if(index % minuteStepsInHour === 0){
                    let datetime = localeMoment(item.time);
                    style = !!item.nonWorkingTime ? {width: cellWidth*minuteStepsInHour, color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor} : {width: cellWidth*minuteStepsInHour};
                    if(index === headers.length - minuteStepsInHour)
                        style = !!item.nonWorkingTime ? {color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor} : {};

                    let pFormatList = config.nonAgendaDayCellHeaderFormat.split('|');
                    let pList = pFormatList.map((item, index) => {
                        let time = datetime.format(item);
                        return (
                            <div key={index}>{time}</div>
                        );
                    });

                    let element = (
                        <th key={item.time} className="header3-text" style={style}>
                            <div>
                                {pList}
                            </div>
                        </th>
                    );

                    headerList.push(element);
                }
            })
        }
        else {
            headerList = headers.map((item, index) => {
                let datetime = localeMoment(item.time);
                style = !!item.nonWorkingTime ? {width: cellWidth, color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor} : {width: cellWidth};
                if(index === headers.length - 1)
                    style = !!item.nonWorkingTime ? {color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor} : {};

                let pFormatList = config.nonAgendaOtherCellHeaderFormat.split('|');
                let pList = pFormatList.map((item, index) => {
                    let time = datetime.format(item);
                    return (
                        <div key={index}>{time}</div>
                    );
                });

                return (
                    <th key={item.time} className="header3-text" style={style}>
                        <div>
                            {pList}
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