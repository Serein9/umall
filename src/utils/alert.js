import Vue from "vue";
let vm = new Vue();

export const successAlert = msg => {
  return vm.$message({
    message: msg,
    type: "success"
  });
};

export const errorAlert = msg => {
  return vm.$message({
    message: msg,
    type: "warning"
  });
};
