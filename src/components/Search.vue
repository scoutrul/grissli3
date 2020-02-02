<template>
  <div>
    <div>
      <label>
        Поиск
        <input placeholder="Найти имена" v-model="searchInputValue" />
      </label>
      <hr />
      <label>
        <input type="checkbox" v-model="isToUpperCase" />
        isToUpperCase
      </label>
      <label>
        <input type="checkbox" v-model="isToLowerCase" />
        isToLowerCase
      </label>
      <label>
        <input type="checkbox" v-model="isToTranslit" />
        isToTranslit
      </label>
      <label>
        <input type="checkbox" v-model="isToReverseText" />
        isToReverseText
      </label>
    </div>
    <div>
      {{
        searchInputValue
          | toUpperCase(isToUpperCase)
          | toLowerCase(isToLowerCase)
          | toTranslit(isToTranslit, rusToLat)
          | toReverseText(isToReverseText)
      }}
    </div>
  </div>
</template>

<script>
import rusToLat from "@/mixins/rusToLat.js";
import api from "@/mixins/api.js";
export default {
  mixins: [api, rusToLat],
  data: () => ({
    searchInputValue: "",
    isToUpperCase: false,
    isToLowerCase: false,
    isToTranslit: false,
    isToReverseText: false
  }),
  created() {
    console.log(this.rusToLat("Антон Головачев"));
    // console.log(this.getDataNamesFromAPI('Антон'));
    // console.log(this.getDataSureNamesFromAPI('Головачев'))
  },
  filters: {
    toUpperCase: (value, bool) => (bool ? value.toUpperCase() : value),
    toLowerCase: (value, bool) => (bool ? value.toLowerCase() : value),
    toTranslit: (value, bool, rusToLat) => (bool ? rusToLat(value) : value),
    toReverseText: (value, bool) =>
      bool
        ? value
            .split("")
            .reverse()
            .join("")
        : value
  }
};
</script>

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
