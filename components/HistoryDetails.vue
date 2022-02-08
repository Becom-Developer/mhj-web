<template>
  <b-tab title="HistoryDetails">
    <b-card-text>歴史の詳細</b-card-text>
    <!-- 一覧取得 -->
    <b-container fluid class="p-0 pb-3">
      <b-card title="一覧取得" sub-title="Card subtitle">
        <b-row v-for="row in HDList" :key="row.id" class="my-1">
          <b-col sm="12" class="text-left">
            <b-row>
              <b-col sm="12"> {{ row.chronology.title }} </b-col>
            </b-row>
            <b-row v-for="hD in row.history_details" :key="hD.id" class="my-1">
              <b-col sm="3"> contents: </b-col>
              <b-col sm="6"> {{ hD.contents }} </b-col>
              <b-col sm="3" class="text-right">
                <b-btn size="sm" @click="getDetail(hD)">詳細</b-btn>
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
          <b-col sm="9">{{ HDDetail.id }} </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-chronology_id`">chronology_id:</label>
          </b-col>
          <b-col sm="9">
            <b-form-select
              :id="`type-chronology_id`"
              v-model="chronology_id"
              :options="options"
            ></b-form-select>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-contents`">contents:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-contents`"
              v-model="contents"
              :type="`text`"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row v-for="key in updateKeys" :key="key.id" class="my-1">
          <b-col sm="3">
            <label :for="`type-${key}`">{{ key }}:</label>
          </b-col>
          <b-col sm="9">{{ HDDetail[key] }} </b-col>
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
            <label :for="`type-chronology_id`">chronology_id:</label>
          </b-col>
          <b-col sm="9">
            <b-form-select
              :id="`type-chronology_id`"
              v-model="chronology_id"
              :options="options"
            ></b-form-select>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-contents`">contents:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-contents`"
              v-model="contents"
              :type="`text`"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-adyear_date`">adyear_date:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-adyear_date`"
              v-model="adyear_date"
              :type="`date`"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-adyear_time`">adyear_time:</label>
          </b-col>
          <b-col sm="9">
            <b-form-timepicker
              :id="`type-adyear_time`"
              v-model="adyear_time"
              show-seconds
              locale="en"
            ></b-form-timepicker>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-adyear_ts`">adyear_ts:</label>
          </b-col>
          <b-col sm="9">{{ HDInput['adyear_ts'] }} </b-col>
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
    ...mapState(['HDList', 'HDInput', 'HDDetail', 'HDOpt']),
    options() {
      return this.HDOpt
    },
    chronology_id: {
      get() {
        return this.HDInput.chronology_id
      },
      set(val) {
        this.buildInput({ inputKey: 'HDInput', row: { chronology_id: val } })
      },
    },
    contents: {
      get() {
        return this.HDInput.contents
      },
      set(val) {
        this.buildInput({ inputKey: 'HDInput', row: { contents: val } })
      },
    },
    adyear_date: {
      get() {
        const ts = this.HDInput.adyear_ts
        if (ts) {
          const dateTime = ts.split(' ')
          return dateTime[0]
        } else {
          return ''
        }
      },
      set(val) {
        const ts = this.HDInput.adyear_ts
        if (typeof val !== 'string') {
          return
        }
        if (ts) {
          const dateTime = ts.split(' ')
          const ad = val.concat(' ', dateTime[1])
          this.buildInput({ inputKey: 'HDInput', row: { adyear_ts: ad } })
        } else {
          const ad = val.concat(' ', '00:00:00')
          this.buildInput({ inputKey: 'HDInput', row: { adyear_ts: ad } })
        }
      },
    },
    adyear_time: {
      get() {
        const ts = this.HDInput.adyear_ts
        if (ts) {
          const dateTime = ts.split(' ')
          return dateTime[1]
        } else {
          return ''
        }
      },
      set(val) {
        const ts = this.HDInput.adyear_ts
        if (typeof val !== 'string') {
          return
        }
        if (ts) {
          const dateTime = ts.split(' ')
          const ad = dateTime[0].concat(' ', val)
          this.buildInput({ inputKey: 'HDInput', row: { adyear_ts: ad } })
        }
      },
    },
    adyear_ts: {
      get() {
        return this.HDInput.adyear_ts
      },
      set(val) {
        this.buildInput({ inputKey: 'HDInput', row: { adyear_ts: val } })
      },
    },
  },
  async mounted() {
    const opt = await this.$selectHD()
    this.addState({ stateKey: 'HDOpt', data: opt })
  },
  methods: {
    ...mapMutations(['clearInput', 'buildInput', 'addState']),
    showDetailWindow() {
      this.showDetail = false
      this.clearInput('HDInput')
    },
    getDetail(row) {
      this.buildInput({ inputKey: 'HDInput', row })
      this.addState({ stateKey: 'HDDetail', data: row })
      this.showDetail = true
    },
    async getList() {
      const res = await this.$webapi(['chronology', 'list', {}])
      if ('error' in res) {
        this.addState({ stateKey: 'chronologyList', data: [] })
      } else {
        const list = []
        for (const row of res) {
          list.push({ chronology_id: row.id })
        }
        const HDList = []
        for (const row of list) {
          const res = await this.$webapi(['historydetails', 'list', row])
          HDList.push(res)
        }
        this.addState({ stateKey: 'HDList', data: HDList })
        this.showDetail = false
        this.clearInput('HDInput')
      }
    },
    async formUpdate() {
      this.isCompleted = false
      this.isError = false
      const qParams = { id: this.HDDetail.id, ...this.HDInput }
      const res = await this.$webapi(['historydetails', 'update', qParams])
      this.res = res
      if ('error' in res) {
        this.isError = true
      } else {
        this.isCompleted = true
        this.clearInput('HDInput')
        await this.getList()
        this.getDetail(res)
      }
    },
    async formInsert() {
      this.isCompleted = false
      this.isError = false
      const res = await this.$webapi(['historydetails', 'insert', this.HDInput])
      this.res = res
      if ('error' in res) {
        this.isError = true
      } else {
        this.isCompleted = true
        this.clearInput('HDInput')
      }
      this.getList()
    },
  },
}
</script>
