<script lang="ts">
import {defineComponent} from 'vue'
import {makeRequest} from '@/components/ts/requests'
import WidgetItem from "@/components/WidgetItem.vue";

export default defineComponent({
  components: {WidgetItem},
  data() {
    return {
      search_val: '',
      countries: [],
      random_holidays: []
    }
  },
  computed: {
    filtered_countries() {
      return this.countries.filter((x) => x.name.toLowerCase().includes(this.search_val.toLowerCase()) || x.countryCode.toLowerCase() === this.search_val.toLowerCase())
    }
  },
  methods: {
    goToCountry(code: string) {
      this.$router.push(code)
    },
    getNameFromCode(code: string) {
      for (let i = 0; i < this.countries.length; i++) {
        if (this.countries[i].countryCode === code) {
          return this.countries[i].name
        }
      }
      return ''
    },
    async getRandomHolidays() {
      let arr = [];
      for (let i = 0; i < 3; i++) {
        let rand_id = Math.floor(Math.random() * this.countries.length)
        let code = this.countries[rand_id].countryCode;
        let req = await makeRequest(`https://date.nager.at/api/v3/NextPublicHolidays/${code}`)
        let obj = req[0];
        obj.countryName = this.getNameFromCode(obj.countryCode)
        arr.push(obj)
      }
      this.random_holidays = arr
    },
    async fetchCountries() {
      this.countries = await makeRequest('https://date.nager.at/api/v3/AvailableCountries');
    }
  },
  async mounted() {
    await this.fetchCountries();
    await this.getRandomHolidays();
  },
})
</script>
<template>
  <div class="main">
    <div class="left">
      <input type="text" placeholder="Search input" v-model.trim="search_val"/>
      <hr>
      <h3>Countries list ({{ countries.length }} countries)</h3>
      <div class="countries-list">
        <div class="country" v-for="country in filtered_countries" :key="country.countryCode"
             @click="goToCountry(country.countryCode)">
          <span>{{ country.name }}</span>
        </div>
        <div class="country" v-if="filtered_countries.length === 0" style="cursor: unset">
          <span>No countries found with such name/code :(</span>
        </div>
      </div>
    </div>
    <div class="right">
      <h3>Random countries widget</h3>
      <button @click="getRandomHolidays">Regenerate</button>
      <hr>
      <div class="random-widget-list">
        <widget-item :random_holiday="random_holiday" v-for="random_holiday in random_holidays"
                     :key="`rnd-${random_holiday.countryCode}`"/>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: row;
  align-items: start;
  width: 100%;
  justify-content: space-between;

  .left, .right {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding: 20px;

    hr {
      width: 100%;
    }
  }

  .left {
    gap: 20px;

    input[type='text'] {
      height: 30px;
      min-height: 30px;
      width: 200px;
      padding-left: 10px;
      border-radius: 4px;
      border: 1px solid black;
      transition: box-shadow ease-out .3s;


      &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, .4);
      }
    }

    h3 {
      text-align: left;
      width: 100%;
    }

    .countries-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      gap: 10px;
      width: 100%;

      .country {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
        border-radius: 4px;
        width: calc(100% - 22px);
        border: 1px solid black;
        cursor: pointer;
        transition: box-shadow ease-out .3s;

        span {
          transition: font-weight ease-out .3s;
        }

        &:hover {
          box-shadow: 0 0 10px rgba(0, 0, 0, .4);

          span {
            font-weight: bold;
          }
        }
      }
    }
  }

  .right {
    gap: 20px;

    .random-widget-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      justify-content: start;
      gap: 20px;
    }
  }
}
</style>
