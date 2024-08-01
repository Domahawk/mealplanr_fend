<script setup lang="ts">
import router from "@/router/router.ts";
import {TableItem} from "@/types/tableItem.ts";
import {computed, watch} from "vue";

const props = withDefaults(defineProps<{
  title?: string,
  titleTwo?: string,
  redirectLink?: string,
  tableData: TableItem[],
  tableHeaders?: string[],
}>(), {
  title: 'List',
  titleTwo: 'List',
  redirectLink: '',
  tableData: () => [],
  tableHeaders: () => [],
});

const rowCLickClass = computed(() => {
  if (props.redirectLink) {
    return 'clickable-row'
  }

  return '';
})

const getTableItemHeaders = (): string[] => {
  if (props.tableHeaders.length === 0) {
    if (props.tableData.length === 0) {
      return [];
    }

    return Object.keys(props.tableData[0]).map((item: string) => item.toUpperCase());
  }

  return props.tableHeaders
}

const redirect = (itemId?: string | number): void => {
  if (props.redirectLink) {
    router.push(`${props.redirectLink}${itemId}`)
  }
}
</script>

<template>
  <section id="list" class="table">
    <hgroup>
      <h2>{{ title }}</h2>
      <h3>{{ titleTwo }}</h3>
    </hgroup>
    <table>
      <thead>
      <tr>
        <th v-for="head in getTableItemHeaders()">{{ head }}</th>
      </tr>
      </thead>
      <tr
          v-for="dataItem in tableData"
          @click="redirect(dataItem.id)"
          :class="rowCLickClass"
          :key="dataItem.id"
      >
        <td v-for="data in dataItem">
          {{ data }}
        </td>
      </tr>
    </table>
  </section>
</template>

<style scoped>
.table {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--container-bg);
  padding: 20px;
  border-radius: 12px;
  width: 100%;
}

table {
  min-width: 320px;
  width: 100%;
}

table, th, td {
  border-bottom: 1px solid var(--border-color);
  border-collapse: collapse;
  padding: 2%;
  font-size: 12px;
  text-align: center;
}

.clickable-row {
  cursor: pointer;
  transition: background-color 0.5s ease;
}

.clickable-row:hover {
  background-color: var(--active);
}
</style>