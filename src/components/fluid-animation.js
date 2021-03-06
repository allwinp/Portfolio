Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultConfig = void 0;

var _glProgram = _interopRequireDefault(require("./gl-program"));

var _getGlContext = _interopRequireDefault(require("./get-gl-context"));

var _shaders = _interopRequireDefault(require("./shaders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultConfig = {
  textureDownsample: 1,
  densityDissipation: 0.98,
  velocityDissipation: 0.99,
  pressureDissipation: 0.8,
  pressureIterations: 25,
  curl: 30,
  splatRadius: 0.005
};
exports.defaultConfig = defaultConfig;

var Pointer = function Pointer() {
  _classCallCheck(this, Pointer);

  this.id = -1;
  this.x = 0;
  this.y = 0;
  this.dx = 0;
  this.dy = 0;
  this.down = true;
  this.moved = false;
  this.color = [Math.random(), Math.random(), Math.random()];

  setInterval(() => {
    this.color = [Math.random(), Math.random(), Math.random()];
  }, 1500);
};

var FluidAnimation =
/*#__PURE__*/
function () {
  function FluidAnimation(opts) {
    var _this = this;

    _classCallCheck(this, FluidAnimation);

    _defineProperty(this, "onMouseMove", function (e) {
      _this._pointers[0].moved = _this._pointers[0].down;
      _this._pointers[0].dx = (e.offsetX - _this._pointers[0].x) * 10.0;
      _this._pointers[0].dy = (e.offsetY - _this._pointers[0].y) * 10.0;
      _this._pointers[0].x = e.offsetX;
      _this._pointers[0].y = e.offsetY;
    });

    _defineProperty(this, "onMouseDown", function (e) {
      _this._pointers[0].down = true;
      _this._pointers[0].color = [Math.random() + 0.2, Math.random() + 0.2, Math.random() + 0.2];
    });

    _defineProperty(this, "onMouseUp", function (e) {
      _this._pointers[0].down = true;
    });

    _defineProperty(this, "onTouchStart", function (e) {
      for (var i = 0; i < e.touches.length; ++i) {
        _this._pointers[i].down = true;
        _this._pointers[i].color = [Math.random() + 0.2, Math.random() + 0.2, Math.random() + 0.2];
      }
    });

    _defineProperty(this, "onTouchMove", function (e) {
      for (var i = 0; i < e.touches.length; ++i) {
        var touch = e.touches[i];
        _this._pointers[i].moved = _this._pointers[i].down;
        _this._pointers[i].dx = (touch.clientX - _this._pointers[i].x) * 10.0;
        _this._pointers[i].dy = (touch.clientY - _this._pointers[i].y) * 10.0;
        _this._pointers[i].x = touch.clientX;
        _this._pointers[i].y = touch.clientY;
      }
    });

    _defineProperty(this, "onTouchEnd", function (e) {
      for (var i = 0; i < e.touches.length; ++i) {
        _this._pointers[i].down = false;
      }
    });

    _defineProperty(this, "_blit", function (destination) {
      var gl = _this._gl;
      gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    });

    var canvas = opts.canvas,
        _opts$config = opts.config,
        config = _opts$config === void 0 ? _objectSpread({}, defaultConfig, opts.config) : _opts$config;
    this._canvas = canvas;
    this._config = config;
    this._pointers = [new Pointer()];
    this._splatStack = [];

    var _getGLContext = (0, _getGlContext.default)(canvas),
        _gl = _getGLContext.gl,
        ext = _getGLContext.ext;

    this._gl = _gl;
    this._ext = ext;

    this._initPrograms();

    this._initBlit();

    this.resize();
    this._time = Date.now();
    this._timer = 0;
  }

  _createClass(FluidAnimation, [{
    key: "addSplat",
    value: function addSplat(splat) {
      this._splatStack.push([splat]);
    }
  }, {
    key: "addSplats",
    value: function addSplats(splats) {
      this._splatStack.push(Array.isArray(splats) ? splats : [splats]);
    }
  }, {
    key: "addRandomSplats",
    value: function addRandomSplats(count) {
      var splats = [];

      for (var i = 0; i < count; ++i) {
        splats.push(this._getRandomSplat());
      }

      this.addSplats(splats);
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this$_canvas = this._canvas,
          width = _this$_canvas.width,
          height = _this$_canvas.height;

      if (this._width !== width || this._height !== height) {
        this._width = width;
        this._height = height;

        this._initFramebuffers();
      }
    }
  }, {
    key: "_initPrograms",
    value: function _initPrograms() {
      var gl = this._gl;
      var ext = this._ext;
      this._programs = {};
      this._programs.clear = new _glProgram.default(gl, _shaders.default.vert, _shaders.default.clear);
      this._programs.display = new _glProgram.default(gl, _shaders.default.vert, _shaders.default.display);
      this._programs.splat = new _glProgram.default(gl, _shaders.default.vert, _shaders.default.splat);
      this._programs.advection = new _glProgram.default(gl, _shaders.default.vert, ext.supportLinearFiltering ? _shaders.default.advection : _shaders.default.advectionManualFiltering);
      this._programs.divergence = new _glProgram.default(gl, _shaders.default.vert, _shaders.default.divergence);
      this._programs.curl = new _glProgram.default(gl, _shaders.default.vert, _shaders.default.curl);
      this._programs.vorticity = new _glProgram.default(gl, _shaders.default.vert, _shaders.default.vorticity);
      this._programs.pressure = new _glProgram.default(gl, _shaders.default.vert, _shaders.default.pressure);
      this._programs.gradientSubtract = new _glProgram.default(gl, _shaders.default.vert, _shaders.default.gradientSubtract);
    }
  }, {
    key: "_initFramebuffers",
    value: function _initFramebuffers() {
      var gl = this._gl;
      var ext = this._ext;

      function createFBO(texId, w, h, internalFormat, format, type, param) {
        gl.activeTexture(gl.TEXTURE0 + texId);
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
        var fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        gl.viewport(0, 0, w, h);
        gl.clear(gl.COLOR_BUFFER_BIT);
        return [texture, fbo, texId];
      }

      function createDoubleFBO(texId, w, h, internalFormat, format, type, param) {
        var fbo1 = createFBO(texId, w, h, internalFormat, format, type, param);
        var fbo2 = createFBO(texId + 1, w, h, internalFormat, format, type, param);
        return {
          get read() {
            return fbo1;
          },

          get write() {
            return fbo2;
          },

          swap: function swap() {
            var temp = fbo1;
            fbo1 = fbo2;
            fbo2 = temp;
          }
        };
      }

      this._textureWidth = gl.drawingBufferWidth >> this._config.textureDownsample;
      this._textureHeight = gl.drawingBufferHeight >> this._config.textureDownsample;
      var texType = ext.halfFloatTexType;
      var rgba = ext.formatRGBA;
      var rg = ext.formatRG;
      var r = ext.formatR;
      this._density = createDoubleFBO(2, this._textureWidth, this._textureHeight, rgba.internalFormat, rgba.format, texType, ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST);
      this._velocity = createDoubleFBO(0, this._textureWidth, this._textureHeight, rg.internalFormat, rg.format, texType, ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST);
      this._divergence = createFBO(4, this._textureWidth, this._textureHeight, r.internalFormat, r.format, texType, gl.NEAREST);
      this._curl = createFBO(5, this._textureWidth, this._textureHeight, r.internalFormat, r.format, texType, gl.NEAREST);
      this._pressure = createDoubleFBO(6, this._textureWidth, this._textureHeight, r.internalFormat, r.format, texType, gl.NEAREST);
    }
  }, {
    key: "_initBlit",
    value: function _initBlit() {
      var gl = this._gl;
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);
    }
  }, {
    key: "_splat",
    value: function _splat(x, y, dx, dy, color) {
      var gl = this._gl;

      this._programs.splat.bind();

      gl.uniform1i(this._programs.splat.uniforms.uTarget, this._velocity.read[2]);
      gl.uniform1f(this._programs.splat.uniforms.aspectRatio, this._canvas.width / this._canvas.height);
      gl.uniform2f(this._programs.splat.uniforms.point, x / this._canvas.width, 1.0 - y / this._canvas.height);
      gl.uniform3f(this._programs.splat.uniforms.color, dx, -dy, 1.0);
      gl.uniform1f(this._programs.splat.uniforms.radius, this._config.splatRadius);

      this._blit(this._velocity.write[1]);

      this._velocity.swap();

      gl.uniform1i(this._programs.splat.uniforms.uTarget, this._density.read[2]);
      gl.uniform3f(this._programs.splat.uniforms.color, color[0] * 0.3, color[1] * 0.3, color[2] * 0.3);

      this._blit(this._density.write[1]);

      this._density.swap();
    }
  }, {
    key: "_addSplat",
    value: function _addSplat(splat) {
      var x = splat.x,
          y = splat.y,
          dx = splat.dx,
          dy = splat.dy,
          color = splat.color;
      if (x === undefined) return;
      if (y === undefined) return;
      if (dx === undefined) return;
      if (dy === undefined) return;
      if (color === undefined) return;

      this._splat(x, y, dx, dy, color);
    }
  }, {
    key: "_addSplats",
    value: function _addSplats(splats) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = splats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var splat = _step.value;

          this._addSplat(splat);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "_getRandomSplat",
    value: function _getRandomSplat() {
      var color = [Math.random() * 10, Math.random() * 10, Math.random() * 10];
      var x = this._canvas.width * Math.random();
      var y = this._canvas.height * Math.random();
      var dx = 1000 * (Math.random() - 0.5);
      var dy = 1000 * (Math.random() - 0.5);
      return {
        x: x,
        y: y,
        dx: dx,
        dy: dy,
        color: color
      };
    }
  }, {
    key: "update",
    value: function update() {
      var gl = this._gl;
      var dt = Math.min((Date.now() - this._time) / 1000, 0.016);
      this._time = Date.now();
      this._timer += 0.0001;
      var w = this._textureWidth;
      var h = this._textureHeight;
      var iW = 1.0 / w;
      var iH = 1.0 / h;
      gl.viewport(0, 0, w, h);

      if (this._splatStack.length > 0) {
        this._addSplats(this._splatStack.pop());
      }

      this._programs.advection.bind();

      gl.uniform2f(this._programs.advection.uniforms.texelSize, iW, iH);
      gl.uniform1i(this._programs.advection.uniforms.uVelocity, this._velocity.read[2]);
      gl.uniform1i(this._programs.advection.uniforms.uSource, this._velocity.read[2]);
      gl.uniform1f(this._programs.advection.uniforms.dt, dt);
      gl.uniform1f(this._programs.advection.uniforms.dissipation, this._config.velocityDissipation);

      this._blit(this._velocity.write[1]);

      this._velocity.swap();

      gl.uniform1i(this._programs.advection.uniforms.uVelocity, this._velocity.read[2]);
      gl.uniform1i(this._programs.advection.uniforms.uSource, this._density.read[2]);
      gl.uniform1f(this._programs.advection.uniforms.dissipation, this._config.densityDissipation);

      this._blit(this._density.write[1]);

      this._density.swap();

      for (var i = 0; i < this._pointers.length; i++) {
        var pointer = this._pointers[i];

        if (pointer.moved) {
          this._splat(pointer.x, pointer.y, pointer.dx, pointer.dy, pointer.color);

          pointer.moved = false;
        }
      }

      this._programs.curl.bind();

      gl.uniform2f(this._programs.curl.uniforms.texelSize, iW, iH);
      gl.uniform1i(this._programs.curl.uniforms.uVelocity, this._velocity.read[2]);

      this._blit(this._curl[1]);

      this._programs.vorticity.bind();

      gl.uniform2f(this._programs.vorticity.uniforms.texelSize, iW, iH);
      gl.uniform1i(this._programs.vorticity.uniforms.uVelocity, this._velocity.read[2]);
      gl.uniform1i(this._programs.vorticity.uniforms.uCurl, this._curl[2]);
      gl.uniform1f(this._programs.vorticity.uniforms.curl, this._config.curl);
      gl.uniform1f(this._programs.vorticity.uniforms.dt, dt);

      this._blit(this._velocity.write[1]);

      this._velocity.swap();

      this._programs.divergence.bind();

      gl.uniform2f(this._programs.divergence.uniforms.texelSize, iW, iH);
      gl.uniform1i(this._programs.divergence.uniforms.uVelocity, this._velocity.read[2]);

      this._blit(this._divergence[1]);

      this._programs.clear.bind();

      var pressureTexId = this._pressure.read[2];
      gl.activeTexture(gl.TEXTURE0 + pressureTexId);
      gl.bindTexture(gl.TEXTURE_2D, this._pressure.read[0]);
      gl.uniform1i(this._programs.clear.uniforms.uTexture, pressureTexId);
      gl.uniform1f(this._programs.clear.uniforms.value, this._config.pressureDissipation);

      this._blit(this._pressure.write[1]);

      this._pressure.swap();

      this._programs.pressure.bind();

      gl.uniform2f(this._programs.pressure.uniforms.texelSize, iW, iH);
      gl.uniform1i(this._programs.pressure.uniforms.uDivergence, this._divergence[2]);
      pressureTexId = this._pressure.read[2];
      gl.uniform1i(this._programs.pressure.uniforms.uPressure, pressureTexId);
      gl.activeTexture(gl.TEXTURE0 + pressureTexId);

      for (var _i = 0; _i < this._config.pressureIterations; _i++) {
        gl.bindTexture(gl.TEXTURE_2D, this._pressure.read[0]);

        this._blit(this._pressure.write[1]);

        this._pressure.swap();
      }

      this._programs.gradientSubtract.bind();

      gl.uniform2f(this._programs.gradientSubtract.uniforms.texelSize, iW, iH);
      gl.uniform1i(this._programs.gradientSubtract.uniforms.uPressure, this._pressure.read[2]);
      gl.uniform1i(this._programs.gradientSubtract.uniforms.uVelocity, this._velocity.read[2]);

      this._blit(this._velocity.write[1]);

      this._velocity.swap();

      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

      this._programs.display.bind();

      gl.uniform1i(this._programs.display.uniforms.uTexture, this._density.read[2]);

      this._blit(null);
    }
  }, {
    key: "config",
    get: function get() {
      return this._config;
    },
    set: function set(config) {
      this._config = config;
    }
  }, {
    key: "width",
    get: function get() {
      return this._canvas.width;
    }
  }, {
    key: "height",
    get: function get() {
      return this._canvas.height;
    }
  }]);

  return FluidAnimation;
}();

exports.default = FluidAnimation;
//# sourceMappingURL=fluid-animation.js.map