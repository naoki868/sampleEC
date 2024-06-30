// videoPlayer.js

// スクリプトを動的に読み込む関数
function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = callback;
  script.onerror = () => console.error(`Error loading script: ${src}`);
  document.head.appendChild(script);
}

// CSSを動的に読み込む関数
function loadCSS(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

// div要素を生成
const videoContainer = document.getElementById('video-container');
const videoDiv = document.createElement('div');
videoDiv.className = 'video-js vjs-big-play-centered';

// video要素を生成
const video = document.createElement('video');
video.className = 'video-js';

// div要素にvideoを追加
videoDiv.appendChild(video);

// コンテナにdivを追加
videoContainer.appendChild(videoDiv);

// Video.jsのCSSを読み込む
loadCSS('https://vjs.zencdn.net/8.10.0/video-js.min.css');

// Video.jsのスクリプトをロードしてプレーヤーを初期化
loadScript('https://vjs.zencdn.net/8.10.0/video.min.js', () => {
  // Video.jsが読み込まれた後にプレーヤーを初期化
  const player = videojs(video, {
    controls: true,
    autoplay: false,
    preload: 'auto',
    responsive: true,
    fluid: true,
    playbackRates: [0.5, 1, 1.5, 2],
    sources: [{
      src: 'https://livecom.smartstream.ne.jp/vod-foove/_definst_/jTBTbpasQcJrDmz3Y88V9h5TSheqoBTE_aac/playlist.m3u8',
      type: 'application/x-mpegURL'
    }],
    controlBar: {
      children: [
        'playToggle',
        'volumePanel',
        'currentTimeDisplay',
        'timeDivider',
        'durationDisplay',
        'progressControl',
        'liveDisplay',
        'remainingTimeDisplay',
        'customControlSpacer',
        'playbackRateMenuButton',
        'fullscreenToggle'
      ]
    }
  });

  player.on('error', () => {
    console.error('Video.js error:', player.error());
  });

  // カスタムボタンの追加
  player.ready(() => {
    const customButton = player.controlBar.addChild('button', {
      clickHandler: function() {
        // カスタムボタンのクリック時の動作
        alert('カスタムボタンがクリックされました！');
      }
    });
    
    // カスタムボタンのテキストを設定
    const customButtonDom = customButton.el();
    customButtonDom.textContent = 'カスタム';
    customButtonDom.classList.add('vjs-custom-button');
  });
});

// カスタムCSSの追加
const style = document.createElement('style');
style.textContent = `
  .video-js .vjs-control-bar {
    background-color: rgba(43, 51, 63, 0.7);
  }
  .video-js .vjs-big-play-button {
    background-color: rgba(43, 51, 63, 0.7);
    border-color: #fff;
  }
  .video-js .vjs-slider {
    background-color: rgba(255, 255, 255, 0.3);
  }
  .video-js .vjs-play-progress,
  .video-js .vjs-volume-level {
    background-color: #e50914;
  }
  .video-js .vjs-custom-button {
    font-size: 12px;
    line-height: 30px;
    padding: 0 10px;
  }
`;
document.head.appendChild(style);