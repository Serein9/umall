<template>
  <div>
    <v-list :vipList="vipList" @edit="edit"></v-list>
    <v-form :info="info" ref="form" @init="init"></v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../utils/alert";
import { reqVipList } from "../../utils/http";
import vForm from "./components/form";
import vList from "./components/list";
export default {
  components: {
    vForm,
    vList,
  },
  data() {
    return {
      vipList: [],
      info: {
        isshow: false,
        title: "编辑角色",
      },
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    init() {
      reqVipList().then((res) => {
        if (res.data.code == 200) {
          this.vipList = res.data.list;
        }
      });
    },
    edit(uid) {
      this.info.isshow = true;
      this.$refs.form.getOne(uid);
    },
  },
};
</script>

<style scoped>
</style>