<template>
  <div>
    <Table
      ref="tableRef"
      :columns="columns" 
      :data="tableDatas" ></Table>
      
      <!-- 
      highlight-row
      @on-row-click="clickRow" -->
  </div>
</template>

<script>

import InnerPagesTable from "./tablePages.vue"
import InnerTable from "./tableBody.vue";


export default {
  name: "self-table-body",
  components: {
    InnerPagesTable,
    InnerTable,
  },
  props: {
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    // data: {
    //   type: Array,
    //   required: true,
    //   default: () => []
    // },
    loadFunc: {
      type: Function,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      // tableTitles: [],
      tableDatas: [],
    }
  },
  mounted () {
    // this.getRowData();
    this.loadFunc(this.$attrs.params).then(
      res => {
        this.tableDatas = res.data;
        setTimeout(() => {
          // 修正下钻表格少的1px
          let tableBody = document.querySelectorAll('.ivu-table-expanded-cell .ivu-table .ivu-table-body table');
          tableBody = tableBody[tableBody.length - 2] || tableBody[tableBody.length - 1];
          let width = tableBody.offsetWidth;
          tableBody.style.width = width - 2 + "px";
        }, 500)
      }
    );
  },
  methods: {
    clickRow(item, index) {
      if (index == this.hightLightRowIndex) {
        this.$refs.tableRef.clearCurrentRow();
        this.hightLightRowIndex = null;
      } else {
        this.hightLightRowIndex = index;
      }
    },

    // getRowData() {
    //   let transiData = this.$attrs.params;

    //   let params = {
    //     dataDt: this.$utils.date2Varchar(transiData.dataDt),
    //     tagNodeId: transiData.tagNodeId
    //   };

    //   loadFunc(params).then(result => {
    //     if (result.success) {
    //       console.log(result.data)
    //       this.tableDatas = result.data;
    //       // callback(this.handleTableData(result.data));
    //       // setTimeout(() => {
    //       //   // callback(this.handleTableData(result.data.slice(20, 40)));
    //       //   console.log(this.tableData)
    //       // }, 1000)
    //       // if(result.data.length == 0) {
    //       //   delete item._loading;
    //       // }
    //     }
    //   })
    // }
  },
}
</script>

<style lang="less" scoped>
@deep: ~">>>";

@{deep} .ivu-table-header {
  display: none;
}


@{deep} .ivu-table-body {
  margin-right: -2px;
  tr {
    td:first-child {
      border-left: 0;
    }
    td:last-child {
      border-right: 0;
    }
  }
}



</style>