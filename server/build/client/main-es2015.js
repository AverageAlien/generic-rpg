(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _modules_app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/app-routing.module */ "./src/app/modules/app-routing.module.ts");
/* harmony import */ var _components_app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/app.component */ "./src/app/components/app.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _modules_materials_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/materials.module */ "./src/app/modules/materials.module.ts");
/* harmony import */ var _components_game_canvas_game_canvas_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/game-canvas/game-canvas.component */ "./src/app/components/game-canvas/game-canvas.component.ts");
/* harmony import */ var _components_level_editor_level_editor_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/level-editor/level-editor.component */ "./src/app/components/level-editor/level-editor.component.ts");









class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_components_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _modules_app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
            _modules_materials_module__WEBPACK_IMPORTED_MODULE_5__["MaterialsModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_components_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _components_game_canvas_game_canvas_component__WEBPACK_IMPORTED_MODULE_6__["GameCanvasComponent"],
        _components_level_editor_level_editor_component__WEBPACK_IMPORTED_MODULE_7__["LevelEditorComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _modules_app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
        _modules_materials_module__WEBPACK_IMPORTED_MODULE_5__["MaterialsModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _components_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _components_game_canvas_game_canvas_component__WEBPACK_IMPORTED_MODULE_6__["GameCanvasComponent"],
                    _components_level_editor_level_editor_component__WEBPACK_IMPORTED_MODULE_7__["LevelEditorComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _modules_app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                    _modules_materials_module__WEBPACK_IMPORTED_MODULE_5__["MaterialsModule"],
                ],
                providers: [],
                bootstrap: [_components_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/components/app.component.ts":
/*!*********************************************!*\
  !*** ./src/app/components/app.component.ts ***!
  \*********************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class AppComponent {
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 4, vars: 0, consts: [[1, "root-box"], [1, "game-title"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Generic RPG ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: [".root-box[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-flow: column nowrap;\n  align-items: center;\n  justify-content: flex-start;\n}\n.root-box[_ngcontent-%COMP%]   .game-title[_ngcontent-%COMP%] {\n  color: #ffd000;\n  font-size: 10vmin;\n  height: 10vmin;\n  margin: 2vmin 0;\n  display: flex;\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9hcHAuY29tcG9uZW50LnNjc3MiLCJzcmMvYXNzZXRzL3N0eWxlcy90aGVtZS1jb2xvcnMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBRUEsYUFBQTtFQUNBLHdCQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtBQUZGO0FBSUU7RUFDRSxjQ1hHO0VEWUgsaUJBQUE7RUFDQSxjQUFBO0VBRUEsZUFBQTtFQUVBLGFBQUE7RUFDQSxtQkFBQTtBQUpKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi8uLi9hc3NldHMvc3R5bGVzL3RoZW1lLWNvbG9ycy5zY3NzJztcclxuXHJcbi5yb290LWJveCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG5cclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuXHJcbiAgLmdhbWUtdGl0bGUge1xyXG4gICAgY29sb3I6ICRnb2xkO1xyXG4gICAgZm9udC1zaXplOiAxMHZtaW47XHJcbiAgICBoZWlnaHQ6IDEwdm1pbjtcclxuXHJcbiAgICBtYXJnaW46IDJ2bWluIDA7XHJcblxyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgfVxyXG59XHJcbiIsIiRtYWluQmdDb2xvcjogIzMxMzEzMTtcclxuJGdvbGQ6ICNmZmQwMDA7XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/components/game-canvas/game-canvas.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/components/game-canvas/game-canvas.component.ts ***!
  \*****************************************************************/
/*! exports provided: GameCanvasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameCanvasComponent", function() { return GameCanvasComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_app_scenes_levelScene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/scenes/levelScene */ "./src/app/scenes/levelScene.ts");
/* harmony import */ var src_app_core_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/constants */ "./src/app/core/constants.ts");
/* harmony import */ var src_app_services_input_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/input.service */ "./src/app/services/input.service.ts");
/* harmony import */ var src_app_services_level_loader_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/level-loader.service */ "./src/app/services/level-loader.service.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");








class GameCanvasComponent {
    constructor(inputService, levelLoader, ngZone) {
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
                default: 'arcade'
            },
            dom: {
                createContainer: true
            }
        };
    }
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this.phaserGame = new phaser__WEBPACK_IMPORTED_MODULE_1___default.a.Game(this.config);
        });
    }
    onExportLevel() {
        console.log(this.levelLoader.exportLevel(this.level));
    }
    onImportLevel() {
        const levelJson = prompt('Paste level JSON');
        if (!levelJson) {
            return;
        }
        this.levelLoader.importlevel(levelJson, this.level);
    }
}
GameCanvasComponent.ɵfac = function GameCanvasComponent_Factory(t) { return new (t || GameCanvasComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_input_service__WEBPACK_IMPORTED_MODULE_4__["InputService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_level_loader_service__WEBPACK_IMPORTED_MODULE_5__["LevelLoaderService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"])); };
GameCanvasComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GameCanvasComponent, selectors: [["app-game-canvas"]], decls: 6, vars: 0, consts: [[1, "root"], ["id", "gameContainer"], ["mat-raised-button", "", 3, "click"]], template: function GameCanvasComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GameCanvasComponent_Template_button_click_2_listener() { return ctx.onExportLevel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Export level");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GameCanvasComponent_Template_button_click_4_listener() { return ctx.onImportLevel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Import level");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZ2FtZS1jYW52YXMvZ2FtZS1jYW52YXMuY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GameCanvasComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-game-canvas',
                templateUrl: './game-canvas.component.html',
                styleUrls: ['./game-canvas.component.scss']
            }]
    }], function () { return [{ type: src_app_services_input_service__WEBPACK_IMPORTED_MODULE_4__["InputService"] }, { type: src_app_services_level_loader_service__WEBPACK_IMPORTED_MODULE_5__["LevelLoaderService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }]; }, null); })();


/***/ }),

/***/ "./src/app/components/level-editor/level-editor.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/level-editor/level-editor.component.ts ***!
  \*******************************************************************/
/*! exports provided: LevelEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LevelEditorComponent", function() { return LevelEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_core_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/constants */ "./src/app/core/constants.ts");
/* harmony import */ var src_app_scenes_levelEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/scenes/levelEditor */ "./src/app/scenes/levelEditor.ts");
/* harmony import */ var src_app_services_input_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/input.service */ "./src/app/services/input.service.ts");
/* harmony import */ var src_app_services_level_loader_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/level-loader.service */ "./src/app/services/level-loader.service.ts");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");







