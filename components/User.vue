<template>
  <b-tab title="User" active>
    <b-card-text>登録ユーザー</b-card-text>
    <!-- 一覧取得 -->
    <b-container fluid class="p-0 pb-3">
      <b-card title="一覧取得" sub-title="Card subtitle">
        <b-row v-for="user in userList" :key="user.id" class="my-1">
          <b-col sm="3"> loginid: </b-col>
          <b-col sm="6"> {{ user.loginid }} </b-col>
          <b-col sm="3" class="text-right">
            <b-btn size="sm" @click="getUserDetail(user.id)">詳細</b-btn>
          </b-col>
        </b-row>
        <b-btn block size="sm" @click="getUserList">一覧取得</b-btn>
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
        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-approved`">approved:</label>
          </b-col>
          <b-col sm="9">{{ userDetail.approved }} </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-deleted`">deleted:</label>
          </b-col>
          <b-col sm="9">{{ userDetail.deleted }} </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-created_ts`">created_ts:</label>
          </b-col>
          <b-col sm="9">{{ userDetail.created_ts }} </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-modified_ts`">modified_ts:</label>
          </b-col>
          <b-col sm="9">{{ userDetail.modified_ts }} </b-col>
        </b-row>
        <b-btn block size="sm" @click="userUpdate">更新実行</b-btn>
        <b-alert
          variant="success"
          dismissible
          :show="isCompleted"
          @dismissed="isCompleted = false"
          >登録は成功しました。{{ resInsert }}</b-alert
        >
        <b-alert
          variant="danger"
          dismissible
          :show="isError"
          @dismissed="isError = false"
          >登録は失敗しました。{{ resInsert }}</b-alert
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
        <b-btn block size="sm" @click="userInsert">新規登録実行</b-btn>
        <b-alert
          variant="success"
          dismissible
          :show="isCompleted"
          @dismissed="isCompleted = false"
          >登録は成功しました。{{ resInsert }}</b-alert
        >
        <b-alert
          variant="danger"
          dismissible
          :show="isError"
          @dismissed="isError = false"
          >登録は失敗しました。{{ resInsert }}</b-alert
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
      resInsert: {},
    }
  },
  computed: {
    ...mapState(['userInput', 'userList', 'userDetail']),
    loginid: {
      get() {
        return this.userInput.loginid
      },
      set(value) {
        this.inputLoginid(value)
      },
    },
    password: {
      get() {
        return this.userInput.password
      },
      set(value) {
        this.inputPassword(value)
      },
    },
  },
  mounted() {},
  methods: {
    ...mapMutations([
      'pushUserList',
      'inputLoginid',
      'inputPassword',
      'addUserDetail',
    ]),
    showDetailWindow() {
      this.showDetail = false
      this.inputLoginid('')
      this.inputPassword('')
    },
    getUserDetail(userId) {
      let detail = {}
      for (const user of this.userList) {
        if (user.id === userId) {
          detail = user
        }
      }
      this.inputLoginid(detail.loginid)
      this.inputPassword(detail.password)
      this.addUserDetail(detail)
      this.showDetail = true
    },
    async userUpdate() {
      this.isCompleted = false
      this.isError = false
      const res = await this.$axios.$post(
        'https://mhj-api.becom.co.jp/mhj.cgi',
        {
          path: 'user',
          method: 'update',
          apikey: 'becom',
          params: { id: this.userDetail.id, ...this.userInput },
        }
      )
      this.resInsert = res
      if ('error' in res) {
        this.isError = true
      } else {
        this.isCompleted = true
        this.inputLoginid('')
        this.inputPassword('')
      }
      await this.getUserList()
      this.getUserDetail(this.userDetail.id)
    },
    async userInsert() {
      this.isCompleted = false
      this.isError = false
      const res = await this.$axios.$post(
        'https://mhj-api.becom.co.jp/mhj.cgi',
        {
          path: 'user',
          method: 'insert',
          apikey: 'becom',
          params: this.userInput,
        }
      )
      this.resInsert = res
      if ('error' in res) {
        this.isError = true
      } else {
        this.isCompleted = true
        this.inputLoginid('')
        this.inputPassword('')
      }
      this.getUserList()
    },
    async getUserList() {
      const res = await this.$axios.$post(
        'https://mhj-api.becom.co.jp/mhj.cgi',
        {
          path: 'user',
          method: 'list',
          apikey: 'becom',
          params: {},
        }
      )
      this.pushUserList(res)
    },
  },
}
</script>
