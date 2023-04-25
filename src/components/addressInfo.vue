<template>
  <div>
    <section>
      <div class="infodesc">
        <el-descriptions class="margin-top" title="地址信息" :column="3" border>
          <template slot="extra">
            <el-button type="danger" size="small" @click="dialogFormVisible = true"><label style="color:#fff"
                for="">修改</label></el-button>
          </template>
          <el-descriptions-item>
            <template slot="label"> <i class="iconfont icon-shengfenzuobiao"></i>省级</template>
            贵州省
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i class="iconfont icon-shizhongxin"></i>市级</template>
            遵义市
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i class="el-icon-location-outline"></i>区/县</template>
            习水县
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              备注
            </template>
            <el-tag size="small">家</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              详细地址
            </template>
            江苏省苏州市吴中区吴中大道 1188 号
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </section>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formLabelWidth: '120px',
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    changeuserinfo() { }
  }
}
</script>
<style lang="less" scoped>
.infodesc {
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
}
</style>
