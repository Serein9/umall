<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed" @opened="opened">
      <el-form :model="user" :rules="rules" >
        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
          <el-select v-model="user.first_cateid" placeholder="请选择" @change="changeFirst">
            <el-option
              v-for="item in cateList"
              :label="item.catename"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select v-model="user.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondCateList"
              :label="item.catename"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="120px" prop="goodsname">
          <el-input v-model="user.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px" prop="price">
          <el-input v-model="user.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px" prop="market_price">
          <el-input v-model="user.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <div class="myUpload">
            <h3>+</h3>
            <img :src="imgUrl" class="img" v-if="imgUrl" />
            <input type="file" v-if="info.isshow" class="ipt" @change="changeFile" />
          </div>
        </el-form-item>
        <el-form-item label="商品规格" label-width="120px" prop="specsid">
          <el-select v-model="user.specsid" placeholder="请选择" @change="changeSpecsId">
            <el-option
              v-for="item in specsList"
              :label="item.specsname"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px" prop="specsattr">
          <el-select v-model="user.specsattr" placeholder="请选择二级分类" multiple>
            <el-option v-for="item in attrList" :label="item" :key="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="120px" >
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="描述" label-width="120px">
          <div v-if="info.isshow" id="edit"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title==='添加商品'">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import path from "path";
import { mapActions, mapGetters } from "vuex";
import { errorAlert, successAlert } from "../../../utils/alert";
import {
  reqCateList,
  reqGoodsAdd,
  reqGoodsDel,
  reqGoodsDetail,
  reqGoodsEdit,
  reqspecsAdd,
  reqspecsDetail,
  reqspecsEdit,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      imgUrl: "",
      secondCateList: [],
      attrList: [],
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        goodsname: [
          { required: true, message: "请填写商品名称", trigger: "blur" },
        ],
        price: [{ required: true, message: "请填写价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请填写市场价格", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "change" },
        ],
        specsattr: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个商品规格",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    this.reqcateList();
    this.reqspecsList(true);
  },
  computed: {
    ...mapGetters({
      //一级分类list
      cateList: "cate/list",
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqcateList: "cate/reqList",
      reqspecsList: "specs/reqList",
      reqgoodsList: "goods/reqList",
      reqgoodsCount: "goods/reqCount",
    }),
    //验证
    check() {
      return new Promise((resolve, reject) => {
        //验证
        if (this.user.first_cateid === "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.user.second_cateid === "") {
          errorAlert("二级分类不能为空");
          return;
        }
        if (this.user.goodsname === "") {
          errorAlert("商品名称不能为空");
          return;
        }
        if (this.user.price === "") {
          errorAlert("商品价格不能为空");
          return;
        }
        if (this.user.market_price === "") {
          errorAlert("商品市场价格不能为空");
          return;
        }
        if (!this.user.img) {
          errorAlert("请选择图片");
          return;
        }
        if (this.user.specsid === "") {
          errorAlert("请选择商品规格");
          return;
        }
        if (this.user.specsattr.length === 0) {
          errorAlert("请选择商品属性");
          return;
        }
        if (this.editor.txt.html() === "") {
          errorAlert("请输入商品描述");
          return;
        }
        resolve();
      });
    },
    empty() {
      this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imgUrl = "";
      this.secondCateList = [];
      this.attrList = [];
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
    changeSpecsId() {
      this.user.specsattr = [];
      this.getAttrs();
    },
    getAttrs() {
      let obj = this.specsList.find((item) => item.id === this.user.specsid);
      this.attrList = obj.attrs;
    },
    changeFile(e) {
      let file = e.target.files[0];
      // console.log(file);
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件大小不能超过2M");
        return;
      }
      let extname = path.extname(file.name);
      let arr = [".jpg", ".jpeg", "png", "gif"];
      if (!arr.includes(extname)) {
        errorAlert("请上传正确的图片格式");
        return;
      }
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    add() {
      this.check().then(() => {
        // this.user.specsattr = JSON.stringify(this.user.specsattr);
        this.user.description = this.editor.txt.html();
        let d = { ...this.user };
        d.specsattr = JSON.stringify(d.specsattr);
        reqGoodsAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.cancel();
            this.empty();
            this.reqgoodsList();
            this.reqgoodsCount();
          }
        });
      });
    },
    getOne(id) {
      reqGoodsDetail(id).then((res) => {
        this.user = res.data.list;
        this.user.id = id;
        //请求二级的list
        this.getSecondList();
        //图片
        this.imgUrl = this.$imgPre + this.user.img;
        //属性
        this.user.specsattr = JSON.parse(this.user.specsattr);
        //计算规格属性的list
        this.getAttrs();
        //给编辑器赋值
        if (this.editor) {
          this.editor.txt.html(this.user.description);
        }
      });
    },
    update() {
      this.check().then(() => {
        this.user.description = this.editor.txt.html();
        let d = { ...this.user };
        d.specsattr = JSON.stringify(d.specsattr);
        reqGoodsEdit(d).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.cancel();
            this.empty();
            this.reqgoodsList();
          }
        });
      });
    },
    cancel() {
      this.info.isshow = false;
    },
    closed() {
      if (this.info.title == "编辑商品") {
        this.empty();
      }
    },
    opened() {
      this.editor = new E("#edit");
      this.editor.create();
      this.editor.txt.html(this.user.description);
    },
  },
};
</script>

<style scoped>
.myUpload {
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  position: relative;
}
.myUpload h3 {
  width: 100%;
  text-align: center;
  height: 100px;
  line-height: 100px;
  font-size: 30px;
  color: #666;
}
.myUpload .ipt {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.myUpload .img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>