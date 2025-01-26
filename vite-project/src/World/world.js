import Experience from "../Experience/experience";
import Room from "./room";
import Environment from "./environment";
import Controls from "./controls";
import Floor from "./Floor";

export default class World{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.floor = new Floor();

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.room = new Room();
            this.controls = new Controls();
        })
    }



    resize(){
    }

    update(){
      if (this.room){
            this.room.update();
      }
      if (this.controls){
            this.controls.update();
      }
    }
}