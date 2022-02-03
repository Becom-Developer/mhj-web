<template>
  <b-tab title="PeriodType">
    <b-card-text>時代の種別</b-card-text>
    <!-- 一覧取得 -->
    <b-container fluid class="p-0 pb-3">
      <b-card title="一覧取得" sub-title="Card subtitle">
        <b-row
          v-for="periodType in periodTypeList.period_type"
          :key="periodType.id"
          class="my-1"
        >
          <b-col sm="3"> title: </b-col>
          <b-col sm="6"> {{ periodType.title }} </b-col>
          <b-col sm="3" class="text-right">
            <b-btn size="sm" @click="getDetail(periodType)">詳細</b-btn>
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
      set(value) {
        this.inputTitle(value)
      },
    },
  },
  mounted() {},
  methods: {
    ...mapMutations(['addPeriodTypeList', 'addPeriodType', 'inputTitle']),
    showDetailWindow() {
      this.showDetail = false
      this.inputTitle('')
    },
    getDetail(user) {
      this.inputTitle(user.title)
      this.addPeriodType(user)
      this.showDetail = true
    },
    async getList() {
      const res = await this.$apiPeriodTypeList()
      this.addPeriodTypeList(res)
      this.showDetail = false
      this.inputTitle('')
    },
    async formUpdate() {
      this.isCompleted = false
      this.isError = false
      const res = await this.$apiPeriodTypeUpdate({
        id: this.periodTypeDetail.id,
        ...this.periodTypeInput,
      })
      this.res = res
      if ('error' in res) {
        this.isError = true
      } else {
        this.isCompleted = true
        this.inputTitle('')
        await this.getList()
        this.getDetail(res)
      }
    },
    async formInsert() {
      this.isCompleted = false
      this.isError = false
      const res = await this.$apiPeriodTypeInsert(this.periodTypeInput)
      this.res = res
      if ('error' in res) {
        this.isError = true
      } else {
        this.isCompleted = true
        this.inputTitle('')
      }
      this.getList()
    },
  },
}
</script>
