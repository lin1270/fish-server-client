<template>
    <Row class="main">
        <span class="top"></span>
        <span class="left-1"></span>
        <span class="left-2"></span>
        <span class="right"></span>
        <span class="bottom"></span>
        <Card class="card">
            <div class="logo-box">
                <img src="../../assets/login/logo.png" class="logo">
            </div>
            <Row class="form">
                <Input v-model="form.account" placeholder="管理员账号" class="logo-input"/>
                <Input v-model="form.pwd" type="password" placeholder="管理员密码" class="logo-input" @on-keyup.enter="login(form)"/>
                <Button type="info" @click="login()" :loading="loading" size="large" id="LoginButton">登 录</Button>
            </Row>
        </Card>
    </Row>
</template>

<script>
import { mapActions } from 'vuex'
import { sendRequest } from '@/commons/http/api'
// import md5 from 'md5'
// import jwt from 'jsonwebtoken'

let loginUrl = '/api/user/login'

export default {
    data() {
        return {
            loading: false,
            form: {}
        }
    },
    methods: {
        ...mapActions(['setUserInfo', 'setToken']),
        login() {
            this.loading = true
            // this.form.pwd = md5(this.form.pwd,32)
            sendRequest(loginUrl, this.form).then(res => {
                if (res) {
                    this.setUserInfo(res.info)
                    this.$router.push('/index')
                    this.$Message.success('登录成功')
                }
            }).catch(() => {
                this.loading = false
            })
        },
    }
}

</script>

<style scoped>
    .main {
        height: 100vh;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .top {
        width: 280px;
        height: 80px;
        background-image: url("../../assets/login/top.png");
        background-size: cover;
        position: absolute;
        top: 0px;
        right: 147px;
    }
    .left-1 {
        width:120px;
        height:120px;
        background-image: url("../../assets/login/left-1.png");
        background-size: cover;
        position: absolute;
        top: 261px;
        left: 232px;
    }
    .left-2 {
        width:50px;
        height:50px;
        background-image: url("../../assets/login/left-2.png");
        background-size: cover;
        position: absolute;
        top: 372px;
        left: 158px;
    }
    .right {
        width:170px;
        height:300px;
        background-image: url("../../assets/login/right.png");
        background-size: cover;
        position: absolute;
        bottom: 86px;
        right: 0px;
    }
    .bottom {
        width:120px;
        height:40px;
        background-image: url("../../assets/login/bottom.png");
        background-size: cover;
        position: absolute;
        bottom: 0px;
        left: 410px;
    }
    .card {
        width: 800px;
        height: 500px;
        background: #515a6e;
        display: flex;
        justify-content: center;
        box-shadow:0px 10px 24px 0px rgba(6,6,6,0.31);
    }
    .logo-box {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .logo {
        width: 100px;

        margin-top: 42px;
    }
    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 60px;
    }

    #LoginButton {
        width:380px;
        height: 52px;
        margin-top: 40px;
        font-size: 18px;
        background: #2d8cf0;
    }
</style>
