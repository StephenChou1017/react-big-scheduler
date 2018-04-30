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
        let cellWidth = schedulerData.getHeaderCellWidth();

        let headerList = [];
        let style = {};
        if(viewType === ViewTypes.Day){
            headers.forEach((item, index) => {
                let datetime = localeMoment(item.time);
                style = !!item.nonWorkingTime ? {width: cellWidth, color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor} : {width: cellWidth};
                let pFormatList = config.nonAgendaDayCellHeaderFormat.split('|');
                let pList = pFormatList.map((item, index) => {
                    let time = datetime.format(item);
                    return (
                        <div key={index}>{time}</div>
                    );
                });

                const divStyle={ width: cellWidth - 3 };
                let element = (
                    <th key={item.time} className="header3-text" style={style}>
                        <div style={divStyle}>
                            {pList}
                        </div>
                    </th>
                );

                headerList.push(element);
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