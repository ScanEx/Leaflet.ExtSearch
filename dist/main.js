'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var EventTarget = function () {
    function EventTarget() {
        classCallCheck(this, EventTarget);

        this.listeners = {};
    }

    createClass(EventTarget, [{
        key: 'addEventListener',
        value: function addEventListener(type, callback) {
            if (!(type in this.listeners)) {
                this.listeners[type] = [];
            }
            this.listeners[type].push(callback);
        }
    }, {
        key: 'on',
        value: function on(type, callback) {
            this.addEventListener(type, callback);
            return this;
        }
    }, {
        key: 'removeEventListener',
        value: function removeEventListener(type, callback) {
            if (!(type in this.listeners)) {
                return;
            }
            var stack = this.listeners[type];
            for (var i = 0, l = stack.length; i < l; i++) {
                if (stack[i] === callback) {
                    stack.splice(i, 1);
                    return this.removeEventListener(type, callback);
                }
            }
        }
    }, {
        key: 'off',
        value: function off(type, callback) {
            this.removeEventListener(type, callback);
            return this;
        }
    }, {
        key: 'dispatchEvent',
        value: function dispatchEvent(event) {
            if (!(event.type in this.listeners)) {
                return;
            }
            var stack = this.listeners[event.type];
            Object.defineProperty(event, 'target', {
                enumerable: false,
                configurable: false,
                writable: false,
                value: this
            });
            for (var i = 0, l = stack.length; i < l; i++) {
                stack[i].call(this, event);
            }
        }
    }]);
    return EventTarget;
}();

var scanexEventTarget_cjs = EventTarget;

