<template>
  <v-container>
    <h1 class="mb-5">Albo</h1>
    <div v-if="data">
      <p>Date : {{ data.day }}/{{ data.month }}/{{ data.year }}</p>
      <p>Number : {{ data.num }}</p>
      <p>Title : {{ data.safe_title }}</p>
      <p>Image url : <span><a class="mytext" v-bind:href="url">{{data.img}}</a></span></p>
      <v-btn @click="fetchData(data.num - 1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn @click="fetchData(data.num + 1)">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </v-container>

</template>

<script>
import {getXKCDComic} from "@/axios/service";

export default {
  name: "AlboView",
  data() {
    return {
      data: null,
    }
  },
  created() {
    this.fetchData(100)
  },
  computed: {
    url(){
      return this.data.img
    }
  },
  methods: {
    async fetchData(comicNumber) {
      this.data = await getXKCDComic(comicNumber);
    }
  }
}
</script>

<style scoped>
.mytext{
  width: 300  px;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

}
</style>