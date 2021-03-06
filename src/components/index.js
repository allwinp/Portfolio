Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FluidAnimation", {
  enumerable: true,
  get: function get() {
    return _fluidAnimation.default;
  }
});
Object.defineProperty(exports, "defaultConfig", {
  enumerable: true,
  get: function get() {
    return _fluidAnimation.defaultConfig;
  }
});
exports.default = void 0;

var _reactFluidAnimation = _interopRequireDefault(require("./react-fluid-animation"));

var _fluidAnimation = _interopRequireWildcard(require("./fluid-animation"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _reactFluidAnimation.default;
exports.default = _default;
//# sourceMappingURL=index.js.map