var ResultView =
/*#__PURE__*/
function (_EventTarget) {
  _inherits(ResultView, _EventTarget);

  function ResultView(_ref) {
    var _this;

    var input = _ref.input,
        _ref$replaceInput = _ref.replaceInput,
        replaceInput = _ref$replaceInput === void 0 ? false : _ref$replaceInput;

    _classCallCheck(this, ResultView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ResultView).call(this));
    _this._input = input;
    _this.index = -1;
    _this.count = 0;
    _this._item = null;
    _this._inputText = '';
    _this._replaceInput = replaceInput;
    _this._list = L.DomUtil.create('div');

    _this._list.setAttribute('class', 'leaflet-ext-search-list noselect');

    _this.allowNavigation = true;
    _this._list.style.top = "".concat(_this._input.offsetTop + _this._input.offsetHeight + 2, "px");
    _this._list.style.left = "".concat(_this._input.offsetLeft, "px");
    _this._handleKey = _this._handleKey.bind(_assertThisInitialized(_this));

    _this._input.addEventListener('keydown', _this._handleKey);

    _this._handleInputClick = _this._handleInputClick.bind(_assertThisInitialized(_this));

    _this._input.addEventListener('click', _this._handleInputClick);

    _this._handleFocus = _this._handleFocus.bind(_assertThisInitialized(_this));

    _this._input.addEventListener('focus', _this._handleFocus);

    _this._list.addEventListener('keydown', _this._handleKey);

    _this._handleWheel = _this._handleWheel.bind(_assertThisInitialized(_this));

    _this._list.addEventListener('wheel', _this._handleWheel);

    L.DomEvent.disableClickPropagation(_this._list).disableScrollPropagation(_this._list); // this._list.addEventListener('mousewheel', this._handleWheel.bind(this));
    // this._list.addEventListener('MozMousePixelScroll', this._handleWheel.bind(this));       

    _this._input.parentElement.appendChild(_this._list);

    _this._handleChange = _this._handleChange.bind(_assertThisInitialized(_this));

    _this._input.addEventListener('input', _this._handleChange);

    return _this;
  }

  _createClass(ResultView, [{
    key: "_handleInputClick",
    value: function _handleInputClick(e) {
      e.stopPropagation();
    }
  }, {
    key: "_handleFocus",
    value: function _handleFocus(e) {
      if (this.index >= 0) {
        var el = this._list.querySelector("[tabindex=\"".concat(this.index, "\"]"));

        L.DomUtil.removeClass(el, 'leaflet-ext-search-list-selected');
      }

      this.index = -1;
      this._item = null;
    }
  }, {
    key: "_handleChange",
    value: function _handleChange(e) {
      this._inputText = this._input.value;
    }
  }, {
    key: "_handleWheel",
    value: function _handleWheel(e) {
      e.stopPropagation();
    }
  }, {
    key: "_handleKey",
    value: function _handleKey(e) {
      if (this.listVisible()) {
        switch (e.keyCode) {
          // ArroLeft / ArrowRight
          case 37:
          case 39:
            e.stopPropagation();
            break;
          // ArrowDown

          case 40:
            e.preventDefault();
            e.stopPropagation();

            if (this.allowNavigation) {
              if (this.index < 0) {
                this.index = 0;
              } else if (0 <= this.index && this.index < this.count - 1) {
                var _el = this._list.querySelector("[tabindex=\"".concat(this.index, "\"]"));

                L.DomUtil.removeClass(_el, 'leaflet-ext-search-list-selected');
                ++this.index;
              } else {
                var _el2 = this._list.querySelector("[tabindex=\"".concat(this.index, "\"]"));

                L.DomUtil.removeClass(_el2, 'leaflet-ext-search-list-selected');
                this.index = this.count - 1;
              }

              var el = this._list.querySelector("[tabindex=\"".concat(this.index, "\"]"));

              L.DomUtil.addClass(el, 'leaflet-ext-search-list-selected');
              this.selectItem(this.index);
              el.focus();
            }

            break;
          // ArrowUp

          case 38:
            e.preventDefault();
            e.stopPropagation();

            if (this.allowNavigation) {
              if (this.index > 0) {
                var _el3 = this._list.querySelector("[tabindex=\"".concat(this.index, "\"]"));

                L.DomUtil.removeClass(_el3, 'leaflet-ext-search-list-selected');
                --this.index;
                _el3 = this._list.querySelector("[tabindex=\"".concat(this.index, "\"]"));
                L.DomUtil.addClass(_el3, 'leaflet-ext-search-list-selected');
                this.selectItem(this.index);

                _el3.focus();
              } else if (this.index === 0) {
                this._input.focus();

                this._input.value = this._inputText;
              }
            }

            break;
          // Enter

          case 13:
            if (this.index < 0 && this._input.value) {
              var text = this._input.value;

              this._input.focus();

              this._input.setSelectionRange(text.length, text.length);

              this.hide();
              var event = document.createEvent('Event');
              event.initEvent('suggestions:confirm', false, false);
              event.detail = text;
              this.dispatchEvent(event);
            } else {
              this.complete(this.index);
            }

            break;
          // Escape

          case 27:
            if (this.index < 0) {
              this.hide();
            }

            this._input.focus();

            this._input.value = this._inputText;
            break;

          default:
            break;
        }
      } else {
        if (e.keyCode === 13 && this._input.value) {
          var _text = this._input.value;

          this._input.setSelectionRange(_text.length, _text.length);

          var _event = document.createEvent('Event');

          _event.initEvent('suggestions:confirm', false, false);

          _event.detail = _text;
          this.dispatchEvent(_event);
        } else if (e.keyCode === 27) {
          this._input.value = '';
          this.index = -1;

          this._input.focus();
        }
      }
    }
  }, {
    key: "listVisible",
    value: function listVisible() {
      return this.count > 0 && this._list.style.display !== 'none';
    }
  }, {
    key: "selectItem",
    value: function selectItem(i) {
      this._item = this._items[i];
      var text = this._item.name;

      if (this._replaceInput) {
        this._input.value = text;

        this._input.setSelectionRange(text.length, text.length);
      }
    }
  }, {
    key: "_handleClick",
    value: function _handleClick(i, e) {
      e.preventDefault();
      this.complete(i);
    }
  }, {
    key: "complete",
    value: function complete(i) {
      var item = i >= 0 ? this._items[i] : this._item ? this._item : null;

      if (item) {
        this._item = item;
        this.index = -1;
        var text = item.name;

        if (this._replaceInput) {
          this._input.value = text;

          this._input.setSelectionRange(text.length, text.length);
        }

        this._input.focus();

        this.hide();
        var event = document.createEvent('Event');
        event.initEvent('suggestions:select', false, false);
        event.detail = item;
        this.dispatchEvent(event);
      }
    }
  }, {
    key: "show",
    value: function show(items, highlight) {
      if (items.length) {
        this._item = null;
        this.index = -1;
        this._items = items;
        var html = '<ul>' + this._items.filter(function (x) {
          return x.name && x.name.length;
        }).map(function (x, i) {
          var name = "<span class=\"leaflet-ext-search-list-item-normal\">".concat(x.name, "</span>");

          if (highlight && highlight.length) {
            var start = x.name.toLowerCase().indexOf(highlight.toLowerCase());

            if (start != -1) {
              var head = x.name.substr(0, start);

              if (head.length) {
                head = "<span class=\"leaflet-ext-search-list-item-normal\">".concat(head, "</span>");
              }

              var tail = x.name.substr(start + highlight.length);

              if (tail.length) {
                tail = "<span class=\"leaflet-ext-search-list-item-normal\">".concat(tail, "</span>");
              }

              name = "".concat(head, "<span class=\"leaflet-ext-search-list-item-highlight\">").concat(highlight, "</span>").concat(tail);
            }
          }

          return "<li tabindex=".concat(i, ">").concat(name, "</li>");
        }, []).join('') + '</ul>';
        this._list.innerHTML = html;

        var elements = this._list.querySelectorAll('li');

        for (var i = 0; i < elements.length; ++i) {
          elements[i].addEventListener('click', this._handleClick.bind(this, i));
        }

        this.count = elements.length;
        this._list.style.display = 'block';
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      this._list.style.display = 'none';
    }
  }]);

  return ResultView;
}(scanexEventTarget_cjs);

