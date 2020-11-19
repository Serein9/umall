<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 列表 -->
    <v-list @edit="edit"></v-list>

    <!-- 分页 -->
    <!-- total:总数 page-size:一页的数量 current-change:当前野马发生了修改 会触发 回调函数的参数就是新的页码 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>

    <!-- 弹框 -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
import { successAlert } from "../../utils/alert";
export default {
  components: {
    vList,
    vForm,
  },
  data() {
    return {
      info: {
        title: "添加管理员",
        isshow: false,
      },
    };
  },
  mounted() {
    this.reqList();
    this.reqCount();
  },
  computed: {
    ...mapGetters({
      total: "manage/total",
      size: "manage/size",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "manage/reqList",
      reqCount: "manage/reqCount",
      changePage: "manage/changePage",
    }),
    willAdd() {
      this.info.title = "添加管理员";
      this.info.isshow = true;
    },

    edit(uid) {
      this.info.isshow = true;
      this.info.title = "编辑管理员";
      this.$refs.form.getOne(uid);
    },
  },
};
</script>

<style scoped>
.el-button {
  margin-bottom: 20px;
}
.el-pagination {
  float: right;
}
</style>