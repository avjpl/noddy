module.exports = function() {
    this.name = 'MOTD';
    var _motd = this.loadBase('motd', {});
    this.events = {
        join: function (from, to, user) {
            if (user.nick !== this.noddy.getConfig().irc.nick && _motd[from]) {
                this.noddy.say(from, 'Hello '+to+', '+_motd[from]);
            }
        }
    }
    this.commands = {
        motd: function(from, to) {
            // [motd text] Set or display MOTD banner on channel join
            var text = this.getText(arguments);
            if (text) {
                _motd[to] = text;
                this.syncBase('motd', _motd);
            } else {
                if (_motd[to]) {
                    this.noddy.say(to, 'Hello '+from+', '+_motd[to]);
                }
            }
        }
    }
}