function chain(tasks, state) {
  return tasks.reduce(function (prev, next) {
    return prev.then(next);
  }, new Promise(function (resolve, reject) {
    return resolve(state);
  }));
}

var SearchWidget =
/*#__PURE__*/
function (_EventTarget) {
  _inherits(SearchWidget, _EventTarget);

  function SearchWidget(container, _ref) {
    var _this;

    var placeHolder = _ref.placeHolder,
        providers = _ref.providers,
        _ref$suggestionTimeou = _ref.suggestionTimeout,
        suggestionTimeout = _ref$suggestionTimeou === void 0 ? 1000 : _ref$suggestionTimeou,
        _ref$suggestionLimit = _ref.suggestionLimit,
        suggestionLimit = _ref$suggestionLimit === void 0 ? 10 : _ref$suggestionLimit,
        _ref$fuzzySearchLimit = _ref.fuzzySearchLimit,
        fuzzySearchLimit = _ref$fuzzySearchLimit === void 0 ? 1000 : _ref$fuzzySearchLimit,
        _ref$retrieveManyOnEn = _ref.retrieveManyOnEnter,
        retrieveManyOnEnter = _ref$retrieveManyOnEn === void 0 ? false : _ref$retrieveManyOnEn,
        _ref$replaceInputOnEn = _ref.replaceInputOnEnter,
        replaceInputOnEnter = _ref$replaceInputOnEn === void 0 ? false : _ref$replaceInputOnEn;

    _classCallCheck(this, SearchWidget);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SearchWidget).call(this));
    _this._container = container;
    _this._allowSuggestion = true;
    _this._providers = providers;
    _this._suggestionTimeout = suggestionTimeout;
    _this._suggestionLimit = suggestionLimit;
    _this._fuzzySearchLimit = fuzzySearchLimit;
    _this._retrieveManyOnEnter = retrieveManyOnEnter;
    _this._replaceInputOnEnter = replaceInputOnEnter;

    _this._container.classList.add('leaflet-ext-search');

    _this._container.innerHTML = "<input type=\"text\" value=\"\" placeholder=\"".concat(placeHolder, "\" /><span class=\"leaflet-ext-search-button\"></span>");
    _this._input = _this._container.querySelector('input');
    _this._handleChange = _this._handleChange.bind(_assertThisInitialized(_this));

    _this._input.addEventListener('input', _this._handleChange);

    _this._handleMouseMove = _this._handleMouseMove.bind(_assertThisInitialized(_this));

    _this._input.addEventListener('mousemove', _this._handleMouseMove);

    _this._input.addEventListener('dragstart', _this._handleMouseMove);

    _this._input.addEventListener('drag', _this._handleMouseMove);

    _this._handleSearch = _this._handleSearch.bind(_assertThisInitialized(_this));
    _this._button = _this._container.querySelector('.leaflet-ext-search-button');

    _this._button.addEventListener('click', _this._handleSearch);

    _this.results = new ResultView({
      input: _this._input,
      replaceInput: _this._replaceInputOnEnter
    });
    _this._search = _this._search.bind(_assertThisInitialized(_this));
    _this._selectItem = _this._selectItem.bind(_assertThisInitialized(_this));

    _this.results.addEventListener('suggestions:confirm', function (e) {
      var event = document.createEvent('Event');
      event.initEvent('suggestions:confirm', false, false);
      event.detail = e.detail;

      _this.dispatchEvent(event);

      _this._search(e);
    });

    _this.results.addEventListener('suggestions:select', _this._selectItem); // map.on ('click', this.results.hide.bind(this.results));
    // map.on ('dragstart', this.results.hide.bind(this.results));


    return _this;
  }

  _createClass(SearchWidget, [{
    key: "_suggest",
    value: function _suggest(text) {
      var _this2 = this;

      this.results.allowNavigation = false;

      var tasks = this._providers.filter(function (provider) {
        return provider.showSuggestion;
      }).map(function (provider) {
        return function (state) {
          return new Promise(function (resolve) {
            if (state.completed) {
              resolve(state);
            } else {
              provider.find(text, _this2._suggestionLimit, false, false).then(function (response) {
                state.completed = response.length > 0;
                state.response = state.response.concat(response);
                resolve(state);
              })["catch"](function (e) {
                return console.log(e);
              });
            }
          });
        };
      });

      chain(tasks, {
        completed: false,
        response: []
      }).then(function (state) {
        _this2.results.show(state.response, text.trim());

        _this2.results.allowNavigation = true;
      });
    }
  }, {
    key: "_handleChange",
    value: function _handleChange(e) {
      var _this3 = this;

      if (this._input.value.length) {
        if (this._allowSuggestion) {
          this._allowSuggestion = false;
          this._timer = setTimeout(function () {
            clearTimeout(_this3._timer);
            _this3._allowSuggestion = true;
            var text = _this3._input.value;

            _this3._suggest(text);
          }, this._suggestionTimeout);
        }
      } else {
        this.results.hide();
      }
    }
  }, {
    key: "_handleMouseMove",
    value: function _handleMouseMove(e) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, {
    key: "_search",
    value: function _search(e) {
      var _this4 = this;

      var text = e.detail;

      var tasks = this._providers.filter(function (provider) {
        return provider.showOnEnter;
      }).map(function (provider) {
        return function (state) {
          return new Promise(function (resolve) {
            if (state.completed) {
              resolve(state);
            } else {
              provider.find(text, _this4._retrieveManyOnEnter ? _this4._fuzzySearchLimit : 1, true, true).then(function (response) {
                state.completed = response.length > 0;
                state.response = state.response.concat(response);
                resolve(state);
              })["catch"](function (e) {
                console.log(e);
                resolve(state);
              });
            }
          });
        };
      });

      chain(tasks, {
        completed: false,
        response: []
      }).then(function (state) {// if(state.response.length > 0 && !this._retrieveManyOnEnter){
        //     let item = state.response[0];
        //     item.provider
        //     .fetch(item.properties)
        //     .then(response => {});                    
        // }
      });
      this.results && this.results.hide();
    }
  }, {
    key: "_selectItem",
    value: function _selectItem(e) {
      var item = e.detail;
      return item.provider.fetch(item.properties);
    }
  }, {
    key: "_handleSearch",
    value: function _handleSearch(e) {
      e.stopPropagation();

      this._search({
        detail: this._input.value
      });
    }
  }, {
    key: "setText",
    value: function setText(text) {
      this._input.value = text;
    }
  }, {
    key: "setPlaceHolder",
    value: function setPlaceHolder(value) {
      this._input.placeholder = value;
    }
  }]);

  return SearchWidget;
}(scanexEventTarget_cjs);

