/* eslint-disable */

import Vue from 'vue';
import VueFront from './vue2-front';

window.onerror = function(message, source, lineno, colno, error) {
  alert(
    'message: ' + message + '\n' +
    'source: ' + source + '\n' +
    'lineno: ' + lineno + '\n' +
    'colno: ' + colno + '\n' +
    'error: ' + error
  );
};

Vue.use(VueFront);
