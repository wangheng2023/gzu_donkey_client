<template>
  <div>
    <div class="main">
      <h3>账号绑定</h3>
      <div class="zhlist">
        <ul>
          <li v-for="(item, index) in zhlist" :key="index">
            <div class="zhitem">
              <div class="left">
                <div class="icon el-icon-circle-check"></div>
                <div style="margin-left: 30px;">
                  <div class="content">
                    {{ item.cate }}
                  </div>
                  {{ item.number }}
                </div>
              </div>
              <div class="btn">
                <el-button @click="openDialog(item.cate)" type="text">修改</el-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 手机号修改框 -->
    <el-dialog :visible.sync="dialogVisible" title="修改" width="50%" @close="resetform1">
      <el-form ref="ruleFormRef1" :model="form" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="手机号" prop="title">
          <el-input v-model="form.phone" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="sureadd">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 邮箱修改框 -->
    <el-dialog :visible.sync="dialogVisible1" title="修改" width="50%" @close="resetform2">
      <el-form ref="ruleFormRef2" :model="form" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="邮箱" prop="title">
          <el-input v-model="form.email" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="sureadd">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog width="30%" title="修改密码" :visible.sync="dialogVisible2" @close="resetform3">
      <el-form label-width="0px" ref="regform" :rules="rules" :model="form" class="form_box">
        <el-form-item prop="oldpass">
          <el-input size="large" v-model="form.oldpass" placeholder="请输入旧密码" prefix-icon="iconfont icon-yewuquanxian"
            clearable></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pass">
          <el-input size="large" v-model="form.pass" placeholder="请输入新密码" prefix-icon="el-icon-key" show-password>
          </el-input>
        </el-form-item>
        <!-- 二次密码 -->
        <el-form-item prop="checkPass">
          <el-input size="large" v-model="form.checkPass" placeholder="请再次输入新密码" prefix-icon="el-icon-key" show-password>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormPass('ruleForm')">修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      form: {
        phone: '', // 修改手机号
        email: '', // 修改邮箱
        oldpass: '',
        pass: '',
        checkPass: ''
      },
      zhlist: [
        { cate: '手机号', number: '187****2917' },
        { cate: '邮箱', number: '298******@qq.com' },
        { cate: '密码', number: '******' }
      ]
    }
  },
  methods: {
    openDialog(item) {
      if (item === '手机号') { this.dialogVisible = true }
      if (item === '邮箱') { this.dialogVisible1 = true }
      if (item === '密码') { this.dialogVisible2 = true }
    }
  }
}
</script>
<style lang="less" scoped>
.zhlist {
  width: 80%;
  height: 400px;
  margin-top: 20px;
  margin-left: 20px;
}

ul li {
  display: inline-block;
  width: 100%;
}

:deep(.el-icon-circle-check:before) {
  color: rgb(16, 233, 95);
  font-weight: 700;
}

.zhitem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: #fafafa;
  margin-bottom: 15px;
  border-radius: 18px;

  .left {
    display: flex;
    justify-content: left;
    align-items: center;

    .icon {
      margin-left: 20px;
    }
  }

  .btn {
    margin-right: 20px;
  }
}
</style>
