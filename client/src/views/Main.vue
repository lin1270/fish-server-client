<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal"
              theme="dark">
          <Row type="flex"
               align="middle"
               justify="space-between">
            <div class="layout-logo">
              <h1 style="margin-right: 10px">{{isCollapsed ? ' 后台' : ' 管理后台'}}</h1>
              <span v-if="baseURL.includes('10.168.1')" style="margin-right: 20px;">token: {{ getToken }}</span>
              <span v-if="baseURL.includes('10.168.1')">baseUrl: {{ baseURL }}</span>
              <!--              <Icon @click.native="collapsedSider" :class="[isCollapsed ? 'rotate-icon' : 'menu-icon']" type="md-menu" size="35"></Icon>-->
            </div>

            <MenuItem name="2"
                      style="padding-right: 0">
            <Icon type="ios-contact"
                  size="35" />
            <!--下拉-->
            <Dropdown trigger="click"
                      @on-click="dropdown">
              <div href="javascript:void(0)"
                   class="username">
                {{userInfo.realname || ''}}
                <Icon type="ios-arrow-down"></Icon>
              </div>
              <DropdownMenu slot="list" >
                <DropdownItem name="edit" v-if="util.hasRole('user-pwd-change')">修改密码</DropdownItem>
                <DropdownItem name="clear">退 出</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            </MenuItem>
          </Row>

        </Menu>
      </Header>

      <Layout class="layout-height">
        <Sider ref="side"
               hide-trigger
               collapsible
               :collapsed-width="78"
               v-model="isCollapsed"
               class="layout-height">
          <Menu :active-name="$route.path"
                theme="primary"
                width="auto"
                :style="{height:'calc(100vh - 66px)'}"
                :class="isCollapsed ? 'collapsed-menu' : 'menu-item'">
            <Row v-for="(list, i) in data"
                 :key="i">
              <!--除了首页以外的其他子菜单-->
              <Submenu :name="list.path"
                       v-if="list.children && currentShow(list)">
                <template slot="title">
                  <Icon :type="list.icon"
                        size="24" />
                  <span>{{list.title}}</span>
                </template>

                <Row v-for="(item, index) in list.children"
                     :key="index">
                  <MenuItem :name="item.path"
                            :to="item.path"
                            v-if="util.hasRole(item.action)">{{item.title}}
                  </MenuItem>
                </Row>
              </Submenu>

              <!-- 一级 -->
              <MenuItem :name="list.path"
                        :to="list.path"
                        v-if="!list.children && util.hasRole(list.action)">
                <Icon :type="list.icon"
                      size="24" />
                <span>{{list.title}}</span>
              </MenuItem>
            </Row>

          </Menu>
        </Sider>
        <Content class="content">
          <!--主视图-->
          <router-view />
        </Content>
      </Layout>

    </Layout>

    <Modal v-model="modal"
           title="修改密码">
      <Form ref="form"
            :model="form"
            :rules="formRule"
            :label-width="80">
        <FormItem label="旧密码"
                  prop="oldPassword">
          <Input type="password"
                 v-model="form.oldPassword"
                 placeholder="请输入旧密码"></Input>
        </FormItem>
        <FormItem label="新密码"
                  prop="newPassword">
          <Input type="password"
                 v-model="form.newPassword"
                 placeholder="请输入新密码"></Input>
        </FormItem>
      </Form>
      <Row type="flex"
           justify="end"
           slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary"
                @click="onSave">确定</Button>
      </Row>
    </Modal>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import menu from '../router/menu'
import { sendRequest } from '../commons/http/api'
import { baseURL } from '../commons/http/config'

let editPwdUrl = '/wallet/admin/user/password/change'

export default {
    data () {
        return {
            baseURL: baseURL,
            modal: false,
            isCollapsed: false,
            form: {},
            formRule: {
                oldPassword: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        data () {
            let data = JSON.parse(JSON.stringify(menu))
            return data
        },
        ...mapGetters({ 'userInfo': 'getUserInfo' }),
        ...mapGetters(['getToken'])
    },
    mounted () {
        let _this = this
        this.changeMargin()
        window.onresize = function () {
            _this.changeMargin()
        }
    },
    methods: {
        ...mapActions(['logout']),
        changeMargin () {
            let width = document.body.clientWidth
            try {
                let page = document.getElementsByClassName('page')[0]
                if (width < 1024) {
                    this.isCollapsed = true
                    if (page) page.style.width = 'calc(100% - 78px)'
                } else {
                    this.isCollapsed = false
                    if (page) page.style.width = 'calc(100% - 200px)'
                }
            } catch (e) {
                // ...
            }

        },
        currentShow (array) {
            let success = false
            array.children.map(v => {
                if (this.util.hasRole(v.action)) {
                    success = true
                }
            })
            return success
        },
        dropdown (val) {
            if (val === 'clear') {
                this.clear()
            } else {
                this.modal = true
            }
        },
        cancel () {
            this.modal = false
            this.form = {}
            this.$refs.form.resetFields()
        },
        onSave () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    sendRequest(editPwdUrl, this.form).then(res => {
                        if (res) {
                            this.modal = false
                            this.$Message.success('修改成功，请重新登录')
                            this.logout()
                            this.$router.push('/login')
                        }
                    })
                }
            })
        },
        //注销
        async clear () {
          this.logout()
          this.$router.push('/login')
          this.$Message.success('退出成功！')
        }
    }
}
</script>

<style scoped>
.layout-height {
  height: calc(100vh - 66px);
  overflow: auto;
  background: #fff;
}

.ivu-layout-header {
  padding: 0 24px;
}

.layout-logo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;
}

.layout-nav {
  float: right;
  margin: 0 auto;
}

.content {
  padding: 0px 24px 100px;
  background: #f5f5f5;
  position: relative;
}

.username {
  color: rgba(255, 255, 255, 0.7);
}

.username:hover {
  color: rgba(255, 255, 255, 1);
  transition: 0.5s;
}

.menu-icon {
  transition: all 0.3s;
  transform: rotate(0deg);
}
.rotate-icon {
  transition: all 0.3s;
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.menu-item .ivu-menu-vertical .ivu-menu-submenu-title-icon {
  display: inline-block;
}
.collapsed-menu span {
  width: 0px;
  display: none;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
