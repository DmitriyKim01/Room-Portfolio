import Experience from "../Experience/experience";
import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.sizes = this.experience.sizes;

    this.room = this.experience.world.room.actualRoom;

    this.circleFirst = this.experience.world.floor.circleFirst;
    this.circleSecond = this.experience.world.floor.circleSecond;
    this.circleThird = this.experience.world.floor.circleThird;

    GSAP.registerPlugin(ScrollTrigger);
    this.setSmoothScroll();
    this.setScrollTrigger();
  }

  setSmoothScroll() {
    this.asscroll = this.setupASScroll();
  }

  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      ease: 0.3,
      disableRaf: true,
    });

    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start, .gsap-marker-end, [asscroll]"
        ),
      });
    });
    return asscroll;
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 969px)": () => {
        console.log("Desktop");
        this.room.scale.set(1, 1, 1);
        this.experience.world.floor.plane.position.y = -0.25;

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
            y: -0.8,
          },
          "synchronized"
        );

        this.experience.world.floor.plane.position;

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
        )

        this.secondMoveTimeline.to(
          this.room.position,
          {
            x: -1.8,
            y: -0.5,
          },
          "synchronized-mobile"
        );

        this.secondMoveTimeline.to(
          this.experience.world.floor.plane.position,
          {
            y: -1.2,
          },
          "synchronized-mobile"
        );

        // Third section --------------------------

        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
          },
        });

        this.thirdMoveTimeline.to(
          this.camera.orthographicCamera.position,
          {
            y: -1.8,
          },
          "synchronized-mobile-third"
        );
      },

      // all
      all: () => {


        // Section Border Radius Animation ---------------------------
        this.sections = document.querySelectorAll(".section");
        this.sections.forEach((section) => {
          this.progressWrapper = section.querySelector(".progress-wrapper");
          this.progressBar = section.querySelector(".progress-bar");
          if (section.classList.contains("right")) {
            // Right Section Top Border
            GSAP.to(section, {
              borderTopLeftRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 0.6,
              },
            });
            // Right Section Bottom Border
            GSAP.to(section, {
              borderBottomLeftRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          } else {
            // Left Section Top Border
            GSAP.to(section, {
              borderTopRightRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 0.6,
              },
            });
            // Left Section Bottom Border
            GSAP.to(section, {
              borderBottomRightRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          }
          GSAP.from(this.progressBar, {
            scaleY: 0,
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.4,
                pin: this.progressWrapper,
                pinSpacing: false,
            }
          })
        });

        // Circle Animation ---------------------------
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(this.circleFirst.scale, {
          x: 3,
          y: 3,
          z: 3,
        });

        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.circleSecond.scale,
            {
              x: 3,
              y: 3,
              z: 3,
            },
            "first-circle"
          )
          .to(
            this.room.position,
            {
              y: 0.3,
            },
            "first-circle"
          );

        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.circleThird.scale,
            {
              x: 3,
              y: 3,
              z: 3,
            },
            "second-circle"
          )
          .to(
            this.room.position,
            {
              y: 0.3,
            },
            "second-circle"
          );

        // Outdoors Ground animation ---------------------------
        this.secondPartTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "center center",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        this.room.children.forEach((child) => {
          if (child.name === "Outside") {
            this.first = GSAP.to(child.position, {
              x: 0.8,
              z: 1.5,

              duration: 1,
            });
          }
          if (child.name === "Mailbox") {
            this.second = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.5,
            });
          }
          if (child.name === "Lamp") {
            this.third = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.5,
            });
          }
          if (child.name === "OutsideCarpet") {
            this.fourth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.5,
            });
          }
          if (child.name === "OutsideCarpet1") {
            this.fifth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.5,
            });
          }
          if (child.name === "OutsideCarpet2") {
            this.six = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.5,
            });
          }
          if (child.name === "OutsideCarpet3") {
            this.seventh = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.5,
            });
          }
        });
        this.secondPartTimeline.add(this.first);
        this.secondPartTimeline.add(this.second, "-=0.2");
        this.secondPartTimeline.add(this.third, "-=0.2");
        this.secondPartTimeline.add(this.fourth, "-=0.2");
        this.secondPartTimeline.add(this.fifth, "-=0.2");
        this.secondPartTimeline.add(this.six, "-=0.2");
        this.secondPartTimeline.add(this.seventh, "-=0.2");
      },
    });
  }

  resize() {}

  update() {}
}
