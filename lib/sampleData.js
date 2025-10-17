// Small sample data used only for Preview deployments when Contentful isn't configured
export const sampleNewsletter = {
  hook: 'Join the TonyThyme Newsletter',
  message: 'Delicious recipes, tips, and exclusive updates delivered to your inbox.'
};

export const sampleTour = {
  tourCollection: {
    items: [
      {
        title: 'Sample Tour',
        headline: 'Tasty stops around the city',
        details: 'Join us for a sampling of signature dishes',
        thumbnail: { url: '/public/sample-thumb.jpg', width: 600, height: 400 },
      }
    ]
  }
};

export const sampleCategories = {
  categoryCollection: {
    items: [
      { sys: { id: 'cat_1' }, title: 'Soups', slug: 'soups' },
      { sys: { id: 'cat_2' }, title: 'Desserts', slug: 'desserts' }
    ]
  }
};

export const sampleMealPlans = {
  mealPlanCollection: {
    items: [
      { sys: { id: 'plan_1' }, planName: 'Quick Weeknight', summary: '5 easy dinners' }
    ]
  }
};

export const sampleRecipe = {
  items: [
    {
      sys: { id: 'sample-recipe' },
      fields: {
        slug: 'sample-recipe',
        title: 'Sample Thyme Tea',
        authorsNotes: 'A short note',
        procedure: { json: {} },
        ingredients: ['1 tsp thyme', 'Hot water'],
        recipeBy: { fields: { name: 'Tony' } },
        banners: [],
      }
    }
  ]
};

export default {
  sampleNewsletter,
  sampleTour,
  sampleCategories,
  sampleMealPlans,
  sampleRecipe
};
