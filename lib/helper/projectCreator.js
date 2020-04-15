const ncp = require('ncp');

const alertUser = require('../feedback/alertUser');

async function projectCreator(dir) {
  ncp(__dirname + '/makemy', dir + '/makemy', function(err) {
    if (err) {
      return console.error(err);
    }
    alertUser('generic', 'project');
    console.log(dir);
  });
}

module.exports = projectCreator;
