import utils from './utils';

class Speed {
    constructor(player) {
        this.player = player;

        // speed
        this.player.template.speedWrapper.addEventListener('mouseenter', () => {
            this.show();
        });
        // speed
        this.player.template.speedWrapper.addEventListener('mouseleave', () => {
            this.hide();
        });

        for (let i = 0; i < this.player.template.speedBoxItem.length; i++) {
            this.player.template.speedBoxItem[i].addEventListener('click', () => {
                const speed = this.player.template.speedBoxItem[i].dataset.speed;
                this.player.speed(speed);
                this.player.template.speedButton.innerHTML = speed == 1 ? '正常' : speed + 'X';
                this.hide();
            });
        }
    }

    hide() {
        this.player.template.speedWrapper.classList.remove('dplayer-box-open');
    }

    show() {
        this.player.template.speedWrapper.classList.add('dplayer-box-open');
    }
}

export default Speed;
