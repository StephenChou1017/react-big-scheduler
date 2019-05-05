import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Nav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let ulStyle = {
            listStyle: "none",
            margin: "0px",
            padding: "0px",
            width: "auto"
        };
        let liStyle = {
            float: 'left',
            marginLeft: '20px'
        };
        return (
            <div>
                <ul style={ulStyle}>
                    <li style={liStyle}>
                        <span style={{fontWeight: 'bold'}}><a href="https://github.com/StephenChou1017/react-big-scheduler" target="_blank">React Big Scheduler</a></span>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/'>
                            <span>Basic</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/readonly'>
                            <span>Read only</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/locale'>
                            <span>Locale</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/views'>
                            <span>Views</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/customheader'>
                            <span>Custom header</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/customeventstyle'>
                            <span>Custom event style</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/addresource'>
                            <span>Add resource</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/draganddrop'>
                            <span>Drag&Drop</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/summary'>
                            <span>Summary</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/addmore'>
                            <span>Add more</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/overlapcheck'>
                            <span>Overlap check</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/nocrossslotmove'>
                            <span>No cross-slot move</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/freezefirstrow'>
                            <span>Freeze first row</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/resourceclickable'>
                            <span>Resource clickable</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/customtableheaders'>
                            <span>Custom table headers</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/hideweekends'>
                            <span>Hide weekends</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/customtimewindow'>
                            <span>Custom time window</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/infinitescroll'>
                            <span>Infinite scroll</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/infinitescroll2'>
                            <span>Infinite scroll 2</span>
                        </Link>
                    </li>
                    <li style={liStyle}>
                        <Link target="_self"
                              to='/custompopover'>
                            <span>Custom popover style</span>
                        </Link>
                    </li>
                </ul>
                <div style={{clear: "both", marginBottom: '24px'}}></div>
            </div>
        )
    }
}

export default Nav
