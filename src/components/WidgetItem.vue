<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    random_holiday: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToCountry(code: string) {
      this.$router.push(code)
    },
  }
})
</script>
<template>
  <div class="widget-item"
       @click="goToCountry(random_holiday.countryCode)">
    <span>{{ random_holiday.countryName }}</span><br>
    <span>{{ random_holiday.name }}</span><br>
    <b>{{ random_holiday.date }}</b>
  </div>
</template>

<style lang="scss" scoped>
.widget-item {
  width: calc(100% - 2px);
  cursor: pointer;
  border: 1px solid black;
  padding: 10px 0;
  padding-left: 10px;
  border-radius: 4px;
  transition: box-shadow ease-out .3s;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
}
</style>
