import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
 import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    auth: false
  },
  {
    path: '/task',
    name: 'task',
    component: () => import('../views/TaskView.vue'),
    auth: true
  },
  {
    path: '/completedtasks',
    name: 'completedtasks',
    component: () => import('../views/CompletedTasksView.vue'),
    auth: true
  },
  {
    path: '/albo',
    name: 'albo',
    component: () => import('../views/AlboView.vue'),
    auth: false
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  if(to.name !== 'login' && to.auth === true && store.state.selectedUser === null)
    next('/');
  else
    next();
});

export default router
