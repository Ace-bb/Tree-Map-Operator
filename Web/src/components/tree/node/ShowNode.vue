<template>
    <div class="emergency-node" >
        <!-- <butterfly-vue-endpoint id="3" className="endpoint">
            <el-button @click="handleClick">endpoint</el-button>
        </butterfly-vue-endpoint> -->
        <div :style="{ width: itemData.nodeData.size.width}">{{ itemData.nodeData.Name }}</div>
    </div>
</template>

<script>
import { ButterflyVueEndpoint } from 'butterfly-vue';
export default {
    name: "decision-tree-node",
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
    methods: {
        handleClick() {
            console.log(this.itemData);
            console.log(this.canvasNode)
        },
    },
    created() {
        // console.log(this)
    }
};
</script>

<style scoped lang="less">
.emergency-node {
    // width: 200px;
    padding: 12px 6px;
    border-radius: 8px;
    border: 1px solid #aaa;
    text-align: center;
    background-color: rgba(248, 228, 191, 0.615);
    font-size: 16px;
    border: #8cb4ed78 solid 4px;
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
