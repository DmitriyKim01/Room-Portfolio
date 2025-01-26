import gsap from 'gsap';

export default class ProjectDialog {
    constructor() {
        this.dialog = document.querySelector('.project-dialog');
        this.closeButton = this.dialog.querySelector('.close-button');
        this.projectLinks = document.querySelectorAll('.project-link');
        this.projectPreviews = document.querySelectorAll('.project-overview');
        this.projectCarousel = document.querySelector('.project-carousel');
        this.projectInfo = document.querySelector('.project-info');

        this.projectLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                this.openDialog();
            });
        });

        this.projectPreviews.forEach(preview => {
            preview.addEventListener('click', () => {
                this.openDialog();
            });
        });

        this.closeButton.addEventListener('click', () => {
            this.closeDialog();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                console.log('escape key pressed');
                this.closeDialog();
            }
        });
    }

        openDialog() {
            this.dialog.style.display = 'flex';
            gsap.set(this.projectCarousel, { y: 600, opacity: 0 });
            gsap.set(this.projectInfo, { y: -600, opacity: 0 });

            gsap.to(this.projectCarousel, { y: 0, duration: 0.55,opacity: 1, ease: 'sine' });
            gsap.to(this.projectInfo, { y: 0, duration: 0.55,opacity:1, ease: 'sine' });
        }
    
        closeDialog() {
            gsap.to(this.projectCarousel, { y: -600, duration: 0.35, opacity: 0, ease: 'power2.inOut' });
            gsap.to(this.projectInfo, { y: 600, duration: 0.35, opacity: 0, ease: 'power2.inOut', onComplete: () => {this.dialog.style.display = 'none';} });
        }
}