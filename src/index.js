import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {Row, Col, Icon, Radio, Popover, Calendar} from 'antd'
import EventItem from './EventItem'
import DnDSource from './DnDSource'
import DnDContext from './DnDContext'
import ResourceView from './ResourceView'
import HeaderView from './HeaderView'
import BodyView from './BodyView'
import ResourceEvents from './ResourceEvents'
import AgendaView from './AgendaView'
import AddMorePopover from './AddMorePopover'
import ViewTypes from './ViewTypes'
import SummaryPos from './SummaryPos'
import SchedulerData from './SchedulerData'
import DemoData from './DemoData'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Scheduler extends Component {

    constructor(props) {
        super(props);

        const {schedulerData, dndSources} = props;
        let sources = [];
        sources.push(new DnDSource((props) => {
            return props.eventItem;
        }, EventItem));
        if (dndSources != undefined && dndSources.length > 0) {
            sources = [...sources, ...dndSources];
        }
        let dndContext = new DnDContext(sources, ResourceEvents);

        this.currentArea = -1;

        this.state = {
            visible: false,
            dndContext: dndContext,
            contentHeight: schedulerData.getSchedulerContentDesiredHeight(),
            browserScrollbarHeight: 17,
            browserScrollbarWidth: 17,
        };
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        prevClick: PropTypes.func.isRequired,
        nextClick: PropTypes.func.isRequired,
        onViewChange: PropTypes.func.isRequired,
        onSelectDate: PropTypes.func.isRequired,
        onSetAddMoreState: PropTypes.func,
        updateEventStart: PropTypes.func,
        updateEventEnd: PropTypes.func,
        moveEvent: PropTypes.func,
        leftCustomHeader: PropTypes.object,
        rightCustomHeader: PropTypes.object,
        newEvent: PropTypes.func,
        subtitleGetter: PropTypes.func,
        eventItemClick: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText: PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
        conflictOccurred: PropTypes.func,
        eventItemTemplateResolver: PropTypes.func,
        dndSources: PropTypes.array,
        slotClickedFunc: PropTypes.func,
        slotItemTemplateResolver: PropTypes.func,
        nonAgendaCellHeaderTemplateResolver: PropTypes.func,
    }

    componentDidMount(props, state){
        this.resolveScrollbarSize();
    }

    componentDidUpdate(props, state) {
        this.resolveScrollbarSize();

        const { schedulerData } = this.props;
        const { localeMoment} = schedulerData;
        if(schedulerData.getScrollToToday()){
            if(!!this.schedulerContent && this.schedulerContent.scrollWidth > this.schedulerContent.clientWidth){
                let start = localeMoment(schedulerData.startDate).startOf('day'),
                    end = localeMoment(schedulerData.endDate).endOf('day'),
                    now = localeMoment();
                if(now>= start && now <= end){
                    let index = 0;
                    schedulerData.headers.forEach((item) => {
                        let header = localeMoment(item.time);
                        if(now >= header)
                            index ++;
                    })
                    this.schedulerContent.scrollLeft = (index - 1) * schedulerData.getContentCellWidth();

                    schedulerData.setScrollToToday(false);
                }
            }
        }
    }

    render() {
        const { schedulerData, leftCustomHeader, rightCustomHeader } = this.props;
        const {renderData, viewType, showAgenda, isEventPerspective, config} = schedulerData;
        const width = config.schedulerWidth;
        const calendarPopoverEnabled = config.calendarPopoverEnabled;

        let dateLabel = schedulerData.getDateLabel();
        let defaultValue = `${viewType}${showAgenda ? 1 : 0}${isEventPerspective ? 1 : 0}`;
        let radioButtonList = config.views.map(item => {
            return <RadioButton key={`${item.viewType}${item.showAgenda ? 1 : 0}${item.isEventPerspective ? 1 : 0}`}
                                value={`${item.viewType}${item.showAgenda ? 1 : 0}${item.isEventPerspective ? 1 : 0}`}><span
                style={{margin: "0px 8px"}}>{item.viewName}</span></RadioButton>
        })

        let tbodyContent = <tr />;
        if (showAgenda) {
            tbodyContent = <AgendaView
                                {...this.props}
                            />
        }
        else {
            let resourceTableWidth = schedulerData.getResourceTableWidth();
            let schedulerContainerWidth = width - resourceTableWidth + 1;
            let schedulerWidth = schedulerData.getContentTableWidth() - 1;
            let DndResourceEvents = this.state.dndContext.getDropTarget();
            let eventDndSource = this.state.dndContext.getDndSource();

            let resourceEventsList = renderData.map((item) => {
                return <DndResourceEvents
                                {...this.props}
                                key={item.slotId}
                                resourceEvents={item}
                                dndSource={eventDndSource}
                />
            });

            let browserScrollbarHeight = this.state.browserScrollbarHeight,
                browserScrollbarWidth = this.state.browserScrollbarWidth,
                contentHeight = this.state.contentHeight;
            let schedulerContentStyle = {overflow: 'auto', margin: "0px, 0px, 0px, 0px", position: "relative"};
            let resourceContentStyle = {overflowX: "auto", overflowY: "auto", margin: `0px -${browserScrollbarWidth}px 0px 0px`};
            if (config.schedulerMaxHeight > 0) {
                schedulerContentStyle = {
                    ...schedulerContentStyle,
                    maxHeight: config.schedulerMaxHeight - config.tableHeaderHeight
                };
                resourceContentStyle = {
                    ...resourceContentStyle,
                    maxHeight: config.schedulerMaxHeight - config.tableHeaderHeight
                };
            }

            let resourceName = schedulerData.isEventPerspective ? config.taskName : config.resourceName;
            tbodyContent = (
                <tr>
                    <td style={{width: resourceTableWidth, verticalAlign: 'top'}}>
                        <div className="resource-view">
                            <div style={{overflow: "hidden", borderBottom: "1px solid #e9e9e9", height: config.tableHeaderHeight}}>
                                <div style={{overflowX: "scroll", overflowY: "hidden", margin: `0px 0px -${browserScrollbarHeight}px`}}>
                                    <table className="resource-table">
                                        <thead>
                                        <tr style={{height: config.tableHeaderHeight}}>
                                            <th className="header3-text">
                                                {resourceName}
                                            </th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div style={resourceContentStyle} ref={this.schedulerResourceRef} onMouseOver={this.onSchedulerResourceMouseOver} onMouseOut={this.onSchedulerResourceMouseOut} onScroll={this.onSchedulerResourceScroll}>
                                <ResourceView
                                    {...this.props}
                                    browserScrollbarHeight={browserScrollbarHeight}
                                />
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="scheduler-view" style={{width: schedulerContainerWidth, verticalAlign: 'top'}}>
                            <div style={{overflow: "hidden", borderBottom: "1px solid #e9e9e9", height: config.tableHeaderHeight}}>
                                <div style={{overflowX: "scroll", overflowY: "hidden", margin: `0px 0px -${browserScrollbarHeight}px`}} ref={this.schedulerHeadRef} onMouseOver={this.onSchedulerHeadMouseOver} onMouseOut={this.onSchedulerHeadMouseOut} onScroll={this.onSchedulerHeadScroll}>
                                    <div style={{paddingRight: `${browserScrollbarWidth}px`, width: schedulerWidth + browserScrollbarWidth}}>
                                        <table className="scheduler-bg-table">
                                            <HeaderView {...this.props}/>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div style={schedulerContentStyle} ref={this.schedulerContentRef} onMouseOver={this.onSchedulerContentMouseOver} onMouseOut={this.onSchedulerContentMouseOut} onScroll={this.onSchedulerContentScroll} >
                                <div style={{width: schedulerWidth, height: contentHeight}}>
                                    <div className="scheduler-content">
                                        <table className="scheduler-content-table" >
                                            <tbody>
                                                {resourceEventsList}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="scheduler-bg">
                                        <table className="scheduler-bg-table" style={{width: schedulerWidth}} ref={this.schedulerContentBgTableRef} >
                                            <BodyView {...this.props}/>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            );
        };

        let popover = <div className="popover-calendar"><Calendar fullscreen={false} onSelect={this.onSelect}/></div>;
        let schedulerHeader = <div />;
        if(config.headerEnabled) {
            schedulerHeader = (
                <Row type="flex" align="middle" justify="space-between" style={{marginBottom: '24px'}}>
                    {leftCustomHeader}
                    <Col>
                        <div className='header2-text'>
                            <Icon type="left" style={{marginRight: "8px"}} className="icon-nav"
                                    onClick={this.goBack}/>
                            {
                            calendarPopoverEnabled
                                ?
                                <Popover content={popover} placement="bottom" trigger="click"
                                        visible={this.state.visible}
                                        onVisibleChange={this.handleVisibleChange}>
                                <span className={'header2-text-label'} style={{cursor: 'pointer'}}>{dateLabel}</span>
                                </Popover>
                                : <span className={'header2-text-label'}>{dateLabel}</span>
                            }
                            <Icon type="right" style={{marginLeft: "8px"}} className="icon-nav"
                                    onClick={this.goNext}/>
                        </div>
                    </Col>
                    <Col>
                        <RadioGroup defaultValue={defaultValue} size="default" onChange={this.onViewChange}>
                            {radioButtonList}
                        </RadioGroup>
                    </Col>
                    {rightCustomHeader}
                </Row>
            );
        }

        return (
            <table className="scheduler" style={{width: width}}>
                <thead>
                <tr>
                    <td colSpan="2">
                        {schedulerHeader}
                    </td>
                </tr>
                </thead>
                <tbody>
                {tbodyContent}
                </tbody>
            </table>
        )
    }

    resolveScrollbarSize = () => {
        const { schedulerData } = this.props;
        let browserScrollbarHeight = 17, browserScrollbarWidth = 17, contentHeight = schedulerData.getSchedulerContentDesiredHeight();
        if (!!this.schedulerContent) {
            browserScrollbarHeight = this.schedulerContent.offsetHeight - this.schedulerContent.clientHeight;
            browserScrollbarWidth = this.schedulerContent.offsetWidth - this.schedulerContent.clientWidth;
        }
        if(!!this.schedulerContentBgTable && !!this.schedulerContentBgTable.offsetHeight){
            contentHeight = this.schedulerContentBgTable.offsetHeight;
        }

        let tmpState = {};
        let needSet = false;
        if (browserScrollbarHeight != this.state.browserScrollbarHeight) {
            tmpState = {...tmpState, browserScrollbarHeight: browserScrollbarHeight};
            needSet = true;
        }
        if (browserScrollbarWidth != this.state.browserScrollbarWidth) {
            tmpState = {...tmpState, browserScrollbarWidth: browserScrollbarWidth};
            needSet = true;
        }
        if(contentHeight != this.state.contentHeight){
            tmpState = {...tmpState, contentHeight: contentHeight};
            needSet = true;
        }
        if (needSet)
            this.setState(tmpState);
    }

    schedulerHeadRef = (element) => {
        this.schedulerHead = element;
    }

    onSchedulerHeadMouseOver = () => {
        this.currentArea = 2;
    }

    onSchedulerHeadMouseOut = () => {
        this.currentArea = -1;
    }

    onSchedulerHeadScroll = (proxy, event) => {
         if((this.currentArea === 2 || this.currentArea === -1) && this.schedulerContent.scrollLeft != this.schedulerHead.scrollLeft)
             this.schedulerContent.scrollLeft = this.schedulerHead.scrollLeft;
    }

    schedulerResourceRef = (element) => {
        this.schedulerResource = element;
    }

    onSchedulerResourceMouseOver = () => {
        this.currentArea = 1;
    }

    onSchedulerResourceMouseOut = () => {
        this.currentArea = -1;
    }

    onSchedulerResourceScroll = (proxy, event) => {
         if((this.currentArea === 1 || this.currentArea === -1) && this.schedulerContent.scrollTop != this.schedulerResource.scrollTop)
             this.schedulerContent.scrollTop = this.schedulerResource.scrollTop;
    }

    schedulerContentRef = (element) => {
        this.schedulerContent = element;
    }

    schedulerContentBgTableRef = (element) => {
        this.schedulerContentBgTable = element;
    }

    onSchedulerContentMouseOver = () => {
        this.currentArea = 0;
    }

    onSchedulerContentMouseOut = () => {
        this.currentArea = -1;
    }

    onSchedulerContentScroll = (proxy, event) => {
        if(this.currentArea === 0 || this.currentArea === -1) {
            if (this.schedulerHead.scrollLeft != this.schedulerContent.scrollLeft)
                this.schedulerHead.scrollLeft = this.schedulerContent.scrollLeft;
            if (this.schedulerResource.scrollTop != this.schedulerContent.scrollTop)
                this.schedulerResource.scrollTop = this.schedulerContent.scrollTop;
        }
    }

    onViewChange = (e) => {
        const {onViewChange, schedulerData} = this.props;
        let viewType = parseInt(e.target.value.charAt(0));
        let showAgenda = e.target.value.charAt(1) === '1';
        let isEventPerspective = e.target.value.charAt(2) === '1';
        onViewChange(schedulerData, {viewType: viewType, showAgenda: showAgenda, isEventPerspective: isEventPerspective});
    }

    goNext = () => {
        const {nextClick, schedulerData} = this.props;
        nextClick(schedulerData);
    }

    goBack = () => {
        const {prevClick, schedulerData} = this.props;
        prevClick(schedulerData);
    }

    handleVisibleChange = (visible) => {
        this.setState({visible});
    }

    onSelect = (date) => {
        this.setState({
            visible: false,
        });

        const {onSelectDate, schedulerData} = this.props;
        onSelectDate(schedulerData, date);
    }
}

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export {SchedulerData, ViewTypes, SummaryPos, DnDSource, DnDContext, AddMorePopover, DemoData}
export default Scheduler
