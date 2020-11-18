<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <div class="myUpload">
            <h3>+</h3>
            <img :src="imgUrl" class="img" v-if="imgUrl" />
            <input type="file" v-if="info.isshow" class="ipt" @change="changeFile" />
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title==='添加轮播图'" @click="add">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { errorAlert, successAlert } from "../../../utils/alert";
import path from "path";
import {
  reqBannerAdd,
  reqBannerDetail,
  reqBannerEdit,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        img: "",
        status: 1,
      },
      imgUrl: "",
    };
  },
  mounted() {},
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqList: "banner/reqList",
    }),
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        title: "",
        img: "",
        status: 1,
      };
      this.imgUrl = "";
    },
    changeFile(e) {
      //   console.log(e);
      let file = e.target.files[0];
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
      reqBannerAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
    },
    getOne(id) {
      reqBannerDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.imgUrl = this.$imgPre + this.user.img;
          this.user.id = id;
        }
      });
    },
    update() {
      reqBannerEdit(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqList();
        }
      });
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