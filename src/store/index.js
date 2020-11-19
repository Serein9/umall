import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import actions from "./actions";

import { state, mutations, getters } from "./mutations";

import cate from "./modules/cate";
import specs from "./modules/specs";
import banner from "./modules/banner";
import goods from "./modules/goods";
import seckill from "./modules/seckill";
import menu from "./modules/menu";
import role from "./modules/role";
import manage from "./modules/manage";
import vip from "./modules/vip";

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    cate,
    specs,
    banner,
    goods,
    seckill,
    menu,
    role,
    manage,
    vip
  }
});
