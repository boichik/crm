<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Редактировать</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field" >
                    <select ref="select" v-model="current">
                        <option
                         v-for="c of categories"
                         :key="c.id"
                         :value="c.id"
                        >{{c.title}}</option>
                    </select>
                    <label>Выберите категорию</label>
                </div>

                <div class="input-field">
                    <input
                        id="name"
                        type="text"
                        v-model="title"
                        :class="{invalid: ($v.title.$dirty &&  !$v.title.required)}"
                    >
                    <label for="name">Название</label>
                    <span
                     class="helper-text invalid"
                     v-if="$v.limit.$dirty &&  !$v.title.required"
                     >Введите название</span>
                </div>

                <div class="input-field">
                    <input
                        id="limit"
                        type="number"
                        v-model.number="limit"
                        :class="{invalid: ($v.limit.$dirty &&  !$v.title.minValue)}"

                    >
                    <label for="limit">Лимит</label>
                    <span
                     class="helper-text invalid"
                     v-if="$v.limit.$dirty &&  !$v.title.minValue"
                     >Минимальная величина {{$v.limit.$params.minValue.min}}</span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                Обновить
                <i class="material-icons right">send</i>
                </button>
                <button class="btn waves-effect waves-light red cat-btb-del" type="button" v-on:click="deleteCat">
                Удалить
                <i class="material-icons right">clear</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import M from 'materialize-css'
import { required, minValue } from 'vuelidate/lib/validators'
import message from '@/common/message.plugin'

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 1,
    current: null
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(1) }
  },
  watch: {
    current (catId) {
      const { title, limit } = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },
  created () {
    const { id, title, limit } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted () {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }

        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Update succses')
        this.$emit('updated', categoryData, true)
      } catch (e) {}
    },
    async deleteCat(){
        if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try{
        const catDate = {id:this.current}
        await this.$store.dispatch('deleteCategory', catDate)
        this.$message('Delete succses')
        this.$emit('updated', catDate, false)
      }catch(e) {}
    }
  }
}
</script>
