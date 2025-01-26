import Experience from "../Experience/experience";
import * as THREE from 'three';
import GSAP from 'gsap';

export default class Floor{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.setFloor();
    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(15, 15, 1, 1);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side: THREE.BackSide,
          });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -0.2;
        this.plane.receiveShadow = true;
    }


    resize(){
    
    }

    update(){

    }
}