/*
 * Class AMI
 * Generate incoming and outgoing calls
 *
 * title: title name of application program
 * username: autorization username
 * password: autorization password
 * auth: false
 *
 *
 */

function Ami(title, username, secret) {
  this.title = title;
  this.username = username;
  this.secret = secret;
  this.auth = false;
};

Ami.prototype.login = function(text) {
  if(text == 'Action: login\r\nUsername: ' + this.username + 'Secret: ' + this.secret + '\r\n')
    return  true;
  else
    return false;
};

Ami.prototype.generateCall = function(accountcode, source, destination, time) {
  return 'Privilege: cdr,all\r\n' +
    'AccountCode: ' + accountcode + '\r\n' +
    'Source: ' + source + '\r\n' +
    'Destination: ' + destination + '\r\n' +
    'DestinationContext: ' + destination + '\r\n' +
    'CallerID: <' + source + '>' + '\r\n' +
    'Channel: SIP/4111-00004d38' + '\r\n' +
    'DestinationChannel: SIP/' + destination + '\r\n' +
    'LastApplication: Dial' + '\r\n' +
    'LastData: DAHDI/g0' + '\r\n' +
    'StartTime: 2014-06-24 15:32:15' + '\r\n' +
    'AnswerTime: 2014-06-24 15:32:21' + '\r\n' +
    'EndTime: 2014-06-24 15:41:24' + '\r\n' +
    'Duration: 549' + '\r\n' +
    'BillableSeconds: 543' + '\r\n' +
    'Disposition: ANSWERED' + '\r\n' +
    'AMAFlags: DOCUMENTATION' + '\r\n' +
    'UniqueID: 1403587934.22710' + '\r\n' +
    'UserField:\r\n\r\n';
};

Ami.prototype.incoming = function(accountcode,  source, destination, time) {
  return this.generateCall(accountcode, source, destination, time);
};

Ami.prototype.outgoing = function(source, destination, time) {
  return this.generateCall('', source, destination, '');
};

module.exports = Ami;
