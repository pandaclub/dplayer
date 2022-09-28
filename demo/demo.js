

initPlayers();

function initPlayers() {

    const mediaList = [
        {
        object: "https://hd.ukaola.cn/000858c148054b54ad58488514109add/40490d9de3bd419f8263077157c91dd8-f7321c04e9c4183fbe23e3cf6117d61a-fd-nbv1.m3u8",
            type: "ld"
        },
        {
        object: "https://hd.ukaola.cn/000858c148054b54ad58488514109add/40490d9de3bd419f8263077157c91dd8-f7321c04e9c4183fbe23e3cf6117d61a-fd-nbv1.m3u8",
            type: "hd"
        },
        {
        object: "https://hd.ukaola.cn/000858c148054b54ad58488514109add/40490d9de3bd419f8263077157c91dd8-f7321c04e9c4183fbe23e3cf6117d61a-fd-nbv1.m3u8",
            type: "sd"
        },
    ];

    const nameHash = {
        fhd: '超清',
        hd: '高清',
        sd: '标清',
        ld: '流畅',
        audio: '音频',
      };
      const host = 'https://public.ukaola.cn';
    
    const indexHash = {};
    const parseList = [];
    ['fhd', 'hd', 'sd', 'ld', 'audio'].forEach((key) => {
      const arr = mediaList.filter((item) => item.type === key);
      if (arr.length > 0 && arr[0].object) {
        let url = arr[0].object;
        if (url.indexOf('http') < 0) {
          url = `${host}/${url}`;
        }
        // TODO: @limao 目前就这么处理，audio标签匹配替换成超清，后台参数有问题
        parseList.push({
          // ...arr[0],
          type: 'hls',
          url,
          en: key === 'audio' ? 'fhd' : key,
          name: key === 'audio' ? '超清' : nameHash[key],
        });
        indexHash[key] = parseList.length;
      }
    });
    

    // dp2
    window.player = new DPlayer({
        showSetting: true,
        container: document.getElementById('dplayer1'),
        preload: 'none',
        autoplay: false,
        theme: '#FADFA3',
        loop: true,
        screenshot: true,
        airplay: true,
        hotkey: true,
        logo: 'https://i.loli.net/2019/06/06/5cf8c5d94521136430.png',
        volume: 0.2,
        mutex: true,
        video: {
            // pic: banner || null,
            // playbackRate: 2,
            quality: parseList,
            defaultQuality:
              (indexHash.sd ||
                indexHash.ld ||
                indexHash.hd ||
                indexHash.audio ||
                indexHash.fhd) - 1,
          },

        // video: {
        //     url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
        //     pic: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
        //     thumbnails: 'https://i.loli.net/2019/06/06/5cf8c5d9cec8510758.jpg',
        //     type: 'auto'
        // },
        subtitle: {
            url: 'https://s-sh-17-dplayercdn.oss.dogecdn.com/hikarunara.vtt',
            type: 'webvtt',
            fontSize: '25px',
            bottom: '10%',
            color: '#b7daff'
        },
        danmaku: {
            id: '9E2E3368B56CDBB4',
            api: 'https://api.prprpr.me/dplayer/',
            token: 'tokendemo',
            maximum: 3000,
            user: 'DIYgod',
            bottom: '15%',
            unlimited: true
        },
        contextmenu: [
            {
                text: 'custom contextmenu',
                link: 'https://github.com/MoePlayer/DPlayer'
            }
        ]
    });

    player.template.menu.remove();
    

}
