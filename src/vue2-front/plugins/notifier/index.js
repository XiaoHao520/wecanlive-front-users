import Deferred from 'es6-deferred';
import NotifierRegistry from './NotifierRegistry.vue';
import AwesomeSwiper from 'vue-awesome-swiper';
import api from '../../resource/api';
import areaData from 'china-area-data';

export default {
  install(Vue, opts) {
    Vue.use(AwesomeSwiper);
    // 注册 NotifierRegistry 组件
    const el = document.createElement('div');
    const NotifierRegistryApp = Vue.extend(NotifierRegistry);
    document.body.appendChild(el);
    new NotifierRegistryApp({ el });
    // 注册 mixin 工具方法
    Vue.mixin({
      // components: { NotifierRegistry },
      computed: {
        vmNotifier() {
          return window.$notifier;
        },
      },
      mounted() {
        // if (vm.$root === vm && vm.$route && !vm.vmNotifier) {
        //   const msg = '请在路由根的插件内置入 <notifier-registry ref="notifier"/>';
        //   console.error(msg);
        // }
      },
      methods: {
        notify(content, title = '系统消息', options = {}) {
          const vm = this.vmNotifier;
          const DEFAULTS = {
            type: 'info',
            duration: 3000,
          };
          const item = Object.assign({ title, content }, options, DEFAULTS);
          console.log(`notify: ${content}`);
          vm.itemsNotify.unshift(item);
          setTimeout(() => {
            vm.itemsNotify.shift(item);
          }, item.duration);
        },
        dismissNotify(index) {
          const vm = this.vmNotifier;
          vm.itemsNotify.splice(index, 1);
        },
        clearDialogs() {
          const vm = this.vmNotifier;
          vm.itemsPrompt.forEach(item => {
            vm.promptAction(false);
          });
          vm.itemsConfirm.forEach(item => {
            vm.confirmAction(false);
          });
          if (vm.datepicker.deferred) {
            vm.pickDateAction(false);
          }
          if (vm.choicepicker.deferred) {
            vm.pickChoiceAction(false);
          }
          if (vm.imagepicker.deferred) {
            vm.pickImageAction();
          }
        },
        confirm(content, title = '', options = {}) {
          const vm = this.vmNotifier;
          const DEFAULTS = {
            size: 'md',  // sm/lg/md
          };
          const deferred = new Deferred();
          const item = Object.assign({
            title,
            content,
            deferred,
          }, options, DEFAULTS);
          vm.itemsConfirm.unshift(item);
          console.log(`confirm: 【${title}】- ${content}`);
          return deferred.promise;
        },
        notifyConfirm(content, leftButtonText = 'Cancel', rightButtonText = 'Confirm', options = {}) {
          const vm = this.vmNotifier;
          const DEFAULTS = {
            size: 'md',  // sm/lg/md
          };
          const deferred = new Deferred();
          const item = Object.assign({
            content,
            leftButtonText,
            rightButtonText,
            deferred,
          }, options, DEFAULTS);
          vm.itemsNotifyConfirm.unshift(item);
          console.log(`notifyConfirm: ${content}`);
          return deferred.promise;
        },
        prompt(content, title = '', defaultValue = '', placeholder = '', checkBoxText = '') {
          const vm = this.vmNotifier;
          const deferred = new Deferred();
          vm.itemsPrompt.push({
            content,
            title,
            placeholder,
            checkBoxText,
            deferred,
            value: defaultValue,
          });
          return deferred.promise;
        },
        // pickFile() {
        //   const vm = this.vmNotifier;
        //   const deferred = new Deferred();
        //   vm.filepicker.deferred = deferred;
        //   vm.$refs.uploader_file.click();
        //   return deferred.promise;
        // },
        // pickFileAction() {
        //   const vm = this.vmNotifier;
        //   const deferred = vm.filepicker.deferred;
        //   vm.filepicker.deferred = null;
        //   return deferred.resolve(vm.$refs.uploader_file.files);
        // },

        /**
         * 调起拾取照片的 thenable
         * @param size
         * @param defaultSourceType 0-指定相册选择,1-手机拍照
         * @returns {global.Promise}
         */
        pickImage(size = 1080, defaultSourceType = false) {
          const vm = window.app;
          const vmNotifier = this.vmNotifier;
          const deferred = new Deferred();
          vmNotifier.imagepicker.size = size;
          vmNotifier.imagepicker.deferred = deferred;

          if (navigator.camera && !/Android 4/.test(window.navigator.userAgent)) {
            const chooseSourceType = defaultSourceType === false
              ? vm.pickChoice([
                { text: '从相册选择', value: 0 },
                { text: '拍照上传', value: 1 },
              ])
              : Promise.resolve(defaultSourceType);
            chooseSourceType.then(sourceType => {
              // 多图拾取，尚未调通
              //
              // if (window.imagePicker && sourceType === 0) {
              //   window.imagePicker.getPictures(
              //     results => {
              //       if (!results.length) deferred.reject('没有选择图片');
              //       alert(results[0]);//eslint-disable-line
              //       deferred.resolve(results[0]);
              //     },
              //     error => {
              //       deferred.reject(error);
              //     },
              //   );
              //   return deferred.promise;
              // }
              navigator.camera.getPicture(imageURI => { // on success
                vmNotifier.imagepicker.image_uri = `data:image/jpeg;base64,${imageURI}`;
                vmNotifier.pickImageAction();
                vm.resetStatusBar();
              }, message => { // on fail
                vmNotifier.notify(`获取图片失败：${message}`);
                vmNotifier.resetStatusBar();
              }, { // options
                destinationType: 0, // 0:DATAURL(base64), 1:FILE_URI, 2:NATIVE_URI
                allowEdit: false,
                saveToPhotoAlbum: true,
                correctOrientation: true,
                sourceType, // 0:PHOTOLIBRARY, 1:CAMERA, 2: SAVEDPHOTOALBUM
                targetWidth: size,
                // targetHeight: size,
              });
            });
          } else { // normal browser
            vmNotifier.$refs.imageUploader.click();
          }
          return deferred.promise;
        },
        pickChoice(opts = [], defaultValue = '', title = '') {
          const vm = this.vmNotifier;
          const deferred = new Deferred();
          let options = opts;
          if (typeof (opts) === 'object' && !Array.isArray(opts)) {
            options = Object.keys(opts).map(
              value => ({ value, text: opts[value] })
            );
          }
          options.forEach((item, i) => {
            // 如果 options 是一个字符串，将其重新构造成一个 text-value 对象,
            if (typeof (item) === 'string') {
              options[i] = {
                text: item,
                value: item,
              };
            }
            // 如果选项值等于默认值，将其设置为 selected
            if (options[i].value === defaultValue) {
              options[i].selected = true;
            }
          });
          vm.choicepicker.title = title;
          vm.choicepicker.choices = options;
          vm.choicepicker.deferred = deferred;
          return deferred.promise;
        },
        share() {
          const vm = this.vmNotifier;
          vm.shareBar = !vm.shareBar;
        },
        pickDistrict(val = '') {
          const vm = this;
          const value = val || '';
          return vm.pickChoice(areaData[86], `${vm.areaPrefix(value, 2)}`)
            .then(province => vm.pickChoice(areaData[province], `${vm.areaPrefix(value, 4)}`))
            .then(city => vm.pickChoice(areaData[city], vm.areaPrefix(value)));
        },
      },
    });
  },
};
