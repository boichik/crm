<template>
   <div>
    <div class="page-title">
        <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
        <div class="row" v-else>
           <CategoryCreate @created="addNewCategory"/>
           <CategoryEdit
            v-if="categories.length"
            :categories="categories"
            :key="categories.length + updateCount"
            @updated="updatedCategories"
           />
           <p v-else class="center">Категорий пока нет</p>
        </div>
    </section>
   </div>
</template>
<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    CategoryCreate, CategoryEdit
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    },
    async updatedCategories (category, isUpdate) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      if (!isUpdate) {
        this.loading = true
        this.categories = await this.$store.dispatch('fetchCategories')
        this.loading = false
      } else {
        this.categories[idx].title = category.title
        this.categories[idx].limit = category.limit
      }
      this.updateCount++
    }
  }

}
</script>
