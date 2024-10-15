<script lang="ts">
import {defineComponent} from "vue";
import {makeRequest} from '@/components/ts/requests'

export default defineComponent({
  data() {
    return {
      code: '',
      country_data: {},
      holidays: [],
      year: '2024'
    }
  },
  watch: {
    year() {
      this.fetchHolidays()
    }
  },
  async mounted() {
    if (this.$route.params.countryCode.length !== 2 || /\d/.test(this.$route.params.countryCode)) {
      this.$router.push({name: 'home'})
    } else {
      this.code = this.$route.params.countryCode.toUpperCase();
    }
    await this.fetchCountryData();
    await this.fetchHolidays();
  },
  methods: {
    goHome() {
      this.$router.push({name: 'home'})
    },
    goToCountry(code: string) {
      this.$router.push(code)
    },
    async fetchHolidays() {
      this.holidays = await makeRequest(`https://date.nager.at/api/v3/PublicHolidays/${this.year}/${this.code}`)
    },
    async fetchCountryData() {
      this.country_data = await makeRequest(`https://date.nager.at/api/v3/CountryInfo/${this.code}`)
      if (JSON.stringify(this.country_data) == JSON.stringify({})) {
        this.goHome();
      }
    }
  }
})
</script>
<template>
  <div class="content">
    <button @click="goHome" class="go-home" style="margin-bottom: 20px"> <= Go home</button>
    <h2>Country: <b>{{ country_data.commonName }}</b></h2>
    <h3>Country code: {{ code }}</h3>
    <h3>Region: {{ country_data.region }}</h3>
    <h2>Neighbours</h2>
    <ul v-if="country_data.borders !== undefined">
      <li v-for="border in country_data.borders">
        <b class="border-neighbour" @click="goToCountry(border.countryCode)">
          {{ border.commonName }}
        </b>
      </li>
      <li v-if="country_data.borders.length === 0">
        No neighbours on border :(
      </li>
    </ul>
    <hr>
    <div class="holidays">
      <h2>HOLIDAYS</h2>
      <div class="year-selector-row">
        <button v-for="year in [2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030]" :key="year"
                :class="{active:year == this.year}"
                @click="this.year = year">{{ year }}
        </button>
      </div>
      <div class="holidays-holder">
        <div class="holiday" v-for="holiday in holidays" :key="`hl-${holiday.id}`">
          <span>{{ holiday.name }} (<b>{{ holiday.localName }}</b>)</span><br>
          <span>Date : <b>{{ holiday.date }}</b></span><br>
          <span>Types: (
            <b v-for="type in holiday.types" :key="`hl_type${type.id}`">
                      {{ type }}
                    </b>
            )</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content {
  padding: 20px;
}

.go-home {
  height: 30px;
  padding: 0 10px;
  border-radius: 3px;
  border: 1px solid black;
  cursor: pointer;
}

.year-selector-row {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  margin: 10px 0;

  .active {
    box-shadow: 0 0 10px rgba(0, 0, 0, .6);
  }
}

.border-neighbour {
  text-decoration: underline;
  cursor: pointer;
}

hr {
  margin: 20px 0;
}

.holidays {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0 20px;
  gap: 10px;
  flex: 1;

  .holidays-holder {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;

    .holiday {
      min-width: 250px;
      padding: 5px;
      border-radius: 3px;
      border: 1px solid black;
    }
  }
}
</style>
