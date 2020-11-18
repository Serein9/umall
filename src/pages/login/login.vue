<template>
  <div class="box">
    <div class="con">
      <h2>登录</h2>
      <div>
        <el-input v-model="user.username" placeholder="请输入账号" clearable></el-input>
      </div>
      <div>
        <el-input v-model="user.password" placeholder="请输入密码" show-password clearable></el-input>
      </div>
      <div class="btn">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../utils/alert";
import { reqLogin } from "../../utils/http";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  mounted() {},
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    login() {
      reqLogin(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert("登录成功");
          //存入vuex
          this.changeUser(res.data.list);
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: linear-gradient(to right, #543444, #403A53, #303D5F);
}
.con {
  width: 400px;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 15px;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}
.el-input {
  margin-bottom: 15px;
}
.btn {
  text-align: center;
}
</style>