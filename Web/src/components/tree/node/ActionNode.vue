<template>
    <div class="emergency-node" >
        <div class="node-title">{{ itemData.id }}</div>
        <div v-if="isEdit">
            <el-input  @focus="nodeFocus" @blur="nodeBlur"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 6}"
                v-model="itemData.nodeData.Name"
                autocomplete="off"
            ></el-input>
        </div>
        <div v-else @mouseover="isEdit=true">
            <div class="content close" ref="content" v-html="itemData.nodeData.Name"></div>
        </div>
    </div>
</template>

<script>
import { ButterflyVueEndpoint } from 'butterfly-vue';
export default {
    name: "emergency-node",
    components: {
        ButterflyVueEndpoint
    },
    props: {
        itemData: {
            type: Object, // ${itemData.nodeData.width}
        },
        canvasNode: {
            type: Object
        }
    },
    data(){
        return {
            isEdit: true,
            expande: false,
            needShowExpande: false,
        }
    },
    methods: {
        handleClick() {
            console.log(this.itemData);
            console.log(this.canvasNode)
        },
        nodeFocus(){
            console.log("nodeFocus")
            this.isEdit=true
        },
        nodeBlur(){
            this.isEdit=false
        },
    },
    created() {
        // console.log(this)
    }
};
</script>

<style scoped lang="less">
.emergency-node {
    width: 200px;
    border-radius: 8px;
    padding: 4px;
    border: 1px solid #aaa;
    text-align: center;
    background-color: rgba(149, 242, 141, 0.615);
    font-size: 16px;
    position: relative;
    .endpoint{
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
    .node-title{
        position: relative;
        z-index: 2;
    }
    .input-area{
        position: relative;
        z-index: 1;
    }
}
</style>
