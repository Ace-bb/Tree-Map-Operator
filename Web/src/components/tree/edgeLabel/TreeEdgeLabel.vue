<template>
  <div class="label" @onClick="labelClick">
    <!-- {{ itemData.label }} -->
    <input v-model="itemData.label" style="width: 64px;"/>
    <!-- <el-input
        v-model="itemData.label"
        autocomplete="off"
    ></el-input> -->
    <!-- <el-button type="primary" icon="el-icon-edit" circle @click="labelClick"></el-button> -->
  </div>
</template>
  
<script>
export default {
  name: "base-label",
  props: {
    itemData: {
      type: Object,
    },
  },
  methods: {
    labelClick(e) {
      console.log('labelClick: ', this.itemData);
      e.stopPropagation();
      this.$emit('click', 'emitlabelClick');
    }
  },
};
</script>
  
<style scope>
.label {
  font-size: 12px;
  width: 30px;
  height: 18px;
  line-height: 18px;
  color: #222;
  text-align: center;
  border-radius: 80px;
}
</style>
  