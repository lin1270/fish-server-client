<template>
    <Row class="box1">
        <!--面包屑-->
        <Row class="bread-crumbs">
            <Col :span="8"><span class="bread-crumbs-left">首页</span></Col>
        </Row>
        <Row class="box">
            欢迎登录管理后台
        </Row>
    </Row>
</template>

<script>
import { mapActions } from 'vuex'
// import { sendRequest } from '@/commons/http/api'

export default {
    data () {
        return {
        }
    },
    mounted () {
        // this.setCoinList()
    },
    methods: {
        // ...mapActions(['setCoinList']),
    }
}
</script>

<style scoped>
    .box1 {
        width: 100%;
        height: 100%;
    }
    .box {
        width: 100%;
        height: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 72px;
    }
    .box img{
        max-width: 800px;
    }
    @media (max-width: 1024px){
        .box img{
            max-width: 550px;
        }
    }
</style>
