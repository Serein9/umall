<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 列表 -->
    <v-list :userList="userList" @init="newInit" @edit="edit"></v-list>

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
    <v-form :info="info" @init="newInit" ref="form"></v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
import { reqUserCount, reqUserList } from "../../utils/http";
import { successAlert } from "../../utils/alert";
export default {
  components: {
    vList,
    vForm,
  },
  data() {
    return {
      info: {
        title: "添加角色",
        isshow: false,
      },
      userList: [],
      page: 1,
      size: 2,
      total: 0,
    };
  },
  mounted() {
    this.init();
    this.getCount();
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info.title = "添加角色";
      this.info.isshow = true;
    },
    init() {
      reqUserList({ page: this.page, size: this.size }).then((res) => {
        let list = res.data.list ? res.data.list : [];
        if (list.length === 0 && this.page > 1) {
          this.page--;
          this.init();
          return;
        }
        this.userList = res.data.list;
      });
    },
    edit(uid) {
      this.info.isshow = true;
      this.info.title = "编辑角色";
      this.$refs.form.getOne(uid);
    },
    getCount() {
      reqUserCount().then((res) => {
        this.total = res.data.list[0].total;
      });
    },
    newInit() {
      this.init();
      this.getCount();
    },

    changePage(page) {
      this.page = page;
      this.init();
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