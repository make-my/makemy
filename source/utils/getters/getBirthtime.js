'use strict';

const fs = require('fs');

/**
 *
 * @param {Directory|String} postFileLocation - the location for the post file
 */

async function getBirthtime(postFileLocation) {
  try {
    const stat = fs.statSync(postFileLocation);

    const creationDate = stat.birthtime.toString().split(' ');

    let day = creationDate[0];

    let month = creationDate[1];

    let date = creationDate[2];
    let suffix = 'th';

    const year = creationDate[3];

    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    day = days.find(d => d.startsWith(day));
    month = months.find(d => d.startsWith(month));

    date = date.startsWith(0) ? date[1] : date;

    if (date.endsWith(1)) {
      suffix = 'st';
    } else if (date.endsWith(2)) {
      suffix = 'nd';
    } else if (date.endsWith(3)) {
      suffix = 'rd';
    }

    return [`${day} ${date + suffix} of ${month} ${year}`, stat.birthtimeMs];
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = getBirthtime;
