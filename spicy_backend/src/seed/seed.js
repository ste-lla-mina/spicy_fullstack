import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';
import MenuItem from '../models/MenuItem.js';
import Table from '../models/Table.js';
import Order from '../models/Order.js';

dotenv.config();

const MENU_SEED = [
  { name: 'Garlic Fries', category: 'main', price: 20, description: 'Crispy golden fries tossed in roasted garlic butter.', imageUrl: 'garlic.jpg', isTopRated: false, tags: ['Bestseller'] },
  { name: 'Chicken Wings', category: 'main', price: 30, description: 'Spicy buffalo-glazed wings with ranch dip.', imageUrl: 'wingi.jpg', tags: ["Chef's Special"] },
  { name: 'Beef Stew', category: 'main', price: 40, description: 'Slow-cooked beef with seasonal vegetables.', imageUrl: 'stew.jpg' },
  { name: 'Jollof Rice', category: 'main', price: 45, description: 'Classic spiced African rice in tomato broth.', imageUrl: 'jollof.jpg' },
  { name: 'Roasted Meat', category: 'main', price: 25, description: 'Charred premium cuts with house dry rub.', imageUrl: 'meat.jpg' },
  { name: 'Samosa', category: 'appetizer', price: 10, description: 'Crispy pastries with spiced vegetables.', imageUrl: 'samosa.jpg' },
  { name: 'Chips and Stew', category: 'main', price: 5, description: 'Comfort food classic.', imageUrl: 'chapti.jpg' },
  { name: 'Brochette', category: 'main', price: 2, description: 'Grilled skewers.', imageUrl: 'beef.jpg' },
  { name: 'Shawarma', category: 'main', price: 3, description: 'Wrapped spiced meat with sauce.', imageUrl: 'shawarma.jpg' },
  { name: 'Roasted fish', category: 'main', price: 60, description: 'Coastal spiced fish fillet.', imageUrl: 'fish.jpg', isTopRated: true },
  { name: 'Meatballs', category: 'main', price: 55, description: 'Herb marinara meatballs.', imageUrl: 'balls.jpg', isTopRated: true },
  { name: 'Majora Soup', category: 'special', price: 15, description: 'Hearty soup.', imageUrl: 'soup.jpg', isSpecial: true, specialTag: 'Best for hangovers' },
  { name: 'Soft Pancakes', category: 'dessert', price: 17, description: 'Fluffy buttermilk pancakes.', imageUrl: 'pancakes.jpg', isSpecial: true, specialTag: 'Best for tea breaks' },
  { name: 'Fruits Salad', category: 'dessert', price: 15, description: 'Fresh tropical fruit medley.', imageUrl: 'fruit.jpg', isSpecial: true, specialTag: 'Best for diabetics' },
  { name: 'Classic Mojito', category: 'drinks', price: 7.5, description: 'Rum, mint, lime, soda.', imageUrl: 'mojito.jpg' },
  { name: 'Mango Cooler', category: 'drinks', price: 6.5, description: 'Mango and citrus blend.', imageUrl: 'smoothie.jpg' },
  { name: 'Berry Bliss', category: 'drinks', price: 8, description: 'Berry infused cooler.', imageUrl: 'berry.jpg' },
  { name: 'Espresso Martini', category: 'drinks', price: 9, description: 'Espresso and vodka.', imageUrl: 'espresso.jpg' }
];

export const seedIfEmpty = async () => {
  const restaurantCount = await Restaurant.countDocuments();
  if (restaurantCount > 0) return;

  console.log('Seeding demo restaurant data...');

  let owner = await User.findOne({ email: 'owner@spicy.com' });
  if (!owner) {
    owner = await User.create({
      name: 'Spicy Owner',
      email: 'owner@spicy.com',
      phone: '+250788000001',
      password: 'password123',
      role: 'owner',
      isVerified: true
    });
  }

  const restaurant = await Restaurant.create({
    owner: owner._id,
    name: 'Spicy Restaurant',
    location: 'Kigali',
    settings: { restaurantName: 'Spicy', taxRate: 10, serviceChargeRate: 5 }
  });

  await MenuItem.insertMany(MENU_SEED.map((item) => ({ ...item, restaurant: restaurant._id, status: 'Active' })));

  const tableDefs = [
    { tableNo: '3', capacity: 4, location: 'Center', features: ['WiFi', 'AC'] },
    { tableNo: '5', capacity: 2, location: 'Bar Side', features: ['WiFi', 'Bar View'] },
    { tableNo: '7', capacity: 4, location: 'Corner', features: ['Heating', 'WiFi'] },
    { tableNo: '8', capacity: 4, location: 'Center', features: ['WiFi', 'Quiet'] },
    { tableNo: '11', capacity: 6, location: 'Near Window', features: ['WiFi', 'Heating'] },
    { tableNo: '18', capacity: 4, location: 'Center Stage', features: ['WiFi', 'Quiet'] },
    { tableNo: '24', capacity: 4, location: 'Corner', features: ['WiFi', 'Heating'] }
  ];
  await Table.insertMany(tableDefs.map((t) => ({ ...t, restaurant: restaurant._id })));

  await Order.create({
    restaurant: restaurant._id,
    orderNumber: '0001',
    customerName: 'John Tee',
    tableNo: '8',
    guestCount: 4,
    items: [
      { name: 'Chicken Wings', qty: 4, unitPrice: 30, price: 120 },
      { name: 'Milkshakes', qty: 2, unitPrice: 15, price: 30 }
    ],
    subtotal: 150,
    tax: 15,
    serviceCharge: 7.5,
    total: 172.5,
    status: 'Served',
    paymentStatus: 'Paid'
  });

  console.log('Demo data ready. Owner login: owner@spicy.com / password123');
};

if (process.argv[1]?.includes('seed.js')) {
  await mongoose.connect(process.env.MONGODB_URI);
  await seedIfEmpty();
  await mongoose.disconnect();
  process.exit(0);
}
