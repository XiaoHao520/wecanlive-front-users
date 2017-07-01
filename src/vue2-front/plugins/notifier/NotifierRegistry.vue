<template>

  <div class="notifiers">

    <div class="block-notify">
      <transition name="quick-slide-fade" appear>
        <div class="row" v-for="item in itemsNotify">
          <div
            class="'alert alert-' + item.type + ' col-sm-offset-3 col-md-offset-4 col-xs-12 col-sm-6 col-md-4 m-b-5' alert">
            {{ item.content }}
          </div>
        </div>
      </transition>
    </div>

    <transition name="fade" appear>
      <div class="block-dialog block-confirm modal fade in"
           tabindex="-1" role="dialog"
           style="display: block;" v-for="(item, index) in itemsConfirm">
        <transition name="slide-fade" appear>
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header">
                <a href="javascript:" class="btn-close"
                   @click="confirmReject({}, index)">&times;</a>
                <h4 class="modal-title">{{item.title}}</h4>
              </div>
              <div class="modal-body">
                {{item.content}}
              </div>
              <div class="modal-footer">
                <a @click="confirmAction(true, index)"
                   href="javascript:"
                   type="button" class="btn btn-sm btn-confirm">确定
                </a>
                <a @click="confirmAction(false, index)"
                   href="javascript:"
                   type="button" class="btn btn-sm btn-cancel">取消
                </a>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <transition name="fade" appear>
      <div class="block-dialog block-prompt modal fade in"
           tabindex="-1" role="dialog"
           style="display: block;" v-for="(item, index) in itemsPrompt">
        <transition name="slide-fade" appear>
          <div class="modal-dialog modal-sm">
            <div class="modal-content">
              <div class="modal-header" v-if="item.title">
                <a href="javascript:" class="btn-close"
                   @click="promptReject(index)">&times;</a>
                <h4 class="modal-title">{{item.title}}</h4>
              </div>
              <div class="modal-body">
                <div class="prompt-content">{{item.content}}</div>
                <input class="prompt-input" type="text"
                       :placeholder="item.placeholder" ref="promptInput"
                       title v-model="item.value"/>
              </div>
              <div class="modal-footer">
                <a @click.stop="promptAction(true, index)"
                   href="javascript:"
                   type="button" class="btn btn-sm btn-confirm">确定
                </a>
                <a @click.stop="promptAction(false, index)"
                   href="javascript:"
                   type="button" class="btn btn-sm btn-cancel">取消
                </a>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <transition name="fade" appear>
      <div class="block-choices"
           @click="pickChoiceAction(false)"
           v-if="choicepicker.choices.length > 0">
        <transition name="slide-fade" appear>
          <ul>
            <li v-for="item in choicepicker.choices">
              <a :class="{active: item.selected}"
                 @click.stop="pickChoiceAction(true, item.value)">{{item.text}}</a>
            </li>
            <li>
              <a @click.stop="pickChoiceAction(false)">取消</a>
            </li>
          </ul>
        </transition>
      </div>
    </transition>

    <div class="block-imagepicker block-invisible">
      <input type="file" accept="image/*"
             @change="pickImageAction()"
             ref="imageUploader"/>
    </div>

    <transition name="slide-down-up">
      <div class="share-block" v-show="shareBar">
        <div class="title">分享到</div>
        <div class="slide-library">
          <swiper :options="swiperShareOption">
            <swiper-slide>
              <div class="slide-item"
                   @click="shareTo('facabook')">
                <div class="icon icon-facebook"></div>
                Facebook
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide-item"
                   @click="shareTo('instagram')">
                <div class="icon icon-instagram"></div>
                Instagram
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide-item"
                   @click="shareTo('whatsapp')">
                <div class="icon icon-whatsapp"></div>
                Whatsapp
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="slide-item"
                   @click="shareTo('copy')">
                <div class="icon icon-copy"></div>
                複製鏈接
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="block-dialog block-notify-confirm modal fade in"
           tabindex="-1" role="dialog"
           style="display: block;" v-for="(item, index) in itemsNotifyConfirm">
        <transition name="popup" appear>
          <div class="modal-dialog modal-sm" v-if="item.content">
            <div class="modal-content">
              <div class="modal-body">
                {{item.content}}
              </div>
              <div class="modal-footer">
                <a @click="notifyConfirmAction(false, index)"
                   href="javascript:"
                   type="button" class="btn btn-sm btn-cancel">{{item.leftButtonText}}
                </a>
                <a @click="notifyConfirmAction(true, index)"
                   href="javascript:"
                   type="button" class="btn btn-sm btn-confirm">{{item.rightButtonText}}
                </a>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>


    <transition name="fade">
      <div class="mask-block"
           @click="shareBar=false"
           v-show="shareBar"></div>
    </transition>


  </div>

