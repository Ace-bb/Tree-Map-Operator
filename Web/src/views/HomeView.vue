<template>
    <el-container>
        <el-aside width="240px" style="background-color: rgb(238, 241, 246)" class="aside-tree">
            <div class="aside-new-node-view">
                <h3>拖拽新增节点</h3>
                <div draggable class="node-container" @dragstart="(e) => { dragstart(e, newConditionNode, 'newNode') }"
                    ref="newNode">
                    <treeNode :itemData="newConditionNode" />
                </div>
            </div>
            <div class="tree-files-list-view">
                <!-- <div class="create-new-btn-view">
                    <el-button size="mini" @click="createNewTreeMap">新建决策树</el-button>
                    <el-button size="mini" @click="createNewTreeFolder">新建文件夹</el-button>
                </div> -->
                <el-tree class="el-tree-background" :data="data" :props="defaultProps" accordion default-expand-all highlight-current
                    >
                    <span class="tree-node-view" slot-scope="{ node, data }">
                        <span class="node-content" 
                            @click="handleNodeClick(data)">{{ node.label }}</span>
                        <span v-if="'children' in data">
                            <el-button type="text" icon="el-icon-circle-plus-outline" circle
                                @click="() => craeteNewFile(node, data)">
                            </el-button>
                        </span>
                    </span>
                </el-tree>
                <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                    <el-form :model="newFileForm" :rules="rules" ref="ruleForm">
                        <el-form-item label="文件类型" prop="type" :label-width="formLabelWidth" required>
                            <el-radio-group v-model="newFileForm.type">
                                <el-radio label="创建新决策图谱"></el-radio>
                                <el-radio label="创建新文件夹"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="文件名" prop="filename" :label-width="formLabelWidth" required>
                            <el-input v-model="newFileForm.filename" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="confirmCreateNewFile('ruleForm')">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </el-aside>
        <el-main>
            <div class="flowchart-view">
                <div class="home" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.2)">
                    <div class="tab-content-view">
                        <div class="control-btn-view">
                            <div class="control">
                                <el-input placeholder="需要删除的节点id" v-model="delete_node_id" clearable
                                    style="width: 160px;"></el-input>
                                <el-tooltip class="item" effect="dark" content="删除一个节点，节点id就是流程图中每个节点上面的数字"
                                    placement="top-start">
                                    <el-button @click="deleteNode(delete_node_id)">删除节点</el-button>
                                </el-tooltip>

                            </div>
                            <div class="add-edge-view">
                                <el-input placeholder="起始节点的id" v-model="edge_start_id" clearable
                                    style="width: 300px;"></el-input>
                                <el-input placeholder="终止节点的id" v-model="edge_end_id" clearable
                                    style="width: 160px;"></el-input>
                                <el-input placeholder="edge label" v-model="edge_label" clearable></el-input>
                                <el-tooltip class="item" effect="dark"
                                    content="增加一条带有label的边，这里也可以增加不带label的边，但是不带label的边可以直接拖动节点四周的小圆点进行连接，箭头方向就是边的方向，从左往右的边就选Left，以此类推"
                                    placement="right">
                                    <el-button @click="addEdge">添加连线</el-button>
                                </el-tooltip>

                            </div>
                            <div class="add-edge-view">
                                <el-input placeholder="开始节点" v-model="delete_start_id" clearable
                                    style="width: 160px;"></el-input>
                                <el-input placeholder="结束节点" v-model="delete_end_id" clearable
                                    style="width: 160px;"></el-input>
                                <el-button @click="deleteEdge(delete_start_id, delete_end_id)">删除连线</el-button>
                            </div>
                            <div class="add-edge-view">
                                <el-button @click="save_recognize_flowchart" type="primary">保存</el-button>
                            </div>
                        </div>
                        <el-divider></el-divider>
                        <div class="butterfly-container" @dragover="dragover" @drop="addNewNode">
                            <butterfly-vue :canvasData="mockData" :canvasConf="canvasConfig" @onCreateEdge="logCreateEdge"
                                @onChangeEdges="logChangeEdges" @onDeleteEdge="logDeleteEdge" @onOtherEvent="logOtherEvent"
                                @onLoaded="finishLoaded" className='flowchart-butterfly' key="flowchart-butterfly" />
                        </div>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import { ButterflyVue } from 'butterfly-vue';
