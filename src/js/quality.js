

class Quality {
    constructor(player) {
        this.player = player;

        // qualityWrapper
        this.player.template.qualityWrapper.addEventListener('mouseenter', () => {
            this.show();
        });
        // qualityWrapper
        this.player.template.qualityWrapper.addEventListener('mouseleave', () => {
            this.hide();
        });

        for (let i = 0; i < this.player.template.qualityBoxItem.length; i++) {
            this.player.template.qualityBoxItem[i].addEventListener('click', () => {
                const index = this.player.template.qualityBoxItem[i].dataset.index;
                this.player.switchQuality(index);
                this.hide();
            });
        }
    }

    hide() {
        this.player.template.qualityWrapper.classList.remove('dplayer-box-open');
    }

    show() {
        this.player.template.qualityWrapper.classList.add('dplayer-box-open');
    }
}

export default Quality;
