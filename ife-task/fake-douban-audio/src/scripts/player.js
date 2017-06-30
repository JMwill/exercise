import $ from 'jquery';
import EventBus from 'eventbusjs';

export default class Player {
    constructor(cnt) {
        let $cnt = $(cnt);
        this.$cnt = $cnt;
        this.$map = {
            player:             $cnt.find('.fdba__player'),

            // song information
            songName:           $cnt.find('.fdba__song-name'),
            singer:             $cnt.find('.fdba__singer'),
            songTime:           $cnt.find('.fdba__song-time'),
            songVoice:          $cnt.find('.fdba__song-voice'),

            // song social operation
            toggleLyricBtn:     $cnt.find('.fdba__song-lyric-btn'),
            songDownloadBtn:    $cnt.find('.fdba__song-download-btn'),
            addToListBtn:       $cnt.find('.fdba__add-to-list-btn'),
            shareBtn:           $cnt.find('.fdba__song-share-btn'),

            // song progress
            progressBar:        $cnt.find('.fdba__song-progress-bar'),

            // song operation
            likeBtn:            $cnt.find('.fdba__like-btn'),
            trashBtn:           $cnt.find('.fdba__trash-btn'),
            playBtn:            $cnt.find('.fdba__play-btn'),
            nextBtn:            $cnt.find('.fdba__next-btn'),
        };

        this.status = {
            playing: false,
        };
    };

    togglePlay() {
        this.status.playing ?
        this.$map.playBtn.addClass('fa-pause').removeClass('fa-play') :
        this.$map.playBtn.addClass('fa-play').removeClass('fa-pause');
        this.status.playing = !this.status.playing;
    };

    run() {
        this.$map.playBtn.on('click', _ => this.togglePlay());
    }
};