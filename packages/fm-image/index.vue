<!-- CopyRight (C) 2018-2022 FlymeApps Group Holding Limited. -->
<!-- Created and Update by Yanjiie on 2018/04/12. -->
<template>
  <image :style="getStyle" @load="onLoad" ref="img" :src="src"/>
</template>

<script>
export default {
  name: 'FmImage',
  data: () => ({
    loaded: false
  }),
  props: {
    src: {
      type: String,
      default: ''
    },
    scale: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 1
    },
    height: {
      type: Number,
      default: 1
    },
    occupyingColor: {
      type: String,
      default: 'transparent'
    },
    imgStyle: {
      type: Object
    }
  },
  computed: {
    getStyle () {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
        backgroundColor: this.loaded ? 'transparent' : this.occupyingColor,
        ...this.imgStyle
      };
    }
  },
  methods: {
    onLoad (e) {
      this.$emit('fmImageLoaded', e);
      e.success && (this.loaded = true);
      if (e.success && e.size && e.size.naturalWidth > 0 && this.scale) {
        this.width = e.size.naturalWidth * this.scale;
        this.height = e.size.naturalHeight * this.scale;
      }
    }
  }
};
</script>
