import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

class Tips extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let divStyle = {
            margin: "24px auto",
            padding: "0px",
            width: "1000px"
        };
        let liStyle = {
            margin: '10 0 10 20',
            listStyle: 'none'
        };
        return (
            <div style={divStyle}>
                <h3>Thank you for trying React Big Scheduler. Here are some tips:</h3>
                <ul>
                    <li style={liStyle}>
                        <span style={{fontWeight: 'bold'}}>1. SchedulerData is the view model of Scheduler. For simplicity, I put it in react state object, you'd better put it in react props object when using.</span>
                    </li>
                    <li style={liStyle}>
                        <span style={{fontWeight: 'bold'}}>2. Default configs are in the SchedulerData.config object, we can modify them when needed.</span>
                    </li>
                    <li style={liStyle}>
                        <span style={{fontWeight: 'bold'}}>3. Default behaviors are in the SchedulerData.behaviors object, we can modify them when needed.</span>
                    </li>
                    <li style={liStyle}>
                        <span style={{fontWeight: 'bold'}}>4. The event array set to the SchedulerData should be sorted in ascending order by event.start property, otherwise there will be many rendering errors in the Scheduler component.</span>
                    </li>
                    <li style={liStyle}>
                        <span style={{fontWeight: 'bold', color: 'red'}}>5. From the npm version 0.2.6, Scheduler will use responsive layout by default(set SchedulerData.config.schedulerWidth to a percentage instead of a number).</span>
                    </li>
                </ul>
                <div style={{clear: "both"}}></div>
            </div>
        )
    }
}

export default Tips

