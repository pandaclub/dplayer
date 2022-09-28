import React, { useEffect, useRef,  useState, useImperativeHandle,forwardRef } from 'react';
import DPlayer from './js/index';
import Hls from 'hls.js';

window.Hls = Hls;

function Player (props, ref) {

  const { handlePlay, handlePause, handleSeek, handleEnd, data} = props;

  const playerRef = useRef(null);
  const domRef = useRef(null);
  
  const { mediaList, banner, startTime = 1, forbidDrag, forbidSpeed } = data;

  useEffect(() => {
    const nameHash = {
      hd: '高清',
      sd: '标清',
      ld: '流畅',
      audio: '音频'
    };
    const host = '//public.kaoshi.club';
    
    const indexHash = {};
    const parseList = [];
    ['hd', 'sd', 'ld', 'audio'].forEach((key) => {
      const arr = mediaList.filter(item => item.type === key);
      if (arr.length > 0 && arr[0].object) {
        let url = arr[0].object;
        if(url.indexOf('http') < 0) {
          url = `${host}/${url}`
        }
        parseList.push({
          // ...arr[0],
          type: key === 'audio' ? 'auto' : 'hls',
          url,
          en: key,
          name: nameHash[key]
        });
        indexHash[key] = parseList.length;
      }
    });
    const player = new DPlayer({
      forbidSpeed,
      forbidDrag,
      autoplay: true,
      theme: 'rgb(77, 120, 56)',
      container: domRef.current,
      video: {
        pic: banner || null,
        // playbackRate: 2,
        quality: parseList,
        defaultQuality: (indexHash.sd || indexHash.ld || indexHash.hd || indexHash.audio) - 1
      },
      pluginOptions: {
        hls: {
          // dash config
          startPosition: startTime,
          xhrSetup: function (xhr, url) {

            url = url.replace('http://', 'https://');
            // url = url + '?t=' + new Date().getTime();
            xhr.open('GET', url, true);
            // xhr.withCredentials = true; // do send cookies
          },
          // defaultAudioCodec: ''
        },
      },
    });
    
    // player.video.playbackRate = 2;

    player.template.menu.remove();
    playerRef.current = player;

    player.on('play', () => {
      handlePlay && handlePlay();
    })

    player.on('pause', () => {
      handlePause && handlePause();
    })

    player.on('seeked', () => {
      handleSeek && handleSeek();
    })

    player.on('ended', () => {
      handleEnd && handleEnd();
    })

    return () => {
      player.destroy();
    };
  }, [mediaList]);

  useImperativeHandle(ref, () => ({

    play: () => {
      playerRef.current.play();
    },

    pause: () => {
      playerRef.current.pause();
    },

    seek: (time) => {
      playerRef.current.seek(time);
    },

    getCurrentTime: () => {
      return Math.round(playerRef.current.video.currentTime);
    },

    getDuration: () => {
      return Math.round(playerRef.current.video.duration);
    },

  }));
  
  return (
    <div
      id="player"
      ref={domRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default forwardRef(Player)
