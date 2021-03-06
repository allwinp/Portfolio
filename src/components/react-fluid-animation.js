Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _raf = _interopRequireDefault(require("raf"));

var _reactSizeme = _interopRequireDefault(require("react-sizeme"));

var _fluidAnimation = _interopRequireWildcard(require("./fluid-animation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ReactFluidAnimation =
/*#__PURE__*/
function (_Component) {
  _inherits(ReactFluidAnimation, _Component);

  function ReactFluidAnimation() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ReactFluidAnimation);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ReactFluidAnimation)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_containerRef", function (ref) {
      _this._container = ref;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_canvasRef", function (ref) {
      _this._canvas = ref;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_onMouseDown", function (event) {
      event.preventDefault();

      _this._animation.onMouseDown(event.nativeEvent);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_onMouseMove", function (event) {
      event.preventDefault();

      _this._animation.onMouseMove(event.nativeEvent);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_onMouseUp", function (event) {
      event.preventDefault();

      _this._animation.onMouseUp(event.nativeEvent);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_onTouchStart", function (event) {
      _this._animation.onTouchStart(event.nativeEvent);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_onTouchMove", function (event) {
      _this._animation.onTouchMove(event.nativeEvent);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_onTouchEnd", function (event) {
      _this._animation.onTouchEnd(event.nativeEvent);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_onResize", function () {
      _this._canvas.width = _this._container.clientWidth;
      _this._canvas.height = _this._container.clientHeight;

      if (_this._animation) {
        _this._animation.resize();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_tick", function () {
      if (_this._animation) {
        _this._animation.update();
      }

      _this._tickRaf = (0, _raf.default)(_this._tick);
    });

    return _this;
  }

  _createClass(ReactFluidAnimation, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      this._onResize();

      if (props.config) {
        this._animation.config = _objectSpread({}, props.config, {
          defaultConfig: _fluidAnimation.defaultConfig
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this._onResize);

      this._reset(this.props);

      this._tick();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._onResize);

      if (this._tickRaf) {
        _raf.default.cancel(this._tickRaf);

        this._tickRaf = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          content = _this$props.content,
          config = _this$props.config,
          animationRef = _this$props.animationRef,
          style = _this$props.style,
          size = _this$props.size,
          rest = _objectWithoutProperties(_this$props, ["content", "config", "animationRef", "style", "size"]);

      return _react.default.createElement("div", _extends({
        style: _objectSpread({
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }, style)
      }, rest, {
        ref: this._containerRef
      }), _react.default.createElement("canvas", {
        ref: this._canvasRef,
        onMouseDown: this._onMouseDown,
        onMouseMove: this._onMouseMove,
        onMouseUp: this._onMouseUp,
        onTouchStart: this._onTouchStart,
        onTouchMove: this._onTouchMove,
        onTouchEnd: this._onTouchEnd,
        style: {
          width: '100%',
          height: '100%',
        }
      }));
    }
  }, {
    key: "_reset",
    value: function _reset(props) {
      var animationRef = props.animationRef,
          content = props.content,
          config = props.config;

      this._onResize();

      this._animation = new _fluidAnimation.default({
        canvas: this._canvas,
        content: content,
        config: config
      });

      if (animationRef) {
        animationRef(this._animation); // this._animation.addRandomSplats(parseInt(Math.random() * 20) + 5)
      }
    }
  }]);

  return ReactFluidAnimation;
}(_react.Component);

_defineProperty(ReactFluidAnimation, "propTypes", {
  content: _propTypes.default.string,
  config: _propTypes.default.object,
  style: _propTypes.default.object,
  animationRef: _propTypes.default.func,
  size: _propTypes.default.shape({
    width: _propTypes.default.number,
    height: _propTypes.default.number
  })
});

_defineProperty(ReactFluidAnimation, "defaultProps", {
  config: _fluidAnimation.defaultConfig,
  style: {}
});

var _default = (0, _reactSizeme.default)({
  monitorWidth: true,
  monitorHeight: true
})(ReactFluidAnimation);

exports.default = _default;
//# sourceMappingURL=react-fluid-animation.js.map