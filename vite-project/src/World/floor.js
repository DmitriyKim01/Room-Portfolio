import Experience from "../Experience/experience";
import * as THREE from 'three';
import GSAP from 'gsap';

export default class Floor{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.setFloor();
        this.setCircles();
    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(30, 30, 1, 1);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side: THREE.BackSide,
          });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -0.25;
        this.plane.receiveShadow = true;
    }

    setCircles(){
        this.geometry = new THREE.CircleGeometry(5, 64);

        // Set the material for the circles
        this.material = new THREE.MeshStandardMaterial({ color: 0xa79277 });
        this.material2 = new THREE.MeshStandardMaterial({ color: 0x2e86ab });
        this.material3 = new THREE.MeshStandardMaterial({ color: 0x69d40b });
        
        // Set the circle plane
        this.circleFirst = new THREE.Mesh(this.geometry, this.material);
        this.circleSecond = new THREE.Mesh(this.geometry, this.material2);
        this.circleThird = new THREE.Mesh(this.geometry, this.material3);

        // Position circles above the floor
        this.circleFirst.position.y = -0.24;
        this.circleSecond.position.y = -0.23;
        this.circleThird.position.y = -0.22;

        // Add circles scale to none
        this.circleFirst.scale.set(0, 0, 0);
        this.circleSecond.scale.set(0, 0, 0);
        this.circleThird.scale.set(0, 0, 0);

        // Flip the circles
        this.circleFirst.rotation.x = -Math.PI / 2;
        this.circleSecond.rotation.x = -Math.PI / 2;
        this.circleThird.rotation.x = -Math.PI / 2;

        // Receive shadow
        this.circleFirst.receiveShadow = true;
        this.circleSecond.receiveShadow = true;
        this.circleThird.receiveShadow = true;

        this.scene.add(this.circleFirst);
        this.scene.add(this.circleSecond);
        this.scene.add(this.circleThird);
    
    }


    resize(){
    
    }

    update(){

    }
}