var SearchControl = L.Control.extend({
  includes: L.Evented ? L.Evented.prototype : L.Mixin.Events,
  initialize: function initialize(options) {
    L.setOptions(this, options);
    this._allowSuggestion = true;
    this.options.suggestionTimeout = this.options.suggestionTimeout || 1000;
    this.options.suggestionLimit = this.options.suggestionLimit || 10;
  },
  onAdd: function onAdd(map) {
    this._container = L.DomUtil.create('div', 'leaflet-ext-search');
    this._widget = new SearchWidget(this._container, this.options);
    map.on('click', this._widget.results.hide.bind(this._widget.results));
    map.on('dragstart', this._widget.results.hide.bind(this._widget.results));
    return this._container;
  },
  addTo: function addTo(map) {
    L.Control.prototype.addTo.call(this, map);

    if (this.options.addBefore) {
      this.addBefore(this.options.addBefore);
    }

    return this;
  },
  addBefore: function addBefore(id) {
    var parentNode = this._parent && this._parent._container;

    if (!parentNode) {
      parentNode = this._map && this._map._controlCorners[this.getPosition()];
    }

    if (!parentNode) {
      this.options.addBefore = id;
    } else {
      for (var i = 0, len = parentNode.childNodes.length; i < len; i++) {
        var it = parentNode.childNodes[i];

        if (id === it._id) {
          parentNode.insertBefore(this._container, it);
          break;
        }
      }
    }

    return this;
  },
  setText: function setText(text) {
    this._widget.setText(text);
  },
  setPlaceHolder: function setPlaceHolder(value) {
    this._widget.setPlaceHolder(value);
  }
});

