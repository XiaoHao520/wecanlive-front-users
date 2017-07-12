/* eslint-disable */

import Vue from 'vue';
import VueFront from './vue2-front';

// import './lib/tencent-webim/json2';
import './lib/tencent-webim/webim_no_emotion';
import './assets/css/icons.less';
import './assets/css/style.less';

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
