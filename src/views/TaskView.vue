<template>
  <v-container>
    <v-slide-x-transition appear mode="in-out"><h1>Things to do</h1></v-slide-x-transition>
    <v-col>
      <v-list rounded >
        <v-list-item v-for="(task,index) in tasksList" :key="index">
          <TaskCard :description="task.description" @remove-from-list="removeTask" @change-text="changeText" @confirm-task-done="confirmTaskDone"
                    :index="index"></TaskCard>
        </v-list-item>
      </v-list>

      <!--        POP OP WINDOW-->
      <v-dialog overlay-color="white"
                overlay-opacity="1" v-model="isPopUpOpen" max-width="500px">
        <v-container>
          <v-textarea v-model="textAreaContent" outlined placeholder="Task description" clearable
                      no-resize></v-textarea>
        </v-container>
        <v-btn @click="saveTask()" dark>Save</v-btn>
      </v-dialog>


    </v-col>
    <v-row>
      <v-col>
        <v-fab-transition mode="out-in" appear>
          <v-btn
              @click="isPopUpOpen = !isPopUpOpen"
              fab
              color="red"
              dark
              fixed
              right
              bottom
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>


import TaskCard from "@/components/TaskCard.vue";

export default {
  name: "TaskView",
  components: {TaskCard},
  computed: {
    user() {
      return this.$store.state.selectedUser
    },
    tasksList() {
      return this.$store.state.activeTasks[this.user.id];
    },
  },
  data() {
    return {
      isPopUpOpen: false,
      textAreaContent: "",
      taskIndexToChange: -1,
      modifyTextMode: false,
    }
  },
  methods: {
    removeTask(index) {
      this.$store.dispatch('removeTask',index);
    },
    changeText(description, index) {
      this.textAreaContent = description;
      this.isPopUpOpen = true;
      this.taskIndexToChange = index;
      this.modifyTextMode = true;
    },
    saveTask() {
      if (!this.modifyTextMode) {
        if (this.textAreaContent.length !== 0) {
          this.$store.dispatch('saveNewTask',{description: this.textAreaContent,done: false});
          this.textAreaContent = "";
          this.isPopUpOpen = false;
          this.modifyTextMode = false;
        }
      } else {
        const payload = {index : this.taskIndexToChange,newDescription : this.textAreaContent};
        this.$store.dispatch('changeTaskDescription',payload);
        this.isPopUpOpen = false;
        this.textAreaContent = "";
        this.modifyTextMode = false;
      }
    },
    confirmTaskDone(index){
      this.$store.dispatch('confirmTaskAsDone',index);
    },
  },
  watch: {

    isPopUpOpen(oldisPopUpOpen) {
      if (!oldisPopUpOpen) {
        this.modifyTextMode = false;
        this.textAreaContent = "";
      }
    }
  }

}
</script>
