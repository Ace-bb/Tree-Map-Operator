<template>
    <div class="name-search-bar">
        <div class="one-row">
            <h4 style="width: 100px;">子图节点：</h4>
            <el-tag
                :key="tag"
                v-for="tag in subTrereNodes"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
            </el-tag>
            <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加节点</el-button>

        </div>
        <el-button type="primary" style="width: 200px;" @click="search">搜索</el-button>
    </div>
</template>

<script>
export default {
    setup() {
        
    },
    data() {
        return {
            restaurants: [],
            state1: '',
            state2: '',
            subTrereNodes: [],
            inputVisible: false,
            inputValue: ''
        }
    },
    methods: {
        handleClose(tag) {
            this.subTrereNodes.splice(this.subTrereNodes.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
            this.subTrereNodes.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        loadAll() {
            return [
                { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" }
            ];
        },
        search(){
            this.$emit("getTreeBySub", this.subTrereNodes)
        }
    },
    mounted() {
        this.restaurants = this.loadAll();
    }
}
</script>

<style lang="less">
.name-search-bar{
    margin-top: 16px;
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    .one-row{
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .inline-input{
        width: 360px;
    }
}
</style>