<template>
  <div>
    Search
  </div>
</template>

<script>
  
import rusToLat from '@/mixins/rusToLat.js'
import api from '@/mixins/api.js'
export default {

  mixins: [api, rusToLat],
  created() {
    console.log(this.rusToLat('Антон Головачев'))
    console.log(this.getDataNamesFromAPI('Антон'));
    console.log(this.getDataSureNamesFromAPI('Головачев'))
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
