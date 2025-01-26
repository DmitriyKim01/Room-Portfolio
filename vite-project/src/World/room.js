import Experience from "../Experience/experience";
import * as THREE from 'three';
import GSAP from 'gsap';

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }

        this.setModel();
        this.onMouseMove();

    }

    onMouseMove(){
        window.addEventListener("mousemove", (event) => {
           this.rotation = ((event.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
           this.lerp.target = this.rotation * 0.1;
        });
    }

    setModel(){
        this.actualRoom.children.forEach(child =>{
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group){
                child.children.forEach(child =>{
                    child.castShadow = true;
                    child.receiveShadow = true;
                })
            }

            if (child.name === "Screen"){
                this.resources.items.screen.flipY = false; // Add this line
                child.material = new THREE.MeshBasicMaterial(
                    {
                        map: this.resources.items.messenger,
                        side: THREE.DoubleSide
                    }
                );
            }

            if (child.name === "LaptopScreen"){
                child.material = new THREE.MeshBasicMaterial(
                    {
                        map: this.resources.items.screen,
                        side: THREE.DoubleSide
                    }
                );
            }
        })
        this.scene.add(this.actualRoom);
    }

    resize(){
    
    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.actualRoom.rotation.y = this.lerp.current;
      
    }
}