<template>
    <div class="drag-node" >
        <div class="drag-header">
            <div>条件节点</div>
            <div class="btn-group">
                <el-button class="very-mini-btn" type="success" circle @click="ViewConditionNode"><i class="el-icon-view icon-ty"></i></el-button>
                <el-button class="very-mini-btn" type="primary" circle @click="editConditionNode"><i class="el-icon-edit icon-ty"></i></el-button>
                <el-button class="very-mini-btn" type="danger" circle @click="deleteConditionNode"><i class="el-icon-delete"></i></el-button>
            </div>
        </div>
        <div class="drag-content">
            <el-form :label-position="labelPosition" label-width="80px" :model="itemData.nodeData">
                    <textarea class="text-area" v-model="itemData.nodeData.Name" disabled></textarea>
                    <textarea class="text-area" v-model="itemData.nodeData.Conditions" disabled></textarea>
            </el-form>
        </div>
        <el-dialog title="条件节点" :visible.sync="dialogFormVisible">
            <el-form :model="itemData.nodeData">
                <el-form-item label="节点名称" :label-width="formLabelWidth">
                <el-input v-model="itemData.nodeData.Name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="具体条件" :label-width="formLabelWidth">
                    <el-input v-model="itemData.nodeData.Conditions" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEditChange">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
<script>
import {
    AddConditionNode,
    AlterConditionNode,
    DeleteConditionNode,
} from '../../../api/api'
export default {
    name: "drag-node",
    props: {
        itemData: {
            type: Object,
        },
        canvasNode: {
            type: Object
        }
    },
    data() {
        return {
            labelPosition: 'right',
            dialogFormVisible: false,
            formLabelWidth: '120px'
        }
    },
    methods: {
        popupDialog() {
            this.dialogTableVisible = true
            console.log(this.dialogFormVisible)
        },
        ViewConditionNode() {
            console.log(this.itemData)
        },
        editConditionNode() {
            console.log(this.itemData)
            this.dialogFormVisible = true
        },
        confirmEditChange() {
            if(this.itemData.nodeData.id === undefined){
                console.log("Add node!")
                this.dialogFormVisible = false
                return
            }
            console.log(this.itemData.nodeData)
            let data = {
                "id": this.itemData.nodeData.id,
                "parent": this.itemData.nodeData.parent,
                "nodeName": this.itemData.nodeData.Name,
                "conditions": this.itemData.nodeData.Conditions,
                "isActionNode": false
            }
            console.log(data)
            AlterConditionNode(data).then(res => {
                console.log("Alter Condition Node success:", res)
            }).catch(err => {
                console.log(err)
            })
            this.dialogFormVisible = false
        },
        deleteConditionNode() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(this.itemData)
                console.log(this.itemData.nodeData)
                let data = {
                    "id": this.itemData.nodeData.id,
                    "parent": this.itemData.nodeData.parent,
                    "nodeName": this.itemData.nodeData.Name,
                    "conditions": this.itemData.nodeData.Conditions,
                    "isActionNode": false
                }
                console.log(data)
                DeleteConditionNode(data).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(err => {
                    console.log(err)
                    this.$message({
                        type: 'error',
                        message: '出现错误，删除失败！'
                    });
                })
                this.dialogFormVisible = false
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            
        }
    },
    created() {
    }
};
</script>
  
<style lang="less" scoped>
.node-content{
    width: auto;
    padding: 0px;
}
.drag-node {
    width: 300px;
    box-shadow: 0 2px 3px 0 rgba(0, 112, 204, 0.06);
    ;
    background-color: #fff;
    border-radius: 0 0 5px 5px;
    /* overflow: hidden; */
    .drag-header {
        padding: 5px;
        border-radius: 5px 5px 0 0;
        color: #FFF;
        background-color: #729fe7;
        border: 1px solid #aaa;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .btn-group{
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .very-mini-btn{
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .drag-content {
        color: #222;
        padding: 10px;
        border: 1px solid #D9D9D9;
        border-top: none;
        border-radius: 0 0 5px 5px;
        .text-area{
            width: 100%;
        }
    }
    .box-card {
        width: 300px;
        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }
        .clearfix:after {
            clear: both
        }
    }
}





.drag-history {
    padding: 5px 0;
    font-size: 12px;
    border-top: 1px solid #eee;
    margin-top: 10px;
}

.btn-view{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: right;
}
</style>
  