import Vue from 'vue'
import Router from 'vue-router'

import QueryAll from '@/components/QueryAll'
import Home from '@/components/Home'
import Patient from '@/components/Patient'
import Doctor from '@/components/Doctor'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/queryAll',
      name: 'QueryAll',
      component: QueryAll,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: { personId: false }
    },
    {
      path: '/doctor',
      name: 'Doctor',
      component: Doctor,
      props: true
    },
    {
      path: '/patient',
      name: 'Patient',
      component: Patient,
      props: true
    }
  ]
})
