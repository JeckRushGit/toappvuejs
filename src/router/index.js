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
    meta: {
      auth: false
    }
  },
  {
    path: '/task',
    name: 'task',
    component: () => import('../views/TaskView.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/completedtasks',
    name: 'completedtasks',
    component: () => import('../views/CompletedTasksView.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/albo',
    name: 'albo',
    component: () => import('../views/AlboView.vue'),
    meta: {
      auth: false
    }
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  // if page isn't login page and needs user authentication then redirect to login page
  if(to.name !== 'login' && to.meta.auth === true && store.state.selectedUser === null)
    next('/');
  else
    next();
});

export default router
