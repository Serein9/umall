<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" label-width="120px">
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="120px">
          <el-select v-model="user.first_cateid" placeholder="请选择一级分类" @change="changeFirst">
            <el-option
              v-for="item in cateList"
              :label="item.catename"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="user.second_cateid" placeholder="请选择二级分类" @change="changeGoodsId">
            <el-option
              v-for="item in secondCateList"
              :label="item.catename"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="120px">
          <el-select v-model="user.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in attrList"
              :label="item.goodsname"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title==='添加秒杀'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { errorAlert, successAlert } from "../../../utils/alert";
import {
  reqCateList,
  reqGoodsAdd,
  reqGoodsDel,
  reqGoodsDetail,
  reqGoodsEdit,
  reqSeckAdd,
  reqGoodsList,
  reqspecsAdd,
  reqspecsDetail,
  reqspecsEdit,
  reqSeckDetail,
  reqSeckEdit,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      secondCateList: [],
      goodsAttr: [],
      attrList: [],
      value: [],
    };
  },
  mounted() {
    this.reqcateList();
    this.reqspecsList(true);
    this.reqseckList();
  },
  computed: {
    ...mapGetters({
      //一级分类list
      cateList: "cate/list",
      specsList: "specs/list",
      seckillList: "seckill/list",
      goodsList: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      reqcateList: "cate/reqList",
      reqspecsList: "specs/reqList",
      reqgoodsList: "goods/reqList",
      reqseckList: "seckill/reqList",
    }),

    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.secondCateList = [];
      this.attrList = [];
      this.value = [];
    },
    changeFirst() {
      this.user.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reqCateList({ pid: this.user.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },
    changeGoodsId() {
      this.user.goodsid = "";
      this.getAttrs();
    },
    getAttrs() {
      reqGoodsList({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid,
      }).then((res) => {
        this.attrList = res.data.list;
      });
    },

    add() {
      this.user.begintime = this.value[0].getTime();
      this.user.endtime = this.value[1].getTime();
      console.log(this.user);
      reqSeckAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqseckList();
        }
      });
    },
    getOne(id) {
      reqSeckDetail(id).then((res) => {
        this.user = res.data.list;
        this.user.id = id;
        //请求二级的list
        this.getSecondList();
        //计算规格属性的list
        this.getAttrs();
        //日期
        this.value.push(
          new Date(JSON.parse(this.user.begintime)),
          new Date(JSON.parse(this.user.endtime))
        );
      });
    },
    update() {
      this.user.begintime = this.value[0].getTime();
      this.user.endtime = this.value[1].getTime();
      reqSeckEdit(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqseckList();
        }
      });
    },
    cancel() {
      this.info.isshow = false;
    },
    closed() {
      if (this.info.title == "编辑秒杀") {
        this.empty();
      }
    },
  },
};
</script>

<style scoped>
</style>