class LevelEditorComponent {
    constructor(inputService, levelLoader, ngZone) {
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
                default: 'arcade'
            },
            disableContextMenu: true
        };
    }
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this.phaserGame = new Phaser.Game(this.config);
        });
    }
    onExportLevel() {
        console.log(this.levelLoader.exportLevel(this.level));
    }
    onImportLevel() {
        const levelJson = prompt('Paste level JSON');
        if (!levelJson) {
            return;
        }
        this.levelLoader.importlevel(levelJson, this.level);
    }
}
LevelEditorComponent.ɵfac = function LevelEditorComponent_Factory(t) { return new (t || LevelEditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_input_service__WEBPACK_IMPORTED_MODULE_3__["InputService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_level_loader_service__WEBPACK_IMPORTED_MODULE_4__["LevelLoaderService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"])); };
LevelEditorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LevelEditorComponent, selectors: [["app-level-editor"]], decls: 6, vars: 0, consts: [[1, "root"], ["id", "gameContainer"], ["mat-raised-button", "", 3, "click"]], template: function LevelEditorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LevelEditorComponent_Template_button_click_2_listener() { return ctx.onExportLevel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Export level");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LevelEditorComponent_Template_button_click_4_listener() { return ctx.onImportLevel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Import level");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbGV2ZWwtZWRpdG9yL2xldmVsLWVkaXRvci5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LevelEditorComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-level-editor',
                templateUrl: './level-editor.component.html',
                styleUrls: ['./level-editor.component.scss']
            }]
    }], function () { return [{ type: src_app_services_input_service__WEBPACK_IMPORTED_MODULE_3__["InputService"] }, { type: src_app_services_level_loader_service__WEBPACK_IMPORTED_MODULE_4__["LevelLoaderService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }]; }, null); })();


/***/ }),

/***/ "./src/app/core/blocks.ts":
/*!********************************!*\
  !*** ./src/app/core/blocks.ts ***!
  \********************************/
/*! exports provided: BlockType, Blocks, BlockIds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlockType", function() { return BlockType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Blocks", function() { return Blocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlockIds", function() { return BlockIds; });
var BlockType;
(function (BlockType) {
    BlockType[BlockType["Background"] = 0] = "Background";
    BlockType[BlockType["Foreground"] = 1] = "Foreground";
})(BlockType || (BlockType = {}));
const Blocks = new Map([
    ['grass', { type: BlockType.Background, texture: 'grass01' }],
    ['stone_floor', { type: BlockType.Background, texture: 'stone_floor01' }],
    ['stone_bricks', { type: BlockType.Foreground, texture: 'stone_wall01' }],
]);
const BlockIds = Array.from(Blocks.keys());


/***/ }),

/***/ "./src/app/core/constants.ts":
/*!***********************************!*\
  !*** ./src/app/core/constants.ts ***!
  \***********************************/
/*! exports provided: Constants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
class Screen {
}
Screen.SCREEN_W = 800;
Screen.SCREEN_H = 608;
class Level {
}
Level.GRID_SIZE_X = 32;
Level.GRID_SIZE_Y = 32;
Level.CHUNK_W = 32; // in tiles
Level.CHUNK_H = 32; // in tiles
class Character {
}
Character.MAX_SPEED_MULT = 5;
Character.COLLIDER_W = 20;
Character.COLLIDER_H = 20;
Character.COLLIDER_OFFSET_X = 1;
Character.COLLIDER_OFFSET_Y = 7;
const Constants = {
    Screen,
    Level,
    Character
};


/***/ }),

/***/ "./src/app/core/factions.ts":
/*!**********************************!*\
  !*** ./src/app/core/factions.ts ***!
  \**********************************/
/*! exports provided: Faction, FactionsAreFriendly */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Faction", function() { return Faction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FactionsAreFriendly", function() { return FactionsAreFriendly; });
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


/***/ }),

/***/ "./src/app/core/mapGrid.ts":
/*!*********************************!*\
  !*** ./src/app/core/mapGrid.ts ***!
  \*********************************/
/*! exports provided: MapGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapGrid", function() { return MapGrid; });
/* harmony import */ var _blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks */ "./src/app/core/blocks.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/app/core/constants.ts");


