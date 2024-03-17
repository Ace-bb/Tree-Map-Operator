<template>
    <div class="name-search-bar">
        <div class="one-row">
            <h4 style="width: 100px;">决策树名称：</h4>
            <el-autocomplete
                class="inline-input"
                v-model="tree_name"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容决策树名称"
                :trigger-on-focus="false"
                @select="handleSelect"
                slot="prepend"
            >
                <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
            </el-autocomplete>
        </div>
        <div class="one-row">
            <h4 style="width: 100px;">疾病名称：</h4>
            <el-autocomplete
                class="inline-input"
                v-model="disease_name"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容疾病名称"
                :trigger-on-focus="false"
                @select="handleSelect"
                slot="prepend"
            >
                <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
            </el-autocomplete>
        </div>
        <div class="one-row">
            <h4 style="width: 100px;">症状名称：</h4>
            <el-tag
                :key="tag"
                v-for="tag in inputSymptoms"
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
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加症状</el-button>
            <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
        </div>
        <el-button type="primary" style="width: 200px;" @click="search_by_name" v-loading="loading">搜索</el-button>
    </div>
</template>

<script>
import {SearchFlowchartByName} from "../../api/api"
export default {
    setup() {
        
    },
    data() {
        return {
            tree_name: "",
            disease_name: '',
            restaurants: [],
            state1: '',
            state2: '',
            inputSymptoms: [],
            inputVisible: false,
            inputValue: '',
            loading: false,
            nodes: [],
            edges: []
        }
    },
    methods: {
        handleSelect(item) {
            console.log(item);
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            return [
                { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" }
            ];
        },
        handleClose(tag) {
            this.inputSymptoms.splice(this.inputSymptoms.indexOf(tag), 1);
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
                this.inputSymptoms.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        search_by_name(){
            let map_name = this.tree_name
            let disease = this.disease_name
            let symptoms = this.inputSymptoms
            console.log("map_name: ", map_name)
            console.log("disease: ", disease)
            console.log("symptoms: ", symptoms)
            this.$emit("getDecisionTree", map_name, disease, symptoms)
        },
        test(){
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