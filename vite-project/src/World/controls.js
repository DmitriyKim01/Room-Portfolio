import Experience from "../Experience/experience";
import * as THREE from 'three';
import GSAP from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class Controls{
    constructor(){
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

    setScrollTrigger(){
        // Responsible for the slide from home to about page
        // this.timeline = new GSAP.timeline();
        // this.timeline.to(this.room.position, {
        //     x:  () => {
        //         return this.sizes.width * 0.00094
        //     },
        //     scrollTrigger: {
        //         trigger: ".first-move",
        //         markers: true,
        //         start: "top top",
        //         end: "bottom bottom",
        //         scrub: 0.6,
        //         invalidateOnRefresh: true
        //     }
        // })

        ScrollTrigger.matchMedia({
            // Desktop
            "(min-width: 969px)": () => {
                console.log("Desktop")

                // First section ---------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x:  () => {
                        return this.sizes.width * -0.0014
                    },
                });

                // Second section --------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                });
                this.secondMoveTimeline.to(this.room.position, {
                    x:  () => {
                        return 1;
                    },
                    z: () =>{
                        return this.sizes.height * 0.0035;
                    }
                },
                "synchronized"
            );
                this.secondMoveTimeline.to(this.room.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                },
                 "synchronized"
            );

            // Third section --------------------------

            this.thirdMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true
                }
            }).to(this.camera.orthographicCamera.position, {
                y: -2.5,
                x: 6,
            });
            },
          
            // Mobile
            "(max-width: 968px)": () => {
                console.log("Mobile")

                this.room.scale.set(0.6, 0.6, 0.6);
                // First section ---------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
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
                        invalidateOnRefresh: true
                    }
                });
        
    

            // Third section --------------------------

            this.thirdMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true
                }
            })
            },
          
            // all
            all: function () {
           
            },
          });

    }


    resize(){
    
    }

    update(){
 
    
    }
}