class MapGrid {
    constructor(levelScene, tileSet) {
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
        this.collidingBlocks = Array.from(_blocks__WEBPACK_IMPORTED_MODULE_0__["Blocks"].entries())
            .filter(e => e[1].type === _blocks__WEBPACK_IMPORTED_MODULE_0__["BlockType"].Foreground)
            .map(e => _blocks__WEBPACK_IMPORTED_MODULE_0__["BlockIds"].indexOf(e[0]));
    }
    addBlock(pos, block, layer = 0) {
        const { blockName, blockData } = this.resolveBlockInfo(block);
        const { chunkPos, tilePos } = this.localizeChunk(pos);
        // const chunkPos = new Phaser.Math.Vector2(
        //   Math.floor(pos.x / Constants.Level.CHUNK_W),
        //   Math.floor(pos.y / Constants.Level.CHUNK_H)
        // );
        const chunk = this.ensureChunkExists(chunkPos, layer);
        // const tilePosInChunk = new Phaser.Math.Vector2(pos)
        //   .subtract(new Phaser.Math.Vector2(chunkPos)
        //     .multiply(new Phaser.Math.Vector2(
        //       Constants.Level.CHUNK_W,
        //       Constants.Level.CHUNK_H
        //     ))
        //   );
        chunk.putTileAt(_blocks__WEBPACK_IMPORTED_MODULE_0__["BlockIds"].indexOf(blockName), tilePos.x, tilePos.y);
    }
    fillArea(pos, size, block, layer = 0) {
        const lowerCorner = new Phaser.Math.Vector2(pos).add(size);
        for (let i = pos.x; i <= lowerCorner.x; ++i) {
            for (let j = pos.y; j <= lowerCorner.y; ++j) {
                this.addBlock(new Phaser.Math.Vector2(i, j), block, layer);
            }
        }
    }
    getBlockAt(pos, layer = 0) {
        // TODO: rewrite this and the rest to return indices instead in order to optimize level exports
        const { chunkPos, tilePos } = this.localizeChunk(pos);
        if (!this.chunks[layer] ||
            !this.chunks[layer][chunkPos.x] ||
            !this.chunks[layer][chunkPos.x][chunkPos.y]) {
            return null;
        }
        const tile = this.chunks[layer][chunkPos.x][chunkPos.y].getTileAt(tilePos.x, tilePos.y);
        if (!tile) {
            return null;
        }
        return _blocks__WEBPACK_IMPORTED_MODULE_0__["BlockIds"][tile.index];
    }
    getAll() {
        return this.chunks.flatMap(x => x.flatMap(y => y.flatMap(chunk => chunk.getTilesWithin().map(tile => {
            return {
                name: _blocks__WEBPACK_IMPORTED_MODULE_0__["BlockIds"][tile.index],
                x: tile.x + chunk.x / _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.GRID_SIZE_X,
                y: tile.y + chunk.y / _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.GRID_SIZE_Y
            };
        }))));
    }
    getAllChunks(layer) {
        if (!layer) {
            return this.chunks.flatMap(L => L.flatMap(row => row));
        }
        return this.chunks[layer].flatMap(row => row);
    }
    getAllOfLayer(layer) {
        return Object.values(this.chunks[layer]).flatMap(row => {
            return Object.values(row).flatMap(chunk => {
                return chunk.getTilesWithin(0, 0, undefined, undefined, { isNotEmpty: true }).map(tile => {
                    return {
                        name: _blocks__WEBPACK_IMPORTED_MODULE_0__["BlockIds"][tile.index],
                        x: tile.x + chunk.x / _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.GRID_SIZE_X,
                        y: tile.y + chunk.y / _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.GRID_SIZE_Y
                    };
                });
            });
        });
    }
    getUsedLayers() {
        const usedLayers = new Set();
        for (const layer in this.chunks) {
            if (this.chunks.hasOwnProperty(layer)) {
                usedLayers.add(Number(layer));
            }
        }
        return Array.from(usedLayers);
    }
    removeBlockAt(pos, layer = 0) {
        const { chunkPos, tilePos } = this.localizeChunk(pos);
        const chunk = this.chunks[layer][chunkPos.x][chunkPos.y].removeTileAt(tilePos.x, tilePos.y);
    }
    clearGrid() {
        this.chunks.forEach(layer => layer.forEach(row => row.forEach(chunk => chunk.destroy())));
        this.chunks = [];
    }
    ensureChunkExists(chunkPos, layer = 0) {
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
    createChunk(chunkPos, layer = 0) {
        const chunk = this.tileMap.createBlankDynamicLayer(`chunk_${layer}_${chunkPos.x}_${chunkPos.y}`, this.tileSet, chunkPos.x * _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.GRID_SIZE_X * _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.CHUNK_W, chunkPos.y * _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.GRID_SIZE_Y * _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.CHUNK_H);
        chunk.setCollision(this.collidingBlocks);
        chunk.setDepth(layer);
        this.levelScene.physics.add.collider(this.levelScene.entities.map(e => e.gameObject), chunk);
        this.chunks[layer][chunkPos.x][chunkPos.y] = chunk;
        return chunk;
    }
    resolveBlockInfo(block) {
        let blockName = null;
        let blockData;
        if (typeof block === 'string') {
            blockName = block;
            blockData = _blocks__WEBPACK_IMPORTED_MODULE_0__["Blocks"].get(blockName);
        }
        else {
            blockName = 'custom';
            blockData = block;
        }
        return { blockName, blockData };
    }
    localizeChunk(pos) {
        const chunkPos = new Phaser.Math.Vector2(Math.floor(pos.x / _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.CHUNK_W), Math.floor(pos.y / _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.CHUNK_H));
        const tilePos = new Phaser.Math.Vector2(pos)
            .subtract(new Phaser.Math.Vector2(chunkPos)
            .multiply(new Phaser.Math.Vector2(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.CHUNK_W, _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Level.CHUNK_H)));
        return { chunkPos, tilePos };
    }
}


/***/ }),

/***/ "./src/app/gameplay/controllers/playerController.ts":
/*!**********************************************************!*\
  !*** ./src/app/gameplay/controllers/playerController.ts ***!
  \**********************************************************/
/*! exports provided: PlayerController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerController", function() { return PlayerController; });
class PlayerController {
    constructor(inputKeys) {
        this.inputKeys = inputKeys;
    }
    get movement() {
        return new Phaser.Math.Vector2(-this.inputKeys.left.isDown || +this.inputKeys.right.isDown, -this.inputKeys.up.isDown || +this.inputKeys.down.isDown).normalize();
    }
    get attack() {
        return null;
    }
}


/***/ }),

/***/ "./src/app/gameplay/controllers/walkerController.ts":
/*!**********************************************************!*\
  !*** ./src/app/gameplay/controllers/walkerController.ts ***!
  \**********************************************************/
/*! exports provided: WalkerController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WalkerController", function() { return WalkerController; });
/* harmony import */ var src_app_core_factions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/core/factions */ "./src/app/core/factions.ts");
/* harmony import */ var pathfinding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pathfinding */ "./node_modules/pathfinding/index.js");
/* harmony import */ var pathfinding__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pathfinding__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/constants */ "./src/app/core/constants.ts");



