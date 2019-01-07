/*
* @Author: will
* @Date:   2016-01-17 15:19:34
* @Last Modified by:   will
* @Last Modified time: 2016-01-17 16:49:02
*/

'use strict';
var _ = require('underscore');
var poker = require('./app.js');

function createDeck() {
    var deck = [],
        ranks = '23456789TJQKA',
        suit = 'SHDC';

    for (var i = 0, l = ranks.length; i < l; i++) {
        for (var j = 0, k = suit.length; j < k; j++) {
            deck.push(ranks[i] + suit[j]);
        }
    }

    return deck;
};

function deal(numHands, num, deck) {
    deck = deck || createDeck();
    num = num || 5;
    deck = _.shuffle(deck);

    var hands = [];
    for (var i = 0; i < numHands; i++) {
        hands.push(deck.slice(i * num, (i + 1) * num));
    }

    return hands;
}

function hand_percentage(times) {
    times = times || 700*1000;

    var percentages = [];
    for (var i = 0, l = times / 10; i < l; i++) {
        var hands = deal(10),
            ranking;
        for (var j = 0, k = hands.length; j < k; j++) {
            ranking = poker.hand_rank(hands[j])[0];
            percentages[ranking] ? percentages[ranking]++ : (percentages[ranking] = 1);
        }
    }


    return percentages;

}

var str =
        'High Card     : 50.1177%\n' +
        'Pair          : 42.2569%\n' +
        '2 Pair        : 4.7539%\n' +
        '3 kind        : 2.1128%\n' +
        'Straight      : 0.3925%\n' +
        'Flush         : 0.1965%\n' +
        'Full House    : 0.1441%\n' +
        '4 Kind        : 0.0240%\n' +
        'Straight Flush: 0.00139%\n';

console.log('---------------result---------------: ');
(function () {
    var times = 700*1000,
        perList = hand_percentage(times),
        list_names = [
            'Straight Flush',
            '4 Kind        ',
            'Full House    ',
            'Flush         ',
            'Straight      ',
            '3 kind        ',
            '2 Pair        ',
            'Pair          ',
            'High Card     '
        ];
        list_names.reverse();

    for (var i = 0, l = perList.length; i < l; i++) {
        console.log('%s: %s%%', list_names[i], perList[i] / times * 100);
    }
}());
console.log('---------------should similar to---------------');
console.log(str);