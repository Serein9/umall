import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

export let routers = [
  {
    path: "menu",
    component: () => import("../pages/menu/menu"),
    name: "菜单管理",
    beforeEach(to, from, next) {
      checkedEnter("/menu", next);
    }
  },
  {
    path: "role",
    component: () => import("../pages/role/role"),
    name: "角色管理",
    beforeEach(to, from, next) {
      checkedEnter("/role", next);
    }
  },
  {
    path: "manage",
    component: () => import("../pages/manage/manage"),
    name: "管理员管理",
    beforeEach(to, from, next) {
      checkedEnter("/manage", next);
    }
  },
  {
    path: "cate",
    component: () => import("../pages/cate/cate"),
    name: "商品分类",
    beforeEach(to, from, next) {
      checkedEnter("/cate", next);
    }
  },
  {
    path: "specs",
    component: () => import("../pages/specs/specs"),
    name: "商品规格",
    beforeEach(to, from, next) {
      checkedEnter("/specs", next);
    }
  },
  {
    path: "goods",
    component: () => import("../pages/goods/goods"),
    name: "商品管理",
    beforeEach(to, from, next) {
      checkedEnter("/goods", next);
    }
  },
  {
    path: "vip",
    component: () => import("../pages/vip/vip"),
    name: "会员管理",
    beforeEach(to, from, next) {
      checkedEnter("/vip", next);
    }
  },
  {
    path: "banner",
    component: () => import("../pages/banner/banner"),
    name: "轮播图管理",
    beforeEach(to, from, next) {
      checkedEnter("/banner", next);
    }
  },
  {
    path: "seckill",
    component: () => import("../pages/seckill/seckill"),
    name: "秒杀活动",
    beforeEach(to, from, next) {
      checkedEnter("/seckill", next);
    }
  }
];

let router = new Router({
  routes: [
    { path: "/login", component: () => import("../pages/login/login") },
    {
      path: "/",
      component: () => import("../pages/index/index"),
      children: [
        { path: "", component: () => import("../pages/home/home") }
      ].concat(routers)
    }
  ]
});

//登录拦截
router.beforeEach((to, from, next) => {
  //前往 "login" next
  if (to.path == "/login") {
    next();
    return;
  }
  if (store.state.userInfo.token) {
    next();
    return;
  }
  next("/login");
});

function checkedEnter(path, next) {
  if (store.state.userInfo.menus_url.includes(path)) {
    next();
  } else {
    next("/");
  }
}

export default router;