class WalkerController {
    constructor(myself, levelScene, aggroRadius = 256, unaggroRadius = aggroRadius * Math.SQRT2, minRange = 64) {
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
    get movement() {
        if (!this.target || !this.target.gameObject || !this.target.gameObject.body) {
            const searched = this.searchTarget();
            if (!searched) {
                return Phaser.Math.Vector2.ZERO;
            }
            else {
                this.target = searched;
            }
        }
        const distanceSq = this.myself.gameObject.body.position.distanceSq(this.target.gameObject.body.position);
        if (distanceSq > this.unaggroRadius * this.unaggroRadius) {
            this.target = null;
            return Phaser.Math.Vector2.ZERO;
        }
        else if (distanceSq < this.minRange) {
            return Phaser.Math.Vector2.ZERO;
        }
        const moveVector = this.calculateMovement(this.target.gameObject.body.position);
        return moveVector;
    }
    get attack() {
        return null;
    }
    calculateMovement(targetPos) {
        if (this.myself.gameObject.body.position.distanceSq(targetPos) > this.unrushDistanceSq) {
            this.rushAtTarget = false;
        }
        if (this.rushAtTarget) {
            return new Phaser.Math.Vector2(targetPos)
                .subtract(this.myself.gameObject.body.position)
                .normalize();
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
        }
        else if (this.pathWaypoints[0].distanceSq(this.myself.gameObject.body.position) < this.waypointReachedDistanceSq) {
            this.pathWaypoints.shift();
            if (this.pathWaypoints.length === 0) {
                this.rushAtTarget = true;
                return Phaser.Math.Vector2.ZERO;
            }
        }
        return new Phaser.Math.Vector2(this.pathWaypoints[0])
            .subtract(this.myself.gameObject.body.position)
            .normalize();
    }
    buildPathToTarget(targetPos) {
        const myPos = this.myself.gameObject.body.position;
        const gridLowerCorner = new Phaser.Math.Vector2(Math.floor((Math.min(myPos.x, targetPos.x) - this.aggroRadius) / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X), Math.floor((Math.min(myPos.y, targetPos.y) - this.aggroRadius) / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y));
        const gridUpperCorner = new Phaser.Math.Vector2(Math.ceil((Math.max(myPos.x, targetPos.x) + this.aggroRadius) / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X), Math.ceil((Math.max(myPos.y, targetPos.y) + this.aggroRadius) / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y));
        const gridSize = new Phaser.Math.Vector2(gridUpperCorner).subtract(gridLowerCorner);
        const matrix = [];
        for (let i = 0; i <= gridSize.y; ++i) {
            matrix.push([]);
            for (let j = 0; j <= gridSize.x; ++j) {
                matrix[i].push(this.levelScene.mapGrid.getBlockAt(new Phaser.Math.Vector2(j + gridLowerCorner.x, i + gridLowerCorner.y)) ? 1 : 0);
            }
        }
        const grid = new pathfinding__WEBPACK_IMPORTED_MODULE_1___default.a.Grid(matrix);
        const finder = new pathfinding__WEBPACK_IMPORTED_MODULE_1___default.a.AStarFinder({
            diagonalMovement: pathfinding__WEBPACK_IMPORTED_MODULE_1__["DiagonalMovement"].IfAtMostOneObstacle,
            weight: 1,
            heuristic: pathfinding__WEBPACK_IMPORTED_MODULE_1___default.a.Heuristic.euclidean
        });
        let path;
        const pathStart = new Phaser.Math.Vector2(Math.round(myPos.x / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X) - gridLowerCorner.x, Math.round(myPos.y / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y) - gridLowerCorner.y);
        const pathFinish = new Phaser.Math.Vector2(Math.round(targetPos.x / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X) - gridLowerCorner.x, Math.round(targetPos.y / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y) - gridLowerCorner.y);
        try {
            path = finder.findPath(pathStart.x, pathStart.y, pathFinish.x, pathFinish.y, grid);
        }
        catch (_a) {
            debugger;
        }
        if (this._DEBUG) {
            this._drawDebug(this.levelScene.debugGraphics, matrix, path, myPos, targetPos, gridLowerCorner);
        }
        if (!path) {
            return null;
        }
        path = pathfinding__WEBPACK_IMPORTED_MODULE_1___default.a.Util.compressPath(path);
        return path.map(point => new Phaser.Math.Vector2((point[0] + gridLowerCorner.x) * src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X, (point[1] + gridLowerCorner.y) * src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y));
    }
    searchTarget() {
        const myNumber = this.levelScene.entities.indexOf(this.myself);
        if (myNumber < 0) {
            throw new Error('I am not on the entities list!');
        }
        const target = this.levelScene.physics.closest(this.myself.gameObject.body.position, this.levelScene.entities
            .filter((e, i) => !Object(src_app_core_factions__WEBPACK_IMPORTED_MODULE_0__["FactionsAreFriendly"])(this.myself.faction, e.faction) &&
            e.gameObject.body.position.distanceSq(this.myself.gameObject.body.position) < this.aggroRadius * this.aggroRadius &&
            (myNumber !== i))
            .map(e => e.gameObject));
        if (!target) {
            return null;
        }
        const targetEntity = this.levelScene.entities.find(e => e.gameObject === target);
        if (!targetEntity) {
            throw new Error('Entity for closest GameObject not found!');
        }
        return targetEntity;
    }
    _drawDebug(gfx, matrix, path, myPos, targetPos, gridLowerCorner) {
        gfx.clear();
        path.forEach(p => {
            matrix[p[1]][p[0]] = 4;
        });
        matrix[Math.round(myPos.y / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y) - gridLowerCorner.y][Math.round(myPos.x / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X) - gridLowerCorner.x] = 2;
        matrix[Math.round(targetPos.y / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y) - gridLowerCorner.y][Math.round(targetPos.x / src_app_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X) - gridLowerCorner.x] = 3;
        matrix.forEach((row, i) => {
            row.forEach((cell, j) => {
                let color;
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
}


/***/ }),

/***/ "./src/app/gameplay/entities/characterEntity.ts":
/*!******************************************************!*\
  !*** ./src/app/gameplay/entities/characterEntity.ts ***!
  \******************************************************/
/*! exports provided: CharacterEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharacterEntity", function() { return CharacterEntity; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_app_core_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/constants */ "./src/app/core/constants.ts");
/* harmony import */ var src_app_core_factions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/factions */ "./src/app/core/factions.ts");



class CharacterEntity {
    constructor(cfg) {
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
    get destroyed() {
        return this.destroyed$.asObservable();
    }
    update() {
        this.move();
    }
    damage(dmg) {
        this.health -= dmg;
        if (this.health <= 0) {
            this.destroy();
        }
    }
    destroy() {
        this.gameObject.destroy();
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    move() {
        const maxSpeedMult = src_app_core_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].Character.MAX_SPEED_MULT;
        const movement = this.controller.movement.scale(this.speed * maxSpeedMult * 10);
        if (this.gameObject.body.velocity.lengthSq() > (this.speed * this.speed * maxSpeedMult * maxSpeedMult)) {
            this.gameObject.body.velocity.normalize().scale(this.speed * maxSpeedMult);
        }
        if (movement.x !== 0) {
            this.lookRight(movement.x > 0);
        }
        this.gameObject.body.setAcceleration(movement.x, movement.y);
    }
    lookRight(condition) {
        this.gameObject.setFlipX(condition);
    }
    refreshRenderSprite() {
        const bounds = this.gameObject.body.center;
        this.gameObject.clear();
        this.gameObject.draw(this.bodyTexture, 0, 0);
    }
}


/***/ }),

/***/ "./src/app/gameplay/entities/humanoidEntity.ts":
/*!*****************************************************!*\
  !*** ./src/app/gameplay/entities/humanoidEntity.ts ***!
  \*****************************************************/
/*! exports provided: HumanoidEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HumanoidEntity", function() { return HumanoidEntity; });
/* harmony import */ var _characterEntity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./characterEntity */ "./src/app/gameplay/entities/characterEntity.ts");

class HumanoidEntity extends _characterEntity__WEBPACK_IMPORTED_MODULE_0__["CharacterEntity"] {
    constructor(cfg) {
        super(cfg);
        this.armor = null;
        this.weapon = null;
        this.equipArmor(cfg.armor);
        this.weapon = cfg.weapon;
    }
    equipArmor(armor) {
        this.armor = armor;
        console.log('equip called');
        this.refreshRenderSprite();
    }
    update() {
        super.update();
    }
    lookRight(condition) {
        super.lookRight(condition);
    }
    refreshRenderSprite() {
        super.refreshRenderSprite();
        if (this.armor) {
            this.gameObject.draw(this.armor.texture, this.gameObject.width / 2 - 9, this.gameObject.height / 2 - 5);
        }
    }
}


