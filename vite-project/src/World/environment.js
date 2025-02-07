import Experience from "../Experience/experience";
import * as THREE from 'three';

export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.setSunlight();
    }

    setSunlight(){
        this.sunlight = new THREE.DirectionalLight("#ffffff", 3);
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far = 20;
        this.sunlight.shadow.mapSize.set(2048, 2048);
        this.sunlight.shadow.normalBias = 0.05;
        // const helper = new THREE.CameraHelper(this.sunlight.shadow.camera);
        // this.scene.add(helper);
        this.sunlight.position.set(-1.5, 7, 3);
        this.scene.add(this.sunlight);

        const ambientLight = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(ambientLight);
    }

    setModel(){
        this.scene.add(this.actualRoom);
    }

    resize(){
    
    }

    update(){
      
    }
}