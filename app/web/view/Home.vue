<template>
  <div>
    <div style="display: flex;justify-content: center;align-items: center;height: 100vh;">
      <el-card style="">
        <div style="width: 600px">
          <el-input style="width:100%"></el-input>
        </div>
        <div style="width: 1000px">{{message}}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message:"loading"  
    };
  },
  mounted() {
    this.$http.get("/home").then(result=>{
      this.message = result.message;
    })
  },
  methods: {
    
  }
};
</script>

<style scoped>
  
</style>