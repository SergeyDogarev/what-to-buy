<template>
  <div>
    <!-- <hello-world /> -->
    <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="8"
          sm="6"
          class="pt-10"
        >
          <v-text-field
            v-model="good"
            solo
            label="Товар"
            clearable
          ></v-text-field>
        </v-col>
        <v-col
          cols="4"
          sm="6"
          class="pt-10"
        >
          <v-text-field
            v-model="price"
            solo
            label="Цена"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn
        block
        
        large
        color="primary"
        @click="addGood"
        depressed
        :disabled="!good.length || !price.length"
        >Создать</v-btn>

        <v-row>
          <v-col
            cols="6"
            sm="6"
            class="pt-10"
          >
          Кол-во товаров: {{ goods.length }}
          </v-col>
          <v-col
            cols="6"
            sm="6"
            class="pt-10"
          >
          Сумма товаров: {{ summGoods }}
        </v-col>
      </v-row>

      <v-simple-table v-if="goods.length">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Товар</th>
              <th class="text-left">Цена</th>
              <th class="text-left">Удалить</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in goods"
              :key="item.name"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.price }} UAH</td>
              <td>
                <v-btn
                class="mx-2"
                fab
                dark
                small
                color="primary"
                @click="updateStorage(item.name)"
              >
                <v-icon dark>
                  mdi-minus
                </v-icon>
              </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <p v-else class="font-weight-medium text-center pt-5">Товаров сейчас нет</p>
    </v-container>
  </v-form>
  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'Home',
    data: () => ({
      good: "",
      price: "",
      goods: [],
    }),
    methods: {
      addGood() {
        localStorage.setItem(this.good, this.price);
        this.updateStorage();
        this.good = '';
        this.price = '';
      },
      /**
       * name - Если name передан, то даннный элемент удаляем из localstorage. Если покупка не передана, того просто обновляем все товары
       */
      updateStorage(name) {
        this.goods = []

        if (arguments.length) {
          localStorage.removeItem(name);
        }  

        let keys = Object.keys(localStorage);
        keys = keys.filter(el => el !== 'loglevel:webpack-dev-server') // Чтобы данняа строка не попадала в товары
        let i = keys.length;

        while ( i-- ) {
          this.goods.push( {name: keys[i], price: localStorage.getItem(keys[i])} );
        }
      },
    },
    computed: {
      summGoods() {
        let total = 0
        this.goods.map((el) => {total += +el.price})
        return total
      }
    },
    mounted() {
      this.updateStorage() // Получить все покупки из localstorage
    },
  }
</script>
