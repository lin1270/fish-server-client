<template>
    <Row>
        <CommonListPage
            ref="listRef"
            :title="['用户管理', '用户管理', '列表']"
            :columns="columns"
            url="/api/user/query"
            :hasPage="true"
            :queryForm="form"
        >
            <template slot="operation">
                <Button icon="md-add" type="primary" @click="showModal('create')">添加</Button> 
            </template>
            
            <template slot="search">
                <Row>
                    <Col span="3" class="search-item-seperator">
                        <Input clearable v-model="form.__LKS_name" placeholder="昵称" @on-enter="onSearchBtnClicked"></Input>
                    </Col>

                    <Col span="3" class="search-item-seperator">
                        <Button type="primary" icon="ios-search" @click="onSearchBtnClicked">搜 索</Button>
                    </Col>
                </Row>
            </template>

            <template slot="action" slot-scope="{ row }">
                <Row v-if="util.hasRole('authres-module-update')">
                    <Button type="info" size="small" @click="showModal('update', row)">修改</Button>
                </Row>
                <Row class="margin-top-10" v-if="util.hasRole('authres-module-update')">
                    <Button type="error" size="small" @click="onDel(row)">删除</Button>
                </Row>
            </template>
        </CommonListPage>

        <!--添加模块-->
        <Modal
            v-model="userModal"
            :title="type === 'create' ? '添加用户' : '编辑用户'">
            <Form ref="userForm" :model="userForm" :rules="userRule" :label-width="80" v-if="userModal">
                <FormItem label="账号" prop="account">
                    <Input v-model="userForm.account" :disabled="type !== 'create'" placeholder="请输入账号"></Input>
                </FormItem>
                <FormItem label="密码" prop="pwd">
                    <Input v-model="userForm.pwd" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="昵称" prop="name">
                    <Input v-model="userForm.name" placeholder="请输入昵称"></Input>
                </FormItem>
            </Form>
            <Row type="flex" justify="end" slot="footer">
                <Button @click="cancel">取消</Button>
                <Button type="primary" @click="onSave" v-if="type !== 'view'">确定</Button>
            </Row>
        </Modal>
    </Row>
</template>

<script>
import { sendRequest } from '@/commons/http/api'

export default {
    data() {
        return {
            form:{
                title: null,
            },
            columns: [
                {
                    title: 'id',
                    key: 'id',
                    align: 'center'
                },
                {
                    title: '账号',
                    key: 'account',
                    align: 'center'
                },
                {
                    title: '密码',
                    key: 'pwd',
                    align: 'center',
                },
                {
                    title: '昵称',
                    key: 'name',
                    align: 'center',
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 80,
                    fixed: 'right',
                    align: 'center'
                }
            ],
            userModal: false,
            userForm: {},
            userRule: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入昵称', trigger: 'blur' }
                ],
                
            },
            type: 'create',
        }
    },

    mounted() {
    },
    methods: {
        onSearchBtnClicked() {
            this.$refs.listRef.refresh()
        },

        // 显示弹框
        showModal (type, row) {
            this.type = type
            if (type !== 'create') {
                this.userForm = { ...row }
                console.log(this.userForm)
            } else {
                this.userForm = {
                    title: null,
                    imageUrl: null,
                    savePath: null,
                    url: null,
                    state: 1,
                }
            }
            this.userModal = true
            this.$forceUpdate()
        },
        // 关闭弹框
        cancel () {
            this.userModal = false
            this.userForm = {}
            this.$refs.userForm.resetFields()
        },
        // 添加、编辑用户
        onSave () {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    sendRequest('/api/user/save', this.userForm).then(res => {
                        if (res) {
                            let msg = this.type === 'create' ? '添加成功' : '修改成功'
                            this.$Message.success(msg)
                            this.$refs.listRef.refresh()
                            this.userModal = false
                            this.userForm = {}
                        }
                    })
                }
            })
        },

        onDel(row) {
            this.$Modal.confirm({
                title: '提示',
                content: `<p>确定要删除<span style="color:rgb(22,155,213)">${row.account}</span>吗？</p>`,
                onOk: () => {
                    sendRequest('/api/user/delete', {id:row.id}).then((res)=>{
                        this.$Message.success('删除成功')
                        this.$refs.listRef.refresh()
                    })
                },
            });
        },
    }
}
</script>
