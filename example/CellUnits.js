import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import moment from 'moment'
import Scheduler, {SchedulerData, ViewTypes, CellUnits, DemoData, DATE_FORMAT} from '../src/index'
import Nav from './Nav'
import ViewSrcCode from './ViewSrcCode'
import withDragDropContext from './withDnDContext'

class CellUnitsComponent extends Component{
    constructor(props){
        super(props);

        let schedulerData = new SchedulerData(moment('2019-02-10').format(DATE_FORMAT), ViewTypes.Custom, false, false, {
            customCellWidth: 150,
            nonAgendaDayCellHeaderFormat: 'M/D|HH:mm',
            views: [
                {viewName: 'Week', viewType: ViewTypes.Custom, showAgenda: false, isEventPerspective: false},
                {viewName: 'Month', viewType: ViewTypes.Custom1, showAgenda: false, isEventPerspective: false},
                {viewName: 'Year', viewType: ViewTypes.Custom2, showAgenda: false, isEventPerspective: false},
            ],
        }, {
            getCustomDateFunc: this.getCustomDate,
        });
        schedulerData.localeMoment.locale('en');
        schedulerData.setResources(DemoData.resources);
        schedulerData.setEvents(DemoData.events);
        this.state = {
            viewModel: schedulerData,
        }
    }

    render(){
        const {viewModel} = this.state;
        return (
            <div>
                <Nav />
                <div>
                    <h3 style={{textAlign: 'center'}}>Custom time window<ViewSrcCode srcCodeUrl="https://github.com/StephenChou1017/react-big-scheduler/blob/master/example/CustomTimeWindow.js" /></h3>
                    <Scheduler schedulerData={viewModel}
                               prevClick={this.prevClick}
                               nextClick={this.nextClick}
                               onViewChange={this.onViewChange}
                               onSelectDate={this.onSelectDate}
                    />
                </div>
            </div>
        )
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.config.customCellWidth = view.viewType === ViewTypes.Custom ? 30 : 80;
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    getCustomDate = (schedulerData, num, date = undefined) => {
        const {viewType} = schedulerData;
        let selectDate = schedulerData.startDate;
        if(date != undefined)
            selectDate = date;   

        let startDate = num === 0 ? selectDate : 
            schedulerData.localeMoment(selectDate).add(2*num, 'days').format(DATE_FORMAT),
            endDate = schedulerData.localeMoment(startDate).add(1, 'week').format(DATE_FORMAT),
            cellUnit = CellUnits.Day;
        if(viewType === ViewTypes.Custom) {
            let monday = schedulerData.localeMoment(selectDate).startOf('week').format(DATE_FORMAT);
            startDate = num === 0 ? monday : schedulerData.localeMoment(monday).add(2*num, 'weeks').format(DATE_FORMAT);
            endDate = schedulerData.localeMoment(startDate).add(12, 'months').endOf('week').format(DATE_FORMAT);
            cellUnit = CellUnits.Week;
        } else if(viewType === ViewTypes.Custom1) {
            let firstDayOfMonth = schedulerData.localeMoment(selectDate).startOf('month').format(DATE_FORMAT);
            startDate = num === 0 ? firstDayOfMonth : schedulerData.local2eMoment(firstDayOfMonth).add(2*num, 'months').format(DATE_FORMAT);
            endDate = schedulerData.localeMoment(startDate).add(16, 'months').endOf('month').format(DATE_FORMAT);
            cellUnit = CellUnits.Month;
        }else if(viewType === ViewTypes.Custom2) {
            let firstDayOfMonth = schedulerData.localeMoment(selectDate).startOf('month').format(DATE_FORMAT);
            startDate = num === 0 ? firstDayOfMonth : schedulerData.localeMoment(firstDayOfMonth).add(2*num, 'months').format(DATE_FORMAT);
            endDate = schedulerData.localeMoment(startDate).add(60, 'months').endOf('month').format(DATE_FORMAT);
            cellUnit = CellUnits.Year;
        }
        return {
            startDate,
            endDate,
            cellUnit
        };
    }
}

export default withDragDropContext(CellUnitsComponent)
