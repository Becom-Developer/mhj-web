<template>
  <div>
    <b-btn block pill size="lg" variant="outline-secondary" @click="testaxios"
      >送信テスト</b-btn
    >
    <p>{{ testdata }}</p>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      testdata: 'test---',
    }
  },
  computed: {},
  mounted() {},
  methods: {
    async testaxios() {
      this.testdata = 'hello test!!'
      //   const ip = await this.$axios.$get('http://icanhazip.com')
      const ip = await this.$axios.$post(
        'https://mhj-api.becom.co.jp/mhj.cgi',
        {
          path: 'user',
          method: 'get',
          apikey: 'becom',
          params: { loginid: 'info@becom.co.jp' },
        }
      )
      this.testdata = ip
    },
  },
}
</script>
