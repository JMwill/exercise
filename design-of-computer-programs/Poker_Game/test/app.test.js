/*
* @Author: will
* @Date:   2016-01-16 17:06:42
* @Last Modified by:   will
* @Last Modified time: 2016-01-17 13:40:19
*/

'use strict';
var should = require('should'),
    _ = require('underscore'),
    app = require('../app.js');


describe('test/app.test.js', function () {
    var sf = '6C 7C 8C 9C TC'.split(' '), // straight flush
        fk = '9D 9H 9S 9C 7D'.split(' '), // four of a kind
        fh = 'TD TC TH 7C 7D'.split(' '), // full house
        tp = '5S 5D 9H 9C 6S'.split(' '), // two pair
        s1 = 'AS 2S 3S 4S 5C'.split(' '), // A-5 straight
        s2 = '2C 3C 4C 5S 6S'.split(' '), // 2-6 straight
        ah = 'AS 2S 3S 4S 6C'.split(' '), // A high
        sh = '2S 3S 4S 6C 7D'.split(' '), // 7 high

        fkranks = app.card_ranks(fk),
        tpranks = app.card_ranks(tp);

    // test poker
    it('should equal sf [6C 7C 8C 9C TC]', function () {
        app.poker([sf, fk, fh])[0].should.equal(sf);
    });

    it('should equal fk [9D 9H 9S 9C 7D]', function () {
        app.poker([fk, fh])[0].should.equal(fk);
    });

    it('should equal fh [TD TC TH 7C 7D]', function () {
        app.poker([fh, fh])[0].should.equal(fh);
    });

    it('should equal fh [TD TC TH 7C 7D]', function () {
        app.poker([fh])[0].should.equal(fh);
    });

    it('should equal fh [TD TC TH 7C 7D]', function () {
        app.poker((function () {
            var a = Array.apply(null, Array(99)).map(function () {
                return fh;
            });
            a.push(fk);
            return a;
        })())[0].should.equal(fk);
    });



    // test hand_rank
    it('should equal [8, 10]', function () {
        _.isEqual(app.hand_rank(sf), [8, 10]).should.equal(true);
    });

    it('should equal [7, 9, 7]', function () {
        _.isEqual(app.hand_rank(fk), [7, 9, 7]).should.equal(true);
    });

    it('should equal [6, 10, 7]', function () {
        _.isEqual(app.hand_rank(fh), [6, 10, 7]).should.equal(true);
    });


    // card rank
    it('rank [10, 9, 8, 7, 6] should equal [10, 9, 8, 7, 6]', function () {
        _.isEqual(app.card_ranks(sf), [10, 9, 8, 7, 6]).should.equal(true);
    });

    it('rank [9, 9, 9, 9, 7] should equal [9, 9, 9, 9, 7]', function () {
        _.isEqual(app.card_ranks(fk), [9, 9, 9, 9, 7]).should.equal(true);
    });

    it('rank [10, 10, 10, 7, 7] should equal [10, 10, 10, 7, 7]', function () {
        _.isEqual(app.card_ranks(fh), [10, 10, 10, 7, 7]).should.equal(true);
    });

    it('rank [A, 2, 3, 4, 5] should equal [5, 4, 3, 2, 1]', function () {
        _.isEqual(app.card_ranks(s1), [5, 4, 3, 2, 1]).should.equal(true);
    });


    // straight
    it('[9,8,7,6,5] should equal true', function () {
        app.straight([9,8,7,6,5]).should.equal(true);
    });

    it('[9, 8, 7, 6, 4] should equal false', function () {
        app.straight([9, 8, 7, 6, 4]).should.equal(false);
    });

    it('s1 [5, 4, 3, 2, 1] should equal true', function () {
        app.straight(app.card_ranks(s1)).should.equal(true);
    });

    it('s2 [6, 5, 4, 3, 2] should equal true', function () {
        app.straight(app.card_ranks(s2)).should.equal(true);
    });



    // flush
    it('sf should equal true', function () {
        app.flush(sf).should.equal(true);
    });

    it('fk should equal true', function () {
        app.flush(fk).should.equal(false);
    });

    // kind
    it('fkranks should equal 9', function () {
        app.kind(4, fkranks).should.equal(9);
    });

    it('fkranks should equal undefined', function () {
        (function () {
            return app.kind(3, fkranks) === undefined;
        }()).should.equal(true);
    });

    it('fkranks should equal undefined', function () {
        (function () {
            return app.kind(2, fkranks) === undefined;
        }()).should.equal(true);
    });

    it('fkranks should equal 7', function () {
        app.kind(1, fkranks).should.equal(7);
    });


    // two pairs
    it('two pairs 5S 5D 9H 9C 6S should equal [9, 5]', function () {
        _.isEqual(app.twoPair(tpranks), [9, 5]).should.equal(true);
    });

    it('fkranks [9D 9H 9S 9C 7D] should euqal undefined', function () {
        _.isEqual(app.twoPair(fkranks), undefined).should.equal(true);
    })

});