<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../../utils/alert";
import { reqVipDetail, reqVipEdit } from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      },
    };
  },
  mounted() {},
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({ reqList: "vip/reqList" }),
    getOne(uid) {
      reqVipDetail(uid).then((res) => {
        this.user = res.data.list;
      });
    },
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      };
    },
    getOne(uid) {
      reqVipDetail(uid).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.password = "";
        }
      });
    },
    update() {
      reqVipEdit(this.user).then((res) => {
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
</style>