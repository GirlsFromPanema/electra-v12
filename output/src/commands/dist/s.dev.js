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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var classes_1 = require("../classes");

var Setup =
/*#__PURE__*/
function (_classes_1$Command) {
  _inherits(Setup, _classes_1$Command);

  function Setup(client) {
    var _this;

    _classCallCheck(this, Setup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Setup).call(this, {
      name: "setup",
      description: "The setup command!"
    }));
    _this.client = client;
    return _this;
  }

  _createClass(Setup, [{
    key: "run",
    value: function run(msg, args) {
      var client, embed, obj, one, two, three, finish;
      return regeneratorRuntime.async(function run$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              finish = function _ref4() {
                client.db.set(msg.guild.id, obj);
                msg.channel.send("\u2705 Setup completed!");
                embed["delete"]();
              };

              three = function _ref3() {
                var collector3;
                return regeneratorRuntime.async(function three$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return regeneratorRuntime.awrap(embed.edit({
                          embed: {
                            color: client.brandingColor,
                            title: "Setup Bots",
                            description: "Please mention all Bots (`@Bot1,@Bot2`) you would like to scan for they presence!",
                            footer: {
                              text: "🌐 Powered by Fairfight"
                            }
                          }
                        }));

                      case 2:
                        collector3 = msg.channel.createMessageCollector(function (m) {
                          return m.author.id === msg.author.id;
                        }, {
                          time: 60000
                        });
                        collector3.on("collect", function (m) {
                          var bots = m.mentions.members.filter(function (value) {
                            return value.user.bot;
                          });

                          if (!bots.first()) {
                            msg.channel.send("".concat(message.author.username, " Those bots are not on the Server!"));
                            embed["delete"]();
                          } else {
                            obj.bots = bots.map(function (value, key) {
                              return key;
                            });
                            finish();
                          }

                          m["delete"]();
                          collector3.stop();
                        });
                        collector3.on("end", function (collected) {
                          if (collected.size == 0) {
                            msg.channel.send("No bots received in 60 seconds :(");
                            embed["delete"]();
                          }
                        });

                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                  }
                });
              };

              two = function _ref2() {
                var collector2;
                return regeneratorRuntime.async(function two$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return regeneratorRuntime.awrap(embed.edit({
                          embed: {
                            color: client.brandingColor,
                            title: "Setup Role",
                            description: "Alright! Now i would need the role to ping whenever I see that a bot went on/offline. Please mention it in the next 60 seconds",
                            footer: {
                              text: "🌐 Powered by Fairfight"
                            }
                          }
                        }));

                      case 2:
                        collector2 = msg.channel.createMessageCollector(function (m) {
                          return m.author.id === msg.author.id;
                        }, {
                          time: 60000
                        });
                        collector2.on("collect", function (m) {
                          var role = client.parseRoleMention(m.content.trim(), msg.guild);

                          if (!role) {
                            msg.channel.send("This is not an valid Role!");
                            embed["delete"]();
                          } else {
                            obj.role = role.id;
                            three();
                          }

                          m["delete"]();
                          collector2.stop();
                        });
                        collector2.on("end", function (collected) {
                          if (collected.size == 0) {
                            msg.channel.send("No roles received in 60 seconds :(");
                            embed["delete"]();
                          }
                        });

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              };

              one = function _ref() {
                var collector1 = msg.channel.createMessageCollector(function (m) {
                  return m.author.id === msg.author.id;
                }, {
                  time: 60000
                });
                collector1.on("collect", function (m) {
                  var channel = client.parseChannelMention(m.content.trim(), msg.guild);

                  if (!channel) {
                    msg.channel.send("This is not an valid Channel!");
                    embed["delete"]();
                  } else {
                    obj.channel = channel.id;
                    two();
                  }

                  collector1.stop();
                  m["delete"]();
                });
                collector1.on("end", function (collected) {
                  if (collected.size == 0) {
                    msg.channel.send("No channels received in 60 seconds, setup canceled\n\n To rerun, type `*setup`again!");
                    embed["delete"]();
                  }
                });
              };

              if (msg.guild.me.permissions.has("MANAGE_MESSAGES", "MENTION_EVERYONE", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "VIEW_CHANNEL")) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", msg.channel.send("\n      \u274C I require some Permissions!\n\n      **I need the following Permissions to work on your Server:**\n      MANAGE_MESSAGES, \n      MENTION_EVERYONE, \n      SEND_MESSAGES, \n      READ_MESSAGE_HISTORY,\n      VIEW_CHANNEL\n\n      <:config:855828811630641163> Please add me the right Permissions and re-run this Command!\n  \n      "));

            case 6:
              if (msg.member.permissions.has("ADMINISTRATOR")) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", msg.channel.send("You need Admin Perms to execute this Command"));

            case 8:
              _context3.next = 10;
              return regeneratorRuntime.awrap(msg["delete"]());

            case 10:
              client = this.client;
              _context3.next = 13;
              return regeneratorRuntime.awrap(msg.channel.send({
                embed: {
                  color: client.brandingColor,
                  title: "Setup",
                  description: "Welcome to my setup! I will be looking at the presence of some bots in your server and tell you when they get offline/online!\n Please mention the channel where you would like to send Updates!",
                  footer: {
                    text: "🌐 Powered by Fairfight - TempSetup [60 Sec]"
                  }
                }
              }));

            case 13:
              embed = _context3.sent;
              obj = {
                channel: "",
                role: "",
                bots: [""]
              };
              one();

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }]);
  return Setup;
}(classes_1.Command); // finally done ...
 

exports["default"] = Setup;