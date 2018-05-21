import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

class ResourceView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        browserScrollbarHeight: PropTypes.number.isRequired,
        slotClickedFunc: PropTypes.func,
        slotItemTemplateResolver: PropTypes.func
    }

    render() {

        const {schedulerData, browserScrollbarHeight, slotClickedFunc, slotItemTemplateResolver} = this.props;
        const {renderData} = schedulerData;

        let width = schedulerData.getResourceTableWidth() - 2;
        let paddingBottom = browserScrollbarHeight;
        let resourceList = renderData.map((item) => {
            let a = slotClickedFunc != undefined ? <a onClick={() => {
                slotClickedFunc(schedulerData, item);
            }}>{item.slotName}</a>
                : <span>{item.slotName}</span>;
            let slotItem = (
                <div style={{width: width}} title={item.slotName} className="overflow-text header2-text">
                    {a}
                </div>
            );
            if(!!slotItemTemplateResolver) {
                let temp = slotItemTemplateResolver(schedulerData, item, slotClickedFunc, width, "overflow-text header2-text");
                if(!!temp)
                    slotItem = temp;
            }

            return (
                <tr key={item.slotId}>
                    <td data-resource-id={item.slotId} style={{height: item.rowHeight}}>
                        {slotItem}
                    </td>
                </tr>
            );
        });

        return (
            <div style={{paddingBottom: paddingBottom}}>
                <table className="resource-table">
                    <tbody>
                        {resourceList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ResourceView