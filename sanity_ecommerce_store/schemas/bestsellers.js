export default {
  name: 'bestseller',
  title: 'Bestsellers',
  type: 'document',
  fields: [
    // Img
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
    },
    // Name
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    // Slug - Unique URL/string
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      }
    },
    // Price
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    // Old price
    {
      name: 'oldPrice',
      title: 'Old price',
      type: 'number',
    },
    // Details
    {
      name: 'details',
      title: 'Details',
      type: 'string',
    },
  ],
};