import {
    GetFlowchartFilelist, CreateNewFile, GetFlowchartDatas, SaveFlowchartDatas
} from "../api/api"
import treeNode from "../components/tree/node/TreeNode.vue";
import conditionNode from "../components/tree/node/ConditionNode.vue"
import actionNode from "../components/tree/node/ActionNode.vue"
import stateNode from "../components/tree/node/StateNode.vue"
import baseLabel from '../components/tree/edgeLabel/TreeEdgeLabel.vue';
import TestMockData from "./tree/emergency-mockData.js";
import {
    endpointLeft,
    endpointTop,
    endpointRight,
    endpointButtom
} from "../mock/tree-mockData"
import _mockData from "../mock/tree-mockData";
import { reactive, ref } from '@vue/composition-api';
export default {
    name: 'HomeView',
    components: {
        ButterflyVue,
        conditionNode,
        actionNode,
        stateNode,
        treeNode
    },
    setup(props, ctx) {
        let mockData = reactive({
            groups: [],
            nodes: [],
            edges: []
        });
        let x = ref(0)
        let canvasConfig = reactive({
            disLinkable: true, // 可删除连线
            linkable: true,    // 可连线
            draggable: true,   // 可拖动
            zoomable: true,    // 可放大
            moveable: true,    // 可平移
            // layout: {
            //     type: 'dagreLayout',
            //     options: {
            //         rankdir: 'LR',
            //         nodesep: 30,
            //         ranksep: 70,
            //         controlPoints: false,
            //     },
            // },
            theme: {
                edge: {
                    // type: 'endpoint',    //线段连接类型
                    shapeType: 'Straight', //线条默认类型  AdvancedBezier
                    // hasRadius: false ,   //默认曼哈顿曲线不为圆角
                    // label: 'test',       //线条默认label
                    arrow: true,         //线条默认是否带箭头
                    arrowPosition: 0.9,  //箭头位置(0 ~ 1)
                    // arrowOffset: 0.0,    //箭头偏移
                    // arrowShapeType: '',  //自定义箭头样式
                    // // Class: XXClass,      //自己拓展的class,拖动连线的时候会采用该拓展类
                    isExpandWidth: true,//增加线条交互区域
                    // defaultAnimate: false,//默认开启线条动画
                    // dragEdgeZindex: 499  //线段的默认z-index(选填，默认：499)
                },
                endpoint: {      //限制锚点位置['Top', 'Bottom', 'Left', 'Right'],
                    linkableHighlight: true,//连线时会触发point.linkable的方法，可做高亮
                    limitNum: 10,        //限制锚点的连接数目
                    expandArea: {        //锚点过小时，可扩大连线热区
                        left: 40,
                        right: 40,
                        top: 40,
                        botton: 40
                    }
                },
            }
        });
        let canvansRef = reactive({});
        let butterflyVue = reactive({});
        let nodeIndex = ref(0);


        return {
            x,
            mockData,
            canvasConfig,
            canvansRef,
            butterflyVue,
            nodeIndex
        }
    },
    data() {
        return {
            TestMockData,
            num: 0,
            nodeIndex: 0,
            edgeIndex: 0,
            data: [],
            fileMaxId: -1,
            delete_node_id: null,
            edge_start_id: null,
            edge_end_id: null,
            delete_start_id: null,
            delete_end_id: null,
            edge_label: null,
            edge_direction: '',
            defaultProps: {
                children: 'children',
                label: 'label',
                path: 'path'
            }, // 172.20.137.133
            current_img: "General_diagnosis/41腰痛.png",
            loading: false,
            currentMockData: { nodes: [], edges: [], groups: [] },
            activeName: 'flowchart',
            relateBookContent: "医书内容",
            score_threshold: 0.3,
            bbox_size_threshold: 10,
            current_tree: "",
            editEdgeLabel: true,
            dialogFormVisible: false,
            newFileForm: {
                "type": '创建新决策图谱',
                "filename": ''
            },
            formLabelWidth: '120px',
            rules: {
                filename: [
                    { required: true, message: '请输入文件名', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '请选择文件类型', trigger: 'change' }
                ]
            },
            addFileParentNode: null,
            addFileParentData: null,
            addFileParentId: -1,
            newConditionNode: {
                ref: "newNode",
                nodeData: {
                    "id": 0,
                    "Name": "请输入条件节点内容",
                    "coordinate": [
                        260,
                        389,
                        880,
                        925
                    ],
                    "top": 1056,
                    "left": -388,
                    "size": {
                        "width": "129px",
                        "height": "45px",
                        "rows": 1
                    }
                },
            },
            newActionNode: {
                ref: "action",
                nodeData: {
                    "id": 0,
                    "Name": "请输入动作节点内容",
                    "coordinate": [
                        260,
                        389,
                        880,
                        925
                    ],
                    "top": 1056,
                    "left": -388,
                    "size": {
                        "width": "129px",
                        "height": "45px",
                        "rows": 1
                    }
                },
            },
            newStateNode: {
                ref: "state",
                nodeData: {
                    "id": 0,
                    "Name": "请输入状态节点内容",
                    "coordinate": [
                        260,
                        389,
                        880,
                        925
                    ],
                    "top": 1056,
                    "left": -388,
                    "size": {
                        "width": "129px",
                        "height": "45px",
                        "rows": 1
                    }
                },
            }
        }
    },
    methods: {
        guid() {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }
            return (S4() + S4() + "-" + S4());
        },
        dragstart(e, nodeData, nodeType) {
            console.log("dragstart")
            console.log("nodeData：", nodeData)
            console.log("nodeType", nodeType)
            if (nodeType == "newNode") {
                e.dataTransfer.setData('newNode', JSON.stringify(nodeData));
            }
            e.dataTransfer.setData('nodeType', nodeType);
            e.dataTransfer.setDragImage(this.$refs[nodeData.ref], 0, 0);
        },
        dragover(e) {
            console.log("dragover")
            e.preventDefault();
        },
        addNewNode(e) {
            console.log("addNewNode")
            let { clientX, clientY } = e;
            let coordinates = this.canvansRef.terminal2canvas([clientX, clientY]);
            console.log("coordinates: ", coordinates)
            let nodeType = e.dataTransfer.getData('nodeType')
            let renderNode = treeNode
            let node = JSON.parse(e.dataTransfer.getData(nodeType));
            this.mockData.nodes.push({
                id: `${++this.nodeIndex}`,
                left: coordinates[0],
                top: coordinates[1],
                render: renderNode,
                endpoints: [
                    endpointButtom,
                    endpointTop,
                    endpointLeft,
                    endpointRight
                ],
                deleteFunction: this.deleteNode,
                nodeData: node.nodeData,
            });
        },
        get_nodes_and_edges() {
            let all_node_and_edges;
            const that = this
            getAllTreeNodes().then(res => {
                console.log("getAllTreeNodes: ", res)
                all_node_and_edges = res
                let nodes = []
                let edges = []
                for (let i in all_node_and_edges.nodes) {
                    let node = all_node_and_edges.nodes[i]
                    console.log("node: ", node)
                    that.mockData.nodes.push({
                        id: node.id + '',
                        render: treeNode,
                        endpoints: [
                            // endpointButtom,
                            // endpointTop,
                            endpointLeft,
                            endpointRight,
                        ],
                        nodeData: node,
                    })
                    if (node.parent != -1) {
                        that.mockData.edges.push({
                            id: node.parent + '--' + node.id + '',
                            sourceNode: node.parent + '',
                            targetNode: node.id + '',
                            source: 'right',
                            target: 'left',
                            render: '<div>11</div>'
                        })
                    }

                }
                console.log(this.mockData)
            }).catch(err => {
                console.log(err)
            })
        },
        init_butterfly_mockData(nodes, edges) {
            while (this.mockData.nodes.length > 0) {
                this.mockData.nodes.splice(0, 1)
            }
            while (this.mockData.edges.length > 0) {
                this.mockData.edges.splice(0, 1)
            }
            this.mockData = { nodes: [], edges: [], groups: [] }
            this.nodeIndex = 0
            this.edgeIndex = 0
            let tempMockData = { nodes: [], edges: [], groups: [] }
            for (let i in nodes) {
                let node = nodes[i]
                console.log("node: ", node)
                tempMockData.nodes.push({
                    id: node.id + '',
                    top: node.top,
                    left: node.left,
                    render: treeNode,
                    endpoints: [
                        endpointButtom,
                        endpointTop,
                        endpointLeft,
                        endpointRight,
                    ],
                    deleteFunction: this.deleteNode,
                    nodeData: node,
                })
                if (node.id > this.nodeIndex) {
                    this.nodeIndex = node.id
                }
            }
            for (let i in edges) {
                let edge = edges[i]
                console.log("edges: ", edge)
                if (this.editEdgeLabel) {
                    tempMockData.edges.push({
                        id: edge.id,
                        sourceNode: edge.sourceNode,
                        targetNode: edge.targetNode,
                        source: edge.source,
                        target: edge.target,
                        render: baseLabel,
                        label: edge.label
                    })
                } else {
                    tempMockData.edges.push({
                        id: edge.id,
                        sourceNode: edge.sourceNode,
                        targetNode: edge.targetNode,
                        source: edge.source,
                        target: edge.target,
                        label: edge.label
                    })
                }

                if (edge.id > this.edgeIndex) {
                    this.edgeIndex = edge.id
                }
            }
            this.mockData = _.cloneDeep(tempMockData);
            this.currentMockData = { nodes: nodes, edges: edges, groups: [] }
            // this.$nextTick(() => {
            // })
            console.log("init_butterfly_mockData: ", this.currentMockData)
        },
        get_flowchart_file_list(user_name) {
            var that = this
            GetFlowchartFilelist({ "user_name": user_name }).then(res => {
                console.log("GetFlowchartFilelist res:", res)
                // console.log("res.fileList：", res.fileList)
                that.data = res.fileList
                that.fileMaxId = res.maxId
                this.$message({
                    type: 'success',
                    message: '获取数据成功'
                });
            }).catch(err => {
                console.log(err)
            })
        },
        handleNodeClick(data) {
            console.log("handleNodeClick:", data);

            if (!("children" in data)) {
                this.current_tree = data.label //172.20.137.133
                this.current_img = data.path
                this.loading = true
                GetFlowchartDatas({ "tree_map_data_save_path": data.path }).then(res => {
                    console.log("GetFlowchartDatas: ", res)
                    this.init_butterfly_mockData(res.nodes, res.edges)
                    this.loading = false
                }).catch(err => {
                    console.log(err)
                    this.loading = true
                })
            }

        },
        save_recognize_flowchart() {
            console.log("data:", this.mockData)
            console.log("path:", this.current_img)
            let flowchart_data = this.mockData
            let nodes = []
            let arrows = []
            for (let i in flowchart_data.nodes) {
                nodes.push({
                    "id": flowchart_data.nodes[i].id,
                    "Name": flowchart_data.nodes[i].nodeData.Name,
                    "coordinate": flowchart_data.nodes[i].nodeData.coordinate,
                    "top": flowchart_data.nodes[i].top,
                    "left": flowchart_data.nodes[i].left,
                    "width": flowchart_data.nodes[i].nodeData.size.width,
                    "height": flowchart_data.nodes[i].nodeData.size.height,
                    "rows": flowchart_data.nodes[i].nodeData.size.rows
                })
            }
            for (let i in flowchart_data.edges) {
                arrows.push(flowchart_data.edges[i])
            }
            if (nodes != [] && arrows != []) {
                console.log()
                this.loading = true
                SaveFlowchartDatas({
                    "tree_map_path": this.current_img,
                    "tree_map_nodes": nodes, "tree_map_edges": arrows
                }).then(res => {
                    console.log(res)
                    this.loading = false
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                }).catch(err => {
                    console.log(err)
                    this.loading = false
                    this.$alert(err, '保存失败', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: "不行就记录下来"
                            });
                        }
                    });

                })
            }

        },
        reDraw() {
            console.log("reDraw: ", this.currentMockData)
            // this.mockData = {nodes:[], edges:[], groups:[]};

            // this.$nextTick(() => {
            //     this.mockData = _.cloneDeep(this.currentMockData);
            // })
            this.init_butterfly_mockData(this.currentMockData.nodes, this.currentMockData.edges)
        },
        logData() {
            console.log(this.mockData);
            console.log(this.canvansRef.getDataMap());
        },
        addNode() {
            console.log("addNode")
            this.mockData.nodes.push({
                id: `${++this.nodeIndex}`,
                left: 0,
                top: 0,
                render: treeNode,
                endpoints: [
                    endpointButtom,
                    endpointTop,
                    endpointLeft,
                    endpointRight,
                ],
                nodeData: {
                    "id": this.nodeIndex,
                    "Name": "",
                    "coordinate": [0, 0, 0, 0],
                    "top": 0,
                    "left": 0,
                    "size": {
                        "width": "300px",
                        "height": "100px",
                        "rows": 3
                    }
                }
            });
            // this.nodeIndex++;
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        deleteNode(delete_node_id){
            console.log("deleteNode")
            if (delete_node_id==-1) return
            for(let i=0;i<this.mockData.nodes.length;i++){
                if (this.mockData.nodes[i].id==delete_node_id){
                    for (let j = 0; j < this.mockData.edges.length; j++) {
                        if (this.mockData.edges[j].sourceNode == delete_node_id || this.mockData.edges[j].targetNode == delete_node_id) {
                            console.log("edge:", this.mockData.edges[i])
                            this.mockData.edges.splice(j, 1)
                        }
                    }
                    this.mockData.nodes.splice(i,1)
                    return
                }
            }
        },
        addEdge() {

            let s = ""
            let t = ""
            if (this.edge_direction == 1) {
                s = "left"
                t = "right"
            } else if (this.edge_direction == 2) {
                s = "right"
                t = "left"
            } else if (this.edge_direction = 3) {
                s = "bottom"
                t = "top"
            } else {
                s = "top"
                t = "bottom"
            }
            console.log(s, t)
            this.mockData.edges.push({
                id: this.edge_start_id + "--" + this.edge_end_id,
                sourceNode: this.edge_start_id + '',
                targetNode: this.edge_end_id + '',
                source: s,
                target: t,
                render: baseLabel,
                label: this.edge_label
            })
        },
        deleteEdge(delete_start_id, delete_end_id) {
            console.log("deleteEdge")
            if (delete_start_id == -1 || delete_end_id == -1) return
            for (let i = 0; i < this.mockData.edges.length; i++) {
                if (this.mockData.edges[i].sourceNode == delete_start_id && this.mockData.edges[i].targetNode == delete_end_id) {
                    this.mockData.edges.splice(i, 1)
                    return
                }
            }
        },
        deleteAllEdge() {
            for (let i = 0; i < this.mockData.edges.length; i++) {
                this.mockData.edges.pop()
            }
        },
        editEdge() {
            this.mockData.edges.splice(0, 1, {
                id: '1.right-4.left',
                sourceNode: '1',
                targetNode: '4',
                source: 'right',
                target: 'left',
                render: '<div>编辑线</div>'
            })
        },
        craeteNewFile(node, data) {
            console.log("node:", node)
            console.log("data:", data)
            this.dialogFormVisible = true
            this.addFileParentNode = node
            this.addFileParentData = data
            this.addFileParentId = node.id
        },
        confirmCreateNewFile(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                let newChild = {};
                let newFilePath = this.addFileParentData.path + '/' + this.newFileForm.filename
                let newFileType = "map"
                if (this.newFileForm.type == "创建新文件夹"){
                    newFileType = "folder"
                }
                CreateNewFile({ "file_path": newFilePath, "file_type": newFileType}).then(res => {
                    console.log("CreateNewFile: ", res)
                    if (this.newFileForm.type=="创建新文件夹") {
                        if (!this.addFileParentData.children) {
                            this.$set(this.addFileParentData, 'children', []);
                        }
                        newChild = { id: ++this.fileMaxId, label: this.newFileForm.filename, path: newFilePath, children: [] }
                    }else {
                        newChild = { id: ++this.fileMaxId, label: this.newFileForm.filename ,path: newFilePath+'.json'}
                    }
                    this.dialogFormVisible = false
                    this.addFileParentData.children.push(newChild);
                }).catch(err => {
                    console.log(err)
                })
                
                console.log(this.newFileForm)
            } else {
                console.log('error submit!!');
                return false;
            }
            });
            
        },
        createNewTreeFolder() {
            this.$prompt('请输入文件夹名', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({ value }) => {
                this.$message({
                    type: 'success',
                    message: '你的文件夹是: ' + value
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },
        logCreateEdge(e) {
            console.log('---------CreateEdge---------');
            console.log(e);
            this.deleteEdge(e.sourceNodeId, e.targetNodeId)
            this.mockData.edges.push({
                id: e.sourceNodeId + "--" + e.targetNodeId,
                sourceNode: e.sourceNodeId + '',
                targetNode: e.targetNodeId + '',
                source: e.sourceEndpointId,
                target: e.targetEndpointId,
                render: baseLabel,
                label: this.edge_label
            })
            console.log(this.mockData);
            console.log(this.canvansRef.getDataMap());
            console.log('----------------');
        },
        logDeleteEdge(e) {
            console.log('---------DeleteEdge---------');
            console.log(e);
            console.log(this.mockData);
            console.log(this.canvansRef.getDataMap());
            console.log('----------------');
        },
        logChangeEdges(e) {
            console.log('---------ChangeEdges---------');
            console.log(e);
            console.log(this.mockData);
            console.log(this.canvansRef.getDataMap());
            console.log('----------------');
        },
        logOtherEvent(e) {
            console.log(e);
        },
        finishLoaded(VueCom) {
            this.butterflyVue = VueCom;
            this.canvansRef = VueCom.canvas;
            console.log("finish");
        }
    },
    created() {
        // this.get_nodes_and_edges()
        this.get_flowchart_file_list("ALL")
        console.log("created: ", this.mockData)
    },
    mounted() {
        console.log("mounted: ", this.$refs)
    },
    updated() {
        console.log("updated: ", this.$refs)
    }
}
</script>

<style lang="less">
.el-aside {
    color: #333;

    .aside-new-node-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .node-container {
            width: auto;
        }
    }
}

.el-container {
    //   height: calc(100vh - 88px);
    height: 100%;
}

.tree-files-list-view {
    width: 240px;
    margin-top: 12px;

    .create-new-btn-view {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 12px;

        .node-container {
            width: 200px;
        }
    }

    .el-tree-background {
        background-color: rgb(238, 241, 246);
    }

    .tree-node-view {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        -webkit-line-clamp: 1;

        .node-content {
            flex: 1;
            text-align: start;
        }
    }

    .custom-tree-node {
        background-color: rgb(236, 203, 165);
    }
}

.flowchart-view {
    width: 100%;
    height: 100%;
    background-color: rgb(245, 245, 245);
    padding: 12px;

    .home {
        width: 600px;
        height: 100%;
        margin-left: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;

        .tab-content-view {
            width: 100%;
            height: calc(100vh - 88px);

            .control-btn-view {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 6px;

                .control {
                    padding-left: 10px;
                    line-height: normal;
                    display: flex;
                    flex-direction: row;
                    gap: 6px;
                }

                .add-edge-view {
                    display: flex;
                    flex-direction: row;
                    gap: 6px;
                    padding-left: 10px;
                    line-height: normal;
                }
            }

            .flowchart-butterfly {
                width: 100%;
            }

            .butterfly-container {
                height: 100%;
            }
        }

    }
}
</style>