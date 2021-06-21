"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var discord_js_1 = require("discord.js");

var fs_1 = require("fs");

var consts_1 = require("../consts");

var quick_db_plus_1 = __importDefault(require("quick.db-plus"));

var default_1 =
/*#__PURE__*/
function (_discord_js_1$Client) {
  _inherits(default_1, _discord_js_1$Client);

  function default_1(opts, config) {
    var _this;

    _classCallCheck(this, default_1);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(default_1).call(this, opts));
    _this.config = config;
    _this.commands = new discord_js_1.Collection();
    _this.aliases = new discord_js_1.Collection();

    _this.loadEvents();

    _this.loadCommands();

    _this.db = new quick_db_plus_1["default"].db("Bot");
    _this.brandingColor = consts_1.brandingColor;
    return _this;
  }

  _createClass(default_1, [{
    key: "start",
    value: function start() {
      this.login(this.config.token);
    } // Event Handler

  }, {
    key: "loadEvents",
    value: function loadEvents() {
      var _this2 = this;

      var eventFiles = fs_1.readdirSync("".concat(__dirname, "/../events")).filter(function (file) {
        return file.endsWith('.js');
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var file = _step.value;

          var event = require("".concat(__dirname, "/../events/").concat(file))["default"];

          if (event.once) {
            _this2.once(event.name, function () {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              return event.execute.apply(event, args.concat([_this2]));
            });

            console.log("[".concat(new Date().toISOString(), "][STARTUP][EVENTS] Event ").concat(event.name, " registered! Type: once"));
          } else {
            _this2.on(event.name, function () {
              for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }

              return event.execute.apply(event, args.concat([_this2]));
            });

            console.log("[".concat(new Date().toISOString(), "][STARTUP][EVENTS] Event ").concat(event.name, " registered! Type: on"));
          }
        };

        for (var _iterator = eventFiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } // Command Handler

  }, {
    key: "loadCommands",
    value: function loadCommands() {
      var _this3 = this;

      fs_1.readdirSync("".concat(__dirname, "/../commands")).filter(function (f) {
        return f.endsWith(".js");
      }).forEach(function _callee(command) {
        var comm, c;
        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap(Promise.resolve().then(function () {
                  return __importStar(require("".concat(__dirname, "/../commands/").concat(command)));
                }));

              case 2:
                comm = _context.sent;
                c = new comm["default"](_this3);

                _this3.commands.set(c.name, c);

                c.aliases.forEach(function (a) {
                  _this3.aliases.set(a, c.name);
                });
                console.log("[".concat(new Date().toISOString(), "][STARTUP][COMMANDS] Command ").concat(c.name, " registered!"));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        });
      });
    }
  }, {
    key: "isOwner",
    value: function isOwner(id) {
      return this.config.owners.includes(id);
    }
  }, {
    key: "getCommand",
    value: function getCommand(name) {
      return this.commands.get(name) || this.commands.get(this.aliases.get(name));
    }
  }, {
    key: "parseChannelMention",
    value: function parseChannelMention(str, guild) {
      if (!str) return;
      ;
      if (!guild) return;
      if (!str.startsWith("<#") && !str.endsWith(">")) return;
      return guild.channels.cache.get(str.slice(2, -1));
    }
  }, {
    key: "parseRoleMention",
    value: function parseRoleMention(str, guild) {
      if (!str) return;
      ;
      if (!guild) return;
      if (!str.startsWith("<@&") && !str.endsWith(">")) return;
      return guild.roles.cache.get(str.slice(3, -1));
    }
  }]);

  return default_1;
}(discord_js_1.Client);

exports["default"] = default_1;