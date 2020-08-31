import { PropTypes } from 'prop-types'
import React, { Component } from 'react'

class SelectedArea extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    schedulerData: PropTypes.object.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }

  render() {
    const { left, width, schedulerData } = this.props
    const { config } = schedulerData

    return (
      <div
        className="selected-area"
        style={{
          left: left,
          width: width,
          top: 0,
          bottom: 0,
          backgroundColor: config.selectedAreaColor,
        }}
      ></div>
    )
  }
}

export default SelectedArea
