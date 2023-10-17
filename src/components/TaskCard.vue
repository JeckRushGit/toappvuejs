<template>
  <v-card class="customtaskcard">
    <v-menu v-if="nameEquals" bottom
            :offset-y="true">
      <template v-slot:activator="{ on, attrs }">
        <v-btn  class="taskcardthreedot" plain v-bind="attrs"
               v-on="on">
          <v-icon>
            mdi-dots-vertical
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-btn v-if="!confirmedTask"
            color="primary"
            text
            @click="$emit('change-text',description,index)"
        >
          Modify
        </v-btn>
        <v-btn v-else
               color="primary"
               text
               @click="$emit('revert-task-done',index)"
        >
          RESET
        </v-btn>

      </v-card>
    </v-menu>
    <v-card-text v-if="confirmedTask">
      <h3>{{username}}</h3>
    </v-card-text>
    <v-divider v-if="confirmedTask"></v-divider>
    <v-card-text>
      {{ description }}
    </v-card-text>

    <v-card-actions v-if="!confirmedTask">
      <v-row justify="end">
        <v-btn @click="$emit('remove-from-list',index)" class="mx-4" plain fab small>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-menu
            :nudge-width="200"
            offset-x
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                fab
                plain
                small
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-actions>
              <v-container>
                <v-row justify="space-between">
                  <v-btn
                      text
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      color="primary"
                      text
                      @click="$emit('confirm-task-done',index)"
                  >
                    Save
                  </v-btn>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-row>
    </v-card-actions>
  </v-card>

</template>

<script>
export default {
  name: "TaskCard",
  emits: ['remove-from-list', 'change-text','confirm-task-done','revert-task-done'],
  computed: {
    selectedUserName(){
      return this.$store.state.selectedUser.name;
    },
    nameEquals(){
      return this.username === this.selectedUserName
    }
  },
  props: {
    description: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    confirmedTask: {
      type: Boolean,
      default: false
    },
    username:{
      type: String
    }
  },
  methods: {
    removeFromList() {
      this.$emit('remove-from-list')
    },
    changeText() {
      this.$emit('change-text')
    },
    confirmTaskDone(){
      this.$emit('confirm-task-done')
    },
    revertTaskDone(){
      this.$emit('revert-task-done')
    },
  }
}
</script>

<style scoped>
.taskcardthreedot {
  float: right;
}

.customtaskcard {

  width: 75%;
  padding: 8px;
}
</style>