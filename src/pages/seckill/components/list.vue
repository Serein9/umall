<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="title" label="活动名称"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../../utils/alert";
import { reqSeckDel } from "../../../utils/http";
export default {
  data() {
    return {};
  },
  mounted() {
    this.reqseckList();
  },
  computed: {
    ...mapGetters({
      list: "seckill/list",
    }),
  },
  methods: {
    ...mapActions({
      reqseckList: "seckill/reqList",
    }),
    del(id) {
      reqSeckDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqseckList();
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>