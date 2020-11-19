<template>
  <div>
    <v-list @edit="edit"></v-list>
    <v-form :info="info" ref="form"></v-form>
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
      info: {
        isshow: false,
        title: "编辑角色",
      },
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
      reqList: "vip/reqList",
    }),

    edit(uid) {
      this.info.isshow = true;
      this.$refs.form.getOne(uid);
    },
  },
};
</script>

<style scoped>
</style>