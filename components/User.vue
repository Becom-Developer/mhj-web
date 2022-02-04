<template>
  <b-tab title="User" active>
    <b-card-text>登録ユーザー</b-card-text>
    <!-- 一覧取得 -->
    <b-container fluid class="p-0 pb-3">
      <b-card title="一覧取得" sub-title="Card subtitle">
        <b-row v-for="row in userList" :key="row.id" class="my-1">
          <b-col sm="3"> loginid: </b-col>
          <b-col sm="6"> {{ row.loginid }} </b-col>
          <b-col sm="3" class="text-right">
            <b-btn size="sm" @click="getDetail(row)">詳細</b-btn>
          </b-col>
        </b-row>
        <b-btn block size="sm" @click="getList">一覧取得</b-btn>
      </b-card>
    </b-container>
    <!-- 更新登録 -->
    <b-container v-if="showDetail" fluid class="p-0 pb-3">
      <b-card title="詳細・更新登録" sub-title="Card subtitle">
        <b-row class="my-1">
          <b-col sm="3"> <label :for="`type-id`">id:</label> </b-col>
          <b-col sm="9">{{ userDetail.id }} </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-loginid`">loginid:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-loginid`"
              v-model="loginid"
              :type="`text`"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-password`">password:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-password`"
              v-model="password"
              :type="`text`"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row v-for="key in updateKeys" :key="key.id" class="my-1">
          <b-col sm="3">
            <label :for="`type-${key}`">{{ key }}:</label>
          </b-col>
          <b-col sm="9">{{ userDetail[key] }} </b-col>
        </b-row>
        <b-btn block size="sm" @click="formUpdate">更新実行</b-btn>
        <b-alert
          variant="success"
          dismissible
          :show="isCompleted"
          @dismissed="isCompleted = false"
          >登録は成功しました。{{ res }}</b-alert
        >
        <b-alert
          variant="danger"
          dismissible
          :show="isError"
          @dismissed="isError = false"
          >登録は失敗しました。{{ res }}</b-alert
        >
      </b-card>
    </b-container>
    <!-- 新規登録 -->
    <b-container v-else fluid class="p-0">
      <b-card title="新規登録" sub-title="Card subtitle">
        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-loginid`">loginid:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-loginid`"
              v-model="loginid"
              :type="`text`"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-password`">password:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-password`"
              v-model="password"
              :type="`text`"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-btn block size="sm" @click="formInsert">新規登録実行</b-btn>
        <b-alert
          variant="success"
          dismissible
          :show="isCompleted"
          @dismissed="isCompleted = false"
          >登録は成功しました。{{ res }}</b-alert
        >
        <b-alert
          variant="danger"
          dismissible
          :show="isError"
          @dismissed="isError = false"
          >登録は失敗しました。{{ res }}</b-alert
        >
      </b-card>
    </b-container>
    <b-btn v-if="showDetail" block size="sm" @click="showDetailWindow"
      >新規登録を表示</b-btn
    >
  </b-tab>
</template>
<script>
import { mapMutations, mapState } from 'vuex'

export default {
  props: {},
  data() {
    return {
      isCompleted: false,
      isError: false,
      showDetail: false,
      res: {},
      updateKeys: ['approved', 'deleted', 'created_ts', 'modified_ts'],
    }
  },
  computed: {
    ...mapState(['userInput', 'userList', 'userDetail']),
    loginid: {
      get() {
        return this.userInput.loginid
      },
      set(val) {
        this.buildInput({ inputKey: 'userInput', row: { loginid: val } })
      },
    },
    password: {
      get() {
        return this.userInput.password
      },
      set(val) {
        this.buildInput({ inputKey: 'userInput', row: { password: val } })
      },
    },
  },
  mounted() {},
  methods: {
    ...mapMutations(['buildInput', 'clearInput', 'addState']),
    showDetailWindow() {
      this.showDetail = false
      this.clearInput('userInput')
    },
    getDetail(row) {
      this.buildInput({ inputKey: 'userInput', row })
      this.addState({ stateKey: 'userDetail', data: row })
      this.showDetail = true
    },
    async getList() {
      const res = await this.$apiUserList()
      if ('error' in res) {
        this.addState({ stateKey: 'userList', data: [] })
      } else {
        this.addState({ stateKey: 'userList', data: res })
        this.showDetail = false
        this.clearInput('userInput')
      }
    },
    async formUpdate() {
      this.isCompleted = false
      this.isError = false
      const res = await this.$apiUserUpdate({
        id: this.userDetail.id,
        ...this.userInput,
      })
      this.res = res
      if ('error' in res) {
        this.isError = true
      } else {
        this.isCompleted = true
        this.clearInput('userInput')
        await this.getList()
        this.getDetail(res)
      }
    },
    async formInsert() {
      this.isCompleted = false
      this.isError = false
      const res = await this.$apiUserInsert(this.userInput)
      this.res = res
      if ('error' in res) {
        this.isError = true
      } else {
        this.isCompleted = true
        this.clearInput('userInput')
      }
      this.getList()
    },
  },
}
</script>
