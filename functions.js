exports.randomString = function(length) {
  var text = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
  for(var i=0; i < length; i++) text += chars.charAt(Math.floor(Math.random() * chars.length));
  return text;
};

exports.formatedLog = function(id, text){
  return '#' + id + ': ' + text;
};
