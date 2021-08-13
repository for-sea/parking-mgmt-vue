import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '../views/Index'
import Login from '../views/Login'
import UserRegister from '../views/UserRegister'
import UserPersonal from '../views/UserPersonal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/user/login',
      children: [
        {
        path: '/user/login',
        name: 'Login',
        component: Login
        },
        {
          path: '/user/register',
          name: 'UserRegister',
          component: UserRegister
        },
      ]
    },
    {
      path: '/user/personal/',
      name: UserPersonal,
      component: UserPersonal
    }
  ]
})
