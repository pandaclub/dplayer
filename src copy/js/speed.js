import utils from './utils';

class Speed {
    constructor(player) {
        this.player = player;

        this.player.template.mask.addEventListener('click', () => {
            this.hide();
        });

        // speed
        this.player.template.speedButton.addEventListener('click', () => {
            this.show();
        });

        for (let i = 0; i < this.player.template.speedBoxItem.length; i++) {
            this.player.template.speedBoxItem[i].addEventListener('click', () => {

                var speed = this.player.template.speedBoxItem[i].dataset.speed;
                this.player.speed(speed);

                this.player.template.speedButton.innerHTML = speed == 1 ? '正常' : speed + 'X';

                this.hide();
            });
        }
    }

    hide() {
        this.player.template.mask.classList.remove('dplayer-mask-show');
        this.player.template.speedBox.classList.remove('dplayer-speed-box-open');
        this.player.controller.disableAutoHide = false;
    }

    show() {
        this.player.template.speedBox.classList.add('dplayer-speed-box-open');
        this.player.template.mask.classList.add('dplayer-mask-show');
        this.player.controller.disableAutoHide = true;
    }
}

export default Speed;
