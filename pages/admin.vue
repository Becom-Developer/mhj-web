<template>
  <div>
    <b-container>
      <b-jumbotron header="管理画面" lead="mhj-web: Modern history of Japan ">
        <p>For more information visit website</p>
        <b-button variant="primary" @click="$router.push('/')"
          >トップへ戻る</b-button
        >
      </b-jumbotron>
      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="User" active>
              <b-card-text>登録ユーザー</b-card-text>
              <b-btn size="sm" @click="userList">一覧取得</b-btn>
              <p>{{ userListData }}</p>

              <b-container fluid>
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
                <b-btn size="sm" @click="userInsert">新規登録実行</b-btn>
              </b-container>
            </b-tab>
            <b-tab title="PeriodType">
              <b-card-text>時代の種別</b-card-text>
            </b-tab>
            <b-tab title="Period">
              <b-card-text>時代に関する情報</b-card-text>
            </b-tab>
            <b-tab title="Chronology">
              <b-card-text>年表</b-card-text>
            </b-tab>
            <b-tab title="HistoryDetails">
              <b-card-text>歴史の詳細</b-card-text>
            </b-tab>
            <b-tab title="ChronologyToPeriod">
              <b-card-text>年表と時代の結びつき</b-card-text>
            </b-tab>
            <b-tab title="Build">
              <b-card-text>設定の初期化など</b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginid: '',
      password: '',
      userListData: 'testList',
      types: [
        'text',
        'number',
        'email',
        'password',
        'search',
        'url',
        'tel',
        'date',
        'time',
        'range',
        'color',
      ],
    }
  },
  methods: {
    async userInsert() {
      const res = await this.$axios.$post(
        'https://mhj-api.becom.co.jp/mhj.cgi',
        {
          path: 'user',
          method: 'insert',
          apikey: 'becom',
          params: { loginid: this.loginid, password: this.password },
        }
      )
      console.log(res)
    },
    async userList() {
      const res = await this.$axios.$post(
        'https://mhj-api.becom.co.jp/mhj.cgi',
        {
          path: 'user',
          method: 'list',
          apikey: 'becom',
          params: {},
        }
      )
      this.userListData = res
    },
  },
}
</script>
