import Experience from "./experience";
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspectRatio, 0.1, 100);
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.set(12, 15, 15);
    }
    createOrthographicCamera(){
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspectRatio * this.sizes.frustrum)/2, 
            (this.sizes.aspectRatio * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -10,
            10
        );
        // this.orthographicCamera.position.y = 2;
        this.orthographicCamera.position.y = 1.2;
        this.orthographicCamera.position.z = 2;
        this.orthographicCamera.rotation.x = -Math.PI/6;
        this.scene.add(this.orthographicCamera);

        // this.helper = new THREE.CameraHelper(this.orthographicCamera);
        // this.scene.add(this.helper);

        const size = 20;
        const divisions = 20;
        // const gridHelper = new THREE.GridHelper(size, divisions);
        // this.scene.add(gridHelper);
        // const axesHelper = new THREE.AxesHelper(10);
        // this.scene.add(axesHelper);
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
    }

    resize() {
        // Updating both cameras on resize
        this.perspectiveCamera.aspect = this.sizes.aspectRatio;
        this.perspectiveCamera.updateProjectionMatrix();
   
        this.orthographicCamera.left =
          (-this.sizes.aspectRatio * this.sizes.frustrum ) / 2;
        this.orthographicCamera.right =
          (this.sizes.aspectRatio * this.sizes.frustrum ) / 2;
        this.orthographicCamera.top = this.sizes.frustrum  / 2;
        this.orthographicCamera.bottom = -this.sizes.frustrum  / 2;
        this.orthographicCamera.updateProjectionMatrix();
      }

    update(){
        this.controls.update();
        // this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update();
        // this.helper.position.copy(this.orthographicCamera.position);
        // this.helper.rotation.copy(this.orthographicCamera.rotation);
    }
}