/***/ }),

/***/ "./src/app/gameplay/items/armor.ts":
/*!*****************************************!*\
  !*** ./src/app/gameplay/items/armor.ts ***!
  \*****************************************/
/*! exports provided: Armor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Armor", function() { return Armor; });
/* harmony import */ var _equipmentItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./equipmentItem */ "./src/app/gameplay/items/equipmentItem.ts");

class Armor extends _equipmentItem__WEBPACK_IMPORTED_MODULE_0__["EquipmentItem"] {
    constructor(cfg) {
        super(cfg.name, cfg.texture, cfg.description || 'No information.', cfg.price || 0, cfg.mass || 0, cfg.level || 1);
        this.texture = cfg.texture;
    }
}


/***/ }),

/***/ "./src/app/gameplay/items/equipmentItem.ts":
/*!*************************************************!*\
  !*** ./src/app/gameplay/items/equipmentItem.ts ***!
  \*************************************************/
/*! exports provided: EquipmentItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipmentItem", function() { return EquipmentItem; });
class EquipmentItem {
    constructor(name, texture, description, price, mass, level) {
        this.name = name;
        this.texture = texture;
        this.description = description;
        this.price = price;
        this.mass = mass;
        this.level = level;
    }
}


/***/ }),

/***/ "./src/app/modules/app-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/modules/app-routing.module.ts ***!
  \***********************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _components_level_editor_level_editor_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/level-editor/level-editor.component */ "./src/app/components/level-editor/level-editor.component.ts");
/* harmony import */ var _components_game_canvas_game_canvas_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/game-canvas/game-canvas.component */ "./src/app/components/game-canvas/game-canvas.component.ts");






