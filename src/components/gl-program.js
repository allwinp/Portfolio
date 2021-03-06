Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function compileShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw gl.getShaderInfoLog(shader);
  }

  return shader;
}

var GLProgram =
/*#__PURE__*/
function () {
  function GLProgram(gl, vertexSource, fragmentSource) {
    _classCallCheck(this, GLProgram);

    var vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
    var fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    this.uniforms = {};
    this.program = gl.createProgram();
    this.gl = gl;
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      throw gl.getProgramInfoLog(this.program);
    }

    var uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);

    for (var i = 0; i < uniformCount; i++) {
      var uniformName = gl.getActiveUniform(this.program, i).name;
      this.uniforms[uniformName] = gl.getUniformLocation(this.program, uniformName);
    }
  }

  _createClass(GLProgram, [{
    key: "bind",
    value: function bind() {
      this.gl.useProgram(this.program);
    }
  }]);

  return GLProgram;
}();

exports.default = GLProgram;
//# sourceMappingURL=gl-program.js.map