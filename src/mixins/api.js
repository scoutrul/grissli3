import russian_names from "@/data/russian_names.json";
import russian_surnames from "@/data/russian_surnames.json";
export default {
  data: () => ({
    loading: false,
    db: {
      names: [],
      surnames: []
    }
  }),
  created() {
    this.db.names = this.dataNamesFromDB();
    this.db.surnames = this.dataSurnamesFromDB();
  },

  methods: {
    filterData({ data, query, key }) {
      const names = [];
      const surnames = [];
      if (key === "names") {
        for (let i = 0; i < data.length; i++) {
          if (~data[i].Name.toLowerCase().indexOf(query.toLowerCase())) {
            names.push(data[i]);
          }
        }
        return names;
      }
      if (key === "surnames") {
        for (let i = 0; i < data.length; i++) {
          if (~data[i].Surname.toLowerCase().indexOf(query.toLowerCase())) {
            surnames.push(data[i]);
          }
        }
        return surnames;
      }
    },
    getDataFromAPI({ data, query, key }) {
      if (!query || !key) return;
      this.loading = true;
      const result = this.filterData({ data, query, key });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.loading = false;
          resolve(result);
        }, 1000);
      });
    },
    dataNamesFromDB() {
      return russian_names;
    },
    dataSurnamesFromDB() {
      return russian_surnames;
    }
  }
};
