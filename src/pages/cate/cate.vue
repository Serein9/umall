<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
export default {
  components: { vList, vForm },
  data() {
    return {
      info: {
        isshow: false,
        title: "添加分类",
      },
    };
  },
  mounted() {},
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info.isshow = true;
      this.info.title = "添加分类";
    },
    edit(id) {
      this.info = {
        isshow: true,
        title: "编辑分类",
      };
      this.$refs.form.getOne(id);
    },
  },
};
</script>

<style scoped>
</style>