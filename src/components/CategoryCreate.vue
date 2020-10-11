<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Создать</h4>
            </div>

            <form @submit.prevent="submitHandler">
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
                Создать
                <i class="material-icons right">send</i>
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
  data: () => ({
    title: '',
    limit: 1
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(1) }
  },
  mounted () {
    M.updateTextFields()
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = ''
        this.limit = 1
        this.$message('Category is create')
        this.$emit('created', category)
        this.$.v.$reset()
      } catch (e) {}
    }
  }
}
</script>
