<template>
    <Row>
        <!--面包屑-->
        <Row class="bread-crumbs" v-if="title">
            <Col :span="8"><span class="bread-crumbs-left">{{title[0]}}</span></Col>
            <Col :span="16" class="bread-crumbs-right">
                <Breadcrumb>
                <BreadcrumbItem to="">{{title[1]}}</BreadcrumbItem>
                <BreadcrumbItem to="">{{title[2]}}</BreadcrumbItem>
                </Breadcrumb>
            </Col>
        </Row>

        <template v-if="$slots.operation">
            <Row type="flex" justify="end" class="margin-bottom-20">
                <slot name="operation"></slot>
            </Row>
        </template>

        <!--搜索表单-->
        <template v-if="$slots.search">
            <Row class="search-panel">
                <slot name="search"></slot>
            </Row>
        </template>

        <Table border :loading="loading" :columns="columns" ref="selection" :data="table.rows" style="width: 100%;">
            <template slot-scope="{ row }" slot="action">
                <Tooltip placement="left">
                    <a href="javascript:void(0)">更多</a>
                    <div slot="content">
                        <slot name="action" :row="row"></slot>
                    </div>
                </Tooltip>
            </template>
        </Table>
        <!--分页-->
        <Page class="page" :style="pageRelative ? 'position:relative':''" :total="table.total" :page-size="table.size" :current="currPage" show-total show-elevator show-sizer @on-change="pageChange" @on-page-size-change="sizeChange"/>
    </Row>
</template>

<script>
import { mapState } from 'vuex'
import { sendRequest } from '@/commons/http/api'

export default {
    name: 'CommonListPage',
    props: {
        title: Array,
        hasPage: {
            type: Boolean,
            default: true,
        },
        pageRelative: {
            type: Boolean,
            default: false,
        },
        pageSize: {
            type: Number,
            default:10,
        },
        url: String,
        queryForm: Object,
        columns:Array,
    },
    computed: {
        ...mapState(['loading']),
    },
    data() {
        return {
            table: {},
            currPage: 1,
        }
    },
    created() {
        this.currPageSize = this.pageSize
    },
    mounted() {
        this.refresh()
    },
    methods: {
        async refresh() {
            this.find(1)
        },

        async find(page) {
            this.currPage = page
            let res = await sendRequest(this.url, {
                ...this.queryForm,
                size: this.currPageSize,
                page: this.currPage,
            })
            if (res) {
                this.table = res.data
            }
        },
        pageChange(val) {
            this.find(val)
        },
        sizeChange (val) {
            this.currPageSize = val
            this.find()
        },
    },
}
</script>