const routes = [
    {
        path: 'editor',
        component: _components_level_editor_level_editor_component__WEBPACK_IMPORTED_MODULE_2__["LevelEditorComponent"]
    },
    {
        path: '',
        component: _components_game_canvas_game_canvas_component__WEBPACK_IMPORTED_MODULE_3__["GameCanvasComponent"]
    }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/modules/materials.module.ts":
/*!*********************************************!*\
  !*** ./src/app/modules/materials.module.ts ***!
  \*********************************************/
/*! exports provided: MaterialsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialsModule", function() { return MaterialsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/layout.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/card.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/checkbox.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/list.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/progress-bar.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/sidenav.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/snack-bar.js");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/stepper.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/toolbar.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tabs.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/input.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/select.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/table.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/menu.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/progress-spinner.js");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/badge */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/badge.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/expansion.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/datepicker.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/radio.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/core.js");

























class MaterialsModule {
}
MaterialsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: MaterialsModule });
MaterialsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function MaterialsModule_Factory(t) { return new (t || MaterialsModule)(); }, imports: [[],
        _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["LayoutModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_12__["MatToolbarModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__["MatSidenavModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_7__["MatListModule"],
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__["MatTabsModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
        _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__["MatStepperModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_14__["MatInputModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialogModule"],
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__["MatProgressBarModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_15__["MatSelectModule"],
        _angular_material_table__WEBPACK_IMPORTED_MODULE_16__["MatTableModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__["MatMenuModule"],
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__["MatSnackBarModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_18__["MatProgressSpinnerModule"],
        _angular_material_badge__WEBPACK_IMPORTED_MODULE_19__["MatBadgeModule"],
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__["MatExpansionModule"],
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_22__["MatRadioModule"],
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_21__["MatDatepickerModule"],
        _angular_material_core__WEBPACK_IMPORTED_MODULE_23__["MatNativeDateModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](MaterialsModule, { exports: [_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["LayoutModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_12__["MatToolbarModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__["MatSidenavModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_7__["MatListModule"],
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__["MatTabsModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
        _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__["MatStepperModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_14__["MatInputModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialogModule"],
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__["MatProgressBarModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_15__["MatSelectModule"],
        _angular_material_table__WEBPACK_IMPORTED_MODULE_16__["MatTableModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__["MatMenuModule"],
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__["MatSnackBarModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_18__["MatProgressSpinnerModule"],
        _angular_material_badge__WEBPACK_IMPORTED_MODULE_19__["MatBadgeModule"],
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__["MatExpansionModule"],
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_22__["MatRadioModule"],
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_21__["MatDatepickerModule"],
        _angular_material_core__WEBPACK_IMPORTED_MODULE_23__["MatNativeDateModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MaterialsModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [],
                exports: [
                    _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["LayoutModule"],
                    _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_12__["MatToolbarModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                    _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__["MatSidenavModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
                    _angular_material_list__WEBPACK_IMPORTED_MODULE_7__["MatListModule"],
                    _angular_material_tabs__WEBPACK_IMPORTED_MODULE_13__["MatTabsModule"],
                    _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
                    _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__["MatStepperModule"],
                    _angular_material_input__WEBPACK_IMPORTED_MODULE_14__["MatInputModule"],
                    _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialogModule"],
                    _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__["MatProgressBarModule"],
                    _angular_material_select__WEBPACK_IMPORTED_MODULE_15__["MatSelectModule"],
                    _angular_material_table__WEBPACK_IMPORTED_MODULE_16__["MatTableModule"],
                    _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
                    _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__["MatMenuModule"],
                    _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__["MatSnackBarModule"],
                    _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_18__["MatProgressSpinnerModule"],
                    _angular_material_badge__WEBPACK_IMPORTED_MODULE_19__["MatBadgeModule"],
                    _angular_material_expansion__WEBPACK_IMPORTED_MODULE_20__["MatExpansionModule"],
                    _angular_material_radio__WEBPACK_IMPORTED_MODULE_22__["MatRadioModule"],
                    _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_21__["MatDatepickerModule"],
                    _angular_material_core__WEBPACK_IMPORTED_MODULE_23__["MatNativeDateModule"],
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/scenes/levelEditor.ts":
/*!***************************************!*\
  !*** ./src/app/scenes/levelEditor.ts ***!
  \***************************************/
/*! exports provided: LevelEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LevelEditor", function() { return LevelEditor; });
/* harmony import */ var _levelScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./levelScene */ "./src/app/scenes/levelScene.ts");
/* harmony import */ var _services_entity_spawner_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/entity-spawner.service */ "./src/app/services/entity-spawner.service.ts");
/* harmony import */ var _core_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/constants */ "./src/app/core/constants.ts");
/* harmony import */ var _core_mapGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/mapGrid */ "./src/app/core/mapGrid.ts");




class LevelEditor extends _levelScene__WEBPACK_IMPORTED_MODULE_0__["Level"] {
    constructor() {
        super(...arguments);
        this.cursorActive = true;
    }
    create() {
        this.entitySpawner = new _services_entity_spawner_service__WEBPACK_IMPORTED_MODULE_1__["EntitySpawnerService"]();
        this.entitySpawner.init(this.inputService.getInputKeys(this.input.keyboard), this);
        this.mapGrid = new _core_mapGrid__WEBPACK_IMPORTED_MODULE_3__["MapGrid"](this, 'tileset');
        this.player = this.entitySpawner.spawnPlayer('Editor', Phaser.Math.Vector2.ZERO, 60);
        this.cameras.main.startFollow(this.player.gameObject, false, 0.1, 0.1);
        this.grid = this.add.grid(0, 0, 900, 708, 32, 32, 0x000000, 0, 0xffffff, 0.5);
        this.input.on('gameout', () => {
            this.cursorActive = false;
        });
        this.input.on('gameover', () => {
            this.cursorActive = true;
        });
    }
    update() {
        this.entities.forEach(e => e.update());
        const gridPos = new Phaser.Math.Vector2(this.snap(this.cameras.main.worldView.centerX, _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X) + 2, this.snap(this.cameras.main.worldView.centerY, _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y) + 2);
        this.grid.setPosition(gridPos.x, gridPos.y);
        // this.input.activePointer.updateWorldPoint(this.cameras.main);
        if (this.cursorActive) {
            const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
            const placePosition = new Phaser.Math.Vector2(Math.floor(worldPoint.x / _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X), Math.floor(worldPoint.y / _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y));
            if (this.input.manager.activePointer.leftButtonDown()) {
                if (!this.mapGrid.getBlockAt(placePosition)) {
                    this.mapGrid.addBlock(placePosition, 'stone_bricks');
                }
            }
            else if (this.input.manager.activePointer.rightButtonDown()) {
                if (!this.mapGrid.getBlockAt(placePosition, -1)) {
                    this.mapGrid.addBlock(placePosition, 'stone_floor', -1);
                }
            }
        }
    }
    snap(value, snapSize) {
        return value - (value % snapSize);
    }
}


/***/ }),

/***/ "./src/app/scenes/levelScene.ts":
/*!**************************************!*\
  !*** ./src/app/scenes/levelScene.ts ***!
  \**************************************/
/*! exports provided: Level */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Level", function() { return Level; });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ "./node_modules/phaser/dist/phaser.js");
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_entity_spawner_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/entity-spawner.service */ "./src/app/services/entity-spawner.service.ts");
/* harmony import */ var _services_asset_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/asset.service */ "./src/app/services/asset.service.ts");
/* harmony import */ var _core_mapGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/mapGrid */ "./src/app/core/mapGrid.ts");
/* harmony import */ var _ui_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui/ui */ "./src/app/ui/ui.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _gameplay_items_armor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../gameplay/items/armor */ "./src/app/gameplay/items/armor.ts");







class Level extends phaser__WEBPACK_IMPORTED_MODULE_0__["Scene"] {
    constructor(inputService, levelLoader) {
        super({ key: 'level' });
        this.inputService = inputService;
        this.levelLoader = levelLoader;
        this.entities = [];
        this.levelUI = [];
    }
    create() {
        this.entitySpawner = new _services_entity_spawner_service__WEBPACK_IMPORTED_MODULE_1__["EntitySpawnerService"]();
        this.entitySpawner.init(this.inputService.getInputKeys(this.input.keyboard), this);
        this.mapGrid = new _core_mapGrid__WEBPACK_IMPORTED_MODULE_3__["MapGrid"](this, 'tileset');
        this.player = this.entitySpawner.spawnPlayer('maxi', new Phaser.Math.Vector2(-17, -7), 30);
        this.cameras.main.startFollow(this.player.gameObject, false, 0.1, 0.1);
        const stalker = this.entitySpawner.spawnStalker(new Phaser.Math.Vector2(6, 11), 20);
        Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["timer"])(10000)
            .subscribe(() => {
            stalker.equipArmor(new _gameplay_items_armor__WEBPACK_IMPORTED_MODULE_6__["Armor"]({
                name: 'Leather vest',
                texture: 'leather_vest'
            }));
        });
        this.player.equipArmor(new _gameplay_items_armor__WEBPACK_IMPORTED_MODULE_6__["Armor"]({
            name: 'Leather vest',
            texture: 'leather_vest'
        }));
        // stalker.damage(20);
        // interval(100)
        //   .pipe(takeUntil(this.player.destroyed))
        //   .subscribe(() => { this.player.damage(1); });
        this.backgroundImage = this.add.tileSprite(0, 0, this.sys.game.canvas.width + 100, this.sys.game.canvas.height + 100, 'grass01');
        this.backgroundImage.setDepth(-50);
        this.debugGraphics = this.add.graphics().setDepth(2).setAlpha(0.75);
        this.events.on('postupdate', this.postupdate.bind(this));
        this.levelUI.push(new _ui_ui__WEBPACK_IMPORTED_MODULE_4__["UI"].HealthBarPlayer(this));
        const renderSprite = this.add.renderTexture(-500, -200).setDepth(5);
        renderSprite.draw('humanoid', 0, 0);
        Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["timer"])(5000)
            .subscribe(() => { renderSprite.draw('leather_vest'); });
        Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["timer"])(10000)
            .subscribe(() => {
            renderSprite.clear();
            renderSprite.draw('humanoid');
        });
    }
    preload() {
        _services_asset_service__WEBPACK_IMPORTED_MODULE_2__["AssetService"].loadBlockSprites(this.load);
        _services_asset_service__WEBPACK_IMPORTED_MODULE_2__["AssetService"].loadEntitySprites(this.load);
        _services_asset_service__WEBPACK_IMPORTED_MODULE_2__["AssetService"].loadArmorSprites(this.load);
    }
    update() {
        this.entities.forEach(e => e.update());
        this.backgroundImage.setPosition(this.cameras.main.worldView.centerX, this.cameras.main.worldView.centerY);
        this.backgroundImage.setTilePosition(this.cameras.main.worldView.centerX, this.cameras.main.worldView.centerY);
    }
    postupdate() {
        this.levelUI.forEach(ui => ui.update());
    }
}


/***/ }),

/***/ "./src/app/services/asset.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/asset.service.ts ***!
  \*******************************************/
/*! exports provided: AssetService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssetService", function() { return AssetService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class AssetService {
    static loadBlockSprites(loader) {
        loader.image('grass01', 'assets/textures/blocks/grass01.png');
        loader.image('stone_wall01', 'assets/textures/blocks/stone_wall01.png');
        loader.image('stone_floor01', 'assets/textures/blocks/stone_floor01.png');
        loader.image('tileset', 'assets/textures/blocks/tileset-extruded.png');
    }
    static loadEntitySprites(loader) {
        loader.image('humanoid', 'assets/textures/entities/humanoid.png');
    }
    static loadArmorSprites(loader) {
        loader.image('leather_vest', 'assets/textures/items/armor/leather_vest.png');
        loader.image('leather_vest_outline', 'assets/textures/items/armor/leather_vest_outline.png');
    }
}
AssetService.ɵfac = function AssetService_Factory(t) { return new (t || AssetService)(); };
AssetService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AssetService, factory: AssetService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AssetService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/services/entity-spawner.service.ts":
/*!****************************************************!*\
  !*** ./src/app/services/entity-spawner.service.ts ***!
  \****************************************************/
/*! exports provided: EntitySpawnerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntitySpawnerService", function() { return EntitySpawnerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _gameplay_controllers_playerController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gameplay/controllers/playerController */ "./src/app/gameplay/controllers/playerController.ts");
/* harmony import */ var _core_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/constants */ "./src/app/core/constants.ts");
/* harmony import */ var _core_factions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/factions */ "./src/app/core/factions.ts");
/* harmony import */ var _gameplay_controllers_walkerController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../gameplay/controllers/walkerController */ "./src/app/gameplay/controllers/walkerController.ts");
/* harmony import */ var _ui_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ui/ui */ "./src/app/ui/ui.ts");
/* harmony import */ var _gameplay_entities_humanoidEntity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../gameplay/entities/humanoidEntity */ "./src/app/gameplay/entities/humanoidEntity.ts");








