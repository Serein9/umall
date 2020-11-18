import axios from "axios";
import qs from "qs";
import { errorAlert } from "./alert";
import Vue from "vue";
let baseUrl = "/aa";
Vue.prototype.$imgPre = "http://localhost:3000";

axios.interceptors.response.use(res => {
  console.log("本次请求地址是:" + res.config.url);
  console.log(res);
  if (res.data.code != 200) {
    errorAlert(res.data.msg);
  }
  return res;
});

//============菜单管理=============
//添加菜单
export const reqMenuAdd = form => {
  return axios({
    url: baseUrl + "/api/menuadd",
    method: "post",
    data: qs.stringify(form)
  });
};

//菜单列表
export const reqMenuList = () => {
  return axios({
    url: baseUrl + "/api/menulist",
    method: "get",
    params: {
      istree: true
    }
  });
};

//菜单删除
export const reqMenuDel = id => {
  return axios({
    url: baseUrl + "/api/menudelete",
    method: "post",
    data: qs.stringify({ id })
  });
};

//获得一条数据
export const reqMenuDetail = id => {
  return axios({
    url: baseUrl + "/api/menuinfo",
    method: "get",
    params: {
      id
    }
  });
};

//修改菜单
export const reqMenuEdit = form => {
  return axios({
    url: baseUrl + "/api/menuedit",
    method: "post",
    data: qs.stringify(form)
  });
};

//============菜单管理  结束=============

//============角色管理  开始=============

//添加角色
export const reqRoleAdd = user => {
  return axios({
    url: baseUrl + "/api/roleadd",
    method: "post",
    data: qs.stringify(user)
  });
};

//角色列表
export const reqRoleList = () => {
  return axios({
    url: baseUrl + "/api/rolelist",
    method: "get"
  });
};

//获取角色
export const reqRoleDetail = id => {
  return axios({
    url: baseUrl + "/api/roleinfo",
    method: "get",
    params: {
      id: id
    }
  });
};

//修改角色
export const reqRoleEdit = user => {
  return axios({
    url: baseUrl + "/api/roleedit",
    method: "post",
    data: qs.stringify(user)
  });
};

export const reqRoleDel = id => {
  return axios({
    url: baseUrl + "/api/roledelete",
    method: "post",
    data: qs.stringify({ id: id })
  });
};

//============角色管理   结束=============

//============管理员管理  开始=============
//添加角色
export const reqUserAdd = user => {
  return axios({
    url: baseUrl + "/api/useradd",
    method: "post",
    data: qs.stringify(user)
  });
};

//获取列表
export const reqUserList = p => {
  return axios({
    url: baseUrl + "/api/userlist",
    method: "get",
    params: p
  });
};

//删除
export const reqUserDel = uid => {
  return axios({
    url: baseUrl + "/api/userdelete",
    method: "post",
    data: qs.stringify({ uid: uid })
  });
};

//一条数据
export const reqUserDetail = uid => {
  return axios({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params: { uid: uid }
  });
};

//修改数据
export const reqUserEdit = user => {
  return axios({
    url: baseUrl + "/api/useredit",
    method: "post",
    data: qs.stringify(user)
  });
};

//总数
export const reqUserCount = () => {
  return axios({
    url: baseUrl + "/api/usercount",
    method: "get"
  });
};

//登录接口
export const reqLogin = user => {
  return axios({
    url: baseUrl + "/api/userlogin",
    method: "post",
    data: qs.stringify(user)
  });
};

//============管理员管理  结束=============

//============会员管理  开始=============

export const reqVipList = () => {
  return axios({
    url: baseUrl + "/api/memberlist",
    method: "get"
  });
};

export const reqVipDetail = uid => {
  return axios({
    url: baseUrl + "/api/memberinfo",
    method: "get",
    params: { uid: uid }
  });
};

export const reqVipEdit = vip => {
  return axios({
    url: baseUrl + "/api/memberedit",
    method: "post",
    data: qs.stringify(vip)
  });
};
//============会员管理  结束=============

//============商品规格  开始=============

//添加商品分类
export const reqCateAdd = cate => {
  let d = new FormData();
  for (let i in cate) {
    d.append(i, cate[i]);
  }
  return axios({
    url: baseUrl + "/api/cateadd",
    method: "post",
    data: d
  });
};

//商品分类列表 p:{istree:true} p:{pid:1}
export const reqCateList = p => {
  return axios({
    url: baseUrl + "/api/catelist",
    method: "get",
    params: p
  });
};

//获取商品分类
export const reqCateDetail = id => {
  return axios({
    url: baseUrl + "/api/cateinfo",
    method: "get",
    params: {
      id: id
    }
  });
};

