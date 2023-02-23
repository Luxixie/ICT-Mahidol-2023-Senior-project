import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


const router = new Router({
    mode: "history",
    routes:[
      {path:"/",redirect:'/home'},
      {
        path:'/home',
        component:()=>import('../pages/home/homePage.vue')
      },
      {
        path:'/login',
        component:()=>import('../pages/login/loginPage.vue')
      },
      {
        path:'/signup',
        component:()=>import('../pages/login/signupPage.vue')
      } ,
      {
          path:'/forgetpassword',
          component:()=>import('../pages/login/forgetpasswordPage.vue')
      }
      ,
      {
        path:'/sendemail',
        component:()=>import('../pages/login/sendemailpage.vue')
      },
      {
          path:'/newpassword',
          component:()=>import('../pages/login/newpasswordPage.vue')
      },
      {
        path:'/completeresetpassword',
        component:()=>import('../pages/login/completeresetpassword.vue')
      },

      {
        path:'/opentest',
        component:()=>import('../pages/knowledge/opentest.vue')
      },
      {
        path:'/test',
        component:()=>import('../pages/test/test.vue')
      },
      
      {
        path:'/markethome',
        component:()=>import('../pages/stock/markethome.vue')
      },
      {
        path:'/submarket',
        component:()=>import('../pages/stock/submarket.vue')
      },

      {
        path:'/stockinform',
        component:()=>import('../pages/stock/stockInfoPage.vue')
      },
      {
        path:'/buyandsell',
        component:()=>import('../pages/stock/buyandsellPage.vue')
      },

      {
        path:'/userhome',
        component:()=>import('../pages/userprofile/userhome.vue')
      },
      {
        path:'/contactus',
        component:()=>import('../pages/userprofile/contactus.vue')
      },
      {
        path:'/poster',
        component:()=>import('../pages/userprofile/poster.vue')
      },

      {
        path:'/editprofile',
        component:()=>import('../pages/userprofile/editprofile.vue')
      },
      {
        path: '/watchlist',
        component: () => import('../pages/userprofile/wishlistPage.vue')
      },
      {
        path:'/portfolio',
        component:()=>import('../pages/portfolio/portfolioPage.vue')
      },
      {
        path:'/quiz',
        component:()=>import('../pages/knowledge/quiz.vue')
      },

      {
        path:'/stockinformation',
        component:()=>import('../pages/stock/stockInfoPage.vue')
      },
      {
        path:'/knowledgeHome',
        component:()=>import('../pages/knowledge/knowledgeHome.vue')
      },
      {
        path:'/chapter1',
        component:()=>import('../pages/knowledge/Chapters/Chapter1/chapter1Home.vue')
      },
      {
        path:'/chapter1.1',
        component:()=>import('../pages/knowledge/Chapters/Chapter1/chapter1.1.vue')
      },
      {
        path:'/chapter1.2',
        component:()=>import('../pages/knowledge/Chapters/Chapter1/chapter1.2.vue')
      },
      {
        path:'/chapter1.3',
        component:()=>import('../pages/knowledge/Chapters/Chapter1/chapter1.3.vue')
      },
      {
        path:'/chapter1.4',
        component:()=>import('../pages/knowledge/Chapters/Chapter1/chapter1.4.vue')
      },
      {
        path:'/chapter2',
        component:()=>import('../pages/knowledge/Chapters/Chapter2/chapter2Home.vue')
      },
      {
        path:'/chapter2.1',
        component:()=>import('../pages/knowledge/Chapters/Chapter2/chapter2.1.vue')
      },
      {
        path:'/chapter3',
        component:()=>import('../pages/knowledge/Chapters/Chapter3/chapter3Home.vue')
      },      
      {
        path:'/chapter3.1',
        component:()=>import('../pages/knowledge/Chapters/Chapter3/chapter3.1.vue')
      },
      {
        path:'/chapter3.2',
        component:()=>import('../pages/knowledge/Chapters/Chapter3/chapter3.2.vue')
      },
      {
        path:'/chapter3.3',
        component:()=>import('../pages/knowledge/Chapters/Chapter3/chapter3.3.vue')
      },
      {
        path:'/chapter3.4',
        component:()=>import('../pages/knowledge/Chapters/Chapter3/chapter3.4.vue')
      },
      {
        path:'/chapter3.5',
        component:()=>import('../pages/knowledge/Chapters/Chapter3/chapter3.5.vue')
      },
      {
        path:'/chapter3.6',
        component:()=>import('../pages/knowledge/Chapters/Chapter3/chapter3.6.vue')
      },
      {
        path:'/chapter3.7',
        component:()=>import('../pages/knowledge/Chapters/Chapter3/chapter3.7.vue')
      },

      {
        path:'/chapter4',
        component:()=>import('../pages/knowledge/Chapters/Chapter4/chapter4Home.vue')
      },
      {
        path:'/chapter5',
        component:()=>import('../pages/knowledge/Chapters/Chapter5/chapter5Home.vue')
      },
      {
        path:'/chapter6',
        component:()=>import('../pages/knowledge/Chapters/Chapter6/chapter6Home.vue')
      },

      {
        path:'/chapter2test',
        component:()=>import('../pages/knowledge/Chapters/Chapter2/Questions/chapter2test.vue')
      }




    ]

})

export default  router