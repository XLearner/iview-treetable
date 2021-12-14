<template>
  <div>
    <h1>Hello vue</h1>
    <!-- <Table
      class="table"
    ></Table> -->
    <TreeTable
      :columns="columns"
      :tbHeight="500"
      :data="tableData"
      :loadFunc="loadTable"
      @mousemove.native="mouseMove"
    ></TreeTable>
  </div>
</template>

<script>
import TreeTable from "./TreeTable/TreeTable.vue";
export default {
  components: {
    TreeTable
  },
  data() {
    return {
      columns: [
        {
          title: "标题1",
          key: "title1"
        },
        {
          title: "标题2",
          key: "title2"
        },
        {
          title: "标题3",
          key: "title3"
        },
        {
          title: "标题4",
          key: "title4"
        },
      ],
      tableData: [
        {
          title1: "1",
          title2: "2",
          title3: "3",
          title4: "4",
        }
      ]
    }
  },
  methods: {
    loadTable() {
      console.log("loading func")
    },
    mouseMove() {
      
    }
  },
}
</script>

<style lang="less" scoped>
.table {
  width: 100%;
}

</style>