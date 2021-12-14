<template>
  <div>
    <Table
      ref="tableRef"
      highlight-row
      @on-row-click="clickRow"
      stripe
      :loading="loadingStatus"
      :columns="tableTitles" 
      :data="tableDatas" ></Table>
    
    <Page 
      ref="pagesRef"
      class="page-select-size"
      show-total
      size="small"
      v-if="ifPage"
      :page-size="20"
      :current.sync="pageIndex"
      :total="pageTotal"
      :transfer="true"
      @on-change="changePage" ></Page>
  </div>
</template>

<script>

export default {
  name: "table-inner-pages",
  props: {
    columns: {
      required: true,
      type: Array,
      default: () => []
    },
    loadFunc: {
      type: Function,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      loadingStatus: false,
      ifPage: false,
      pageIndex: 1,
      pageTotal: 0,
      _tableHeader: [
        {
          title: " ",
          width: 50
        },
      ],
      cacheTableData: [],
    }
  },
  computed: {
    tableDatas() {
      let startIndex = (this.pageIndex - 1) * 20;
      let endIndex = this.pageIndex * 20;
      return this.cacheTableData.slice(startIndex, endIndex);
    },

    tableTitles() {
      let columns = this.$utils.deepCopy(this.columns);
      columns.unshift({
        title: " ",
        width: 50
      })
      return columns;
    }
  },
  mounted () {

    // this.getRowData();
    this.loadingStatus = true;
    this.loadFunc(this.$attrs.params).then(
      result => {
        if (result.success) {
          this.cacheTableData = result.data;
          this.pageTotal = result.data.length;
          if (result.data.length < 20) {
            this.ifPage = false;
          } else {
            this.ifPage = true;
          }
          // callback(this.handleTableData(result.data));
          setTimeout(() => {
            // 修正下钻表格少的1px
            let tableBody = document.querySelectorAll('.ivu-table-expanded-cell .ivu-table .ivu-table-body table');
            tableBody = tableBody[tableBody.length - 2] || tableBody[tableBody.length - 1];
            let width = tableBody.offsetWidth;
            tableBody.style.width = width - 1 + "px";
          }, 500)
          // if(result.data.length == 0) {
          //   delete item._loading;
          // }
        }
      }).finally(res => {
        this.loadingStatus = false;
      })
  },
  methods: {
    changePage(index) {
      this.pageIndex = index;
    },
    
    getRowData() {
      this.loadingStatus = true;
      let transiData = this.$attrs.params;

      let params = {
        dataDt: this.$utils.date2Varchar(transiData.dataDt),
        tagNodeId: transiData.tagNodeId
      };

      this.loadFunc(params).then(result => {
        if (result.success) {
          this.cacheTableData = result.data;
          this.pageTotal = result.data.length;
          // callback(this.handleTableData(result.data));
          setTimeout(() => {
            // 修正下钻表格少的1px
            let tableBody = document.querySelectorAll('.ivu-table-expanded-cell .ivu-table .ivu-table-body table');
            tableBody = tableBody[tableBody.length - 2] || tableBody[tableBody.length - 1];
            let width = tableBody.offsetWidth;
            tableBody.style.width = width + 1 + "px";
          }, 500)
          // if(result.data.length == 0) {
          //   delete item._loading;
          // }
        }
      }).finally(res => {
        this.loadingStatus = false;
      })
    },
    
    clickRow(item, index) {
      if (index == this.hightLightRowIndex) {
        this.$refs.tableRef.clearCurrentRow();
        this.hightLightRowIndex = null;
      } else {
        this.hightLightRowIndex = index;
      }
    },
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

  &.ivu-table-overflowX {
    overflow-x: clip;
  }
}

</style>