"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var THREE = require("three");
var webvrui = require("webvr-ui");
var three_vrcontrols_module_1 = require("three-vrcontrols-module");
var three_vreffect_module_1 = require("three-vreffect-module");
var SpinningCubeComponent = /** @class */ (function () {
    function SpinningCubeComponent(element, ngRenderer) {
        this.element = element;
        this.ngRenderer = ngRenderer;
        this.width = 350;
        this.height = 400;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
    }
    SpinningCubeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.renderer = new THREE.WebGLRenderer({ antialias: false, canvas: this.cubeCanvas.nativeElement });
        this.controls = new three_vrcontrols_module_1.default(this.camera);
        this.effect = new three_vreffect_module_1.default(this.renderer);
        this.renderer.vr.enabled = true;
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.cube = this.createCube(0.25, new THREE.Color('rgb(255,96,70)'));
        this.cube.position.set(0, this.controls.userHeight, -0.8);
        this.scene.add(this.cube);
        this.controls.standing = true;
        this.camera.position.y = this.controls.userHeight;
        this.effect.setSize(this.width, this.height);
        var loader = new THREE.TextureLoader();
        loader.load('assets/textures/box.png', function (texture) {
            _this.initScene(texture);
        });
        window.addEventListener('resize', function () {
            _this.onResize();
        });
        window.addEventListener('vrdisplaypresentchange', function () {
            _this.onResize();
        });
    };
    SpinningCubeComponent.prototype.initScene = function (texture) {
        var _this = this;
        var skybox = this.createSky(5, texture);
        this.scene.add(skybox);
        var vrButtonOptions = {
            color: 'white',
            background: false,
            corners: 'square'
        };
        this.enterVR = new webvrui.EnterVRButton(this.renderer.domElement, vrButtonOptions);
        this.ngRenderer.appendChild(this.element.nativeElement, this.enterVR.domElement);
        this.enterVR.getVRDisplay().then(function (display) {
            _this.animationDisplay = display;
            display.requestAnimationFrame(function () {
                _this.update();
            });
        })
            .catch(function () {
            _this.animationDisplay = window;
            window.requestAnimationFrame(function () {
                _this.update();
            });
        });
    };
    SpinningCubeComponent.prototype.update = function () {
        var _this = this;
        this.cube.rotateY(0.03);
        if (this.enterVR.isPresenting()) {
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
            this.effect.render(this.scene, this.camera);
        }
        else {
            this.renderer.render(this.scene, this.camera);
        }
        this.animationDisplay.requestAnimationFrame(function () {
            _this.update();
        });
    };
    SpinningCubeComponent.prototype.onResize = function () {
        this.effect.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    };
    SpinningCubeComponent.prototype.createSky = function (size, texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(size, size);
        var geometry = new THREE.BoxGeometry(size, size, size);
        var material = new THREE.MeshBasicMaterial({
            color: 0xb5e8fc,
            map: texture,
            side: THREE.BackSide,
        });
        return new THREE.Mesh(geometry, material);
    };
    SpinningCubeComponent.prototype.createCube = function (size, color) {
        var geometry = new THREE.BoxGeometry(size, size, size);
        var material = new THREE.MeshBasicMaterial({ color: color });
        return new THREE.Mesh(geometry, material);
    };
    __decorate([
        core_1.ViewChild('cubeCanvas'),
        __metadata("design:type", Object)
    ], SpinningCubeComponent.prototype, "cubeCanvas", void 0);
    SpinningCubeComponent = __decorate([
        core_1.Component({
            selector: 'app-spinning-cube',
            templateUrl: './spinning-cube.component.html',
            styleUrls: ['./spinning-cube.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer2])
    ], SpinningCubeComponent);
    return SpinningCubeComponent;
}());
exports.SpinningCubeComponent = SpinningCubeComponent;
//# sourceMappingURL=spinning-cube.component.js.map