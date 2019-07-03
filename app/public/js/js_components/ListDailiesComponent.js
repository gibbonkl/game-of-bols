'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DailyComponent = require('./DailyComponent');

var _DailyComponent2 = _interopRequireDefault(_DailyComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListDailiesComponent = function (_Component) {
    _inherits(ListDailiesComponent, _Component);

    function ListDailiesComponent() {
        _classCallCheck(this, ListDailiesComponent);

        return _possibleConstructorReturn(this, (ListDailiesComponent.__proto__ || Object.getPrototypeOf(ListDailiesComponent)).apply(this, arguments));
    }

    _createClass(ListDailiesComponent, [{
        key: 'renderRow',
        value: function renderRow(daily) {
            return _react2.default.createElement(_DailyComponent2.default, { daily: daily });
        }
    }, {
        key: 'render',
        value: function render() {
            var rows = this.props.dailies;

            return _react2.default.createElement(
                'div',
                null,
                rows.map(this.renderRow)
            );
        }
    }]);

    return ListDailiesComponent;
}(_react.Component);

exports.default = ListDailiesComponent;