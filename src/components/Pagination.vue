<script setup lang="ts">
import {ref, Ref} from "vue";
import {ApiClient} from "@/types/network/apiClient/apiClient.ts";
import {Model} from "@/types/model/model.ts";
import {ApiResponse} from "@/types/network/response/apiResponse.ts";
import ArrowLeftSvg from "@/components/SvgComponents/ArrowLeftSvg.vue";
import ArrowRightSvg from "@/components/SvgComponents/ArrowRightSvg.vue";

type Buttons = {
  prev: ButtonConfiguration,
  next: ButtonConfiguration,
}

type ButtonConfiguration = {
  apply(): number,
  condition(): boolean,
}

const emit = defineEmits<{
  (e: 'updateData', data: Model[]): void
}>()

const props = defineProps<{
  client: ApiClient
}>()

const currentPage: Ref<number> = ref(1);
const lastPage: Ref<number> = ref(0);
const setCurrPage: Buttons = {
  prev: {
    apply: (): number => currentPage.value -= 1,
    condition: (): boolean => currentPage.value > 1,
  },
  next: {
    apply: (): number => currentPage.value += 1,
    condition: (): boolean => currentPage.value < lastPage.value || (currentPage.value === 1 && lastPage.value === 0),
  },
}

const getPageData = async (setCurrPage: ButtonConfiguration) => {
  if (setCurrPage.condition()) {
    setCurrPage.apply()
  }

  const data = await getData();

  lastPage.value = data.meta.lastPage

  emit('updateData', data.data);
}

const getData = async (): Promise<ApiResponse> => {
  const response = await props.client.get({key: 'page', value: currentPage.value});

  return response.data;
}

</script>

<template>
  <div class="pagination">
    <div v-if="setCurrPage.prev.condition()" @click="getPageData(setCurrPage.prev)" class="pagination__back">
      <ArrowLeftSvg />
    </div>
    <div v-if="setCurrPage.next.condition()" @click="getPageData(setCurrPage.next)" class="pagination__forward">
      <ArrowRightSvg />
    </div>
  </div>
</template>

<style scoped>
.pagination {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 30%;
}

.pagination__back {
  grid-column-start: 1;
}

.pagination__forward {
  grid-column-start: 4;
}
</style>