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
    <div style="display: flex; flex-direction: row">
      <div>
        <div v-for="item in result.names" :key="item.id">
          {{
            item.Name
              | toUpperCase(isToUpperCase)
              | toLowerCase(isToLowerCase)
              | toTranslit(isToTranslit, rusToLat)
              | toReverseText(isToReverseText)
          }}
        </div>
      </div>
      <div v-if="!result.surnames.length">...</div>
      <div>
        <div v-for="item in result.surnames" :key="item.id">
          {{
            item.Surname
              | toUpperCase(isToUpperCase)
              | toLowerCase(isToLowerCase)
              | toTranslit(isToTranslit, rusToLat)
              | toReverseText(isToReverseText)
          }}
        </div>
      </div>
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
    searchInputValue(val, old) {
      if (val.trim() === old.trim()) return;
      if (val.length < 3) {
        this.error3more = "Должно быть больше 3х букв";
        return;
      } else {
        this.error3more = "";

        const [name, surname] = val.split(" ");
        this.getDataFromAPI({
          data: this.db.names,
          query: name,
          key: "names"
        }).then(res => {
          this.result.names = res;
        });
        surname &&
          surname.length > 2 &&
          this.getDataFromAPI({
            data: this.db.surnames,
            query: surname,
            key: "surnames"
          }).then(res => {
            this.result.surnames = res;
          });
      }
    }
  },
  filters: {
    toUpperCase(value, bool) {
      return bool ? value.toUpperCase() : value;
    },
    toLowerCase(value, bool) {
      return bool ? value.toLowerCase() : value;
    },
    toTranslit(value, bool, rusToLat) {
      return bool ? rusToLat(value) : value;
    },
    toReverseText(value, bool) {
      return bool
        ? value
            .split("")
            .reverse()
            .join("")
        : value;
    }
  }
};
</script>

<style scoped></style>
