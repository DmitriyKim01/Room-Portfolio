import * as THREE from 'three';
import Sizes from '../Utils/size.js';
import Time from '../Utils/time.js';

import Camera from './camera.js';
import Renderer from './renderer.js';
import World from '../World/world.js';
import Resources from '../Utils/resources.js';
import assets from '../Utils/assets.js';


export default class Experience{
    static instance
    constructor(canvas){
        if (Experience.instance){
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.sizes = new Sizes();
        this.scene = new THREE.Scene();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.world = new World();
        this.time = new Time();

        this.time.on("update", () => {
            this.update();
        })
        this.sizes.on("resize", () => {
            this.resize();
        })
    }

    update(){
        this.camera.update();
        this.renderer.update();
        this.world.update();
    }

    resize()
    {
        this.camera.resize();
        this.renderer.resize();
        this.world.resize();
    }
}