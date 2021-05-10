import Vue from 'vue'
import Router from 'vue-router'

import QueryAll from '@/components/QueryAll'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/queryAll',
      name: 'QueryAll',
      component: QueryAll
    }
  ]
})
