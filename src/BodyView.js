import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import { ViewTypes } from '.';
import moment from 'moment';

class BodyView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
    }

    render() {

        const {schedulerData} = this.props;
        const {renderData, headers, config, viewType, minuteStep} = schedulerData;
        let cellWidth = schedulerData.getHeaderCellWidth();

        let tableRows = renderData.map((item) => {
            let rowCells = headers.map((header, index) => {
                if (schedulerData.viewType === ViewTypes.Day) {
                    let cells = [];
                    const computedWidth = schedulerData.getContentCellWidth() - 1;
                    for (let i = 0; i < (60 / minuteStep); i++) {
                        let key = item.slotId + '_' + moment(header.time).add(minuteStep * i, 'minutes');
                        let style = {width: computedWidth};                        
                        if(!!header.nonWorkingTime)
                            style = {...style, backgroundColor: config.nonWorkingTimeBodyBgColor};
                        
                        cells.push(<td key={key} style={style}><div></div></td>);
                    }

                    return cells;
                }
                else {
                    let key = item.slotId + '_' + header.time;
                    let style = index === headers.length - 1 ? {} : {width: cellWidth};
                    if(!!header.nonWorkingTime)
                        style = {...style, backgroundColor: config.nonWorkingTimeBodyBgColor};
                    
                    return (
                        <td key={key} style={style}><div></div></td>
                    );
                }
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