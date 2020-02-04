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
  async mounted() {
    this.db.names = await this.dataNamesFromDB();
    this.db.surnames = await this.dataSurnamesFromDB();
  },
  computed: {
    filterData() {
      const buffer = [];
      return ({ data, query }) => {
        // if (!this.loading) {
        //   for (let i = 0; i < data.length; i++) {
        //     if (
        //       data[i].Name &&
        //       data[i].Name.toLowerCase().indexOf(query.toLowerCase() == 0)
        //     ) {
        //       buffer.push(data[i]);
        //     }
        //     if (
        //       data[i].Surname &&
        //       data[i].Surname.toLowerCase().indexOf(query.toLowerCase() == 0)
        //     ) {
        //       buffer.push(data[i]);
        //     }
        //   }
        // }
        // return buffer;
        const items = data.find(e => e.Name === query);
      };
    }
  },

  methods: {
    async getDataNamesFromAPI({ name }) {
      this.loading = true;
      const data = this.db.names;
      const asyncNames = await this.filterData({ data, name });

      await setTimeout(async () => {
        this.loading = false;
        return asyncNames;
      }, 1000);
    },
    async getDataSurNamesFromAPI({ surname }) {
      this.loading = true;
      const data = this.db.surnames;
      const asyncSurnames = await this.filterData({ data, surname });

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.loading = false;
          return asyncSurnames;
        }, 1000);
      });
    },
    async dataNamesFromDB() {
      const data = await import("@/data/russian_names.json");
      return russian_names;
    },
    async dataSurnamesFromDB() {
      const data = await import("@/data/russian_surnames.json");
      return data;
    }
  }
};
