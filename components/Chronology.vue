<template>
  <b-tab title="Chronology">
    <b-card-text>年表</b-card-text>
    <!-- 一覧取得 -->
    <b-container fluid class="p-0 pb-3">
      <b-card title="一覧取得" sub-title="Card subtitle">
        <b-row v-for="row in chronologyList" :key="row.id" class="my-1">
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
          <b-col sm="9">{{ chronologyDetail.id }} </b-col>
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

        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-adyear`">adyear:</label>
          </b-col>
          <b-col sm="9">
            <b-btn size="sm" @click="selectAd('raiwa')">令和</b-btn>
            <b-btn size="sm" @click="selectAd('heisei')">平成</b-btn>
            <b-btn size="sm" @click="selectAd('syouwa')">昭和</b-btn>
            <b-btn size="sm" @click="selectAd('taisyou')">大正</b-btn>
            <b-btn size="sm" @click="selectAd('meizi')">明治</b-btn>
            <b-form-select
              :id="`type-adyear`"
              v-model="adyear"
              :options="options"
              :select-size="4"
            ></b-form-select>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-adyear`">adyear:</label>
          </b-col>
          <b-col sm="9">{{ chronologyInput['adyear'] }} </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-jayear`">jayear:</label>
          </b-col>
          <b-col sm="9">{{ chronologyInput['jayear'] }} </b-col>
        </b-row>

        <b-row v-for="key in updateKeys" :key="key.id" class="my-1">
          <b-col sm="3">
            <label :for="`type-${key}`">{{ key }}:</label>
          </b-col>
          <b-col sm="9">{{ chronologyDetail[key] }} </b-col>
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
        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-adyear`">adyear:</label>
          </b-col>
          <b-col sm="9">
            <b-btn size="sm" @click="selectAd('raiwa')">令和</b-btn>
            <b-btn size="sm" @click="selectAd('heisei')">平成</b-btn>
            <b-btn size="sm" @click="selectAd('syouwa')">昭和</b-btn>
            <b-btn size="sm" @click="selectAd('taisyou')">大正</b-btn>
            <b-btn size="sm" @click="selectAd('meizi')">明治</b-btn>
            <b-form-select
              :id="`type-adyear`"
              v-model="adyear"
              :options="options"
              :select-size="4"
            ></b-form-select>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-adyear`">adyear:</label>
          </b-col>
          <b-col sm="9">{{ chronologyInput['adyear'] }} </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="3">
            <label :for="`type-jayear`">jayear:</label>
          </b-col>
          <b-col sm="9">{{ chronologyInput['jayear'] }} </b-col>
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
    ...mapState([
      'chronologyList',
      'chronologyInput',
      'chronologyDetail',
      'chronologyOpt',
    ]),
    options() {
      return this.chronologyOpt
    },
    title: {
      get() {
        return this.chronologyInput.title
      },
      set(val) {
        this.buildInput({ inputKey: 'chronologyInput', row: { title: val } })
      },
    },
    adyear: {
      get() {
        return this.chronologyInput.adyear
      },
      set(val) {
        let y = ''
        let ad = ''
        let ja = ''
        if (typeof val === 'string') {
          y = val.split('-', 2)
          ad = y[0]
          ja = y[1]
        }
        if (ad) {
          this.buildInput({ inputKey: 'chronologyInput', row: { adyear: ad } })
        }
        if (ja) {
          this.buildInput({ inputKey: 'chronologyInput', row: { jayear: ja } })
        }
      },
    },
  },
  mounted() {},
  methods: {
    ...mapMutations(['buildInput', 'clearInput', 'addState']),
    showDetailWindow() {
      this.showDetail = false
      this.clearInput('chronologyInput')
    },
    getDetail(row) {
      this.buildInput({ inputKey: 'chronologyInput', row })
      this.addState({ stateKey: 'chronologyDetail', data: row })
      this.showDetail = true
    },
    async getList() {
      const res = await this.$webapi(['chronology', 'list', {}])
      if ('error' in res) {
        this.addState({ stateKey: 'chronologyList', data: [] })
      } else {
        this.addState({ stateKey: 'chronologyList', data: res })
        this.showDetail = false
        this.clearInput('chronologyInput')
      }
    },
    async formUpdate() {
      this.isCompleted = false
      this.isError = false
      const qParams = { id: this.chronologyDetail.id, ...this.chronologyInput }
      const res = await this.$webapi(['chronology', 'update', qParams])
      this.res = res
      if ('error' in res) {
        this.isError = true
      } else {
        this.isCompleted = true
        this.clearInput('chronologyInput')
        await this.getList()
        this.getDetail(res)
      }
    },
    selectAd(word) {
      const options = this.$selectChronology(word)
      this.addState({ stateKey: 'chronologyOpt', data: options })
    },
    async formInsert() {
      this.isCompleted = false
      this.isError = false
      const qParams = this.chronologyInput
      const res = await this.$webapi(['chronology', 'insert', qParams])
      this.res = res
      if ('error' in res) {
        this.isError = true
      } else {
        this.isCompleted = true
        this.clearInput('chronologyInput')
      }
      this.getList()
    },
  },
}
</script>
