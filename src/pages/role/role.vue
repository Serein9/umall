<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 列表 -->
    <v-list @edit="edit"></v-list>
    <!-- 弹框 -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
import { reqRoleList } from "../../utils/http";
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
      reqList: "role/reqList",
    }),
    willAdd() {
      this.info.isshow = true;
      this.info.title = "添加角色";
    },

    edit(id) {
      this.info.title = "编辑角色";
      this.info.isshow = true;
      this.$refs.form.getOne(id);
    },
  },
};
</script>

<style scoped>
.el-button {
  margin-bottom: 20px;
}
</style>