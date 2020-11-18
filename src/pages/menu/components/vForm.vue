<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
       
        <el-form-item label="菜单图标" label-width="120px" v-if="form.type===1">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icon" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="120px" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in routers"
              :key="item.path"
              :value="'/'+item.path"
              :label="item.name+'--/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title==='添加菜单'">添 加</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { routers } from "../../../router/index";
import { reqMenuAdd, reqMenuDetail, reqMenuEdit } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["info", "list"],

  data() {
    return {
      routers: routers,
      icon: [
        "el-icon-setting",
        "el-icon-help",
        "el-icon-s-operation",
        "el-icon-info",
      ],
      form: {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
    };
  },
  methods: {
    //取消
    cancel() {
      this.info.isshow = false;
    },
    changePid() {
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    add() {
      reqMenuAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert("添加成功");
          this.empty();
          this.cancel();
          //通知menu刷新
          this.$emit("init");
        } 
      });
    },
    //置空form
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      };
    },
    update() {
      reqMenuEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.cancel();
          this.empty();
          this.$emit("init");
        } 
      });
    },
    getOne(id) {
      reqMenuDetail(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    closed() {
      if (this.info.title === "编辑表单") {
        this.empty();
      }
    },
  },
};
</script>

<style>
</style>