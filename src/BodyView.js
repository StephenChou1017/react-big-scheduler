import { PropTypes } from 'prop-types'
import React, { Component } from 'react'

class BodyView extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    schedulerData: PropTypes.object.isRequired,
  }

  render() {
    const { schedulerData } = this.props
    const { renderData, headers, config, behaviors } = schedulerData
    let cellWidth = schedulerData.getContentCellWidth()

    let displayRenderData = renderData.filter(o => o.render)
    let tableRows = displayRenderData.map(item => {
      let rowCells = headers.map((header, index) => {
        let key = item.slotId + '_' + header.time
        let style = index === headers.length - 1 ? {} : { width: cellWidth }
        if (!!header.nonWorkingTime) {
          style = { ...style, backgroundColor: config.nonWorkingTimeBodyBgColor }
        }
        if (item.groupOnly) {
          style = { ...style, backgroundColor: config.groupOnlySlotColor }
        }
        if (new Date(header.time).toLocaleDateString() === new Date().toLocaleDateString()) {
          style = { ...style, backgroundColor: config.todayBodyColor }
        }
        if (!!behaviors.getNonAgendaViewBodyCellBgColorFunc) {
          let cellBgColor = behaviors.getNonAgendaViewBodyCellBgColorFunc(
            schedulerData,
            item.slotId,
            header,
          )
          if (!!cellBgColor) {
            style = { ...style, backgroundColor: cellBgColor }
          }
        }
        return (
          <td key={key} style={style}>
            <div></div>
          </td>
        )
      })

      return (
        <tr key={item.slotId} style={{ height: item.rowHeight }}>
          {rowCells}
        </tr>
      )
    })

    return <tbody>{tableRows}</tbody>
  }
}

export default BodyView
