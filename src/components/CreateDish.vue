<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          Crear plato
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Crear platillo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Nombre*"
                  v-model="form.nombre"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Precio"
                  hint="el precio del platillo debe estar entre 9$ y 25$"
                  v-model="form.precio"
                  @input="validarValor"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Color"
                  v-model="form.color"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="4"
                sm="6"
              >
                <v-text-field
                v-model="form.date"
                label="Fecha"
                :mask="[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]"
                @input="formatDate"
                ref="dateField"
              ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-switch color="red" v-model="form.oferta" label="Oferta"></v-switch>
              </v-col>
              
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="createDish"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup lang="ts">
  import http from '@/plugins/axios';
  import { ref, reactive } from 'vue';


  const dialog = ref(false)


  const form = reactive({
    color: '',
    precio: 9,
    nombre: '',
    date: '',
    oferta: false
  })

  function formatDate($event: any) {
      // Obtén el valor actual del v-model
      let input = $event.target.value;

      // Elimina todos los caracteres no numéricos
      input = input.replace(/\D+/g, '');

      // Formatea la fecha en dd/mm/aaaa
      if (input.length === 8) {
        const day = input.slice(0, 2);
        const month = input.slice(2, 4);
        const year = input.slice(4, 8);
        form.date = `${day}/${month}/${year}`;
      } else {
        form.date = input;
      }
  }

  function validarValor() {
    if (form.precio < 9 || form.precio > 25) {
      form.precio = 9; // Si el valor está fuera del rango, se restablece a null
    }
  }

  async function createDish(){
    const res = await http.post('', form)
    console.log(res);
    
  }
</script>