var OsmDataProvider =
/*#__PURE__*/
function (_EventTarget) {
  _inherits(OsmDataProvider, _EventTarget);

  function OsmDataProvider(_ref) {
    var _this;

    var serverBase = _ref.serverBase;

    _classCallCheck(this, OsmDataProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OsmDataProvider).call(this));
    _this._serverBase = serverBase;
    _this.showSuggestion = true;
    _this.showOnSelect = true;
    _this.showOnEnter = true;
    _this.find = _this.find.bind(_assertThisInitialized(_this));
    _this.fetch = _this.fetch.bind(_assertThisInitialized(_this));
    _this._convertGeometry = _this._convertGeometry.bind(_assertThisInitialized(_this));
    _this._key = window.KOSMOSNIMKI_SESSION_KEY == null || window.KOSMOSNIMKI_SESSION_KEY == 'INVALID' ? '' : "&key=".concat(window.KOSMOSNIMKI_SESSION_KEY);
    return _this;
  }

  _createClass(OsmDataProvider, [{
    key: "_convertGeometry",
    value: function _convertGeometry(geometry) {
      switch (geometry.type.toUpperCase()) {
        case 'POINT':
          geometry.type = 'Point';
          break;

        case 'POLYGON':
          geometry.type = 'Polygon';
          break;

        case 'MULTIPOLYGON':
          geometry.type = 'MultiPolygon';
          break;

        case 'LINESTRING':
        case 'POLYLINE':
          geometry.type = 'LineString';
          break;

        case 'MULTILINESTRING':
          geometry.type = 'MultiLineString';
          break;

        default:
          throw 'Unknown WKT type';
      }

      return geometry;
    }
  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function (obj) {
      var _this2 = this;

      var query = "WrapStyle=None&RequestType=ID&ID=".concat(obj.ObjCode, "&TypeCode=").concat(obj.TypeCode, "&UseOSM=1");
      var req = new Request("".concat(this._serverBase, "/SearchObject/SearchAddress.ashx?").concat(query).concat(this._key));
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var init = {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        cache: 'default'
      };
      return new Promise(function (resolve, reject) {
        fetch(req, init).then(function (response) {
          return response.json();
        }).then(function (json) {
          if (json.Status === 'ok') {
            var rs = json.Result.reduce(function (a, x) {
              return a.concat(x.SearchResult);
            }, []).map(function (x) {
              var g = _this2._convertGeometry(x.Geometry);

              var props = Object.keys(x).filter(function (k) {
                return k !== 'Geometry';
              }).reduce(function (a, k) {
                a[k] = x[k];
                return a;
              }, {});
              return {
                feature: {
                  type: 'Feature',
                  geometry: g,
                  properties: props
                },
                provider: _this2,
                query: obj
              };
            });
            var event = document.createEvent('Event');
            event.initEvent('fetch', false, false);
            event.detail = rs;

            _this2.dispatchEvent(event);

            resolve(rs);
          } else {
            reject(json);
          }
        })["catch"](function (response) {
          return reject(response);
        });
      });
    })
  }, {
    key: "find",
    value: function find(value, limit, strong, retrieveGeometry) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if (value || value.trim()) {
          var _strong = Boolean(strong) ? 1 : 0;

          var _withoutGeometry = Boolean(retrieveGeometry) ? 0 : 1;

          var query = "WrapStyle=None&RequestType=SearchObject&IsStrongSearch=".concat(_strong, "&WithoutGeometry=").concat(_withoutGeometry, "&UseOSM=1&Limit=").concat(limit, "&SearchString=").concat(encodeURIComponent(value));
          var req = new Request("".concat(_this3._serverBase, "/SearchObject/SearchAddress.ashx?").concat(query).concat(_this3._key));
          var headers = new Headers();
          headers.append('Content-Type', 'application/json');
          var init = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            cache: 'default'
          };
          fetch(req, init).then(function (response) {
            return response.json();
          }).then(function (json) {
            if (json.Status === 'ok') {
              var rs = json.Result.reduce(function (a, x) {
                return a.concat(x.SearchResult);
              }, []).map(function (x) {
                if (retrieveGeometry && x.Geometry) {
                  var g = _this3._convertGeometry(x.Geometry);

                  var props = Object.keys(x).filter(function (k) {
                    return k !== 'Geometry';
                  }).reduce(function (a, k) {
                    a[k] = x[k];
                    return a;
                  }, {});
                  return {
                    name: x.ObjNameShort,
                    feature: {
                      type: 'Feature',
                      geometry: g,
                      properties: props
                    },
                    properties: props,
                    provider: _this3,
                    query: value
                  };
                } else {
                  return {
                    name: x.ObjNameShort,
                    properties: x,
                    provider: _this3,
                    query: value
                  };
                }
              });

              if (strong && retrieveGeometry) {
                var event = document.createEvent('Event');
                event.initEvent('fetch', false, false);
                event.detail = rs;

                _this3.dispatchEvent(event);
              }

              resolve(rs);
            } else {
              reject(json);
            }
          })["catch"](function (response) {
            return reject(response);
          });
        } else {
          reject('Empty string');
        }
      });
    }
  }]);

  return OsmDataProvider;
}(scanexEventTarget_cjs);