</template>

<script type="text/babel" lang="babel">
  import lrz from 'lrz';

  export default {
    mounted() {
      window.$notifier = this;
    },
    data() {
      return {
        itemsNotify: [],
        itemsConfirm: [],
        itemsPrompt: [],
        itemsNotifyConfirm: [],
        choicepicker: {
          choices: [],
          deferred: null,
        },
        imagepicker: {
          size: 1080,
          image_uri: null,
          deferred: null,
        },
        shareBar: false,
        swiperShareOption: {
          slidesPerView: 'auto',
          freeMode: true,
        },
      };
    },
    methods: {
      confirmAction(success = true, index = -1, params = {}) {
        const vm = this;
        const pos = index === -1 ? vm.itemsConfirm.length - 1 : index;
        const item = vm.itemsConfirm[pos];
        vm.itemsConfirm.splice(pos, 1);
        return item.deferred[success ? 'resolve' : 'reject'](params);
      },
      notifyConfirmAction(success = true, index = -1, params = {}) {
        const vm = this;
        const pos = index === -1 ? vm.itemsNotifyConfirm.length - 1 : index;
        const item = vm.itemsNotifyConfirm[pos];
        vm.itemsNotifyConfirm.splice(pos, 1);
        return item.deferred[success ? 'resolve' : 'reject'](params);
      },
      promptAction(success = true, index = -1) {
        const vm = this;
        const pos = index === -1 ? vm.itemsPrompt.length - 1 : index;
        const item = vm.itemsPrompt[pos];
        vm.itemsPrompt.splice(pos, 1);
        return item.deferred[success ? 'resolve' : 'reject'](item.value);
      },
      pickImageAction() {
        const vm = this;
        const formdata = new FormData();
        const deferred = vm.imagepicker.deferred;
        vm.imagepicker.deferred = null;
        const files = vm.$refs.imageUploader.files;
        const imageURI = vm.imagepicker.image_uri || files.length && files[0];
        vm.imagepicker.image_uri = null;
        if (!imageURI) {
          return deferred.reject('尚未选择图片文件');
        }
        if (/base64/.test(imageURI)) {
          // formdata.append('image', imageURI, files[0].name);
          formdata.append('image', imageURI);
          return api.Image.save(formdata).then(
            resp => deferred.resolve(resp.data)
          );
        }
        vm.resetStatusBar();
        // 压缩并加入 formdata 上传
        return lrz(imageURI, {
          width: vm.imagepicker.size,
          height: vm.imagepicker.size,
        }).then(rst => {
//          vm.notify('compress success');
          formdata.append('image', rst.file, rst.origin.name);
          // reset the form
          vm.$refs.imageUploader.value = '';
          // [config] image_model
          const model = window.app.config.image_model || window.app.api('Image');
          return model.save(formdata).then(
            resp => deferred.resolve(resp.data)
          );
        }, err => {
          console.log(err);
        }).catch(err => {
          console.log(err);
        });
      },
      shareTo(type) {
        const vm = this;
        vm.shareBar = false;
      },
    },
  };
</script>

<style lang="less" type="text/less" scoped>

  .notifiers {
  }

</style>
