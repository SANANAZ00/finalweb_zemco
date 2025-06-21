import { defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'price', title: 'Price', type: 'number' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'image', title: 'Image', type: 'image' },
    // Add more fields as needed
  ],
})

