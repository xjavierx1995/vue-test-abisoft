<template>
   
  <div style="margin: 16px;">
    <CreateDish/>
  </div>
  <v-table
    fixed-header
    height="300px"
  >
    <thead>
      <tr>
        <th v-for="(item, index) in columns" :key="index" class="text-left">
          {{item}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in dishes.values"
        :key="item.id"
      >
        <td>{{ item.nombre }}</td>
        <td>{{ item.precio }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.oferta }}</td>
        <td>{{ item.color }}</td>
        <td>{{ item.campos }}</td>
        <td>
          
        </td>
      </tr>
    </tbody>
  </v-table>

</template>
<script setup lang="ts">
  import http from '@/plugins/axios';
import CreateDish from './CreateDish.vue';
import { reactive, onMounted } from 'vue';
  const dishes: any = reactive([]);
  const columns = [
    "Nombre",
    "Precio",
    "Fecha Inicio Actividad",
    "Oferta",
    "Color",
    "Acción",
  ]

  async function getDishes() {
    const res = await http.get('');
    dishes.values = res.data;   
  }

  async function deleteDish(id: number) {
    const res = await http.delete(''+id);
    getDishes();
  }


  onMounted(() => getDishes());
</script>