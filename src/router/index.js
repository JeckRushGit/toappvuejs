import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
 import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/task',
    name: 'task',
    component: () => import('../views/TaskView.vue')
  },
  {
    path: '/completedtasks',
    name: 'completedtasks',
    component: () => import('../views/CompletedTasksView.vue')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  if(to.name !== 'login' && store.state.selectedUser === null)
    next('/');
  else
    next();
});

export default router
