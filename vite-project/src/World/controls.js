import Experience from "../Experience/experience";
import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.sizes = this.experience.sizes;

    this.room = this.experience.world.room.actualRoom;
    GSAP.registerPlugin(ScrollTrigger);
    this.setScrollTrigger();
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 969px)": () => {
        console.log("Desktop");
        this.room.scale.set(1,1,1);
        this.experience.world.floor.plane.position.y = -0.2;

        // First section ---------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.firstMoveTimeline.to(this.room.position, {
          x: () => {
            return this.sizes.width * -0.0014;
          },
        });

        // Second section --------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        this.secondMoveTimeline.to(
          this.room.position,
          {
            x: () => {
              return 1;
            },
            z: () => {
              return this.sizes.height * 0.0035;
            },
          },
          "synchronized"
        );
        this.secondMoveTimeline.to(
          this.room.scale,
          {
            x: 3,
            y: 3,
            z: 3,
          },
          "synchronized"
        );

        this.secondMoveTimeline.to(
            this.experience.world.floor.plane.position,
            {
                y: -0.8
            },
          "synchronized"
        )

        this.experience.world.floor.plane.position

        // Third section --------------------------

        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(this.camera.orthographicCamera.position, {
          y: -2.5,
          x: 6,
        });
      },
    
      

      // Mobile
      "(max-width: 968px)": () => {
        console.log("Mobile");

        this.room.scale.set(0.6, 0.6, 0.6);
        this.room.position.set(0, 0, 0);
        // First section ---------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        this.firstMoveTimeline.to(this.room.scale, {
          x: 0.6,
          y: 0.6,
          z: 0.6,
        });

        // Second section --------------------------
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        this.secondMoveTimeline.to(
          this.room.scale,
          {
            x: 2.5,
            y: 2.5,
            z: 2.5,
          },
          "synchronized-mobile"
        );

        this.secondMoveTimeline.to(
          this.room.position,
          {
            x: -1.8,
            y:-1
          },
          "synchronized-mobile"
        );

        this.secondMoveTimeline.to(
            this.experience.world.floor.plane.position,
            {
                y: -1.2
            },
          "synchronized-mobile"
        )


        // Third section --------------------------

        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
            y: -1.8,
        },
    "synchronized-mobile-third");
      },



      // all
      all: function () {},
    });
  }

  resize() {}

  update() {}
}
