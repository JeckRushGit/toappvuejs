<template>
  <v-container fluid>
    <h1 class="mb-10">Done tasks</h1>
    <v-row>
      <v-col cols="5" sm="3">
        <v-select clearable return-object v-model="selectedUser" label="Select a user" outlined solo :items="listOfUsers" item-text="name" item-value="id">

        </v-select>
      </v-col>
      <v-col  cols="2" sm="5">
      </v-col>
      <v-col cols="5" sm="3">
        <v-text-field v-model="textFieldModel" outlined filled label="Type text">

        </v-text-field>
      </v-col>
    </v-row>

    <v-list >
      <v-list-item  class="my-list-item pl-0" v-for="(entry,index) in confirmTasksList" :key="index">
        <TaskCard :index="index" :description="entry.task.description" :username="entry.username" :confirmed-task="true" @revert-task-done="revertTaskDone"></TaskCard>
      </v-list-item>
    </v-list>

  </v-container>
</template>

<script>
import TaskCard from "@/components/TaskCard.vue";

export default {
  name: "CompletedTasksView",
  components: {TaskCard},
  data(){
    return{
      selectedUser: null,
      textFieldModel: '',
    }
  },
  computed: {
    user() {
      return this.$store.state.selectedUser
    },
    confirmTasksList(){
      // return this.$store.state.confirmedTasks.filter(entry => entry.task.description.toLowerCase().includes(this.textFieldModel.toLowerCase()) || entry.username.toLowerCase().includes(this.textFieldModel.toLowerCase()) || entry.username.includes(this.selectedUser.name))
      // eslint-disable-next-line no-unused-vars
      return this.$store.state.confirmedTasks.filter(entry => {
        if(this.selectedUser !== null){
          return this.selectedUser.name === entry.username && entry.task.description.toLowerCase().includes(this.textFieldModel.toLowerCase());
        }else{
          return entry.task.description.toLowerCase().includes(this.textFieldModel.toLowerCase()) || entry.username.toLowerCase().includes(this.textFieldModel.toLowerCase());
        }
      })
    },
    listOfUsers(){
      return this.$store.state.listOfUsers
    },
  },
  methods: {
    revertTaskDone(index){
      this.$store.dispatch('revertTaskDone',index);
    }
  }
}
</script>

<style scoped>
  .my-list-item{
    margin-bottom: 5px;
  }
</style>