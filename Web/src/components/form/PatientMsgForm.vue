<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
                <el-radio label="男" name="male"></el-radio>
                <el-radio label="女" name="female"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" required>
            <el-col :span="11">
                <el-form-item prop="birthday">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday"
                        style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="主要症状" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="病史记录" prop="past_treatment">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                name: '',
                sex: '',
                region: '',
                birthday: '',
                date2: '',
                delivery: false,
                type: [],
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入您的姓名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                birthday: [
                    { type: 'date', required: true, message: '请选择出生日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                sex: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请描述一下您的症状', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert(this.$refs[formName]);
                    console.log(this.ruleForm)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style>
.demo-ruleForm{
    display:flex;
    flex-direction:column;
    align-items:right
}
</style>