var CoordinatesDataProvider =
/*#__PURE__*/
function (_EventTarget) {
  _inherits(CoordinatesDataProvider, _EventTarget);

  function CoordinatesDataProvider() {
    var _this;

    _classCallCheck(this, CoordinatesDataProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CoordinatesDataProvider).call(this));
    _this.showSuggestion = false;
    _this.showOnSelect = false;
    _this.showOnEnter = true;
    _this.fetch = _this.fetch.bind(_assertThisInitialized(_this));
    _this.find = _this.find.bind(_assertThisInitialized(_this));
    _this.rxF = new RegExp('^\\s*\\-?(\\d+(\\.\\d+)?)(\\s+[N|S])?(,\\s*|\\s+)\\-?(\\d+(\\.\\d+)?)(\\s+[E|W])?');
    _this.rxD = new RegExp("^\\s*(\\d{1,2})[\\s|\\u00b0](\\d{1,2})[\\s|\\u0027](\\d{1,2}\\.\\d+)\\u0022?(\\s+[N|S])?,?\\s+(\\d{1,2})[\\s|\\u00b0](\\d{1,2})[\\s|\\u0027](\\d{1,2}\\.\\d+)\\u0022?(\\s+[E|W])?");
    return _this;
  }

  _createClass(CoordinatesDataProvider, [{
    key: "_parseCoordinates",
    value: function _parseCoordinates(value) {
      var m = this.rxD.exec(value);

      if (Array.isArray(m) && m.length === 9) {
        return this._parseDegrees([m[1], m[2], m[3], m[5], m[6], m[7]].map(function (x) {
          return parseFloat(x);
        }));
      }

      m = this.rxF.exec(value);

      if (Array.isArray(m) && m.length === 8) {
        return {
          type: 'Point',
          coordinates: [parseFloat(m[5]), parseFloat(m[1])]
        };
      }

      return null;
    }
  }, {
    key: "_parseDegrees",
    value: function _parseDegrees(_ref) {
      var _ref2 = _slicedToArray(_ref, 6),
          latDeg = _ref2[0],
          latMin = _ref2[1],
          latSec = _ref2[2],
          lngDeg = _ref2[3],
          lngMin = _ref2[4],
          lngSec = _ref2[5];

      return {
        type: 'Point',
        coordinates: [lngDeg + lngMin / 60 + lngSec / 3600, latDeg + latMin / 60 + latSec / 3600]
      };
    }
  }, {
    key: "fetch",
    value: function fetch(value) {
      return new Promise(function (resolve) {
        return resolve([]);
      });
    }
  }, {
    key: "find",
    value: function find(value, limit, strong, retrieveGeometry) {
      var _this2 = this;

      var g = this._parseCoordinates(value);

      return new Promise(function (resolve) {
        var result = {
          feature: {
            type: 'Feature',
            geometry: g,
            properties: {}
          },
          provider: _this2,
          query: value
        };

        if (g) {
          var event = document.createEvent('Event');
          event.initEvent('fetch', false, false);
          event.detail = result;

          _this2.dispatchEvent(event);
        }

        resolve(g ? [result] : []);
      });
    }
  }]);

  return CoordinatesDataProvider;
}(scanexEventTarget_cjs);

