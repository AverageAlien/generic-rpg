(function () {
  function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

  function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
    /***/
    "./$$_lazy_route_resource lazy recursive":
    /*!******************************************************!*\
      !*** ./$$_lazy_route_resource lazy namespace object ***!
      \******************************************************/

    /*! no static exports found */

    /***/
    function $$_lazy_route_resourceLazyRecursive(module, exports) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      module.exports = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
      /***/
    },

    /***/
    "./src/app/app.module.ts":
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /*! exports provided: AppModule */

    /***/
    function srcAppAppModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppModule", function () {
        return AppModule;
      });
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/platform-browser */
      "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _modules_app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./modules/app-routing.module */
      "./src/app/modules/app-routing.module.ts");
      /* harmony import */


      var _components_app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./components/app.component */
      "./src/app/components/app.component.ts");
      /* harmony import */


      var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/platform-browser/animations */
      "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
      /* harmony import */


      var _modules_materials_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./modules/materials.module */
      "./src/app/modules/materials.module.ts");
      /* harmony import */


      var _components_game_canvas_game_canvas_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./components/game-canvas/game-canvas.component */
      "./src/app/components/game-canvas/game-canvas.component.ts");
      /* harmony import */


      var _components_level_editor_level_editor_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./components/level-editor/level-editor.component */
      "./src/app/components/level-editor/level-editor.component.ts");

      var AppModule = function AppModule() {
        _classCallCheck(this, AppModule);
      };

      AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
        type: AppModule,
        bootstrap: [_components_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
      });
      AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
        factory: function AppModule_Factory(t) {
          return new (t || AppModule)();
        },
        providers: [],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _modules_app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"], _modules_materials_module__WEBPACK_IMPORTED_MODULE_5__["MaterialsModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, {
          declarations: [_components_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _components_game_canvas_game_canvas_component__WEBPACK_IMPORTED_MODULE_6__["GameCanvasComponent"], _components_level_editor_level_editor_component__WEBPACK_IMPORTED_MODULE_7__["LevelEditorComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _modules_app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"], _modules_materials_module__WEBPACK_IMPORTED_MODULE_5__["MaterialsModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
          args: [{
            declarations: [_components_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _components_game_canvas_game_canvas_component__WEBPACK_IMPORTED_MODULE_6__["GameCanvasComponent"], _components_level_editor_level_editor_component__WEBPACK_IMPORTED_MODULE_7__["LevelEditorComponent"]],
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _modules_app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"], _modules_materials_module__WEBPACK_IMPORTED_MODULE_5__["MaterialsModule"]],
            providers: [],
            bootstrap: [_components_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "./src/app/components/app.component.ts":
    /*!*********************************************!*\
      !*** ./src/app/components/app.component.ts ***!
      \*********************************************/

    /*! exports provided: AppComponent */

    /***/
    function srcAppComponentsAppComponentTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
        return AppComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

      var AppComponent = function AppComponent() {
        _classCallCheck(this, AppComponent);
      };

      AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || AppComponent)();
      };

      AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: AppComponent,
        selectors: [["app-root"]],
        decls: 4,
        vars: 0,
        consts: [[1, "root-box"], [1, "game-title"]],
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Generic RPG ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "router-outlet");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]],
        styles: [".root-box[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-flow: column nowrap;\n  align-items: center;\n  justify-content: flex-start;\n}\n.root-box[_ngcontent-%COMP%]   .game-title[_ngcontent-%COMP%] {\n  color: #ffd000;\n  font-size: 10vmin;\n  height: 10vmin;\n  margin: 2vmin 0;\n  display: flex;\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9hcHAuY29tcG9uZW50LnNjc3MiLCJzcmMvYXNzZXRzL3N0eWxlcy90aGVtZS1jb2xvcnMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBRUEsYUFBQTtFQUNBLHdCQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtBQUZGO0FBSUU7RUFDRSxjQ1hHO0VEWUgsaUJBQUE7RUFDQSxjQUFBO0VBRUEsZUFBQTtFQUVBLGFBQUE7RUFDQSxtQkFBQTtBQUpKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi8uLi9hc3NldHMvc3R5bGVzL3RoZW1lLWNvbG9ycy5zY3NzJztcclxuXHJcbi5yb290LWJveCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG5cclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuXHJcbiAgLmdhbWUtdGl0bGUge1xyXG4gICAgY29sb3I6ICRnb2xkO1xyXG4gICAgZm9udC1zaXplOiAxMHZtaW47XHJcbiAgICBoZWlnaHQ6IDEwdm1pbjtcclxuXHJcbiAgICBtYXJnaW46IDJ2bWluIDA7XHJcblxyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgfVxyXG59XHJcbiIsIiRtYWluQmdDb2xvcjogIzMxMzEzMTtcclxuJGdvbGQ6ICNmZmQwMDA7XHJcbiJdfQ== */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "./src/app/components/game-canvas/game-canvas.component.ts":
    /*!*****************************************************************!*\
      !*** ./src/app/components/game-canvas/game-canvas.component.ts ***!
      \*****************************************************************/

    /*! exports provided: GameCanvasComponent */

    /***/
    function srcAppComponentsGameCanvasGameCanvasComponentTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "GameCanvasComponent", function () {
        return GameCanvasComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var phaser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! phaser */
      "./node_modules/phaser/dist/phaser.js");
      /* harmony import */


      var phaser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */


      var src_app_scenes_levelScene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/scenes/levelScene */
      "./src/app/scenes/levelScene.ts");
      /* harmony import */


      var src_app_core_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! src/app/core/constants */
      "./src/app/core/constants.ts");
      /* harmony import */


      var src_app_services_input_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! src/app/services/input.service */
      "./src/app/services/input.service.ts");
      /* harmony import */


      var src_app_services_level_loader_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! src/app/services/level-loader.service */
      "./src/app/services/level-loader.service.ts");
      /* harmony import */


      var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/material/button */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");

      var GameCanvasComponent = /*#__PURE__*/function () {
        function GameCanvasComponent(inputService, levelLoader, ngZone) {
          _classCallCheck(this, GameCanvasComponent);

          this.inputService = inputService;
          this.levelLoader = levelLoader;
          this.ngZone = ngZone;
          this.level = new src_app_scenes_levelScene__WEBPACK_IMPORTED_MODULE_2__["Level"](inputService, levelLoader);
          this.config = {
            type: phaser__WEBPACK_IMPORTED_MODULE_1___default.a.AUTO,
            height: src_app_core_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].Screen.SCREEN_H,
            width: src_app_core_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].Screen.SCREEN_W,
            scene: [this.level],
            parent: 'gameContainer',
            physics: {
              "default": 'arcade'
            },
            dom: {
              createContainer: true
            }
          };
        }

        _createClass(GameCanvasComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this = this;

            this.ngZone.runOutsideAngular(function () {
              _this.phaserGame = new phaser__WEBPACK_IMPORTED_MODULE_1___default.a.Game(_this.config);
            });
          }
        }, {
          key: "onExportLevel",
          value: function onExportLevel() {
            console.log(this.levelLoader.exportLevel(this.level));
          }
        }, {
          key: "onImportLevel",
          value: function onImportLevel() {
            var levelJson = prompt('Paste level JSON');

            if (!levelJson) {
              return;
            }

            this.levelLoader.importlevel(levelJson, this.level);
          }
        }]);

        return GameCanvasComponent;
      }();

      GameCanvasComponent.ɵfac = function GameCanvasComponent_Factory(t) {
        return new (t || GameCanvasComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_input_service__WEBPACK_IMPORTED_MODULE_4__["InputService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_level_loader_service__WEBPACK_IMPORTED_MODULE_5__["LevelLoaderService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]));
      };

      GameCanvasComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: GameCanvasComponent,
        selectors: [["app-game-canvas"]],
        decls: 6,
        vars: 0,
        consts: [[1, "root"], ["id", "gameContainer"], ["mat-raised-button", "", 3, "click"]],
        template: function GameCanvasComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GameCanvasComponent_Template_button_click_2_listener() {
              return ctx.onExportLevel();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Export level");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GameCanvasComponent_Template_button_click_4_listener() {
              return ctx.onImportLevel();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Import level");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZ2FtZS1jYW52YXMvZ2FtZS1jYW52YXMuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GameCanvasComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-game-canvas',
            templateUrl: './game-canvas.component.html',
            styleUrls: ['./game-canvas.component.scss']
          }]
        }], function () {
          return [{
            type: src_app_services_input_service__WEBPACK_IMPORTED_MODULE_4__["InputService"]
          }, {
            type: src_app_services_level_loader_service__WEBPACK_IMPORTED_MODULE_5__["LevelLoaderService"]
          }, {
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "./src/app/components/level-editor/level-editor.component.ts":
    /*!*******************************************************************!*\
      !*** ./src/app/components/level-editor/level-editor.component.ts ***!
      \*******************************************************************/

    /*! exports provided: LevelEditorComponent */

    /***/
    function srcAppComponentsLevelEditorLevelEditorComponentTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LevelEditorComponent", function () {
        return LevelEditorComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var src_app_core_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/core/constants */
      "./src/app/core/constants.ts");
      /* harmony import */


      var src_app_scenes_levelEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/scenes/levelEditor */
      "./src/app/scenes/levelEditor.ts");
      /* harmony import */


      var src_app_services_input_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! src/app/services/input.service */
      "./src/app/services/input.service.ts");
      /* harmony import */


      var src_app_services_level_loader_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! src/app/services/level-loader.service */
      "./src/app/services/level-loader.service.ts");
      /* harmony import */


      var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/material/button */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");

      var LevelEditorComponent = /*#__PURE__*/function () {
        function LevelEditorComponent(inputService, levelLoader, ngZone) {
          _classCallCheck(this, LevelEditorComponent);

          this.inputService = inputService;
          this.levelLoader = levelLoader;
          this.ngZone = ngZone;
          this.level = new src_app_scenes_levelEditor__WEBPACK_IMPORTED_MODULE_2__["LevelEditor"](inputService, levelLoader);
          this.config = {
            type: Phaser.AUTO,
            height: src_app_core_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Screen.SCREEN_H,
            width: src_app_core_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Screen.SCREEN_W,
            scene: [this.level],
            parent: 'gameContainer',
            physics: {
              "default": 'arcade'
            },
            disableContextMenu: true
          };
        }

        _createClass(LevelEditorComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this2 = this;

            this.ngZone.runOutsideAngular(function () {
              _this2.phaserGame = new Phaser.Game(_this2.config);
            });
          }
        }, {
          key: "onExportLevel",
          value: function onExportLevel() {
            console.log(this.levelLoader.exportLevel(this.level));
          }
        }, {
          key: "onImportLevel",
          value: function onImportLevel() {
            var levelJson = prompt('Paste level JSON');

            if (!levelJson) {
              return;
            }

            this.levelLoader.importlevel(levelJson, this.level);
          }
        }]);

        return LevelEditorComponent;
      }();

      LevelEditorComponent.ɵfac = function LevelEditorComponent_Factory(t) {
        return new (t || LevelEditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_input_service__WEBPACK_IMPORTED_MODULE_3__["InputService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_level_loader_service__WEBPACK_IMPORTED_MODULE_4__["LevelLoaderService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]));
      };

      LevelEditorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: LevelEditorComponent,
        selectors: [["app-level-editor"]],
        decls: 6,
        vars: 0,
        consts: [[1, "root"], ["id", "gameContainer"], ["mat-raised-button", "", 3, "click"]],
        template: function LevelEditorComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LevelEditorComponent_Template_button_click_2_listener() {
              return ctx.onExportLevel();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Export level");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LevelEditorComponent_Template_button_click_4_listener() {
              return ctx.onImportLevel();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Import level");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbGV2ZWwtZWRpdG9yL2xldmVsLWVkaXRvci5jb21wb25lbnQuc2NzcyJ9 */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LevelEditorComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-level-editor',
            templateUrl: './level-editor.component.html',
            styleUrls: ['./level-editor.component.scss']
          }]
        }], function () {
          return [{
            type: src_app_services_input_service__WEBPACK_IMPORTED_MODULE_3__["InputService"]
          }, {
            type: src_app_services_level_loader_service__WEBPACK_IMPORTED_MODULE_4__["LevelLoaderService"]
          }, {
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "./src/app/core/blocks.ts":
    /*!********************************!*\
      !*** ./src/app/core/blocks.ts ***!
      \********************************/

    /*! exports provided: BlockType, Blocks, BlockIds */

    /***/
    function srcAppCoreBlocksTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BlockType", function () {
        return BlockType;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Blocks", function () {
        return Blocks;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "BlockIds", function () {
        return BlockIds;
      });

      var BlockType;

      (function (BlockType) {
        BlockType[BlockType["Background"] = 0] = "Background";
        BlockType[BlockType["Foreground"] = 1] = "Foreground";
      })(BlockType || (BlockType = {}));

      var Blocks = new Map([['grass', {
        type: BlockType.Background,
        texture: 'grass01'
      }], ['stone_floor', {
        type: BlockType.Background,
        texture: 'stone_floor01'
      }], ['stone_bricks', {
        type: BlockType.Foreground,
        texture: 'stone_wall01'
      }]]);
      var BlockIds = Array.from(Blocks.keys());
      /***/
    },

    /***/
    "./src/app/core/constants.ts":
    /*!***********************************!*\
      !*** ./src/app/core/constants.ts ***!
      \***********************************/

    /*! exports provided: Constants */

    /***/
    function srcAppCoreConstantsTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Constants", function () {
        return Constants;
      });

      var Screen = function Screen() {
        _classCallCheck(this, Screen);
      };

      Screen.SCREEN_W = 800;
      Screen.SCREEN_H = 608;

      var Level = function Level() {
        _classCallCheck(this, Level);
      };

      Level.GRID_SIZE_X = 32;
      Level.GRID_SIZE_Y = 32;
      Level.CHUNK_W = 32; // in tiles

      Level.CHUNK_H = 32; // in tiles

      var Character = function Character() {
        _classCallCheck(this, Character);
      };

      Character.MAX_SPEED_MULT = 5;
      Character.COLLIDER_W = 20;
      Character.COLLIDER_H = 20;
      Character.COLLIDER_OFFSET_X = 1;
      Character.COLLIDER_OFFSET_Y = 7;
      var Constants = {
        Screen: Screen,
        Level: Level,
        Character: Character
      };
      /***/
    },

    /***/
    "./src/app/core/factions.ts":
    /*!**********************************!*\
      !*** ./src/app/core/factions.ts ***!
      \**********************************/

    /*! exports provided: Faction, FactionsAreFriendly */

    /***/
    function srcAppCoreFactionsTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Faction", function () {
        return Faction;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FactionsAreFriendly", function () {
        return FactionsAreFriendly;
      });

      var Faction;

      (function (Faction) {
        Faction[Faction["Player"] = 0] = "Player";
        Faction[Faction["Baddies"] = 1] = "Baddies";
      })(Faction || (Faction = {}));

      function FactionsAreFriendly(fac1, fac2) {
        if (fac1 === fac2) {
          return true;
        }

        return false;
      }
      /***/

    },

    /***/
    "./src/app/core/mapGrid.ts":
    /*!*********************************!*\
      !*** ./src/app/core/mapGrid.ts ***!
      \*********************************/

    /*! exports provided: MapGrid */

    /***/
    function srcAppCoreMapGridTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "MapGrid", function () {
        return MapGrid;
      });
      /* harmony import */


      var _blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./blocks */
      "./src/app/core/blocks.ts");
      /* harmony import */


      var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./constants */
      "./src/app/core/constants.ts");

      var MapGrid = /*#__PURE__*/function () {
        function MapGrid(levelScene, tileSet) {
          _classCallCheck(this, MapGrid);

          this.levelScene = levelScene;
          this.tileSet = tileSet;
          this.chunks = [];
          this.tileMap = levelScene.make.tilemap({
            width: _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.CHUNK_W,
            height: _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.CHUNK_H,
            tileWidth: _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.GRID_SIZE_X,
            tileHeight: _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.GRID_SIZE_Y
          });
          this.tileMap.addTilesetImage(tileSet, tileSet, _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.GRID_SIZE_X, _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.GRID_SIZE_Y, 1, 2);
          this.collidingBlocks = Array.from(_blocks__WEBPACK_IMPORTED_MODULE_0__["Blocks"].entries()).filter(function (e) {
            return e[1].type === _blocks__WEBPACK_IMPORTED_MODULE_0__["BlockType"].Foreground;
          }).map(function (e) {
            return _blocks__WEBPACK_IMPORTED_MODULE_0__["BlockIds"].indexOf(e[0]);
          });
        }

        _createClass(MapGrid, [{
          key: "addBlock",
          value: function addBlock(pos, block) {
            var layer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var _this$resolveBlockInf = this.resolveBlockInfo(block),
                blockName = _this$resolveBlockInf.blockName,
                blockData = _this$resolveBlockInf.blockData;

            var _this$localizeChunk = this.localizeChunk(pos),
                chunkPos = _this$localizeChunk.chunkPos,
                tilePos = _this$localizeChunk.tilePos; // const chunkPos = new Phaser.Math.Vector2(
            //   Math.floor(pos.x / Constants.Level.CHUNK_W),
            //   Math.floor(pos.y / Constants.Level.CHUNK_H)
            // );


            var chunk = this.ensureChunkExists(chunkPos, layer); // const tilePosInChunk = new Phaser.Math.Vector2(pos)
            //   .subtract(new Phaser.Math.Vector2(chunkPos)
            //     .multiply(new Phaser.Math.Vector2(
            //       Constants.Level.CHUNK_W,
            //       Constants.Level.CHUNK_H
            //     ))
            //   );

            chunk.putTileAt(_blocks__WEBPACK_IMPORTED_MODULE_0__["BlockIds"].indexOf(blockName), tilePos.x, tilePos.y);
          }
        }, {
          key: "fillArea",
          value: function fillArea(pos, size, block) {
            var layer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
            var lowerCorner = new Phaser.Math.Vector2(pos).add(size);

            for (var i = pos.x; i <= lowerCorner.x; ++i) {
              for (var j = pos.y; j <= lowerCorner.y; ++j) {
                this.addBlock(new Phaser.Math.Vector2(i, j), block, layer);
              }
            }
          }
        }, {
          key: "getBlockAt",
          value: function getBlockAt(pos) {
            var layer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            // TODO: rewrite this and the rest to return indices instead in order to optimize level exports
            var _this$localizeChunk2 = this.localizeChunk(pos),
                chunkPos = _this$localizeChunk2.chunkPos,
                tilePos = _this$localizeChunk2.tilePos;

            if (!this.chunks[layer] || !this.chunks[layer][chunkPos.x] || !this.chunks[layer][chunkPos.x][chunkPos.y]) {
              return null;
            }

            var tile = this.chunks[layer][chunkPos.x][chunkPos.y].getTileAt(tilePos.x, tilePos.y);

            if (!tile) {
              return null;
            }

            return _blocks__WEBPACK_IMPORTED_MODULE_0__["BlockIds"][tile.index];
          }
        }, {
          key: "getAll",
          value: function getAll() {
            return this.chunks.flatMap(function (x) {
              return x.flatMap(function (y) {
                return y.flatMap(function (chunk) {
                  return chunk.getTilesWithin().map(function (tile) {
                    return {
                      name: _blocks__WEBPACK_IMPORTED_MODULE_0__["BlockIds"][tile.index],
                      x: tile.x + chunk.x / _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.GRID_SIZE_X,
                      y: tile.y + chunk.y / _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.GRID_SIZE_Y
                    };
                  });
                });
              });
            });
          }
        }, {
          key: "getAllChunks",
          value: function getAllChunks(layer) {
            if (!layer) {
              return this.chunks.flatMap(function (L) {
                return L.flatMap(function (row) {
                  return row;
                });
              });
            }

            return this.chunks[layer].flatMap(function (row) {
              return row;
            });
          }
        }, {
          key: "getAllOfLayer",
          value: function getAllOfLayer(layer) {
            return Object.values(this.chunks[layer]).flatMap(function (row) {
              return Object.values(row).flatMap(function (chunk) {
                return chunk.getTilesWithin(0, 0, undefined, undefined, {
                  isNotEmpty: true
                }).map(function (tile) {
                  return {
                    name: _blocks__WEBPACK_IMPORTED_MODULE_0__["BlockIds"][tile.index],
                    x: tile.x + chunk.x / _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.GRID_SIZE_X,
                    y: tile.y + chunk.y / _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.GRID_SIZE_Y
                  };
                });
              });
            });
          }
        }, {
          key: "getUsedLayers",
          value: function getUsedLayers() {
            var usedLayers = new Set();

            for (var layer in this.chunks) {
              if (this.chunks.hasOwnProperty(layer)) {
                usedLayers.add(Number(layer));
              }
            }

            return Array.from(usedLayers);
          }
        }, {
          key: "removeBlockAt",
          value: function removeBlockAt(pos) {
            var layer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var _this$localizeChunk3 = this.localizeChunk(pos),
                chunkPos = _this$localizeChunk3.chunkPos,
                tilePos = _this$localizeChunk3.tilePos;

            var chunk = this.chunks[layer][chunkPos.x][chunkPos.y].removeTileAt(tilePos.x, tilePos.y);
          }
        }, {
          key: "clearGrid",
          value: function clearGrid() {
            this.chunks.forEach(function (layer) {
              return layer.forEach(function (row) {
                return row.forEach(function (chunk) {
                  return chunk.destroy();
                });
              });
            });
            this.chunks = [];
          }
        }, {
          key: "ensureChunkExists",
          value: function ensureChunkExists(chunkPos) {
            var layer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (!this.chunks[layer]) {
              this.chunks[layer] = [];
            }

            if (!this.chunks[layer][chunkPos.x]) {
              this.chunks[layer][chunkPos.x] = [];
            }

            if (!this.chunks[layer][chunkPos.x][chunkPos.y]) {
              return this.createChunk(chunkPos, layer);
            }

            return this.chunks[layer][chunkPos.x][chunkPos.y];
          }
        }, {
          key: "createChunk",
          value: function createChunk(chunkPos) {
            var layer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var chunk = this.tileMap.createBlankDynamicLayer("chunk_".concat(layer, "_").concat(chunkPos.x, "_").concat(chunkPos.y), this.tileSet, chunkPos.x * _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.GRID_SIZE_X * _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.CHUNK_W, chunkPos.y * _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.GRID_SIZE_Y * _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.CHUNK_H);
            chunk.setCollision(this.collidingBlocks);
            chunk.setDepth(layer);
            this.levelScene.physics.add.collider(this.levelScene.entities.map(function (e) {
              return e.gameObject;
            }), chunk);
            this.chunks[layer][chunkPos.x][chunkPos.y] = chunk;
            return chunk;
          }
        }, {
          key: "resolveBlockInfo",
          value: function resolveBlockInfo(block) {
            var blockName = null;
            var blockData;

            if (typeof block === 'string') {
              blockName = block;
              blockData = _blocks__WEBPACK_IMPORTED_MODULE_0__["Blocks"].get(blockName);
            } else {
              blockName = 'custom';
              blockData = block;
            }

            return {
              blockName: blockName,
              blockData: blockData
            };
          }
        }, {
          key: "localizeChunk",
          value: function localizeChunk(pos) {
            var chunkPos = new Phaser.Math.Vector2(Math.floor(pos.x / _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.CHUNK_W), Math.floor(pos.y / _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.CHUNK_H));
            var tilePos = new Phaser.Math.Vector2(pos).subtract(new Phaser.Math.Vector2(chunkPos).multiply(new Phaser.Math.Vector2(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.CHUNK_W, _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.CHUNK_H)));
            return {
              chunkPos: chunkPos,
              tilePos: tilePos
            };
          }
        }]);

        return MapGrid;
      }();
      /***/

    },

    /***/
    "./src/app/gameplay/controllers/playerController.ts":
    /*!**********************************************************!*\
      !*** ./src/app/gameplay/controllers/playerController.ts ***!
      \**********************************************************/

    /*! exports provided: PlayerController */

    /***/
    function srcAppGameplayControllersPlayerControllerTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "PlayerController", function () {
        return PlayerController;
      });

      var PlayerController = /*#__PURE__*/function () {
        function PlayerController(inputKeys) {
          _classCallCheck(this, PlayerController);

          this.inputKeys = inputKeys;
        }

        _createClass(PlayerController, [{
          key: "movement",
          get: function get() {
            return new Phaser.Math.Vector2(-this.inputKeys.left.isDown || +this.inputKeys.right.isDown, -this.inputKeys.up.isDown || +this.inputKeys.down.isDown).normalize();
          }
        }, {
          key: "attack",
          get: function get() {
            return null;
          }
        }]);

        return PlayerController;
      }();
      /***/

    },

    /***/
    "./src/app/gameplay/controllers/walkerController.ts":
    /*!**********************************************************!*\
      !*** ./src/app/gameplay/controllers/walkerController.ts ***!
      \**********************************************************/

    /*! exports provided: WalkerController */

    /***/
    function srcAppGameplayControllersWalkerControllerTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "WalkerController", function () {
        return WalkerController;
      });
      /* harmony import */


      var src_app_core_factions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/core/factions */
      "./src/app/core/factions.ts");
      /* harmony import */


      var pathfinding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! pathfinding */
      "./node_modules/pathfinding/index.js");
      /* harmony import */


      var pathfinding__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pathfinding__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */


      var src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/core/constants */
      "./src/app/core/constants.ts");

      var WalkerController = /*#__PURE__*/function () {
        function WalkerController(myself, levelScene) {
          var aggroRadius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 256;
          var unaggroRadius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : aggroRadius * Math.SQRT2;
          var minRange = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 64;

          _classCallCheck(this, WalkerController);

          this.myself = myself;
          this.levelScene = levelScene;
          this.aggroRadius = aggroRadius;
          this.unaggroRadius = unaggroRadius;
          this.minRange = minRange;
          this.target = null;
          this.searchFrequency = 250; // ms

          this.searchIncrement = 16.67;
          this.timeSinceLastSearch = 0;
          this.pathWaypoints = null;
          this.rushAtTarget = false;
          this.unrushDistanceSq = Math.pow(Math.min(src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y, src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X) * 2, 2);
          this.waypointReachedDistanceSq = Math.pow(Math.min(src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X, src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y) * 0.7, 2);
          this._DEBUG = false;
        }

        _createClass(WalkerController, [{
          key: "calculateMovement",
          value: function calculateMovement(targetPos) {
            if (this.myself.gameObject.body.position.distanceSq(targetPos) > this.unrushDistanceSq) {
              this.rushAtTarget = false;
            }

            if (this.rushAtTarget) {
              return new Phaser.Math.Vector2(targetPos).subtract(this.myself.gameObject.body.position).normalize();
            }

            this.timeSinceLastSearch += this.searchIncrement;

            if (!this.pathWaypoints || this.timeSinceLastSearch >= this.searchFrequency) {
              this.pathWaypoints = this.buildPathToTarget(targetPos);
              this.timeSinceLastSearch = 0;

              if (!this.pathWaypoints) {
                debugger;
              }
            }

            if (this.pathWaypoints.length === 0) {
              this.rushAtTarget = true;
              return Phaser.Math.Vector2.ZERO;
            } else if (this.pathWaypoints[0].distanceSq(this.myself.gameObject.body.position) < this.waypointReachedDistanceSq) {
              this.pathWaypoints.shift();

              if (this.pathWaypoints.length === 0) {
                this.rushAtTarget = true;
                return Phaser.Math.Vector2.ZERO;
              }
            }

            return new Phaser.Math.Vector2(this.pathWaypoints[0]).subtract(this.myself.gameObject.body.position).normalize();
          }
        }, {
          key: "buildPathToTarget",
          value: function buildPathToTarget(targetPos) {
            var myPos = this.myself.gameObject.body.position;
            var gridLowerCorner = new Phaser.Math.Vector2(Math.floor((Math.min(myPos.x, targetPos.x) - this.aggroRadius) / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X), Math.floor((Math.min(myPos.y, targetPos.y) - this.aggroRadius) / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y));
            var gridUpperCorner = new Phaser.Math.Vector2(Math.ceil((Math.max(myPos.x, targetPos.x) + this.aggroRadius) / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X), Math.ceil((Math.max(myPos.y, targetPos.y) + this.aggroRadius) / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y));
            var gridSize = new Phaser.Math.Vector2(gridUpperCorner).subtract(gridLowerCorner);
            var matrix = [];

            for (var i = 0; i <= gridSize.y; ++i) {
              matrix.push([]);

              for (var j = 0; j <= gridSize.x; ++j) {
                matrix[i].push(this.levelScene.mapGrid.getBlockAt(new Phaser.Math.Vector2(j + gridLowerCorner.x, i + gridLowerCorner.y)) ? 1 : 0);
              }
            }

            var grid = new pathfinding__WEBPACK_IMPORTED_MODULE_1___default.a.Grid(matrix);
            var finder = new pathfinding__WEBPACK_IMPORTED_MODULE_1___default.a.AStarFinder({
              diagonalMovement: pathfinding__WEBPACK_IMPORTED_MODULE_1__["DiagonalMovement"].IfAtMostOneObstacle,
              weight: 1,
              heuristic: pathfinding__WEBPACK_IMPORTED_MODULE_1___default.a.Heuristic.euclidean
            });
            var path;
            var pathStart = new Phaser.Math.Vector2(Math.round(myPos.x / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X) - gridLowerCorner.x, Math.round(myPos.y / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y) - gridLowerCorner.y);
            var pathFinish = new Phaser.Math.Vector2(Math.round(targetPos.x / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X) - gridLowerCorner.x, Math.round(targetPos.y / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y) - gridLowerCorner.y);

            try {
              path = finder.findPath(pathStart.x, pathStart.y, pathFinish.x, pathFinish.y, grid);
            } catch (_a) {
              debugger;
            }

            if (this._DEBUG) {
              this._drawDebug(this.levelScene.debugGraphics, matrix, path, myPos, targetPos, gridLowerCorner);
            }

            if (!path) {
              return null;
            }

            path = pathfinding__WEBPACK_IMPORTED_MODULE_1___default.a.Util.compressPath(path);
            return path.map(function (point) {
              return new Phaser.Math.Vector2((point[0] + gridLowerCorner.x) * src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X, (point[1] + gridLowerCorner.y) * src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y);
            });
          }
        }, {
          key: "searchTarget",
          value: function searchTarget() {
            var _this3 = this;

            var myNumber = this.levelScene.entities.indexOf(this.myself);

            if (myNumber < 0) {
              throw new Error('I am not on the entities list!');
            }

            var target = this.levelScene.physics.closest(this.myself.gameObject.body.position, this.levelScene.entities.filter(function (e, i) {
              return !Object(src_app_core_factions__WEBPACK_IMPORTED_MODULE_0__["FactionsAreFriendly"])(_this3.myself.faction, e.faction) && e.gameObject.body.position.distanceSq(_this3.myself.gameObject.body.position) < _this3.aggroRadius * _this3.aggroRadius && myNumber !== i;
            }).map(function (e) {
              return e.gameObject;
            }));

            if (!target) {
              return null;
            }

            var targetEntity = this.levelScene.entities.find(function (e) {
              return e.gameObject === target;
            });

            if (!targetEntity) {
              throw new Error('Entity for closest GameObject not found!');
            }

            return targetEntity;
          }
        }, {
          key: "_drawDebug",
          value: function _drawDebug(gfx, matrix, path, myPos, targetPos, gridLowerCorner) {
            gfx.clear();
            path.forEach(function (p) {
              matrix[p[1]][p[0]] = 4;
            });
            matrix[Math.round(myPos.y / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y) - gridLowerCorner.y][Math.round(myPos.x / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X) - gridLowerCorner.x] = 2;
            matrix[Math.round(targetPos.y / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y) - gridLowerCorner.y][Math.round(targetPos.x / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X) - gridLowerCorner.x] = 3;
            matrix.forEach(function (row, i) {
              row.forEach(function (cell, j) {
                var color;

                switch (cell) {
                  case 0:
                    color = 0x00ff00;
                    break;

                  case 1:
                    color = 0x00ffff;
                    break;

                  case 2:
                    color = 0xff00ff;
                    break;

                  case 3:
                    color = 0xffaa00;
                    break;

                  case 4:
                    color = 0x000000;
                    break;
                }

                gfx.fillStyle(color);
                gfx.fillRect((j + gridLowerCorner.x) * src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X, (i + gridLowerCorner.y) * src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y, src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X, src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y);
              });
            });
          }
        }, {
          key: "movement",
          get: function get() {
            if (!this.target || !this.target.gameObject || !this.target.gameObject.body) {
              var searched = this.searchTarget();

              if (!searched) {
                return Phaser.Math.Vector2.ZERO;
              } else {
                this.target = searched;
              }
            }

            var distanceSq = this.myself.gameObject.body.position.distanceSq(this.target.gameObject.body.position);

            if (distanceSq > this.unaggroRadius * this.unaggroRadius) {
              this.target = null;
              return Phaser.Math.Vector2.ZERO;
            } else if (distanceSq < this.minRange) {
              return Phaser.Math.Vector2.ZERO;
            }

            var moveVector = this.calculateMovement(this.target.gameObject.body.position);
            return moveVector;
          }
        }, {
          key: "attack",
          get: function get() {
            return null;
          }
        }]);

        return WalkerController;
      }();
      /***/

    },

    /***/
    "./src/app/gameplay/entities/characterEntity.ts":
    /*!******************************************************!*\
      !*** ./src/app/gameplay/entities/characterEntity.ts ***!
      \******************************************************/

    /*! exports provided: CharacterEntity */

    /***/
    function srcAppGameplayEntitiesCharacterEntityTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CharacterEntity", function () {
        return CharacterEntity;
      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs */
      "./node_modules/rxjs/_esm2015/index.js");
      /* harmony import */


      var src_app_core_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/core/constants */
      "./src/app/core/constants.ts");
      /* harmony import */


      var src_app_core_factions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/core/factions */
      "./src/app/core/factions.ts");

      var CharacterEntity = /*#__PURE__*/function () {
        function CharacterEntity(cfg) {
          _classCallCheck(this, CharacterEntity);

          this.faction = src_app_core_factions__WEBPACK_IMPORTED_MODULE_2__["Faction"].Player;
          this.destroyed$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
          this.entityName = cfg.name;
          this.gameObject = cfg.gameObject;
          this.bodyTexture = cfg.bodyTexture;
          this.maxHealth = cfg.maxHealth || 100;
          this.health = this.maxHealth;
          this.level = cfg.level || 1;
          this.speed = cfg.speed || 20;
          this.refreshRenderSprite();
        }

        _createClass(CharacterEntity, [{
          key: "update",
          value: function update() {
            this.move();
          }
        }, {
          key: "damage",
          value: function damage(dmg) {
            this.health -= dmg;

            if (this.health <= 0) {
              this.destroy();
            }
          }
        }, {
          key: "destroy",
          value: function destroy() {
            this.gameObject.destroy();
            this.destroyed$.next();
            this.destroyed$.complete();
          }
        }, {
          key: "move",
          value: function move() {
            var maxSpeedMult = src_app_core_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Character.MAX_SPEED_MULT;
            var movement = this.controller.movement.scale(this.speed * maxSpeedMult * 10);

            if (this.gameObject.body.velocity.lengthSq() > this.speed * this.speed * maxSpeedMult * maxSpeedMult) {
              this.gameObject.body.velocity.normalize().scale(this.speed * maxSpeedMult);
            }

            if (movement.x !== 0) {
              this.lookRight(movement.x > 0);
            }

            this.gameObject.body.setAcceleration(movement.x, movement.y);
          }
        }, {
          key: "lookRight",
          value: function lookRight(condition) {
            this.gameObject.setFlipX(condition);
          }
        }, {
          key: "refreshRenderSprite",
          value: function refreshRenderSprite() {
            var bounds = this.gameObject.body.center;
            this.gameObject.clear();
            this.gameObject.draw(this.bodyTexture, 0, 0);
          }
        }, {
          key: "destroyed",
          get: function get() {
            return this.destroyed$.asObservable();
          }
        }]);

        return CharacterEntity;
      }();
      /***/

    },

    /***/
    "./src/app/gameplay/entities/humanoidEntity.ts":
    /*!*****************************************************!*\
      !*** ./src/app/gameplay/entities/humanoidEntity.ts ***!
      \*****************************************************/

    /*! exports provided: HumanoidEntity */

    /***/
    function srcAppGameplayEntitiesHumanoidEntityTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HumanoidEntity", function () {
        return HumanoidEntity;
      });
      /* harmony import */


      var _characterEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./characterEntity */
      "./src/app/gameplay/entities/characterEntity.ts");

      var HumanoidEntity = /*#__PURE__*/function (_characterEntity__WEB) {
        _inherits(HumanoidEntity, _characterEntity__WEB);

        var _super = _createSuper(HumanoidEntity);

        function HumanoidEntity(cfg) {
          var _this4;

          _classCallCheck(this, HumanoidEntity);

          _this4 = _super.call(this, cfg);
          _this4.armor = null;
          _this4.weapon = null;

          _this4.equipArmor(cfg.armor);

          _this4.weapon = cfg.weapon;
          return _this4;
        }

        _createClass(HumanoidEntity, [{
          key: "equipArmor",
          value: function equipArmor(armor) {
            this.armor = armor;
            console.log('equip called');
            this.refreshRenderSprite();
          }
        }, {
          key: "update",
          value: function update() {
            _get(_getPrototypeOf(HumanoidEntity.prototype), "update", this).call(this);
          }
        }, {
          key: "lookRight",
          value: function lookRight(condition) {
            _get(_getPrototypeOf(HumanoidEntity.prototype), "lookRight", this).call(this, condition);
          }
        }, {
          key: "refreshRenderSprite",
          value: function refreshRenderSprite() {
            _get(_getPrototypeOf(HumanoidEntity.prototype), "refreshRenderSprite", this).call(this);

            if (this.armor) {
              this.gameObject.draw(this.armor.texture, this.gameObject.width / 2 - 9, this.gameObject.height / 2 - 5);
            }
          }
        }]);

        return HumanoidEntity;
      }(_characterEntity__WEBPACK_IMPORTED_MODULE_0__["CharacterEntity"]);
      /***/

    },

    /***/
    "./src/app/gameplay/items/armor.ts":
    /*!*****************************************!*\
      !*** ./src/app/gameplay/items/armor.ts ***!
      \*****************************************/

    /*! exports provided: Armor */

    /***/
    function srcAppGameplayItemsArmorTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Armor", function () {
        return Armor;
      });
      /* harmony import */


      var _equipmentItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./equipmentItem */
      "./src/app/gameplay/items/equipmentItem.ts");

      var Armor = /*#__PURE__*/function (_equipmentItem__WEBPA) {
        _inherits(Armor, _equipmentItem__WEBPA);

        var _super2 = _createSuper(Armor);

        function Armor(cfg) {
          var _this5;

          _classCallCheck(this, Armor);

          _this5 = _super2.call(this, cfg.name, cfg.texture, cfg.description || 'No information.', cfg.price || 0, cfg.mass || 0, cfg.level || 1);
          _this5.texture = cfg.texture;
          return _this5;
        }

        return Armor;
      }(_equipmentItem__WEBPACK_IMPORTED_MODULE_0__["EquipmentItem"]);
      /***/

    },

    /***/
    "./src/app/gameplay/items/equipmentItem.ts":
    /*!*************************************************!*\
      !*** ./src/app/gameplay/items/equipmentItem.ts ***!
      \*************************************************/

    /*! exports provided: EquipmentItem */

    /***/
    function srcAppGameplayItemsEquipmentItemTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "EquipmentItem", function () {
        return EquipmentItem;
      });

      var EquipmentItem = function EquipmentItem(name, texture, description, price, mass, level) {
        _classCallCheck(this, EquipmentItem);

        this.name = name;
        this.texture = texture;
        this.description = description;
        this.price = price;
        this.mass = mass;
        this.level = level;
      };
      /***/

    },

    /***/
    "./src/app/modules/app-routing.module.ts":
    /*!***********************************************!*\
      !*** ./src/app/modules/app-routing.module.ts ***!
      \***********************************************/

    /*! exports provided: AppRoutingModule */

    /***/
    function srcAppModulesAppRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
        return AppRoutingModule;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
      /* harmony import */


      var _components_level_editor_level_editor_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../components/level-editor/level-editor.component */
      "./src/app/components/level-editor/level-editor.component.ts");
      /* harmony import */


      var _components_game_canvas_game_canvas_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../components/game-canvas/game-canvas.component */
      "./src/app/components/game-canvas/game-canvas.component.ts");

      var routes = [{
        path: 'editor',
        component: _components_level_editor_level_editor_component__WEBPACK_IMPORTED_MODULE_2__["LevelEditorComponent"]
      }, {
        path: '',
        component: _components_game_canvas_game_canvas_component__WEBPACK_IMPORTED_MODULE_3__["GameCanvasComponent"]
      }];

      var AppRoutingModule = function AppRoutingModule() {
        _classCallCheck(this, AppRoutingModule);
      };

      AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: AppRoutingModule
      });
      AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        factory: function AppRoutingModule_Factory(t) {
          return new (t || AppRoutingModule)();
        },
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
          args: [{
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "./src/app/modules/materials.module.ts":
    /*!*********************************************!*\
      !*** ./src/app/modules/materials.module.ts ***!
      \*********************************************/

    /*! exports provided: MaterialsModule */

    /***/
    function srcAppModulesMaterialsModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "MaterialsModule", function () {
        return MaterialsModule;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/cdk/layout */
      "./node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/layout.js");
      /* harmony import */


      var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/material/button */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
      /* harmony import */


      var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/material/card */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/card.js");
      /* harmony import */


      var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/material/checkbox */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/checkbox.js");
      /* harmony import */


      var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/material/dialog */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
      /* harmony import */


      var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/material/icon */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");
      /* harmony import */


      var _angular_material_list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/material/list */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/list.js");
      /* harmony import */


      var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/material/progress-bar */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/progress-bar.js");
      /* harmony import */


      var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/material/sidenav */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/sidenav.js");
      /* harmony import */


      var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/material/snack-bar */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/snack-bar.js");
      /* harmony import */


      var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/material/stepper */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/stepper.js");
      /* harmony import */


      var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/material/toolbar */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/toolbar.js");
      /* harmony import */


      var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/material/tabs */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tabs.js");
      /* harmony import */


      var _angular_material_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @angular/material/input */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/input.js");
      /* harmony import */


      var _angular_material_select__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @angular/material/select */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/select.js");
      /* harmony import */


      var _angular_material_table__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! @angular/material/table */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/table.js");
      /* harmony import */


      var _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! @angular/material/menu */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/menu.js");
      /* harmony import */


      var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! @angular/material/progress-spinner */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/progress-spinner.js");
      /* harmony import */


      var _angular_material_badge__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! @angular/material/badge */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/badge.js");
      /* harmony import */


      var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! @angular/material/expansion */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/expansion.js");
      /* harmony import */


      var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! @angular/material/datepicker */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/datepicker.js");
      /* harmony import */


      var _angular_material_radio__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
      /*! @angular/material/radio */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/radio.js");
      /* harmony import */


      var _angular_material_core__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
      /*! @angular/material/core */
      "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/core.js");

      var MaterialsModule = function MaterialsModule() {
        _classCallCheck(this, MaterialsModule);
      };

      MaterialsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: MaterialsModule
      });
      MaterialsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        factory: function MaterialsModule_Factory(t) {
          return new (t || MaterialsModule)();
        },
        imports: [[], _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["LayoutModule"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_12__["MatToolbarModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__["MatSidenavModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"], _angular_material_list__WEBPACK_IMPORTED_MODULE_7__["MatListModule"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__["MatTabsModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__["MatStepperModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_14__["MatInputModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialogModule"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__["MatProgressBarModule"], _angular_material_select__WEBPACK_IMPORTED_MODULE_15__["MatSelectModule"], _angular_material_table__WEBPACK_IMPORTED_MODULE_16__["MatTableModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__["MatMenuModule"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__["MatSnackBarModule"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_18__["MatProgressSpinnerModule"], _angular_material_badge__WEBPACK_IMPORTED_MODULE_19__["MatBadgeModule"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__["MatExpansionModule"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_22__["MatRadioModule"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_21__["MatDatepickerModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_23__["MatNativeDateModule"]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](MaterialsModule, {
          exports: [_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["LayoutModule"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_12__["MatToolbarModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__["MatSidenavModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"], _angular_material_list__WEBPACK_IMPORTED_MODULE_7__["MatListModule"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__["MatTabsModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__["MatStepperModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_14__["MatInputModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialogModule"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__["MatProgressBarModule"], _angular_material_select__WEBPACK_IMPORTED_MODULE_15__["MatSelectModule"], _angular_material_table__WEBPACK_IMPORTED_MODULE_16__["MatTableModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__["MatMenuModule"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__["MatSnackBarModule"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_18__["MatProgressSpinnerModule"], _angular_material_badge__WEBPACK_IMPORTED_MODULE_19__["MatBadgeModule"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__["MatExpansionModule"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_22__["MatRadioModule"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_21__["MatDatepickerModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_23__["MatNativeDateModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MaterialsModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
          args: [{
            imports: [],
            exports: [_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["LayoutModule"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_12__["MatToolbarModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__["MatSidenavModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"], _angular_material_list__WEBPACK_IMPORTED_MODULE_7__["MatListModule"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__["MatTabsModule"], _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"], _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__["MatStepperModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_14__["MatInputModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialogModule"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__["MatProgressBarModule"], _angular_material_select__WEBPACK_IMPORTED_MODULE_15__["MatSelectModule"], _angular_material_table__WEBPACK_IMPORTED_MODULE_16__["MatTableModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__["MatMenuModule"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__["MatSnackBarModule"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_18__["MatProgressSpinnerModule"], _angular_material_badge__WEBPACK_IMPORTED_MODULE_19__["MatBadgeModule"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__["MatExpansionModule"], _angular_material_radio__WEBPACK_IMPORTED_MODULE_22__["MatRadioModule"], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_21__["MatDatepickerModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_23__["MatNativeDateModule"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "./src/app/scenes/levelEditor.ts":
    /*!***************************************!*\
      !*** ./src/app/scenes/levelEditor.ts ***!
      \***************************************/

    /*! exports provided: LevelEditor */

    /***/
    function srcAppScenesLevelEditorTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LevelEditor", function () {
        return LevelEditor;
      });
      /* harmony import */


      var _levelScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./levelScene */
      "./src/app/scenes/levelScene.ts");
      /* harmony import */


      var _services_entity_spawner_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../services/entity-spawner.service */
      "./src/app/services/entity-spawner.service.ts");
      /* harmony import */


      var _core_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../core/constants */
      "./src/app/core/constants.ts");
      /* harmony import */


      var _core_mapGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../core/mapGrid */
      "./src/app/core/mapGrid.ts");

      var LevelEditor = /*#__PURE__*/function (_levelScene__WEBPACK_) {
        _inherits(LevelEditor, _levelScene__WEBPACK_);

        var _super3 = _createSuper(LevelEditor);

        function LevelEditor() {
          var _this6;

          _classCallCheck(this, LevelEditor);

          _this6 = _super3.apply(this, arguments);
          _this6.cursorActive = true;
          return _this6;
        }

        _createClass(LevelEditor, [{
          key: "create",
          value: function create() {
            var _this7 = this;

            this.entitySpawner = new _services_entity_spawner_service__WEBPACK_IMPORTED_MODULE_1__["EntitySpawnerService"]();
            this.entitySpawner.init(this.inputService.getInputKeys(this.input.keyboard), this);
            this.mapGrid = new _core_mapGrid__WEBPACK_IMPORTED_MODULE_3__["MapGrid"](this, 'tileset');
            this.player = this.entitySpawner.spawnPlayer('Editor', Phaser.Math.Vector2.ZERO, 60);
            this.cameras.main.startFollow(this.player.gameObject, false, 0.1, 0.1);
            this.grid = this.add.grid(0, 0, 900, 708, 32, 32, 0x000000, 0, 0xffffff, 0.5);
            this.input.on('gameout', function () {
              _this7.cursorActive = false;
            });
            this.input.on('gameover', function () {
              _this7.cursorActive = true;
            });
          }
        }, {
          key: "update",
          value: function update() {
            this.entities.forEach(function (e) {
              return e.update();
            });
            var gridPos = new Phaser.Math.Vector2(this.snap(this.cameras.main.worldView.centerX, _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X) + 2, this.snap(this.cameras.main.worldView.centerY, _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y) + 2);
            this.grid.setPosition(gridPos.x, gridPos.y); // this.input.activePointer.updateWorldPoint(this.cameras.main);

            if (this.cursorActive) {
              var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
              var placePosition = new Phaser.Math.Vector2(Math.floor(worldPoint.x / _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X), Math.floor(worldPoint.y / _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y));

              if (this.input.manager.activePointer.leftButtonDown()) {
                if (!this.mapGrid.getBlockAt(placePosition)) {
                  this.mapGrid.addBlock(placePosition, 'stone_bricks');
                }
              } else if (this.input.manager.activePointer.rightButtonDown()) {
                if (!this.mapGrid.getBlockAt(placePosition, -1)) {
                  this.mapGrid.addBlock(placePosition, 'stone_floor', -1);
                }
              }
            }
          }
        }, {
          key: "snap",
          value: function snap(value, snapSize) {
            return value - value % snapSize;
          }
        }]);

        return LevelEditor;
      }(_levelScene__WEBPACK_IMPORTED_MODULE_0__["Level"]);
      /***/

    },

    /***/
    "./src/app/scenes/levelScene.ts":
    /*!**************************************!*\
      !*** ./src/app/scenes/levelScene.ts ***!
      \**************************************/

    /*! exports provided: Level */

    /***/
    function srcAppScenesLevelSceneTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Level", function () {
        return Level;
      });
      /* harmony import */


      var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! phaser */
      "./node_modules/phaser/dist/phaser.js");
      /* harmony import */


      var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _services_entity_spawner_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../services/entity-spawner.service */
      "./src/app/services/entity-spawner.service.ts");
      /* harmony import */


      var _services_asset_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../services/asset.service */
      "./src/app/services/asset.service.ts");
      /* harmony import */


      var _core_mapGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../core/mapGrid */
      "./src/app/core/mapGrid.ts");
      /* harmony import */


      var _ui_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../ui/ui */
      "./src/app/ui/ui.ts");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs */
      "./node_modules/rxjs/_esm2015/index.js");
      /* harmony import */


      var _gameplay_items_armor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../gameplay/items/armor */
      "./src/app/gameplay/items/armor.ts");

      var Level = /*#__PURE__*/function (_phaser__WEBPACK_IMPO) {
        _inherits(Level, _phaser__WEBPACK_IMPO);

        var _super4 = _createSuper(Level);

        function Level(inputService, levelLoader) {
          var _this8;

          _classCallCheck(this, Level);

          _this8 = _super4.call(this, {
            key: 'level'
          });
          _this8.inputService = inputService;
          _this8.levelLoader = levelLoader;
          _this8.entities = [];
          _this8.levelUI = [];
          return _this8;
        }

        _createClass(Level, [{
          key: "create",
          value: function create() {
            this.entitySpawner = new _services_entity_spawner_service__WEBPACK_IMPORTED_MODULE_1__["EntitySpawnerService"]();
            this.entitySpawner.init(this.inputService.getInputKeys(this.input.keyboard), this);
            this.mapGrid = new _core_mapGrid__WEBPACK_IMPORTED_MODULE_3__["MapGrid"](this, 'tileset');
            this.player = this.entitySpawner.spawnPlayer('maxi', new Phaser.Math.Vector2(-17, -7), 30);
            this.cameras.main.startFollow(this.player.gameObject, false, 0.1, 0.1);
            var stalker = this.entitySpawner.spawnStalker(new Phaser.Math.Vector2(6, 11), 20);
            Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["timer"])(10000).subscribe(function () {
              stalker.equipArmor(new _gameplay_items_armor__WEBPACK_IMPORTED_MODULE_6__["Armor"]({
                name: 'Leather vest',
                texture: 'leather_vest'
              }));
            });
            this.player.equipArmor(new _gameplay_items_armor__WEBPACK_IMPORTED_MODULE_6__["Armor"]({
              name: 'Leather vest',
              texture: 'leather_vest'
            })); // stalker.damage(20);
            // interval(100)
            //   .pipe(takeUntil(this.player.destroyed))
            //   .subscribe(() => { this.player.damage(1); });

            this.backgroundImage = this.add.tileSprite(0, 0, this.sys.game.canvas.width + 100, this.sys.game.canvas.height + 100, 'grass01');
            this.backgroundImage.setDepth(-50);
            this.debugGraphics = this.add.graphics().setDepth(2).setAlpha(0.75);
            this.events.on('postupdate', this.postupdate.bind(this));
            this.levelUI.push(new _ui_ui__WEBPACK_IMPORTED_MODULE_4__["UI"].HealthBarPlayer(this));
            var renderSprite = this.add.renderTexture(-500, -200).setDepth(5);
            renderSprite.draw('humanoid', 0, 0);
            Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["timer"])(5000).subscribe(function () {
              renderSprite.draw('leather_vest');
            });
            Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["timer"])(10000).subscribe(function () {
              renderSprite.clear();
              renderSprite.draw('humanoid');
            });
          }
        }, {
          key: "preload",
          value: function preload() {
            _services_asset_service__WEBPACK_IMPORTED_MODULE_2__["AssetService"].loadBlockSprites(this.load);

            _services_asset_service__WEBPACK_IMPORTED_MODULE_2__["AssetService"].loadEntitySprites(this.load);

            _services_asset_service__WEBPACK_IMPORTED_MODULE_2__["AssetService"].loadArmorSprites(this.load);
          }
        }, {
          key: "update",
          value: function update() {
            this.entities.forEach(function (e) {
              return e.update();
            });
            this.backgroundImage.setPosition(this.cameras.main.worldView.centerX, this.cameras.main.worldView.centerY);
            this.backgroundImage.setTilePosition(this.cameras.main.worldView.centerX, this.cameras.main.worldView.centerY);
          }
        }, {
          key: "postupdate",
          value: function postupdate() {
            this.levelUI.forEach(function (ui) {
              return ui.update();
            });
          }
        }]);

        return Level;
      }(phaser__WEBPACK_IMPORTED_MODULE_0__["Scene"]);
      /***/

    },

    /***/
    "./src/app/services/asset.service.ts":
    /*!*******************************************!*\
      !*** ./src/app/services/asset.service.ts ***!
      \*******************************************/

    /*! exports provided: AssetService */

    /***/
    function srcAppServicesAssetServiceTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AssetService", function () {
        return AssetService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

      var AssetService = /*#__PURE__*/function () {
        function AssetService() {
          _classCallCheck(this, AssetService);
        }

        _createClass(AssetService, null, [{
          key: "loadBlockSprites",
          value: function loadBlockSprites(loader) {
            loader.image('grass01', 'assets/textures/blocks/grass01.png');
            loader.image('stone_wall01', 'assets/textures/blocks/stone_wall01.png');
            loader.image('stone_floor01', 'assets/textures/blocks/stone_floor01.png');
            loader.image('tileset', 'assets/textures/blocks/tileset-extruded.png');
          }
        }, {
          key: "loadEntitySprites",
          value: function loadEntitySprites(loader) {
            loader.image('humanoid', 'assets/textures/entities/humanoid.png');
          }
        }, {
          key: "loadArmorSprites",
          value: function loadArmorSprites(loader) {
            loader.image('leather_vest', 'assets/textures/items/armor/leather_vest.png');
            loader.image('leather_vest_outline', 'assets/textures/items/armor/leather_vest_outline.png');
          }
        }]);

        return AssetService;
      }();

      AssetService.ɵfac = function AssetService_Factory(t) {
        return new (t || AssetService)();
      };

      AssetService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: AssetService,
        factory: AssetService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AssetService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "./src/app/services/entity-spawner.service.ts":
    /*!****************************************************!*\
      !*** ./src/app/services/entity-spawner.service.ts ***!
      \****************************************************/

    /*! exports provided: EntitySpawnerService */

    /***/
    function srcAppServicesEntitySpawnerServiceTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "EntitySpawnerService", function () {
        return EntitySpawnerService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _gameplay_controllers_playerController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../gameplay/controllers/playerController */
      "./src/app/gameplay/controllers/playerController.ts");
      /* harmony import */


      var _core_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../core/constants */
      "./src/app/core/constants.ts");
      /* harmony import */


      var _core_factions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../core/factions */
      "./src/app/core/factions.ts");
      /* harmony import */


      var _gameplay_controllers_walkerController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../gameplay/controllers/walkerController */
      "./src/app/gameplay/controllers/walkerController.ts");
      /* harmony import */


      var _ui_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../ui/ui */
      "./src/app/ui/ui.ts");
      /* harmony import */


      var _gameplay_entities_humanoidEntity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../gameplay/entities/humanoidEntity */
      "./src/app/gameplay/entities/humanoidEntity.ts");

      var EntitySpawnerService = /*#__PURE__*/function () {
        function EntitySpawnerService() {
          _classCallCheck(this, EntitySpawnerService);
        }

        _createClass(EntitySpawnerService, [{
          key: "init",
          value: function init(inputKeys, levelScene) {
            this.inputKeys = inputKeys;
            this.levelScene = levelScene;
          }
        }, {
          key: "spawnPlayer",
          value: function spawnPlayer(playerName, position, speed) {
            var _this9 = this;

            var gameObject = this.createRenderTexture(position, new Phaser.Math.Vector2(this.levelScene.textures.getFrame('humanoid', 0).width, this.levelScene.textures.getFrame('humanoid', 0).height)).setDepth(4);
            gameObject.body.setSize(_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Character.COLLIDER_W, _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Character.COLLIDER_H).setOffset(_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Character.COLLIDER_OFFSET_X, _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Character.COLLIDER_OFFSET_Y);
            var entity = new _gameplay_entities_humanoidEntity__WEBPACK_IMPORTED_MODULE_6__["HumanoidEntity"]({
              name: playerName,
              gameObject: gameObject,
              maxHealth: 100,
              level: 1,
              speed: speed,
              bodyTexture: 'humanoid'
            });
            entity.controller = new _gameplay_controllers_playerController__WEBPACK_IMPORTED_MODULE_1__["PlayerController"](this.inputKeys);
            entity.destroyed.subscribe(function () {
              var entityIndex = _this9.levelScene.entities.indexOf(entity);

              if (entityIndex >= 0) {
                _this9.levelScene.entities.splice(entityIndex, 1);
              }

              console.log(_this9.levelScene.player);
            });
            this.levelScene.entities.push(entity);
            return entity;
          }
        }, {
          key: "spawnStalker",
          value: function spawnStalker(position, speed) {
            var _this10 = this;

            var gameObject = this.createRenderTexture(position, new Phaser.Math.Vector2(this.levelScene.textures.getFrame('humanoid', 0).width, this.levelScene.textures.getFrame('humanoid', 0).height)).setDepth(3);
            gameObject.body.setSize(_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Character.COLLIDER_W, _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Character.COLLIDER_H).setOffset(_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Character.COLLIDER_OFFSET_X, _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Character.COLLIDER_OFFSET_Y);
            var entity = new _gameplay_entities_humanoidEntity__WEBPACK_IMPORTED_MODULE_6__["HumanoidEntity"]({
              name: 'Stalker',
              gameObject: gameObject,
              maxHealth: 100,
              level: 1,
              speed: speed,
              bodyTexture: 'humanoid'
            });
            entity.faction = _core_factions__WEBPACK_IMPORTED_MODULE_3__["Faction"].Baddies;
            entity.controller = new _gameplay_controllers_walkerController__WEBPACK_IMPORTED_MODULE_4__["WalkerController"](entity, this.levelScene, 512);
            var healthBar = new _ui_ui__WEBPACK_IMPORTED_MODULE_5__["UI"].HealthBarSmall(this.levelScene, entity);
            var nameLabel = new _ui_ui__WEBPACK_IMPORTED_MODULE_5__["UI"].EntityHeader(this.levelScene, entity);
            entity.destroyed.subscribe(function () {
              healthBar.destroy();
              nameLabel.destroy();

              var healthBarIndex = _this10.levelScene.levelUI.indexOf(healthBar);

              if (healthBarIndex >= 0) {
                _this10.levelScene.levelUI.splice(healthBarIndex, 1);
              }

              var labelIndex = _this10.levelScene.levelUI.indexOf(nameLabel);

              if (labelIndex >= 0) {
                _this10.levelScene.levelUI.splice(labelIndex, 1);
              }

              var entityIndex = _this10.levelScene.entities.indexOf(entity);

              if (entityIndex >= 0) {
                _this10.levelScene.entities.splice(entityIndex, 1);
              }
            });
            this.levelScene.levelUI.push(healthBar);
            this.levelScene.levelUI.push(nameLabel);
            this.levelScene.entities.push(entity);
            return entity;
          }
        }, {
          key: "createSpriteGameObject",
          value: function createSpriteGameObject(position, sprite) {
            var gameObject;
            gameObject = this.levelScene.add.sprite(position.x * _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X, position.y * _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y, sprite);
            return this.setupPhysics(gameObject);
          }
        }, {
          key: "createRenderTexture",
          value: function createRenderTexture(position, size) {
            var gameObject;
            gameObject = this.levelScene.add.renderTexture(position.x * _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X, position.y * _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y, size.x, size.y);
            return this.setupPhysics(gameObject);
          }
        }, {
          key: "setupPhysics",
          value: function setupPhysics(gameObject) {
            this.levelScene.physics.add.existing(gameObject);
            this.levelScene.physics.add.collider(gameObject, this.levelScene.mapGrid.getAllChunks());
            gameObject.body.checkCollision.up = true;
            gameObject.body.checkCollision.down = true;
            gameObject.body.checkCollision.left = true;
            gameObject.body.checkCollision.right = true;
            gameObject.body.useDamping = true;
            gameObject.body.setDrag(0.85, 0.85);
            return gameObject;
          }
        }]);

        return EntitySpawnerService;
      }();

      EntitySpawnerService.ɵfac = function EntitySpawnerService_Factory(t) {
        return new (t || EntitySpawnerService)();
      };

      EntitySpawnerService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: EntitySpawnerService,
        factory: EntitySpawnerService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EntitySpawnerService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "./src/app/services/input.service.ts":
    /*!*******************************************!*\
      !*** ./src/app/services/input.service.ts ***!
      \*******************************************/

    /*! exports provided: InputService */

    /***/
    function srcAppServicesInputServiceTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "InputService", function () {
        return InputService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

      var InputService = /*#__PURE__*/function () {
        function InputService() {
          _classCallCheck(this, InputService);

          this.inputs = {
            up: 'W',
            down: 'S',
            left: 'A',
            right: 'D'
          };
        }

        _createClass(InputService, [{
          key: "getInputKeys",
          value: function getInputKeys(keyboard) {
            return {
              up: keyboard.addKey(this.inputs.up),
              down: keyboard.addKey(this.inputs.down),
              left: keyboard.addKey(this.inputs.left),
              right: keyboard.addKey(this.inputs.right)
            };
          }
        }]);

        return InputService;
      }();

      InputService.ɵfac = function InputService_Factory(t) {
        return new (t || InputService)();
      };

      InputService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: InputService,
        factory: InputService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](InputService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "./src/app/services/level-loader.service.ts":
    /*!**************************************************!*\
      !*** ./src/app/services/level-loader.service.ts ***!
      \**************************************************/

    /*! exports provided: LevelLoaderService */

    /***/
    function srcAppServicesLevelLoaderServiceTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LevelLoaderService", function () {
        return LevelLoaderService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _core_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../core/blocks */
      "./src/app/core/blocks.ts");

      var LevelLoaderService = /*#__PURE__*/function () {
        function LevelLoaderService() {
          _classCallCheck(this, LevelLoaderService);
        }

        _createClass(LevelLoaderService, [{
          key: "exportLevel",
          value: function exportLevel(level) {
            var minLevel = {
              l: []
            };

            var _iterator = _createForOfIteratorHelper(level.mapGrid.getUsedLayers()),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var layer = _step.value;
                minLevel.l.push([layer, level.mapGrid.getAllOfLayer(layer).map(function (b) {
                  return [b.x, b.y, _core_blocks__WEBPACK_IMPORTED_MODULE_1__["BlockIds"].indexOf(b.name)];
                })]);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return JSON.stringify(minLevel);
          }
        }, {
          key: "importlevel",
          value: function importlevel(levelJson, level) {
            var minLevel = JSON.parse(levelJson);

            var _iterator2 = _createForOfIteratorHelper(minLevel.l),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var layer = _step2.value;

                var _iterator3 = _createForOfIteratorHelper(layer[1]),
                    _step3;

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    var block = _step3.value;
                    level.mapGrid.addBlock(new Phaser.Math.Vector2(block[0], block[1]), _core_blocks__WEBPACK_IMPORTED_MODULE_1__["BlockIds"][block[2]], layer[0]);
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        }]);

        return LevelLoaderService;
      }();

      LevelLoaderService.ɵfac = function LevelLoaderService_Factory(t) {
        return new (t || LevelLoaderService)();
      };

      LevelLoaderService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: LevelLoaderService,
        factory: LevelLoaderService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LevelLoaderService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "./src/app/ui/entityHeader.ts":
    /*!************************************!*\
      !*** ./src/app/ui/entityHeader.ts ***!
      \************************************/

    /*! exports provided: EntityHeader */

    /***/
    function srcAppUiEntityHeaderTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "EntityHeader", function () {
        return EntityHeader;
      });

      var EntityHeader = /*#__PURE__*/function (_Phaser$GameObjects$D) {
        _inherits(EntityHeader, _Phaser$GameObjects$D);

        var _super5 = _createSuper(EntityHeader);

        function EntityHeader(scene, target) {
          var _this11;

          _classCallCheck(this, EntityHeader);

          _this11 = _super5.call(this, scene, target.gameObject.body.position.x, target.gameObject.body.position.y, 'div');
          _this11.target = target;

          _this11.setHTML(EntityHeader.elementHTML);

          var nameLabel = _this11.getChildByID('name');

          var levelLabel = _this11.getChildByID('level');

          nameLabel.innerText = target.entityName;
          levelLabel.innerText = target.level.toString();
          scene.add.existing(_assertThisInitialized(_this11));
          return _this11;
        }

        _createClass(EntityHeader, [{
          key: "update",
          value: function update(time, delta) {
            _get(_getPrototypeOf(EntityHeader.prototype), "update", this).call(this, time, delta);

            var bounds = this.target.gameObject.getTopCenter();
            this.setPosition(bounds.x, bounds.y + 4);
          }
        }]);

        return EntityHeader;
      }(Phaser.GameObjects.DOMElement);

      EntityHeader.elementHTML = "\n    <div style='\n      display: flex;\n      flex-flow: row nowrap;\n      color: white;\n      font-size: 14px;\n      user-select: none;\n    '>\n      [\n      <span id='level'></span>\n      ] -\n      <span id='name'></span>\n    </div>\n  ";
      /***/
    },

    /***/
    "./src/app/ui/healthBarPlayer.ts":
    /*!***************************************!*\
      !*** ./src/app/ui/healthBarPlayer.ts ***!
      \***************************************/

    /*! exports provided: HealthBarPlayer */

    /***/
    function srcAppUiHealthBarPlayerTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HealthBarPlayer", function () {
        return HealthBarPlayer;
      });

      var HealthBarPlayer = /*#__PURE__*/function (_Phaser$GameObjects$D2) {
        _inherits(HealthBarPlayer, _Phaser$GameObjects$D2);

        var _super6 = _createSuper(HealthBarPlayer);

        function HealthBarPlayer(levelScene) {
          var _this12;

          _classCallCheck(this, HealthBarPlayer);

          _this12 = _super6.call(this, levelScene, 70, 14, 'div');
          _this12.levelScene = levelScene;

          _this12.setHTML(HealthBarPlayer.elementHTML);

          _this12.setScrollFactor(0);

          levelScene.add.existing(_assertThisInitialized(_this12));
          return _this12;
        }

        _createClass(HealthBarPlayer, [{
          key: "update",
          value: function update(time, delta) {
            var plr = this.levelScene.player;
            var bar = this.getChildByID('full');
            bar.style.width = "".concat(Math.max(Math.min(100, plr.health / plr.maxHealth * 100), 0), "%");
            var label = this.getChildByID('label');
            label.innerText = "".concat(plr.health, "/").concat(plr.maxHealth);
          }
        }]);

        return HealthBarPlayer;
      }(Phaser.GameObjects.DOMElement);

      HealthBarPlayer.elementHTML = "\n    <div style='\n      background-color: #383838;\n      border: 2px solid black;\n      box-sizing: content-box;\n      width: 128px;\n      height: 16px;\n    '>\n      <div id='full' style='\n        height: 100%;\n        width: 100%;\n        display: flex;\n        flex-flow: column nowrap;\n      '>\n        <div style='\n          height: 100%;\n          width: 100%;\n          background-color: red;\n        '></div>\n        <div style='\n          height: 40%;\n          background-color: black;\n          opacity: 0.3;\n          position: absolute;\n          bottom: 0;\n          right: 0;\n          left: 0;\n        '></div>\n      </div>\n      <div id='label' style='\n        color: white;\n        font-size: 16px;\n        position: absolute;\n        top: 2px;\n        left: 2px;\n        right: 2px;\n        bottom: 2px;\n        display: flex;\n        flex-flow: column nowrap;\n        justify-content: center;\n        align-items: center;\n      '>\n        100/100\n      </div>\n    </div>\n  ";
      /***/
    },

    /***/
    "./src/app/ui/healthBarSmall.ts":
    /*!**************************************!*\
      !*** ./src/app/ui/healthBarSmall.ts ***!
      \**************************************/

    /*! exports provided: HealthBarSmall */

    /***/
    function srcAppUiHealthBarSmallTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HealthBarSmall", function () {
        return HealthBarSmall;
      });

      var HealthBarSmall = /*#__PURE__*/function (_Phaser$GameObjects$D3) {
        _inherits(HealthBarSmall, _Phaser$GameObjects$D3);

        var _super7 = _createSuper(HealthBarSmall);

        function HealthBarSmall(scene, target) {
          var _this13;

          _classCallCheck(this, HealthBarSmall);

          _this13 = _super7.call(this, scene, target.gameObject.body.position.x, target.gameObject.body.position.y, 'div');
          _this13.target = target;

          _this13.setHTML(HealthBarSmall.elementHTML);

          scene.add.existing(_assertThisInitialized(_this13));
          return _this13;
        }

        _createClass(HealthBarSmall, [{
          key: "update",
          value: function update(time, delta) {
            _get(_getPrototypeOf(HealthBarSmall.prototype), "update", this).call(this, time, delta);

            var bounds = this.target.gameObject.getBottomCenter();
            this.setPosition(bounds.x, bounds.y + 4);
            var bar = this.getChildByID('full');
            bar.style.width = "".concat(Math.max(Math.min(100, this.target.health / this.target.maxHealth * 100), 0), "%");
            this.visible = this.target.health < this.target.maxHealth;
          }
        }]);

        return HealthBarSmall;
      }(Phaser.GameObjects.DOMElement);

      HealthBarSmall.elementHTML = "\n    <div style='\n      background-color: red;\n      width: 48px;\n      height: 2px;\n    '>\n      <div id='full' style='\n        height: 100%;\n        width: 100%;\n        background-color: lime;\n      '>\n      </div>\n    </div>\n  ";
      /***/
    },

    /***/
    "./src/app/ui/ui.ts":
    /*!**************************!*\
      !*** ./src/app/ui/ui.ts ***!
      \**************************/

    /*! exports provided: UI */

    /***/
    function srcAppUiUiTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "UI", function () {
        return UI;
      });
      /* harmony import */


      var _healthBarPlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./healthBarPlayer */
      "./src/app/ui/healthBarPlayer.ts");
      /* harmony import */


      var _healthBarSmall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./healthBarSmall */
      "./src/app/ui/healthBarSmall.ts");
      /* harmony import */


      var _entityHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./entityHeader */
      "./src/app/ui/entityHeader.ts");

      var UI = {
        HealthBarPlayer: _healthBarPlayer__WEBPACK_IMPORTED_MODULE_0__["HealthBarPlayer"],
        HealthBarSmall: _healthBarSmall__WEBPACK_IMPORTED_MODULE_1__["HealthBarSmall"],
        EntityHeader: _entityHeader__WEBPACK_IMPORTED_MODULE_2__["EntityHeader"]
      };
      /***/
    },

    /***/
    "./src/environments/environment.ts":
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /*! exports provided: environment */

    /***/
    function srcEnvironmentsEnvironmentTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "environment", function () {
        return environment;
      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var environment = {
        production: false
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    "./src/main.ts":
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /*! no exports provided */

    /***/
    function srcMainTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./environments/environment */
      "./src/environments/environment.ts");
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/app.module */
      "./src/app/app.module.ts");
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/platform-browser */
      "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
        return console.error(err);
      });
      /***/

    },

    /***/
    0:
    /*!***************************!*\
      !*** multi ./src/main.ts ***!
      \***************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! D:\Dev\TypeScript\genericrpggame\generic-rpg\client\src\main.ts */
      "./src/main.ts");
      /***/
    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map