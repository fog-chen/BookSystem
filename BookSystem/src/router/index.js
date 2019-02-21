import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/pages/login'
import books from '@/components/pages/Books/books'
import bookIndex from '@/components/pages/Books/BooksChilrd/bookIndex'
import bookInformation from '@/components/pages/Books/BooksChilrd/bookInformation'
import borrowinfo from '@/components/pages/Books/BooksChilrd/borrowinfo'
import userInformation from '@/components/pages/Books/BooksChilrd/userInformation'
import about from '@/components/pages/Books/BooksChilrd/about'


Vue.use(Router)

Vue.config.productionTip = false

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/books',
      name: 'books',
      component: books,
      children: [
        {
          path: '/bookIndex',
          component: bookIndex,
          // meta: {
          //   requireAuth: true
          // }
        },
        {
          path: '/bookInformation',
          component: bookInformation,
          // meta: {
          //   requireAuth: true
          // }
        },
        {
          path: '/borrowinfo',
          component: borrowinfo,
          // meta: {
          //   requireAuth: true
          // }
        },
        {
          path: '/userInformation',
          component: userInformation,
          // meta: {
          //   requireAuth: true
          // }
        },
        {
          path: '/about',
          component: about,
          // meta: {
          //   requireAuth: true
          // }
        }
      ]
    }

  ]
})


// router.beforeEach((to,from,next) => {

// })
