import React, {Component} from 'react'
import {render} from 'react-dom'
import {HashRouter as Router, Route} from 'react-router-dom'
import Basic from './Basic'
import Readonly from './Readonly'
import Locale from './Locale'
import Views from './Views'
import CustomHeader from './CustomHeader'
import CustomTableHeaders from './CustomTableHeaders'
import CustomEventStyle from './CustomEventStyle'
import AddResource from './AddResource'
import DragAndDrop from './DragAndDrop'
import Summary from './Summary'
import AddMore from './AddMore'
import OverlapCheck from './OverlapCheck'
import NoCrossSlotMove from './NoCrossSlotMove'
import FreezeFirstRow from './FreezeFirstRow'
import ResourceClickable from './ResourceClickable'
import HideWeekends from './HideWeekends'
import CustomTimeWindow from './CustomTimeWindow'
import InfiniteScroll from './InfiniteScroll'
import InfiniteScroll2 from './InfiniteScroll2'
import ComingSoon from './ComingSoon'
import CustomPopoverStyle from './CustomPopoverStyle'

render((
    <Router>
        <Route exact path="/" component={Basic}/>
        <Route path="/readonly" component={Readonly}/>
        <Route path="/locale" component={Locale}/>
        <Route path="/views" component={Views}/>
        <Route path="/customheader" component={CustomHeader}/>
        <Route path="/customeventstyle" component={CustomEventStyle} />
        <Route path="/addresource" component={AddResource} />
        <Route path="/draganddrop" component={DragAndDrop} />
        <Route path="/summary" component={Summary} />
        <Route path="/addmore" component={AddMore} />
        <Route path="/overlapcheck" component={OverlapCheck} />
        <Route path="/nocrossslotmove" component={NoCrossSlotMove} />
        <Route path="/freezefirstrow" component={FreezeFirstRow} />
        <Route path="/resourceclickable" component={ResourceClickable} />
        <Route path="/comingsoon" component={ComingSoon}/>
        <Route path="/customtableheaders" component={CustomTableHeaders}/>
        <Route path="/hideweekends" component={HideWeekends}/>
        <Route path="/customtimewindow" component={CustomTimeWindow}/>
        <Route path="/infinitescroll" component={InfiniteScroll}/>
        <Route path="/infinitescroll2" component={InfiniteScroll2}/>
        <Route path="/custompopover" component={CustomPopoverStyle}/>
    </Router>
), document.getElementById('root'))

