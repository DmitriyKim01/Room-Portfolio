export default class ProjectDialog {
    constructor() {
        this.dialog = document.querySelector('.project-dialog');
        this.closeButton = this.dialog.querySelector('.close-button');
        this.projectLinks = document.querySelectorAll('.project-link');
        this.projectPreviews = document.querySelectorAll('.project-overview');

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
        }
    
        closeDialog() {
        this.dialog.style.display = 'none';
        }
}