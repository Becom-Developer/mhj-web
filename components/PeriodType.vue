<template>
  <b-tab title="PeriodType">
    <b-card-text>時代の種別</b-card-text>
    <!-- 一覧取得 -->
    <b-container fluid class="p-0 pb-3">
      <b-card title="一覧取得" sub-title="Card subtitle">
        <b-row v-for="row in periodTypeList" :key="row.id" class="my-1">
          <b-col sm="3"> title: </b-col>
          <b-col sm="6"> {{ row.title }} </b-col>
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
          <b-col sm="9">{{ periodTypeDetail.id }} </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-title`">title:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-title`"
              v-model="title"
              :type="`text`"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row v-for="key in updateKeys" :key="key.id" class="my-1">
          <b-col sm="3">
            <label :for="`type-${key}`">{{ key }}:</label>
          </b-col>
          <b-col sm="9">{{ periodTypeDetail[key] }} </b-col>
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
            <label :for="`type-title`">title:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-title`"
              v-model="title"
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
      updateKeys: ['deleted', 'created_ts', 'modified_ts'],
    }
  },
  computed: {
    ...mapState(['periodTypeList', 'periodTypeDetail', 'periodTypeInput']),
    title: {
      get() {
        return this.periodTypeInput.title
      },
      set(val) {
        this.buildInput({ inputKey: 'periodTypeInput', row: { title: val } })
      },
    },
  },
  mounted() {},
  methods: {
    ...mapMutations(['buildInput', 'clearInput', 'addState']),
    showDetailWindow() {
      this.showDetail = false
      this.clearInput('periodTypeInput')
    },
    getDetail(row) {
      this.buildInput({ inputKey: 'periodTypeInput', row })
      this.addState({ stateKey: 'periodTypeDetail', data: row })
      this.showDetail = true
    },
    async getList() {
      const res = await this.$webapi(['periodtype', 'list', {}])
      if ('error' in res) {
        this.addState({ stateKey: 'periodTypeList', data: [] })
      } else {
        this.addState({ stateKey: 'periodTypeList', data: res })
        this.showDetail = false
        this.clearInput('periodTypeInput')
      }
    },
    async formUpdate() {
      this.isCompleted = false
      this.isError = false
      const qParams = { id: this.periodTypeDetail.id, ...this.periodTypeInput }
      const res = await this.$webapi(['periodtype', 'update', qParams])
      this.res = res
      if ('error' in res) {
        this.isError = true
      } else {
        this.isCompleted = true
        this.clearInput('periodTypeInput')
        await this.getList()
        this.getDetail(res)
        const opt = await this.$selectPeriodType()
        this.addState({ stateKey: 'periodTypeOpt', data: opt })
      }
    },
    async formInsert() {
      this.isCompleted = false
      this.isError = false
      const qParams = this.periodTypeInput
      const res = await this.$webapi(['periodtype', 'insert', qParams])
      this.res = res
      if ('error' in res) {
        this.isError = true
      } else {
        this.isCompleted = true
        this.clearInput('periodTypeInput')
        const opt = await this.$selectPeriodType()
        this.addState({ stateKey: 'periodTypeOpt', data: opt })
      }
      this.getList()
    },
  },
}
</script>
