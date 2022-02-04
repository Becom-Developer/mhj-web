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
            <User />
            <PeriodType />
            <Period />
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
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: { ...mapState(['userList']) },
  methods: {},
}
</script>
