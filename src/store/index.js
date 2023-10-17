import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
Vue.config.devtools = true


const users = [
    {id: 1, name: 'Giacomo'},
    {id: 2, name: 'Claudio'},
    {id: 3, name: 'Giulia'}
];

export default new Vuex.Store({
    state: {
        listOfUsers: [],
        activeTasks: {},
        confirmedTasks: [],
        selectedUser: null
    },

    mutations: {
        login(state, user) {
            state.selectedUser = user;
        },
        logout(state) {
            state.selectedUser = null;
        },
        addTask(state, task) {
            state.activeTasks[state.selectedUser.id].push(task)
        },
        removeTaskFromList(state, index) {
            state.activeTasks[state.selectedUser.id].splice(index, 1);
        },
        changeTaskDescription(state, payload) {
            state.activeTasks[state.selectedUser.id][payload.index].description = payload.newDescription;
        },
        //move the task to confirmed task list
        changeTaskAsDone(state, payload) {
            state.confirmedTasks.push({task : state.activeTasks[state.selectedUser.id][payload.index],userid : state.selectedUser.id,username: state.selectedUser.name});
            state.activeTasks[state.selectedUser.id].splice(payload.index, 1);

        },
        //move back the task from confirmed task list back to active task list
        revertTaskDone(state, payload) {
            state.activeTasks[state.selectedUser.id].push(state.confirmedTasks[payload.index].task);
            state.confirmedTasks.splice(payload.index, 1);
            console.log(JSON.stringify(state.confirmedTasks));
        },
        getListOfUsers(state, newListOfUsers) {
            newListOfUsers.forEach(function (user){
                Vue.set(state.activeTasks,user.id,[]);
            })
            state.listOfUsers = newListOfUsers;
        }
    },

    actions: {
        //simulate api request
        fetchDataLogin({commit}, username) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const user = users.find(user => user.name === username);
                    if (user) {
                        commit('login', user);
                        resolve(user);
                    } else {
                        const error = new Error('No user found');
                        reject({error});
                    }
                }, 1000);
            })
        },
        saveNewTask({commit}, task) {
            commit('addTask', task);
        },
        removeTask({commit}, index) {
            commit('removeTaskFromList', index);
        },
        changeTaskDescription({commit}, payload) {
            commit('changeTaskDescription', payload);
        },
        confirmTaskAsDone({commit}, index) {
            commit('changeTaskAsDone', {index: index});
        },
        revertTaskDone({commit}, index) {
            commit('revertTaskDone', {index: index})
        },
        getListOfUsers({commit}) {
            commit('getListOfUsers', users);
        }

    },
})
