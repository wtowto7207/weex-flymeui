<!-- CopyRight (C) 2018-2022 FlymeApps Group Holding Limited. -->
<!-- Created and Updated by Yanjiie on 2018/04/12. -->
<template>
  <fm-popup :have-overlay="true"
            ref="fm-popup"
            popup-color="#FFFFFF"
            :show="show"
            @fmPopupOverlayClicked="popupOverlayClick"
            :overlay-cfg="overlayCfg"
            pos="bottom"
            :height="_height">
    <fm-simple-btn v-for="(btn, index) in btns"
                    scene="actionSheet"
                    :color="btn.color"
                    :key="index"
                    :text="btn.text"
                    :type="btn.type"
                    :msg="btn.msg"
                    @click="btnClick"></fm-simple-btn>
  </fm-popup>
</template>

<style scoped>

</style>

<script>
import FmPopup from '../fm-popup';
import FmSimpleBtn from '../fm-simple-btn';
import Locale from 'weex-flymeui/lib/mixins/locale';
import { t } from 'weex-flymeui/lib/locale';

export default {
  name: 'FmActionSheet',
  mixins: [Locale],
  components: { FmPopup, FmSimpleBtn },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    canAutoClose: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String,
      default () {
        return t('el.common.confirm');
      }
    },
    confirmColor: {
      type: String,
      default: '#DE3938'
    },
    cancelText: {
      type: String,
      default () {
        return t('el.common.cancel');
      }
    },
    actionBtns: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({

  }),
  computed: {
    overlayCfg () {
      const { canAutoClose } = this;
      return {
        hasAnimation: true,
        timingFunction: ['ease-in', 'ease-out'],
        duration: 300,
        opacity: 0.5,
        canAutoClose: canAutoClose
      };
    },
    _height () {
      return 192.0 * this.btns.length;
    },
    btns () {
      let btns = [];
      if (!this.actionBtns || !this.actionBtns.length) {
        btns = [{
          text: this.confirmText,
          color: this.confirmColor,
          type: 'confirm'
        }, {
          text: this.cancelText,
          type: 'cancel'
        }];
      } else {
        btns = this.actionBtns.concat([{
          text: this.cancelText,
          type: 'cancel'
        }]);
      }
      return btns;
    }
  },
  methods: {
    popupOverlayClick () {
      this.canAutoClose && this.$emit('fmActionSheetOverlayClick', {});
    },
    btnClick (btn) {
      this.$refs['fm-popup'].hide();
      this.$emit('fmActionSheetBtnClicked', btn);
    }
  }
};
</script>
