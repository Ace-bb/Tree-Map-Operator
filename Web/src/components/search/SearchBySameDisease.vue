<template>
    <div class="name-search-bar">
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
            </el-autocomplete>
            <el-input-number v-model="num" slot="prepend" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </div>
        <div class="multi-butterfly-view">
            <div class="butterfly-block" v-for="tree in decisionTreeDatas">
                <div class="flowchart-title-view">{{ tree.flowchart_name }}</div>
                <butterfly-vue
                    :canvasData="tree.treeData"
                    :canvasConf="canvasConfig"
                    className='flowchart'
                    key="flowchart"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { ButterflyVue } from 'butterfly-vue';
import {SearchFlowchartByDisease} from "../../api/api"
import { reactive, ref } from '@vue/composition-api';
import baseLabel from '../../components/tree/edgeLabel/TreeEdgeLabel.vue';
import decisionTreeNode from "../../components/tree/node/ShowNode.vue"
export default {
    components: {
        ButterflyVue
    },
    setup() {
        let decisionTreeDatas = reactive([])
        let mockData = reactive({
            groups: [],
            nodes:[],
            edges:[]
        });
        let canvasConfig = reactive({
            disLinkable: false, // 可删除连线
            linkable: false,    // 可连线
            draggable: true,   // 可拖动
            zoomable: true,    // 可放大
            moveable: true,    // 可平移
            theme:{
                edge: {
                    // type: 'endpoint',    //线段连接类型
                    shapeType: 'Straight', //线条默认类型  AdvancedBezier
                    arrow: true,         //线条默认是否带箭头
                    arrowPosition: 0.9,  //箭头位置(0 ~ 1)
                    isExpandWidth: true,//增加线条交互区域
                }
            }
        });
        let canvansRef = reactive({});
        let butterflyVue = reactive({});
        let nodeIndex = ref(0);
        return {
            canvasConfig,
            mockData,
            canvansRef,
            butterflyVue,
            nodeIndex,
            decisionTreeDatas
        }
    },
    data() {
        return {
            restaurants: [],
            state1: '',
            disease_name: '',
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: '',
            num: 1,
            flowchart_name: ""
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
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
            this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        handleChange(value) {
            console.log(value);
        },
        finishLoaded (VueCom) {
            this.butterflyVue = VueCom;
            this.canvansRef = VueCom.canvas;
            console.log("finish load");
        },
        init_butterfly_mockData(nodes, edges){
            console.log("nodes:", nodes)
            console.log("edges:", edges)
            while (this.mockData.nodes.length>0){
                this.mockData.nodes.splice(0,1)
            }
            while (this.mockData.edges.length>0){
                this.mockData.edges.splice(0,1)
            }
            let tempMockData = {nodes:[], edges:[], groups:[]}
            for (let i in nodes) {
                let node = nodes[i]
                console.log("node: ", node)
                tempMockData.nodes.push({
                    id: node.id + '',
                    top: node.top,
                    left: node.left,
                    render: decisionTreeNode,
                    endpoints: [
                        endpointButtom,
                        endpointTop,
                        endpointLeft,
                        endpointRight,
                    ],
                    nodeData: node,
                })
            }
            for (let i in edges) {
                let edge = edges[i]
                console.log("edges: ", edge)
                if (edge.label!=""){
                    tempMockData.edges.push({
                        id: edge.id,
                        sourceNode: edge.sourceNode,
                        targetNode: edge.targetNode,
                        source: edge.source,
                        target: edge.target,
                        render: baseLabel,
                        label: edge.label
                    })
                }else{
                    tempMockData.edges.push({
                        id: edge.id,
                        sourceNode: edge.sourceNode,
                        targetNode: edge.targetNode,
                        source: edge.source,
                        target: edge.target,
                        label: edge.label
                    })
                }
            }
            console.log("tempMockData: ", tempMockData)
            return tempMockData
        },
        getDecisionTreeByDisease(){
            this.loading=true
            SearchFlowchartByDisease({"disease":this.disease_name, "num": this.num}).then(res=>{
                console.log("SearchFlowchartByDisease: ", res)
                res.forEach(element => {
                    this.decisionTreeDatas.push(_.cloneDeep({
                        flowchart_name: element.flowchart_name,
                        treeData: this.init_butterfly_mockData(element.nodes, element.edges)
                    }))
                });
                this.loading =false
            }).catch(err=>{
                console.log(err)
                this.loading =false
            })
        },
        search(){
            this.getDecisionTreeByDisease()
        },
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
    .flowchart-title-view{
        display: flex;
        height: 48px;
        align-items: center;
        padding-left: 16px;
        background-color: white;
        border-bottom:1px solid #c4bebe9a;
        border-top:1px solid #c4bebe9a;
    }
    .multi-butterfly-view{
        width: 100%;
        height: 100%;
        display: flex;
        .butterfly-block{
            width: 500px;
            height: 500px;
            padding: 24px;
            border: 1px solid #c4bebe9a;
        }
    }
}
</style>