//修改商品分类
export const reqCateEdit = cate => {
  let d = new FormData();
  for (let i in cate) {
    d.append(i, cate[i]);
  }
  return axios({
    url: baseUrl + "/api/cateedit",
    method: "post",
    data: d
  });
};

export const reqCateDel = id => {
  return axios({
    url: baseUrl + "/api/catedelete",
    method: "post",
    data: qs.stringify({ id: id })
  });
};

//============商品分类管理   结束=============

//============商品规格  开始=============
//添加角色
export const reqspecsAdd = specs => {
  return axios({
    url: baseUrl + "/api/specsadd",
    method: "post",
    data: qs.stringify(specs)
  });
};

//获取列表
export const reqspecsList = p => {
  return axios({
    url: baseUrl + "/api/specslist",
    method: "get",
    params: p
  });
};

//删除
export const reqspecsDel = id => {
  return axios({
    url: baseUrl + "/api/specsdelete",
    method: "post",
    data: qs.stringify({ id: id })
  });
};

//一条数据
export const reqspecsDetail = id => {
  return axios({
    url: baseUrl + "/api/specsinfo",
    method: "get",
    params: { id: id }
  });
};

//修改数据
export const reqspecsEdit = specs => {
  return axios({
    url: baseUrl + "/api/specsedit",
    method: "post",
    data: qs.stringify(specs)
  });
};

//总数
export const reqspecsCount = () => {
  return axios({
    url: baseUrl + "/api/specscount",
    method: "get"
  });
};
//============商品规格  结束=============

//============轮播图规格  开始=============

//添加轮播图分类
export const reqBannerAdd = banner => {
  let d = new FormData();
  for (let i in banner) {
    d.append(i, banner[i]);
  }
  return axios({
    url: baseUrl + "/api/banneradd",
    method: "post",
    data: d
  });
};

//轮播图分类列表
export const reqBannerList = () => {
  return axios({
    url: baseUrl + "/api/bannerlist",
    method: "get"
  });
};

//获取轮播图分类
export const reqBannerDetail = id => {
  return axios({
    url: baseUrl + "/api/bannerinfo",
    method: "get",
    params: {
      id: id
    }
  });
};

//修改轮播图分类
export const reqBannerEdit = banner => {
  let d = new FormData();
  for (let i in banner) {
    d.append(i, banner[i]);
  }
  return axios({
    url: baseUrl + "/api/banneredit",
    method: "post",
    data: d
  });
};

export const reqBannerDel = id => {
  return axios({
    url: baseUrl + "/api/bannerdelete",
    method: "post",
    data: qs.stringify({ id: id })
  });
};

//============轮播图分类管理   结束=============

//============商品管理  开始=============

//添加商品分类
export const reqGoodsAdd = goods => {
  let d = new FormData();
  for (let i in goods) {
    d.append(i, goods[i]);
  }
  return axios({
    url: baseUrl + "/api/goodsadd",
    method: "post",
    data: d
  });
};

//商品分类列表 p{size,page,fid,sid}
export const reqGoodsList = p => {
  return axios({
    url: baseUrl + "/api/goodslist",
    method: "get",
    params: p
  });
};

//获取商品分类
export const reqGoodsDetail = id => {
  return axios({
    url: baseUrl + "/api/goodsinfo",
    method: "get",
    params: {
      id: id
    }
  });
};

//总数
export const reqGoodsCount = () => {
  return axios({
    url: baseUrl + "/api/goodscount",
    method: "get"
  });
};

//修改商品分类
export const reqGoodsEdit = goods => {
  let d = new FormData();
  for (let i in goods) {
    d.append(i, goods[i]);
  }
  return axios({
    url: baseUrl + "/api/goodsedit",
    method: "post",
    data: d
  });
};

export const reqGoodsDel = id => {
  return axios({
    url: baseUrl + "/api/goodsdelete",
    method: "post",
    data: qs.stringify({ id: id })
  });
};

//============商品管理   结束=============

//============秒杀活动  开始=============
//添加角色
export const reqSeckAdd = seck => {
  return axios({
    url: baseUrl + "/api/seckadd",
    method: "post",
    data: qs.stringify(seck)
  });
};

//获取列表
export const reqSeckList = () => {
  return axios({
    url: baseUrl + "/api/secklist",
    method: "get"
  });
};

//删除
export const reqSeckDel = id => {
  return axios({
    url: baseUrl + "/api/seckdelete",
    method: "post",
    data: qs.stringify({ id: id })
  });
};

//一条数据
export const reqSeckDetail = id => {
  return axios({
    url: baseUrl + "/api/seckinfo",
    method: "get",
    params: { id: id }
  });
};

//修改数据
export const reqSeckEdit = seck => {
  return axios({
    url: baseUrl + "/api/seckedit",
    method: "post",
    data: qs.stringify(seck)
  });
};

//============秒杀活动  结束=============
