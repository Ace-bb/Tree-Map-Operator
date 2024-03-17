<template>
    <div class="drag-node" >
        <div class="drag-header">
            <div>动作节点（决策方案）</div>
            <div class="btn-group">
                <el-button class="very-mini-btn" type="success" circle @click="ViewActionNode"><i class="el-icon-view icon-ty"></i></el-button>
                <el-button class="very-mini-btn" type="primary" circle @click="editActionNode"><i class="el-icon-edit icon-ty"></i></el-button>
                <el-button class="very-mini-btn" type="danger" circle @click="deleteActionNode"><i class="el-icon-delete"></i></el-button>
            </div>
        </div>
        <div class="drag-content">
            <el-form :label-position="labelPosition" label-width="80px" :model="itemData.nodeData">
                    <textarea class="text-area" v-model="itemData.nodeData.Action" disabled></textarea>
                    <textarea class="text-area" v-model="itemData.nodeData.actionType" disabled></textarea>
            </el-form>
        </div>
        <el-dialog title="动作节点（决策方案）" :visible.sync="dialogFormVisible">
            <el-form :model="itemData.nodeData">
                <el-form-item label="方案内容" :label-width="formLabelWidth">
                <el-input v-model="itemData.nodeData.Name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="方案类型" :label-width="formLabelWidth">
                    <el-select v-model="itemData.nodeData.actionType" placeholder="请选择活动区域">
                        <el-option label="手术" value="surgery"></el-option>
                        <el-option label="化疗" value="chemotherapy"></el-option>
                        <el-option label="放疗" value="radiotherapy"></el-option>
                    </el-select>
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
    AddActionNode,
    AlterActionNode,
    DeleteActionNode,
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
        ViewActionNode() {
            console.log(this.itemData)
        },
        editActionNode() {
            console.log(this.itemData)
            this.dialogFormVisible = true
        },
        confirmEditChange() {
            if(this.itemData.nodeData.id === undefined){
                console.log("Add action node!")
                this.dialogFormVisible = false
                return
            }
            console.log(this.itemData.nodeData)
            let data = {
                "id": this.itemData.nodeData.id,
                "parent": this.itemData.nodeData.parent,
                "action": this.itemData.nodeData.Action,
                "actionType": this.itemData.nodeData.actionType,
                "isActionNode": true
            }
            console.log(data)
            AlterActionNode(data).then(res => {
                console.log("Alter Action Node success:", res)
            }).catch(err => {
                console.log(err)
            })
            this.dialogFormVisible = false
        },
        deleteActionNode() {
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
                    "action": this.itemData.nodeData.Action,
                    "actionType": this.itemData.nodeData.actionType,
                    "isActionNode": true
                }
                console.log(data)
                DeleteActionNode(data).then(res => {
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
  