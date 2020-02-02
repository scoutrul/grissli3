export default {
  data: () => ({
    loading: true
  }),
  methods: {
    getDataNamesFromAPI(query) {
      return new Promise((resolve, reject) => {
        const items = this.dataNamesFromDB().find(e => e.Name === query);
        setTimeout(() => {
          this.loading = false;
          resolve({
            items
          });
        }, 1000);
      });
    },
    getDataSureNamesFromAPI(query) {
      return new Promise((resolve, reject) => {
        const items = this.dataSurnamesFromDB().find(e => e.Surname === query);
        setTimeout(() => {
          this.loading = false;
          resolve({
            items
          });
        }, 1000);
      });
    },
    dataNamesFromDB() {
      return () => import(`@/data/russian_names.json`);
    },
    dataSurnamesFromDB() {
      return () => import(`@/data/russian_surnames.json`);
    }
  }
};
