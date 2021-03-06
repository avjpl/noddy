var _ = require('underscore');

module.exports = function(){
    this.name = 'Words';
    var words = this.loadBase('words');

    this.events = {
        message: function(from, to, message) {
            if (/^!/.test(message)) return;
            if (!words[from]) {
                words[from] = {};
            }
            var wordsArray = message.split(' ');
            _.forEach(wordsArray, function(word) {
                if (!words[from][word]) {
                    words[from][word] = 1;
                } else {
                    words[from][word] += 1;
                }
            });
            this.syncBase('words', words);
            //console.log(words);
        }
    }
    this.commands = {
        words: function(from, to, nick) {
            var wordsArray;
            if (nick) {
                wordsArray = words[nick];
            } else {
                wordsArray = words[from]
            }
            if (!wordsArray) return;
            var order = [];
            _.forEach(wordsArray, function(count, word) {
                order.push({word:word, count:count});
            });
            order.sort(function(a, b) {
                return a.count - b.count;
            });
            //this.noddy.say(to, ['Top 10 words for', nick || from].join(' '));
            //for (var i = 0; i < 10; i++) {
                //var word = order.pop();
                //this.noddy.say(to, [word.count, word.word].join(': '));
            //};
            console.log(order.reverse().slice(0, 10));
            // var word = order.pop();
            // this.noddy.say(to, ['Most commonly used word is:', word.word, 'Used:', word.count, 'times'].join(' '));
        }
    }
}