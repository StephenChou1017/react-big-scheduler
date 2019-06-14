import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import moment from 'moment';

class BodyView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
    }

    isCurrenyDay(date) {
        return moment().isSame(date, 'day')
    }

    isDayBeforeCurrenyDay(date) {
        return moment().subtract(1, 'day').isSame(date, 'day')
    }

    render() {
        const {schedulerData} = this.props;
        const {renderData, headers, config, behaviors} = schedulerData;
        let cellWidth = schedulerData.getContentCellWidth();

        let displayRenderData = renderData.filter(o => o.render);
        let tableRows = displayRenderData.map((item) => {
            let rowCells = headers.map((header, index) => {
                let key = item.slotId + '_' + header.time;
                let style = index === headers.length - 1 ? {} : {width: cellWidth};
                if (!!header.nonWorkingTime)
                    style = {...style, backgroundColor: config.nonWorkingTimeBodyBgColor};
                if (item.groupOnly)
                    style = {...style, backgroundColor: config.groupOnlySlotColor};
                if (!!behaviors.getNonAgendaViewBodyCellBgColorFunc) {
                    let cellBgColor = behaviors.getNonAgendaViewBodyCellBgColorFunc(schedulerData, item.slotId, header);
                    if (!!cellBgColor)
                        style = {...style, backgroundColor: cellBgColor};
                }


                const currentDay = this.isCurrenyDay(header.time) ? 'current-day' : '';
                const dayBeforeCurrent = this.isDayBeforeCurrenyDay(header.time) ? 'before-current-day' : '';

                return (
                    <td className={`${currentDay} ${dayBeforeCurrent}`} key={key} style={style}>
                        <div></div>
                    </td>
                )
            });

            return (
                <tr key={item.slotId} style={{height: item.rowHeight}}>
                    {rowCells}
                </tr>
            );
        });

        return (
            <tbody>
            {tableRows}
            </tbody>
        );
    }
}

export default BodyView