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
          debounce="2000"
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
    <div v-for="item in result.names" :key="item.Name">
      {{
        item.Name
          | toUpperCase(isToUpperCase)
          | toLowerCase(isToLowerCase)
          | toTranslit(isToTranslit, rusToLat)
          | toReverseText(isToReverseText)
      }}
    </div>
    <div v-if="!result.surnames">...</div>
    <div v-for="item in result.surnames" :key="item.Surname">
      {{
        item.Surname
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
    result: {
      names: [],
      surnames: []
    },
    error3more: ""
  }),
  watch: {
    async searchInputValue(val, old) {
      if (val.length < 3) {
        this.error3more = "Должно быть больше 3х букв";
        return;
      } else {
        this.error3more = "";

        if (val !== old) {
          const [name, surname] = val.split(" ");

          await this.getDataNamesFromAPI({ name }).then(res => {
            this.result.names = res;
          });
          if (surname) {
            await this.getDataSurNamesFromAPI({ surname }).then(res => {
              this.result.surnames = res;
            });
          }
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
