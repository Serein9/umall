<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 列表-->
    <v-list @edit="edit($event)" :info="info"></v-list>
    <!-- 弹框 -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import vForm from "./components/vForm";
import vList from "./components/vList";
import { mapActions, mapGetters } from "vuex";
import { reqMenuList } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        title: "",
        isshow: false,
      },
      //list.vue和form.vue都需要使用列表数据 所以将列表数据放到menu中,分别传递给两个vue中
      list: [],
    };
  },
  mounted() {
    this.reqList();
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqList: "menu/reqList",
    }),
    willAdd() {
      this.info.isshow = true;
      this.info.title = "添加菜单";
    },

    edit(id) {
      this.info.isshow = true;
      this.info.title = "编辑表单";
      this.$refs.form.getOne(id);
    },
  },
  components: {
    vForm,
    vList,
  },
};
</script>

<style scoped>
.el-button {
  margin-bottom: 20px;
}
</style>