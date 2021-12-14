<template>
  <div class="tree-table-wrap pages-table">
    <Table
      ref="tableRef"
      class="Table-ul-li-size"
      border
      v-on="$listeners"
      :height="tbHeight"
      :columns="headers"
      :data="data"></Table>
      
      <!-- @on-row-click="clickRow"
      highlight-row -->
  </div>
</template>

<script>

import InnerBody from "./components/tableBody.vue";
import InnerPage from "./components/tablePages.vue";

export default {
  name: "tree-table",
  components: {
    InnerBody,
    InnerPage,
  },
  props: {
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    tbHeight: {
      type: Number,
      default: 300
    },
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    loadFunc: {
      type: Function,
      required: true,
      default: () => {}
    }
  },
  computed: {
    headers() {
      let columns = this.$utils.deepCopy(this.columns);
      let item = {
        title: " ",
        type: "expand",
        width: 50,
        render: (h, params) => {
          if (params.row.isPage) {
            return h(InnerPage, {
              props: {
                columns: columns.slice(1),
                loadFunc: this.loadFunc
              },
              attrs: {
                params: params.row
              }
            })
          }
          return h(InnerBody, {
            props: {
              columns: this.headers,
              loadFunc: this.loadFunc
            },
            attrs: {
              params: params.row
            }
          })
        }
      };
      
      columns.unshift(item);
      
      return columns; 
    }
  },
  mounted () {
    // this.loadFunc(this.$attrs.params);
  },
  methods: {
    clickRow(item, index) {
      if (index == this.hightLightRowIndex) {
        this.$refs.tableRef.clearCurrentRow();
        this.hightLightRowIndex = null;
      } else {
        this.hightLightRowIndex = index;
      }
    }
  },
}
</script>

<style lang="less" scoped>
// @import '../../common/pages-table.less';
@deep: ~">>>";

@{deep} td.ivu-table-expanded-cell {
  padding: 0;
}

.pages-table @{deep} .Table-ul-li-size tr td.ivu-table-expanded-cell {
  
  border-bottom: 0;
}



</style>