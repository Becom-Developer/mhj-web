<template>
  <b-tab title="Period">
    <b-card-text>時代に関する情報</b-card-text>
    <!-- 一覧取得 -->
    <b-container fluid class="p-0 pb-3">
      <b-card title="一覧取得" sub-title="Card subtitle">
        <b-row v-for="row in periodList" :key="row.id" class="my-1">
          <b-col sm="12" class="text-left">
            <b-row>
              <b-col sm="12"> {{ row.period_type.title }} </b-col>
            </b-row>
            <b-row v-for="period in row.period" :key="period.id" class="my-1">
              <b-col sm="3"> title: </b-col>
              <b-col sm="6"> {{ period.title }} </b-col>
              <b-col sm="3" class="text-right">
                <b-btn size="sm" @click="getDetail(period)">詳細</b-btn>
              </b-col>
            </b-row>
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
          <b-col sm="9">{{ periodDetail.id }} </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-period_type_id`">period_type_id:</label>
          </b-col>
          <b-col sm="9">
            <b-form-select
              :id="`type-period_type_id`"
              v-model="period_type_id"
              :options="options"
            ></b-form-select>
          </b-col>
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
        <b-row
          v-for="key in ['start_year', 'end_year']"
          :key="key.id"
          class="my-1"
        >
          <b-col sm="3">
            <label :for="`type-${key}`">{{ key }}:</label>
          </b-col>
          <b-col sm="9">{{ periodInput[key] }} </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-start_date`">start_date:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-start_date`"
              v-model="start_date"
              :type="`date`"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-end_date`">end_date:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-end_date`"
              v-model="end_date"
              :type="`date`"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row v-for="key in updateKeys" :key="key.id" class="my-1">
          <b-col sm="3">
            <label :for="`type-${key}`">{{ key }}:</label>
          </b-col>
          <b-col sm="9">{{ periodDetail[key] }} </b-col>
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
            <label :for="`type-period_type_id`">period_type_id:</label>
          </b-col>
          <b-col sm="9">
            <b-form-select
              :id="`type-period_type_id`"
              v-model="period_type_id"
              :options="options"
            ></b-form-select>
          </b-col>
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
        <b-row
          v-for="key in ['start_year', 'end_year']"
          :key="key.id"
          class="my-1"
        >
          <b-col sm="3">
            <label :for="`type-${key}`">{{ key }}:</label>
          </b-col>
          <b-col sm="9">{{ periodInput[key] }} </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-start_date`">start_date:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-start_date`"
              v-model="start_date"
              :type="`date`"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-end_date`">end_date:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-end_date`"
              v-model="end_date"
              :type="`date`"
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
    ...mapState(['periodList', 'periodInput', 'periodDetail', 'periodTypeOpt']),
    options() {
      return this.periodTypeOpt
    },
    period_type_id: {
      get() {
        return this.periodInput.period_type_id
      },
      set(val) {
        this.buildInput({
          inputKey: 'periodInput',
          row: { period_type_id: val },
        })
      },
    },
    title: {
      get() {
        return this.periodInput.title
      },
      set(val) {
        this.buildInput({ inputKey: 'periodInput', row: { title: val } })
      },
    },
    start_date: {
      get() {
        return this.periodInput.start_date
      },
      set(val) {
        this.inputPeriod({ key: 'start_date', val })
      },
    },
    end_date: {
      get() {
        return this.periodInput.end_date
      },
      set(val) {
        this.inputPeriod({ key: 'end_date', val })
      },
    },
  },
  async mounted() {
    const opt = await this.$selectPeriodType()
    this.addState({ stateKey: 'periodTypeOpt', data: opt })
  },
  methods: {
    ...mapMutations(['inputPeriod', 'clearInput', 'buildInput', 'addState']),
    showDetailWindow() {
      this.showDetail = false
      this.clearInput('periodInput')
    },
    getDetail(row) {
      this.buildInput({ inputKey: 'periodInput', row })
      this.addState({ stateKey: 'periodDetail', data: row })
      this.showDetail = true
    },
    async getList() {
      const res = await this.$webapi(['periodtype', 'list', {}])
      if ('error' in res) {
        this.addState({ stateKey: 'periodList', data: [] })
      } else {
        const list = []
        for (const row of res) {
          list.push({ period_type_id: row.id })
        }
        const periodList = []
        for (const row of list) {
          const res = await this.$webapi(['period', 'list', row])
          periodList.push(res)
        }
        this.addState({ stateKey: 'periodList', data: periodList })
        this.showDetail = false
        this.clearInput('periodInput')
      }
    },
    async formUpdate() {
      this.isCompleted = false
      this.isError = false
      const qParams = { id: this.periodDetail.id, ...this.periodInput }
      const res = await this.$webapi(['period', 'update', qParams])
      this.res = res
      if ('error' in res) {
        this.isError = true
      } else {
        this.isCompleted = true
        this.clearInput('periodInput')
        await this.getList()
        this.getDetail(res)
      }
    },
    async formInsert() {
      this.isCompleted = false
      this.isError = false
      const res = await this.$webapi(['period', 'insert', this.periodInput])
      this.res = res
      if ('error' in res) {
        this.isError = true
      } else {
        this.isCompleted = true
        this.clearInput('periodInput')
      }
      this.getList()
    },
  },
}
</script>
