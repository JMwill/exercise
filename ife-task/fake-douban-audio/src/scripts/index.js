import '../css/style.css';
import Player from './player';
import $ from 'jquery';

$(function() {
    const player = new Player();
    player.run();
});