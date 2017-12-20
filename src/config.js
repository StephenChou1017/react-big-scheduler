import ViewTypes from './ViewTypes'
import SummaryPos from './SummaryPos'

export default {
    schedulerWidth: 1000,
    schedulerMaxHeight: 0,
    tableHeaderHeight: 40,

    agendaResourceTableWidth: 160,
    agendaMaxEventWidth: 100,

    dayResourceTableWidth: 160,
    weekResourceTableWidth: 160,
    monthResourceTableWidth: 160,
    quarterResourceTableWidth: 160,
    yearResourceTableWidth: 160,

    dayCellWidth: 30,
    weekCellWidth: 120,
    monthCellWidth: 60,
    quarterCellWidth: 60,
    yearCellWidth: 60,

    dayMaxEvents: 99,
    weekMaxEvents: 99,
    monthMaxEvents: 99,
    quarterMaxEvents: 99,
    yearMaxEvents: 99,

    eventItemHeight: 22,
    eventItemLineHeight: 24,
    dayStartFrom: 0,
    dayStopTo: 23,
    defaultEventBgColor: '#80C5F6',
    selectedAreaColor: '#7EC2F3',
    nonWorkingTimeHeadColor: '#999999',
    nonWorkingTimeHeadBgColor: '#fff0f6',
    nonWorkingTimeBodyBgColor: '#fff0f6',
    summaryColor: '#666',
    summaryPos: SummaryPos.TopRight,

    startResizable: true,
    endResizable: true,
    movable: true,
    creatable: true,
    crossResourceMove: true,
    checkConflict: false,
    scrollToTodayEnabled: true,

    views: [
        {viewName: '天', viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false},
        {viewName: '周', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false},
        {viewName: '月', viewType: ViewTypes.Month, showAgenda: false, isEventPerspective: false},
        {viewName: '年', viewType: ViewTypes.Year, showAgenda: false, isEventPerspective: false},
    ],
}
