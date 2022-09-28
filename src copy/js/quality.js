

class Quality {
    constructor(player) {
        this.player = player;

        this.player.template.mask.addEventListener('click', () => {
            this.hide();
        });

        // speed
        this.player.template.qualityButton.addEventListener('click', () => {
            this.show();
        });

        this.player.template.qualityList.addEventListener('click', (e) => {
            this.hide();
            if (e.target.classList.contains('dplayer-quality-item')) {
                this.player.switchQuality(e.target.dataset.index);
            }
        });
    }

    hide() {
        this.player.template.mask.classList.remove('dplayer-mask-show');
        this.player.template.qualityBox.classList.remove('dplayer-quality-mask-open');
        this.player.controller.disableAutoHide = false;
    }

    show() {
        this.player.template.mask.classList.add('dplayer-mask-show');
        this.player.template.qualityBox.classList.add('dplayer-quality-mask-open');
        this.player.controller.disableAutoHide = true;
    }
}

export default Quality;
