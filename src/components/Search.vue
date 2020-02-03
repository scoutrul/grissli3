<template>
  <div>
    <div v-if="loading">Loading</div>
    <div v-if="error3more">{{ error3more }}</div>
    <div>
      <label>
        Поиск
        <input
          placeholder="Найти имена"
          v-model="searchInputValue"
          debounce="500"
        />
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
    isToReverseText: false,
    searchResults: {
      name: "",
      surname: ""
    },
    error3more: ""
  }),
  watch: {
    searchInputValue(val, old) {
      if (val.length < 3) {
        this.error3more = "Должно быть больше 3х букв";
        return;
      } else {
        this.error3more = "";

        if (val !== old) {
          // разбить val на name surname
          await this.getDataNamesFromAPI(val).then(res => {
            this.searchResults.name = res;
          });
          await this.getDataSurNamesFromAPI(val).then(res => {
            this.searchResults.surname = res;
          });
        }
      }
    }
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

<style scoped></style>