class EntitySpawnerService {
    init(inputKeys, levelScene) {
        this.inputKeys = inputKeys;
        this.levelScene = levelScene;
    }
    spawnPlayer(playerName, position, speed) {
        const gameObject = this.createRenderTexture(position, new Phaser.Math.Vector2(this.levelScene.textures.getFrame('humanoid', 0).width, this.levelScene.textures.getFrame('humanoid', 0).height)).setDepth(4);
        gameObject.body
            .setSize(_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Character.COLLIDER_W, _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Character.COLLIDER_H)
            .setOffset(_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Character.COLLIDER_OFFSET_X, _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Character.COLLIDER_OFFSET_Y);
        const entity = new _gameplay_entities_humanoidEntity__WEBPACK_IMPORTED_MODULE_6__["HumanoidEntity"]({
            name: playerName,
            gameObject,
            maxHealth: 100,
            level: 1,
            speed,
            bodyTexture: 'humanoid'
        });
        entity.controller = new _gameplay_controllers_playerController__WEBPACK_IMPORTED_MODULE_1__["PlayerController"](this.inputKeys);
        entity.destroyed.subscribe(() => {
            const entityIndex = this.levelScene.entities.indexOf(entity);
            if (entityIndex >= 0) {
                this.levelScene.entities.splice(entityIndex, 1);
            }
            console.log(this.levelScene.player);
        });
        this.levelScene.entities.push(entity);
        return entity;
    }
    spawnStalker(position, speed) {
        const gameObject = this.createRenderTexture(position, new Phaser.Math.Vector2(this.levelScene.textures.getFrame('humanoid', 0).width, this.levelScene.textures.getFrame('humanoid', 0).height)).setDepth(3);
        gameObject.body
            .setSize(_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Character.COLLIDER_W, _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Character.COLLIDER_H)
            .setOffset(_core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Character.COLLIDER_OFFSET_X, _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Character.COLLIDER_OFFSET_Y);
        const entity = new _gameplay_entities_humanoidEntity__WEBPACK_IMPORTED_MODULE_6__["HumanoidEntity"]({
            name: 'Stalker',
            gameObject,
            maxHealth: 100,
            level: 1,
            speed,
            bodyTexture: 'humanoid'
        });
        entity.faction = _core_factions__WEBPACK_IMPORTED_MODULE_3__["Faction"].Baddies;
        entity.controller = new _gameplay_controllers_walkerController__WEBPACK_IMPORTED_MODULE_4__["WalkerController"](entity, this.levelScene, 512);
        const healthBar = new _ui_ui__WEBPACK_IMPORTED_MODULE_5__["UI"].HealthBarSmall(this.levelScene, entity);
        const nameLabel = new _ui_ui__WEBPACK_IMPORTED_MODULE_5__["UI"].EntityHeader(this.levelScene, entity);
        entity.destroyed.subscribe(() => {
            healthBar.destroy();
            nameLabel.destroy();
            const healthBarIndex = this.levelScene.levelUI.indexOf(healthBar);
            if (healthBarIndex >= 0) {
                this.levelScene.levelUI.splice(healthBarIndex, 1);
            }
            const labelIndex = this.levelScene.levelUI.indexOf(nameLabel);
            if (labelIndex >= 0) {
                this.levelScene.levelUI.splice(labelIndex, 1);
            }
            const entityIndex = this.levelScene.entities.indexOf(entity);
            if (entityIndex >= 0) {
                this.levelScene.entities.splice(entityIndex, 1);
            }
        });
        this.levelScene.levelUI.push(healthBar);
        this.levelScene.levelUI.push(nameLabel);
        this.levelScene.entities.push(entity);
        return entity;
    }
    createSpriteGameObject(position, sprite) {
        let gameObject;
        gameObject = this.levelScene.add.sprite(position.x * _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X, position.y * _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y, sprite);
        return this.setupPhysics(gameObject);
    }
    createRenderTexture(position, size) {
        let gameObject;
        gameObject = this.levelScene.add.renderTexture(position.x * _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_X, position.y * _core_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].Level.GRID_SIZE_Y, size.x, size.y);
        return this.setupPhysics(gameObject);
    }
    setupPhysics(gameObject) {
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
}
EntitySpawnerService.ɵfac = function EntitySpawnerService_Factory(t) { return new (t || EntitySpawnerService)(); };
EntitySpawnerService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: EntitySpawnerService, factory: EntitySpawnerService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EntitySpawnerService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/services/input.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/input.service.ts ***!
  \*******************************************/
/*! exports provided: InputService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputService", function() { return InputService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class InputService {
    constructor() {
        this.inputs = {
            up: 'W',
            down: 'S',
            left: 'A',
            right: 'D'
        };
    }
    getInputKeys(keyboard) {
        return {
            up: keyboard.addKey(this.inputs.up),
            down: keyboard.addKey(this.inputs.down),
            left: keyboard.addKey(this.inputs.left),
            right: keyboard.addKey(this.inputs.right),
        };
    }
}
InputService.ɵfac = function InputService_Factory(t) { return new (t || InputService)(); };
InputService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: InputService, factory: InputService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](InputService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/services/level-loader.service.ts":
/*!**************************************************!*\
  !*** ./src/app/services/level-loader.service.ts ***!
  \**************************************************/
