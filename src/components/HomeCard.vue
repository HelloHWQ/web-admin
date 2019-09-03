<template>
  <div class="layui-card">
    <div class="layui-card-header">
      {{title}}
      <span class="layui-badge layuiadmin-badge" :class="colorType">{{unit}}</span>
    </div>
    <div class="layui-card-body layuiadmin-card-list">
      <p class="layuiadmin-big-font">{{count}}</p>
      <p>
        {{totaltitle}}
        <span class="layuiadmin-span-color">
          {{totalcount}}
          <i class="layui-inline layui-icon layui-icon-flag"></i>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
    props: ['title','count','unit','totaltitle','totalcount','type'],
    data: function () {
        return {

        }
    },
    computed: {
        colorType: function () {
            if(this.type) {
                return 'layui-bg-'+this.type;
            } else {
                return 'layui-bg-blue'
            }
        }
    }
};
</script>

<style scoped>

</style>