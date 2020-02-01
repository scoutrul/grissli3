<template>
  <div>

  </div>
</template>

<script>
import russian_names from '@/data/russian_names.json'
import russian_surnames from '@/data/russian_surnames.json'

export default {
  data: () => ({
    loading: true
  }),
  methods: {
    getDataNamesFromAPI(query) {
      return new Promise((resolve, reject) => {
        const items = this.dataNamesFromDB().find((e) => e.Name === query)
        setTimeout(() => {
          this.loading = false
          resolve({
            items
          })
        }, 1000)
      })
    },
    getDataSureNamesFromAPI(query) {
      return new Promise((resolve, reject) => {
        const items = this.dataSurenamesFromDB().find(
                (e) => e.Surname === query
        )
        setTimeout(() => {
          this.loading = false
          resolve({
            items
          })
        }, 1000)
      })
    },
    dataNamesFromDB() {
      return russian_names
    },
    dataSurenamesFromDB() {
      return russian_surnames
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
