<template>
    <div class="emergency-node" >
        <!-- <butterfly-vue-endpoint id="3" className="endpoint">
            <el-button @click="handleClick">endpoint</el-button>
        </butterfly-vue-endpoint> -->
        <div class="node-title">
            <div>{{ itemData.id }}</div>
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteNode"></el-button>
        </div>
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            v-model="itemData.nodeData.Name"
            autocomplete="off"
        ></el-input>
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
    methods: {
        handleClick() {
            console.log(this.itemData);
            console.log(this.canvasNode)
        },
        deleteNode(){
            console.log("deleteNode")
            this.itemData.deleteFunction(this.itemData.id)
        }
    },
    created() {
        // console.log(this)
    }
};
</script>

<style scoped lang="less">
.emergency-node {
    width: 200px;
    padding: 4px;
    border-radius: 8px;
    border: 1px solid #aaa;
    text-align: center;
    background-color: rgba(242, 207, 141, 0.615);
    font-size: 16px;
    // border: #8cb4ed78 solid 4px;
    position: relative;
    .endpoint{
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
    .node-title{
        position: relative;
        z-index: 2;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .input-area{
        position: relative;
        z-index: 1;
    }
}
</style>