/*! exports provided: LevelLoaderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LevelLoaderService", function() { return LevelLoaderService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _core_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/blocks */ "./src/app/core/blocks.ts");



class LevelLoaderService {
    exportLevel(level) {
        const minLevel = {
            l: []
        };
        for (const layer of level.mapGrid.getUsedLayers()) {
            minLevel.l.push([
                layer,
                level.mapGrid.getAllOfLayer(layer).map(b => [b.x, b.y, _core_blocks__WEBPACK_IMPORTED_MODULE_1__["BlockIds"].indexOf(b.name)])
            ]);
        }
        return JSON.stringify(minLevel);
    }
    importlevel(levelJson, level) {
        const minLevel = JSON.parse(levelJson);
        for (const layer of minLevel.l) {
            for (const block of layer[1]) {
                level.mapGrid.addBlock(new Phaser.Math.Vector2(block[0], block[1]), _core_blocks__WEBPACK_IMPORTED_MODULE_1__["BlockIds"][block[2]], layer[0]);
            }
        }
    }
}
LevelLoaderService.ɵfac = function LevelLoaderService_Factory(t) { return new (t || LevelLoaderService)(); };
LevelLoaderService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LevelLoaderService, factory: LevelLoaderService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LevelLoaderService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/ui/entityHeader.ts":
/*!************************************!*\
  !*** ./src/app/ui/entityHeader.ts ***!
  \************************************/
/*! exports provided: EntityHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityHeader", function() { return EntityHeader; });
class EntityHeader extends Phaser.GameObjects.DOMElement {
    constructor(scene, target) {
        super(scene, target.gameObject.body.position.x, target.gameObject.body.position.y, 'div');
        this.target = target;
        this.setHTML(EntityHeader.elementHTML);
        const nameLabel = this.getChildByID('name');
        const levelLabel = this.getChildByID('level');
        nameLabel.innerText = target.entityName;
        levelLabel.innerText = target.level.toString();
        scene.add.existing(this);
    }
    update(time, delta) {
        super.update(time, delta);
        const bounds = this.target.gameObject.getTopCenter();
        this.setPosition(bounds.x, bounds.y + 4);
    }
}
EntityHeader.elementHTML = `
    <div style='
      display: flex;
      flex-flow: row nowrap;
      color: white;
      font-size: 14px;
      user-select: none;
    '>
      [
      <span id='level'></span>
      ] -
      <span id='name'></span>
    </div>
  `;


/***/ }),

/***/ "./src/app/ui/healthBarPlayer.ts":
/*!***************************************!*\
  !*** ./src/app/ui/healthBarPlayer.ts ***!
  \***************************************/
/*! exports provided: HealthBarPlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HealthBarPlayer", function() { return HealthBarPlayer; });
class HealthBarPlayer extends Phaser.GameObjects.DOMElement {
    constructor(levelScene) {
        super(levelScene, 70, 14, 'div');
        this.levelScene = levelScene;
        this.setHTML(HealthBarPlayer.elementHTML);
        this.setScrollFactor(0);
        levelScene.add.existing(this);
    }
    update(time, delta) {
        const plr = this.levelScene.player;
        const bar = this.getChildByID('full');
        bar.style.width = `${Math.max(Math.min(100, plr.health / plr.maxHealth * 100), 0)}%`;
        const label = this.getChildByID('label');
        label.innerText = `${plr.health}/${plr.maxHealth}`;
    }
}
HealthBarPlayer.elementHTML = `
    <div style='
      background-color: #383838;
      border: 2px solid black;
      box-sizing: content-box;
      width: 128px;
      height: 16px;
    '>
      <div id='full' style='
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
      '>
        <div style='
          height: 100%;
          width: 100%;
          background-color: red;
        '></div>
        <div style='
          height: 40%;
          background-color: black;
          opacity: 0.3;
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
        '></div>
      </div>
      <div id='label' style='
        color: white;
        font-size: 16px;
        position: absolute;
        top: 2px;
        left: 2px;
        right: 2px;
        bottom: 2px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
      '>
        100/100
      </div>
    </div>
  `;


/***/ }),

/***/ "./src/app/ui/healthBarSmall.ts":
/*!**************************************!*\
  !*** ./src/app/ui/healthBarSmall.ts ***!
  \**************************************/
/*! exports provided: HealthBarSmall */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HealthBarSmall", function() { return HealthBarSmall; });
class HealthBarSmall extends Phaser.GameObjects.DOMElement {
    constructor(scene, target) {
        super(scene, target.gameObject.body.position.x, target.gameObject.body.position.y, 'div');
        this.target = target;
        this.setHTML(HealthBarSmall.elementHTML);
        scene.add.existing(this);
    }
    update(time, delta) {
        super.update(time, delta);
        const bounds = this.target.gameObject.getBottomCenter();
        this.setPosition(bounds.x, bounds.y + 4);
        const bar = this.getChildByID('full');
        bar.style.width = `${Math.max(Math.min(100, this.target.health / this.target.maxHealth * 100), 0)}%`;
        this.visible = this.target.health < this.target.maxHealth;
    }
}
HealthBarSmall.elementHTML = `
    <div style='
      background-color: red;
      width: 48px;
      height: 2px;
    '>
      <div id='full' style='
        height: 100%;
        width: 100%;
        background-color: lime;
      '>
      </div>
    </div>
  `;


/***/ }),

/***/ "./src/app/ui/ui.ts":
/*!**************************!*\
  !*** ./src/app/ui/ui.ts ***!
  \**************************/
/*! exports provided: UI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UI", function() { return UI; });
/* harmony import */ var _healthBarPlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./healthBarPlayer */ "./src/app/ui/healthBarPlayer.ts");
/* harmony import */ var _healthBarSmall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./healthBarSmall */ "./src/app/ui/healthBarSmall.ts");
/* harmony import */ var _entityHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entityHeader */ "./src/app/ui/entityHeader.ts");



const UI = {
    HealthBarPlayer: _healthBarPlayer__WEBPACK_IMPORTED_MODULE_0__["HealthBarPlayer"],
    HealthBarSmall: _healthBarSmall__WEBPACK_IMPORTED_MODULE_1__["HealthBarSmall"],
    EntityHeader: _entityHeader__WEBPACK_IMPORTED_MODULE_2__["EntityHeader"]
};


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
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


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Dev\TypeScript\genericrpggame\generic-rpg\client\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map