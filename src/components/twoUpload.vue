<template>
  <div class="upload-wrap">
    <el-upload ref="upload" :action="upload_qiniu_area" :auto-upload="false" :limit="3"
      accept="image/jpg,image/png,image/jpeg" :file-list="fileList" list-type="picture-card" :on-preview="picCardPreview"
      :before-upload="beforePicUpload" :on-exceed="handleExceed" :on-remove="removePic" :http-request="uploadQiniu">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl">
    </el-dialog>
    <el-button plain type="primary" class="buttonupload" @click="submitUpload">上传图片</el-button>
  </div>
</template>

<script>
// 七牛云返回储存图片的子域名
// import { getUploadToken } from './common/upload';
const upload_qiniu_address = 'http://donkey.yuanyexiao.cn/'

export default {
  name: 'UploadPicture',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      upload_qiniu_area: 'https://up-z1.qiniup.com/', // 七牛云上传储存区域的上传域名
      token: ''
    }
  },
  created() {
    // getUploadToken().then(result => { // 获取token
    //   this.token = result.data
    // })
    this.getUploadToken()
  },
  methods: {
    submitUpload() { // 提交上传
      this.$refs.upload.submit()
    },
    async getUploadToken() {
      const { data: res } = await this.$axios.get('/qiniu/qiniuUpToken')
      this.token = res.token
    },
    picCardPreview(file) { // 上传图预览
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforePicUpload(file) { // 图片校验
      const limitPic = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg'
      if (!limitPic) {
        this.$notify.warning({
          title: '警告',
          message: '请上传格式为image/png,image/jpg,image/jpeg的图片'
        })
      }
      const limitSize = file.size / 1024 / 1024 / 2 < 2
      if (!limitSize) {
        this.$notify.warning({
          title: '警告',
          message: '图片大小必须小于2M'
        })
      }
      return limitPic && limitSize
    },
    removePic(file, fileList) { // 移除图片
      this.fileList = fileList
    },
    handleExceed() { // 文件超出个数限制
      this.$notify.warning({
        title: '警告',
        message: '一次只能上传三张图片',
        duration: 2000
      })
    },
    uploadQiniu(request) { // 上传七牛
      this.handleUpload(request).then((result) => {
        if (!result.data.key) {
          this.$message.error({ message: '图片上传失败,请重新上传', duration: 2000 })
        } else {
          this.fileList.push({ url: upload_qiniu_address + result.data.key })
          this.$emit('uploadSuccess', this.fileList)
        }
      }).catch((err) => {
        this.$message.error({ message: `图片上传失败${err}`, duration: 2000 })
      })
    },
    handleUpload(request) {
      const promise = new Promise((resolve, reject) => {
        const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        let fileType = ''
        if (request.file.type === 'image/jpg') {
          fileType = 'jpg'
        } else if (request.file.type === 'image/png') {
          fileType = 'png'
        } else if (request.file.type === 'image/jpeg') {
          fileType = 'jpeg'
        }
        const key = `front_${new Date().getTime()}${Math.floor(Math.random() * 100)}.${fileType}`// 自定义图片名

        const fd = new FormData()
        fd.append('file', request.file)
        fd.append('token', this.token)
        fd.append('key', key)
        this.$axios.post(this.upload_qiniu_area, fd, config).then(res => {
          if (res.status === 200 && res.data) {
            resolve(res)
          } else {
            reject(res)
          }
        }).catch(err => {
          this.$message.error({ message: `上传失败[${err.status}]`, duration: 2000 })
        })
      })
      return promise
    }
  }
}
</script>

<style lang="less" scoped>
.upload-wrap {
  display: flex;
  align-items: flex-end;
  justify-content: left;
  //margin-top: 50px;
}

.el-button {
  margin-left: 20px;
}
</style>
