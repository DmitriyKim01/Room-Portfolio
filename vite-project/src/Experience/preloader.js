import EventEmitter from "events";
import Experience from "./experience";
import GSAP from "gsap";

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    });

    this.world.on("world_ready", () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();
      if (this.device === "desktop") {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            duration: 0.7,
            ease: "back.out(2.5)",
          })
          .to(this.room.position, {
            x: -1,
            ease: "power1.out",
            duration: 0.7,
            onComplete: resolve,
          });
      }
      // Mobile
      else {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            duration: 0.7,
            ease: "back.out(2.5)",
          })
          .to(this.room.position, {
            z: -1,
            ease: "power1.out",
            duration: 0.7,
            onComplete: resolve,
          });
      }
    });
  }

  async onScroll(event) {
    if (event.deltaY > 0) {
      window.removeEventListener("wheel", this.scrollOnceEvent);
      await this.playSecondIntro();
    }
  }

  async playSecondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();
      if (this.device === "desktop") {
        this.secondTimeline
          .to(
            this.room.position,
            {
              x: 0,
              y: 0,
              z: 0,
              ease: "power1.out",
            },
            "cube-animation"
          )
          .to(
            this.roomChildren.cube.rotation,
            {
              y: 2 * Math.PI + Math.PI / 4,
            },
            "cube-animation"
          )
          .to(
            this.roomChildren.cube.scale,
            {
              x: 10,
              y: 10,
              z: 10,
            },
            "cube-animation"
          )
          .to(
            this.camera.orthographicCamera.position,
            {
              y: 2,
            },
            "cube-animation"
          )
          .to(
            this.roomChildren.cube.position,
            {
              x: 0.000584,
              y: 1.26841,
              z: 0.484908,
            },
            "cube-animation"
          )
          .to(this.roomChildren.cube.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.3,
          }, "reveal")
          .to(this.roomChildren.cube.position, {
            x: -0.006002,
            y: -0.025752,
            z: -1.44423 ,
            duration: 0.3,
          }, "reveal")
          .to(this.roomChildren.room.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.5)",
            duration: 0.5,
          }, "reveal")
          .to(this.roomChildren.bed.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.5)",
            duration: 0.3,
          }, "primary")
          .to(this.roomChildren.shelf.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          }, "primary")
          .to(this.roomChildren.table.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.5)",
            duration: 0.3,
          }, "primary")
          .to(this.roomChildren.drawer.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          }, "medium")
          .to(this.roomChildren.wall_shelf.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          }, "medium")
          .to(this.roomChildren.shelf_items.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          }, "medium")
          .to(this.roomChildren.laptop.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          }, "floor")
          .to(this.roomChildren.floor_items.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.5)",
            duration: 0.3,
          }, "floor")
          .to(this.roomChildren.mini_table.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          }, "items")
          .to(this.roomChildren.mousepad.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          })
          .to(this.roomChildren.peripherals.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          }, "items")
          .to(this.roomChildren.monitor.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.5)",
            duration: 0.3,
          })
          .to(this.roomChildren.chair_top.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.5)",
            duration: 0.3,
          }, "chair")
          .to(this.roomChildren.chair_top.rotation, {
            y: 4 * Math.PI + Math.PI / -2,
            ease: "power2.out",
            duration: 1,
          }, "chair")
          .to(this.roomChildren.outside.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.5)",
            duration: 0.3,
          })
      }
      // Mobile
      else {
        this.secondTimeline.to(this.room.position, {
          x: 0,
          y: 0,
          z: 0,
          ease: "power1.out",
          duration: 0.7,
        });
      }
    });
  }

  async playIntro() {
    await this.firstIntro();
    this.scrollOnceEvent = this.onScroll.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
  }
}
