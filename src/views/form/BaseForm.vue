<template>
    <div class="app-container">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>个人信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="表单名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="选择器">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="1" label="下拉1" value="1"></el-option>
                            <el-option key="2" label="下拉2" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="日期时间">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="多选框">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="多选1" name="type"></el-checkbox>
                            <el-checkbox label="多选2" name="type"></el-checkbox>
                            <el-checkbox label="多选3" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="文本框">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
      name: 'baseform',
      data: function() {
        return {
          options: [
            {
              value: 'guangdong',
              label: '广东省',
              children: [
                {
                  value: 'guangzhou',
                  label: '广州市',
                  children: [
                    {
                      value: 'tianhe',
                      label: '天河区'
                    },
                    {
                      value: 'haizhu',
                      label: '海珠区'
                    }
                  ]
                },
                {
                  value: 'dongguan',
                  label: '东莞市',
                  children: [
                    {
                      value: 'changan',
                      label: '长安镇'
                    },
                    {
                      value: 'humen',
                      label: '虎门镇'
                    }
                  ]
                }
              ]
            },
            {
              value: 'hunan',
              label: '湖南省',
              children: [
                {
                  value: 'changsha',
                  label: '长沙市',
                  children: [
                    {
                      value: 'yuelu',
                      label: '岳麓区'
                    }
                  ]
                }
              ]
            }
          ],
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: true,
            type: ['步步高'],
            resource: '小天才',
            desc: '',
            options: []
          }
        }
      },
      methods: {
        onSubmit() {
          this.$message.success('提交成功！')
        }
      }
    }
</script>
