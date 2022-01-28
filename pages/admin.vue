<template>
  <div>
    <b-container>
      <b-jumbotron header="管理画面" lead="mhj-web: Modern history of Japan ">
        <p>For more information visit website</p>
        <b-button variant="primary" href="#">More Info</b-button>
      </b-jumbotron>
      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="User" active>
              <b-card-text>登録ユーザー</b-card-text>
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
export default {}
</script>
