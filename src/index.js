'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DemoData = exports.AddMorePopover = exports.DnDContext = exports.DnDSource = exports.SummaryPos = exports.ViewTypes = exports.SchedulerData = exports.DATETIME_FORMAT = exports.DATE_FORMAT = undefined;

var _row = require('antd/es/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('antd/es/col');

var _col2 = _interopRequireDefault(_col);

var _popover = require('antd/es/popover');

var _popover2 = _interopRequireDefault(_popover);

var _icon = require('antd/es/icon');

var _icon2 = _interopRequireDefault(_icon);

var _calendar = require('antd/es/calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _radio = require('antd/es/radio');

var _radio2 = _interopRequireDefault(_radio);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

require('antd/es/row/style/css');

require('antd/es/col/style/css');

require('antd/es/popover/style/css');

require('antd/es/icon/style/css');

require('antd/es/calendar/style/css');

require('antd/es/radio/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _EventItem = require('./EventItem');

var _EventItem2 = _interopRequireDefault(_EventItem);

var _DnDSource = require('./DnDSource');

var _DnDSource2 = _interopRequireDefault(_DnDSource);

var _DnDContext = require('./DnDContext');

var _DnDContext2 = _interopRequireDefault(_DnDContext);

var _ResourceView = require('./ResourceView');

var _ResourceView2 = _interopRequireDefault(_ResourceView);

var _HeaderView = require('./HeaderView');

var _HeaderView2 = _interopRequireDefault(_HeaderView);

var _BodyView = require('./BodyView');

var _BodyView2 = _interopRequireDefault(_BodyView);

var _ResourceEvents = require('./ResourceEvents');

var _ResourceEvents2 = _interopRequireDefault(_ResourceEvents);

var _AgendaView = require('./AgendaView');

var _AgendaView2 = _interopRequireDefault(_AgendaView);

var _AddMorePopover = require('./AddMorePopover');

var _AddMorePopover2 = _interopRequireDefault(_AddMorePopover);

var _ViewTypes = require('./ViewTypes');

var _ViewTypes2 = _interopRequireDefault(_ViewTypes);

var _SummaryPos = require('./SummaryPos');

var _SummaryPos2 = _interopRequireDefault(_SummaryPos);

var _SchedulerData = require('./SchedulerData');

var _SchedulerData2 = _interopRequireDefault(_SchedulerData);

var _DemoData = require('./DemoData');

var _DemoData2 = _interopRequireDefault(_DemoData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioButton = _radio2.default.Button;
var RadioGroup = _radio2.default.Group;

var Scheduler = (_temp = _class = function (_Component) {
    _inherits(Scheduler, _Component);

    function Scheduler(props) {
        _classCallCheck(this, Scheduler);

        var _this = _possibleConstructorReturn(this, (Scheduler.__proto__ || Object.getPrototypeOf(Scheduler)).call(this, props));

        _initialiseProps.call(_this);

        var schedulerData = props.schedulerData,
            dndSources = props.dndSources;

        var sources = [];
        sources.push(new _DnDSource2.default(function (props) {
            return props.eventItem;
        }, _EventItem2.default));
        if (dndSources != undefined && dndSources.length > 0) {
            sources = [].concat(_toConsumableArray(sources), _toConsumableArray(dndSources));
        }
        var dndContext = new _DnDContext2.default(sources, _ResourceEvents2.default);

        _this.currentArea = -1;

        _this.state = {
            visible: false,
            dndContext: dndContext,
            contentHeight: schedulerData.getSchedulerContentDesiredHeight(),
            browserScrollbarHeight: 17,
            browserScrollbarWidth: 17
        };
        return _this;
    }

    _createClass(Scheduler, [{
        key: 'componentDidMount',
        value: function componentDidMount(props, state) {
            this.resolveScrollbarSize();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(props, state) {
            this.resolveScrollbarSize();

            var schedulerData = this.props.schedulerData;
            var localeMoment = schedulerData.localeMoment;

            if (schedulerData.getScrollToToday()) {
                if (!!this.schedulerContent && this.schedulerContent.scrollWidth > this.schedulerContent.clientWidth) {
                    var start = localeMoment(schedulerData.startDate).startOf('day'),
                        end = localeMoment(schedulerData.endDate).endOf('day'),
                        now = localeMoment();
                    if (now >= start && now <= end) {
                        var index = 0;
                        schedulerData.headers.forEach(function (item) {
                            var header = localeMoment(item.time);
                            if (now >= header) index++;
                        });
                        index = index - 7      //this line is added by me
                        this.schedulerContent.scrollLeft = (index - 1) * schedulerData.getContentCellWidth();

                        schedulerData.setScrollToToday(false);
                    }
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                schedulerData = _props.schedulerData,
                leftCustomHeader = _props.leftCustomHeader,
                rightCustomHeader = _props.rightCustomHeader;
            var renderData = schedulerData.renderData,
                viewType = schedulerData.viewType,
                showAgenda = schedulerData.showAgenda,
                isEventPerspective = schedulerData.isEventPerspective,
                config = schedulerData.config;

            var width = config.schedulerWidth;
            var calendarPopoverEnabled = config.calendarPopoverEnabled;

            var dateLabel = schedulerData.getDateLabel();
            var defaultValue = '' + viewType + (showAgenda ? 1 : 0) + (isEventPerspective ? 1 : 0);
            var radioButtonList = config.views.map(function (item) {
                return _react2.default.createElement(
                    RadioButton,
                    { key: '' + item.viewType + (item.showAgenda ? 1 : 0) + (item.isEventPerspective ? 1 : 0),
                        value: '' + item.viewType + (item.showAgenda ? 1 : 0) + (item.isEventPerspective ? 1 : 0) },
                    _react2.default.createElement(
                        'span',
                        {
                            style: { margin: "0px 8px" } },
                        item.viewName
                    )
                );
            });

            var tbodyContent = _react2.default.createElement('tr', null);
            if (showAgenda) {
                tbodyContent = _react2.default.createElement(_AgendaView2.default, this.props);
            } else {
                var resourceTableWidth = schedulerData.getResourceTableWidth();
                var schedulerContainerWidth = width - resourceTableWidth + 1;
                var schedulerWidth = schedulerData.getContentTableWidth() - 1;
                var DndResourceEvents = this.state.dndContext.getDropTarget();
                var eventDndSource = this.state.dndContext.getDndSource();

                var resourceEventsList = renderData.map(function (item) {
                    return _react2.default.createElement(DndResourceEvents, _extends({}, _this2.props, {
                        key: item.slotId,
                        resourceEvents: item,
                        dndSource: eventDndSource
                    }));
                });

                var browserScrollbarHeight = this.state.browserScrollbarHeight,
                    browserScrollbarWidth = this.state.browserScrollbarWidth,
                    contentHeight = this.state.contentHeight;
                var schedulerContentStyle = { overflow: 'auto', margin: "0px, 0px, 0px, 0px", position: "relative" };
                var resourceContentStyle = { overflowX: "auto", overflowY: "auto", margin: '0px -' + browserScrollbarWidth + 'px 0px 0px' };
                if (config.schedulerMaxHeight > 0) {
                    schedulerContentStyle = _extends({}, schedulerContentStyle, {
                        maxHeight: config.schedulerMaxHeight - config.tableHeaderHeight
                    });
                    resourceContentStyle = _extends({}, resourceContentStyle, {
                        maxHeight: config.schedulerMaxHeight - config.tableHeaderHeight
                    });
                }

                var resourceName = schedulerData.isEventPerspective ? config.taskName : config.resourceName;
                tbodyContent = _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                        'td',
                        { style: { width: resourceTableWidth, verticalAlign: 'top' } },
                        _react2.default.createElement(
                            'div',
                            { className: 'resource-view' },
                            _react2.default.createElement(
                                'div',
                                { style: { overflow: "hidden", borderBottom: "1px solid #e9e9e9", height: config.tableHeaderHeight } },
                                _react2.default.createElement(
                                    'div',
                                    { style: { overflowX: "scroll", overflowY: "hidden", margin: '0px 0px -' + browserScrollbarHeight + 'px' } },
                                    _react2.default.createElement(
                                        'table',
                                        { className: 'resource-table' },
                                        _react2.default.createElement(
                                            'thead',
                                            null,
                                            _react2.default.createElement(
                                                'tr',
                                                { style: { height: config.tableHeaderHeight } },
                                                _react2.default.createElement(
                                                    'th',
                                                    { className: 'header3-text' },
                                                    resourceName
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { style: resourceContentStyle, ref: this.schedulerResourceRef, onMouseOver: this.onSchedulerResourceMouseOver, onMouseOut: this.onSchedulerResourceMouseOut, onScroll: this.onSchedulerResourceScroll },
                                _react2.default.createElement(_ResourceView2.default, _extends({}, this.props, {
                                    browserScrollbarHeight: browserScrollbarHeight
                                }))
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'scheduler-view', style: { width: schedulerContainerWidth, verticalAlign: 'top' } },
                            _react2.default.createElement(
                                'div',
                                { style: { overflow: "hidden", borderBottom: "1px solid #e9e9e9", height: config.tableHeaderHeight } },
                                _react2.default.createElement(
                                    'div',
                                    { style: { overflowX: "scroll", overflowY: "hidden", margin: '0px 0px -' + browserScrollbarHeight + 'px' }, ref: this.schedulerHeadRef, onMouseOver: this.onSchedulerHeadMouseOver, onMouseOut: this.onSchedulerHeadMouseOut, onScroll: this.onSchedulerHeadScroll },
                                    _react2.default.createElement(
                                        'div',
                                        { style: { paddingRight: browserScrollbarWidth + 'px', width: schedulerWidth + browserScrollbarWidth } },
                                        _react2.default.createElement(
                                            'table',
                                            { className: 'scheduler-bg-table' },
                                            _react2.default.createElement(_HeaderView2.default, this.props)
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { style: schedulerContentStyle, ref: this.schedulerContentRef, onMouseOver: this.onSchedulerContentMouseOver, onMouseOut: this.onSchedulerContentMouseOut, onScroll: this.onSchedulerContentScroll },
                                _react2.default.createElement(
                                    'div',
                                    { style: { width: schedulerWidth, height: contentHeight } },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'scheduler-content' },
                                        _react2.default.createElement(
                                            'table',
                                            { className: 'scheduler-content-table' },
                                            _react2.default.createElement(
                                                'tbody',
                                                null,
                                                resourceEventsList
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'scheduler-bg' },
                                        _react2.default.createElement(
                                            'table',
                                            { className: 'scheduler-bg-table', style: { width: schedulerWidth }, ref: this.schedulerContentBgTableRef },
                                            _react2.default.createElement(_BodyView2.default, this.props)
                                        )
                                    )
                                )
                            )
                        )
                    )
                );
            };

            var popover = _react2.default.createElement(
                'div',
                { className: 'popover-calendar' },
                _react2.default.createElement(_calendar2.default, { fullscreen: false, onSelect: this.onSelect })
            );
            var schedulerHeader = _react2.default.createElement('div', null);
            if (config.headerEnabled) {
                schedulerHeader = _react2.default.createElement(
                    _row2.default,
                    { type: 'flex', align: 'middle', justify: 'space-between', style: { marginBottom: '24px' } },
                    leftCustomHeader,
                    _react2.default.createElement(
                        _col2.default,
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'header2-text' },
                            _react2.default.createElement(_icon2.default, { type: 'left', style: { marginRight: "8px" }, className: 'icon-nav',
                                onClick: this.goBack }),
                            calendarPopoverEnabled ? _react2.default.createElement(
                                _popover2.default,
                                { content: popover, placement: 'bottom', trigger: 'click',
                                    visible: this.state.visible,
                                    onVisibleChange: this.handleVisibleChange },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'header2-text-label', style: { cursor: 'pointer' } },
                                    dateLabel
                                )
                            ) : _react2.default.createElement(
                                'span',
                                { className: 'header2-text-label' },
                                dateLabel
                            ),
                            _react2.default.createElement(_icon2.default, { type: 'right', style: { marginLeft: "8px" }, className: 'icon-nav',
                                onClick: this.goNext })
                        )
                    ),
                    _react2.default.createElement(
                        _col2.default,
                        null,
                        _react2.default.createElement(
                            RadioGroup,
                            { defaultValue: defaultValue, size: 'default', onChange: this.onViewChange },
                            radioButtonList
                        )
                    ),
                    rightCustomHeader
                );
            }

            return _react2.default.createElement(
                'table',
                { className: 'scheduler', style: { width: width } },
                _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                            'td',
                            { colSpan: '2' },
                            schedulerHeader
                        )
                    )
                ),
                _react2.default.createElement(
                    'tbody',
                    null,
                    tbodyContent
                )
            );
        }
    }]);

    return Scheduler;
}(_react.Component), _class.propTypes = {
    schedulerData: _propTypes.PropTypes.object.isRequired,
    prevClick: _propTypes.PropTypes.func.isRequired,
    nextClick: _propTypes.PropTypes.func.isRequired,
    onViewChange: _propTypes.PropTypes.func.isRequired,
    onSelectDate: _propTypes.PropTypes.func.isRequired,
    onSetAddMoreState: _propTypes.PropTypes.func,
    updateEventStart: _propTypes.PropTypes.func,
    updateEventEnd: _propTypes.PropTypes.func,
    moveEvent: _propTypes.PropTypes.func,
    leftCustomHeader: _propTypes.PropTypes.object,
    rightCustomHeader: _propTypes.PropTypes.object,
    newEvent: _propTypes.PropTypes.func,
    subtitleGetter: _propTypes.PropTypes.func,
    eventItemClick: _propTypes.PropTypes.func,
    viewEventClick: _propTypes.PropTypes.func,
    viewEventText: _propTypes.PropTypes.string,
    viewEvent2Click: _propTypes.PropTypes.func,
    viewEvent2Text: _propTypes.PropTypes.string,
    conflictOccurred: _propTypes.PropTypes.func,
    eventItemTemplateResolver: _propTypes.PropTypes.func,
    dndSources: _propTypes.PropTypes.array,
    slotClickedFunc: _propTypes.PropTypes.func,
    slotItemTemplateResolver: _propTypes.PropTypes.func,
    nonAgendaCellHeaderTemplateResolver: _propTypes.PropTypes.func
}, _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.resolveScrollbarSize = function () {
        var schedulerData = _this3.props.schedulerData;

        var browserScrollbarHeight = 17,
            browserScrollbarWidth = 17,
            contentHeight = schedulerData.getSchedulerContentDesiredHeight();
        if (!!_this3.schedulerContent) {
            browserScrollbarHeight = _this3.schedulerContent.offsetHeight - _this3.schedulerContent.clientHeight;
            browserScrollbarWidth = _this3.schedulerContent.offsetWidth - _this3.schedulerContent.clientWidth;
        }
        if (!!_this3.schedulerContentBgTable && !!_this3.schedulerContentBgTable.offsetHeight) {
            contentHeight = _this3.schedulerContentBgTable.offsetHeight;
        }

        var tmpState = {};
        var needSet = false;
        if (browserScrollbarHeight != _this3.state.browserScrollbarHeight) {
            tmpState = _extends({}, tmpState, { browserScrollbarHeight: browserScrollbarHeight });
            needSet = true;
        }
        if (browserScrollbarWidth != _this3.state.browserScrollbarWidth) {
            tmpState = _extends({}, tmpState, { browserScrollbarWidth: browserScrollbarWidth });
            needSet = true;
        }
        if (contentHeight != _this3.state.contentHeight) {
            tmpState = _extends({}, tmpState, { contentHeight: contentHeight });
            needSet = true;
        }
        if (needSet) _this3.setState(tmpState);
    };

    this.schedulerHeadRef = function (element) {
        _this3.schedulerHead = element;
    };

    this.onSchedulerHeadMouseOver = function () {
        _this3.currentArea = 2;
    };

    this.onSchedulerHeadMouseOut = function () {
        _this3.currentArea = -1;
    };

    this.onSchedulerHeadScroll = function (proxy, event) {
        if ((_this3.currentArea === 2 || _this3.currentArea === -1) && _this3.schedulerContent.scrollLeft != _this3.schedulerHead.scrollLeft) _this3.schedulerContent.scrollLeft = _this3.schedulerHead.scrollLeft;
    };

    this.schedulerResourceRef = function (element) {
        _this3.schedulerResource = element;
    };

    this.onSchedulerResourceMouseOver = function () {
        _this3.currentArea = 1;
    };

    this.onSchedulerResourceMouseOut = function () {
        _this3.currentArea = -1;
    };

    this.onSchedulerResourceScroll = function (proxy, event) {
        if ((_this3.currentArea === 1 || _this3.currentArea === -1) && _this3.schedulerContent.scrollTop != _this3.schedulerResource.scrollTop) _this3.schedulerContent.scrollTop = _this3.schedulerResource.scrollTop;
    };

    this.schedulerContentRef = function (element) {
        _this3.schedulerContent = element;
    };

    this.schedulerContentBgTableRef = function (element) {
        _this3.schedulerContentBgTable = element;
    };

    this.onSchedulerContentMouseOver = function () {
        _this3.currentArea = 0;
    };

    this.onSchedulerContentMouseOut = function () {
        _this3.currentArea = -1;
    };

    this.onSchedulerContentScroll = function (proxy, event) {
        if (_this3.currentArea === 0 || _this3.currentArea === -1) {
            if (_this3.schedulerHead.scrollLeft != _this3.schedulerContent.scrollLeft) _this3.schedulerHead.scrollLeft = _this3.schedulerContent.scrollLeft;
            if (_this3.schedulerResource.scrollTop != _this3.schedulerContent.scrollTop) _this3.schedulerResource.scrollTop = _this3.schedulerContent.scrollTop;
        }
    };

    this.onViewChange = function (e) {
        var _props2 = _this3.props,
            onViewChange = _props2.onViewChange,
            schedulerData = _props2.schedulerData;

        var viewType = parseInt(e.target.value.charAt(0));
        var showAgenda = e.target.value.charAt(1) === '1';
        var isEventPerspective = e.target.value.charAt(2) === '1';
        onViewChange(schedulerData, { viewType: viewType, showAgenda: showAgenda, isEventPerspective: isEventPerspective });
    };

    this.goNext = function () {
        var _props3 = _this3.props,
            nextClick = _props3.nextClick,
            schedulerData = _props3.schedulerData;

        nextClick(schedulerData);
    };

    this.goBack = function () {
        var _props4 = _this3.props,
            prevClick = _props4.prevClick,
            schedulerData = _props4.schedulerData;

        prevClick(schedulerData);
    };

    this.handleVisibleChange = function (visible) {
        _this3.setState({ visible: visible });
    };

    this.onSelect = function (date) {
        _this3.setState({
            visible: false
        });

        var _props5 = _this3.props,
            onSelectDate = _props5.onSelectDate,
            schedulerData = _props5.schedulerData;

        onSelectDate(schedulerData, date);
    };
}, _temp);
var DATE_FORMAT = exports.DATE_FORMAT = 'YYYY-MM-DD';
var DATETIME_FORMAT = exports.DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
exports.SchedulerData = _SchedulerData2.default;
exports.ViewTypes = _ViewTypes2.default;
exports.SummaryPos = _SummaryPos2.default;
exports.DnDSource = _DnDSource2.default;
exports.DnDContext = _DnDContext2.default;
exports.AddMorePopover = _AddMorePopover2.default;
exports.DemoData = _DemoData2.default;
exports.default = Scheduler;