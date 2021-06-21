"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var fs_1 = require("fs");
var consts_1 = require("../consts");
var quick_db_1 = require("quick.db");
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1(opts, config) {
        var _this = _super.call(this, opts) || this;
        _this.config = config;
        _this.commands = new discord_js_1.Collection();
        _this.aliases = new discord_js_1.Collection();
        _this.loadEvents();
        _this.loadCommands();
        _this.db = quick_db_1["default"];
        _this.brandingColor = consts_1.brandingColor;
        return _this;
    }
    default_1.prototype.start = function () {
        this.login(this.config.token);
    };
    default_1.prototype.loadEvents = function () {
        var _this = this;
        var eventFiles = fs_1.readdirSync(__dirname + "/../events").filter(function (file) { return file.endsWith('.js'); });
        var _loop_1 = function (file) {
            var event = require(__dirname + "/../events/" + file)["default"];
            if (event.once) {
                this_1.once(event.name, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return event.execute.apply(event, __spreadArrays(args, [_this]));
                });
                console.log("[" + new Date().toISOString() + "][STARTUP][EVENTS] Event " + event.name + " registered! Type: once");
            }
            else {
                this_1.on(event.name, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return event.execute.apply(event, __spreadArrays(args, [_this]));
                });
                console.log("[" + new Date().toISOString() + "][STARTUP][EVENTS] Event " + event.name + " registered! Type: on");
            }
        };
        var this_1 = this;
        for (var _i = 0, eventFiles_1 = eventFiles; _i < eventFiles_1.length; _i++) {
            var file = eventFiles_1[_i];
            _loop_1(file);
        }
    };
    default_1.prototype.loadCommands = function () {
        var _this = this;
        fs_1.readdirSync(__dirname + "/../commands")
            .filter(function (f) { return f.endsWith(".js"); })
            .forEach(function (command) { return __awaiter(_this, void 0, void 0, function () {
            var comm, c;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require(__dirname + "/../commands/" + command); })];
                    case 1:
                        comm = _a.sent();
                        c = new comm["default"](this);
                        this.commands.set(c.name, c);
                        c.aliases.forEach(function (a) {
                            _this.aliases.set(a, c.name);
                        });
                        console.log("[" + new Date().toISOString() + "][STARTUP][COMMANDS] Command " + c.name + " registered!");
                        return [2 /*return*/];
                }
            });
        }); });
    };
    default_1.prototype.isOwner = function (id) {
        return this.config.owners.includes(id);
    };
    default_1.prototype.getCommand = function (name) {
        return this.commands.get(name) || this.commands.get(this.aliases.get(name));
    };
    default_1.prototype.parseChannelMention = function (str, guild) {
        if (!str)
            return;
        ;
        if (!guild)
            return;
        if (!str.startsWith("<#") && !str.endsWith(">"))
            return;
        return guild.channels.cache.get(str.slice(2, -1));
    };
    default_1.prototype.parseRoleMention = function (str, guild) {
        if (!str)
            return;
        ;
        if (!guild)
            return;
        if (!str.startsWith("<@&") && !str.endsWith(">"))
            return;
        return guild.roles.cache.get(str.slice(3, -1));
    };
    return default_1;
}(discord_js_1.Client));
exports["default"] = default_1;