var CadastreDataProvider =
/*#__PURE__*/
function (_EventTarget) {
  _inherits(CadastreDataProvider, _EventTarget);

  function CadastreDataProvider(_ref) {
    var _this;

    var serverBase = _ref.serverBase,
        tolerance = _ref.tolerance;

    _classCallCheck(this, CadastreDataProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CadastreDataProvider).call(this));
    _this._serverBase = serverBase;
    _this._tolerance = tolerance;
    _this.showSuggestion = true;
    _this.showOnSelect = false;
    _this.showOnEnter = true;
    _this._cadastreLayers = [{
      id: 1,
      title: 'Участок',
      reg: /^\d\d:\d+:\d+:\d+$/
    }, {
      id: 2,
      title: 'Квартал',
      reg: /^\d\d:\d+:\d+$/
    }, {
      id: 3,
      title: 'Район',
      reg: /^\d\d:\d+$/
    }, {
      id: 4,
      title: 'Округ',
      reg: /^\d\d$/
    }, {
      id: 5,
      title: 'ОКС',
      reg: /^\d\d:\d+:\d+:\d+:\d+$/
    }, {
      id: 10,
      title: 'ЗОУИТ',
      reg: /^\d+\.\d+\.\d+/ // ,
      // {id: 7, title: 'Границы', 	reg: /^\w+$/},
      // {id: 6, title: 'Тер.зоны', 	reg: /^\w+$/},
      // {id: 12, title: 'Лес', 		reg: /^\w+$/},
      // {id: 13, title: 'Красные линии', 		reg: /^\w+$/},
      // {id: 15, title: 'СРЗУ', 	reg: /^\w+$/},
      // {id: 16, title: 'ОЭЗ', 		reg: /^\w+$/},
      // {id: 9, title: 'ГОК', 		reg: /^\w+$/},
      // {id: 10, title: 'ЗОУИТ', 	reg: /^\w+$/}
      // /[^\d\:]/g,
      // /\d\d:\d+$/,
      // /\d\d:\d+:\d+$/,
      // /\d\d:\d+:\d+:\d+$/

    }];
    return _this;
  }

  _createClass(CadastreDataProvider, [{
    key: "getCadastreLayer",
    value: function getCadastreLayer(str, type) {
      str = str.trim();

      for (var i = 0, len = this._cadastreLayers.length; i < len; i++) {
        var it = this._cadastreLayers[i];

        if (it.id === type) {
          return it;
        }

        if (it.reg.exec(str)) {
          return it;
        }
      }

      return this._cadastreLayers[0];
    }
  }, {
    key: "find",
    value: function find(value, limit, strong, retrieveGeometry) {
      var _this2 = this;

      var cadastreLayer = this.getCadastreLayer(value);
      return new Promise(function (resolve) {
        // let req = new Request(`${this._serverBase}/typeahead?limit=${limit}&skip=0&text=${value}&type=${cadastreLayer.id}`);
        var req = new Request("".concat(_this2._serverBase, "/features/").concat(cadastreLayer.id, "?text=").concat(value, "&tolerance=").concat(_this2._tolerance, "&limit=").concat(limit));
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var init = {
          method: 'GET',
          mode: 'cors',
          cache: 'default'
        };
        fetch(req, init).then(function (response) {
          return response.json();
        }).then(function (json) {
          // if(json.status === 200){
          var rs = json.features.map(function (x) {
            return {
              name: x.attrs.name || x.attrs.cn || x.attrs.id,
              properties: x,
              provider: _this2,
              query: value
            };
          });
          resolve(rs); // }
          // else {
          // resolve(json);
          // }                                       
        });
      });
    }
  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function (obj) {
      var _this3 = this;

      var text = obj.attrs.name || obj.attrs.cn || obj.attrs.id;
      var cadastreLayer = this.getCadastreLayer(text, obj.type);
      return new Promise(function (resolve) {
        if (cadastreLayer) {
          // let req = new Request(`${this._serverBase}/features/${cadastreLayer.id}?tolerance=${this._tolerance}&limit=1&text=${obj.value}`);
          var req = new Request("".concat(_this3._serverBase, "/features/").concat(cadastreLayer.id, "?tolerance=").concat(_this3._tolerance, "&limit=1&text=").concat(text));
          var headers = new Headers();
          headers.append('Content-Type', 'application/json');
          var init = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
          };
          fetch(req, init).then(function (response) {
            return response.json();
          }).then(function (json) {
            if (json.status === 200) {
              var event = document.createEvent('Event');
              event.initEvent('fetch', false, false);
              event.detail = json;

              _this3.dispatchEvent(event);

              var rs = json.features.map(function (x) {
                return {
                  name: x.attrs.name || x.attrs.cn || x.attrs.id,
                  properties: x,
                  provider: _this3,
                  query: obj
                };
              });
              resolve(rs);
            } else {
              resolve(json);
            }
          });
        } else {
          resolve([]);
        }
      });
    })
  }]);

  return CadastreDataProvider;
}(scanexEventTarget_cjs);

exports.CadastreDataProvider = CadastreDataProvider;
exports.CoordinatesDataProvider = CoordinatesDataProvider;
exports.OsmDataProvider = OsmDataProvider;
exports.SearchControl = SearchControl;
exports.SearchWidget = SearchWidget;
//# sourceMappingURL=main.js.map
