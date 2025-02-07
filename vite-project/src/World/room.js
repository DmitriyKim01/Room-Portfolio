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

        this.roomChildren = {}
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

            if (child.name === "Monitor"){
                this.resources.items.screen.flipY = false;
                child.children[1].material = new THREE.MeshBasicMaterial(
                    {
                        map: this.resources.items.messenger,
                        side: THREE.DoubleSide
                    }
                );
            }

            if (child.name === "Laptop"){
                child.children[3].material = new THREE.MeshBasicMaterial(
                    {
                        map: this.resources.items.screen
                    }
                );
            }

            if (child.name === "Outside"){
                child.position.x = 0.003488;
                child.position.z = 0.66505;
            }

            // if (child.name === "Mailbox" || 
            //     child.name === "Lamp" ||
            //     child.name === "OutsideCarpet1" ||
            //     child.name === "OutsideCarpet2" ||
            //     child.name === "OutsideCarpet3" ||
            //     child.name === "OutsideCarpet" 
            // ){
            //     child.scale.set(0, 0, 0);
            // }

            child.scale.set(0, 0, 0);
            if (child.name==="Cube"){
                // child.scale.set(1, 1, 1);
                child.position.set(0, 0, 0);
                child.rotation.y = Math.PI / 4;
            }
            this.roomChildren[child.name.toLowerCase()] = child;
        });
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