export const MENU_CATEGORIES = ['main', 'drinks', 'special', 'dessert', 'appetizer'];

export const clientCategoryLabel = (category) => {
  const map = {
    main: 'Main Course',
    drinks: 'Beverages',
    dessert: 'Desserts',
    appetizer: 'Starters',
    special: 'Special'
  };
  return map[category] || category;
};

export const clientBrowseCategory = (category) => {
  const map = {
    main: 'food',
    drinks: 'drinks',
    dessert: 'dessert',
    appetizer: 'appetizer',
    special: 'food'
  };
  return map[category] || category;
};

export const resolveCategoryFilter = (filter) => {
  if (!filter) return null;
  const normalized = filter.toLowerCase();
  const map = {
    food: 'main',
    main: 'main',
    'main course': 'main',
    drinks: 'drinks',
    beverages: 'drinks',
    dessert: 'dessert',
    desserts: 'dessert',
    appetizer: 'appetizer',
    starters: 'appetizer',
    special: 'special',
    "chef's special": 'special'
  };
  return map[normalized] || normalized;
};
