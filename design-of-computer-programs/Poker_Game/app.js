/*
* @Author: will
* @Date:   2016-01-16 16:55:40
* @Last Modified by:   will
* @Last Modified time: 2016-01-17 15:29:36
*/

'use strict';

var _ = require('underscore');


function poker(hands) {
    // 返回最大的手牌
    return allMax(hands, hand_rank);
}

function allMax(hands, callback) {
    callback = callback || function (x) {
        return x;
    };
    var temp = _.max(hands, function (hand) {
        return callback(hand)[0];
    }),

    handList = [];
    hands.forEach(function (elem) {
        if (_.isEqual(callback(elem), callback(temp))) {
            handList.push(elem);
        }
    });

    return handList;
}

function card_ranks(cards) {
    var ranks,
        rankList = '--23456789TJQKA';

    if (Array.isArray(cards)) {
        ranks = [];
        cards.forEach(function (elem) {
            ranks.push(rankList.indexOf(elem[0]));
        });
        ranks.sort(function (x, y) {
            return y - x;
        });
        if (_.isEqual(ranks, [14, 5, 4, 3, 2])) {
            ranks = [5, 4, 3, 2, 1];
        }
    }
    return ranks;
}

function hand_rank(hand) {
    var ranks = card_ranks(hand);

    if (straight(ranks) && flush(hand)) {
        return [8, _.max(ranks)];
    } else if (kind(4, ranks)) {
        return [7, kind(4, ranks), kind(1, ranks)];
    } else if (kind(3, ranks) && kind(2, ranks)) {
        return [6, kind(3, ranks), kind(2, ranks)];
    } else if (flush(hand)) {
        return [5, ranks];
    } else if (straight(ranks)) {
        return [4, _.max(ranks)];
    } else if (kind(3, ranks)) {
        return [3, kind(3, ranks), ranks];
    } else if (twoPair(ranks)) {
        return [2, twoPair(ranks), ranks];
    } else if (kind(2, ranks)) {
        return [1, kind(2, ranks), ranks];
    } else {
        return [0, ranks]
    }
}

function straight(rank) {
    return (_.max(rank) - _.min(rank) === rank.length - 1 &&
             _.uniq(rank).length === rank.length);
}

function flush(hand) {
    hand = hand.map(function (elem) {
        return elem[1];
    });
    return _.uniq(hand).length === 1;
};

function kind(num, rank) {
    var result = [],
    tempRank = rank.slice(),
    item = tempRank[0],
    i = 0,
    times = 0;
    while (i < tempRank.length) {
        for (var j = 0; j < tempRank.length; j++) {
            if (item === tempRank[j]) {
                times++;
                tempRank.splice(i, 1);
                j--;
            }
        }
        if (times === num) {
            result.push(item);
        }

        item = tempRank[0];
        times = 0;
    }
    if (result.length > 0) {
        return result[0];
    } else {
        return undefined;
    }
}

function twoPair(rank) {
    var highestPair = kind(2, rank),
        lowestPair = kind(2, rank.reverse());

    if (highestPair && highestPair != lowestPair) {
        return [highestPair, lowestPair];
    } else {
        return undefined;
    }
}
exports.poker = poker;
exports.hand_rank = hand_rank;
exports.card_ranks = card_ranks;
exports.flush = flush;
exports.straight = straight;
exports.kind = kind;
exports.twoPair = twoPair;