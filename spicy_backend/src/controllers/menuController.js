import MenuItem from '../models/MenuItem.js';
import { clientBrowseCategory, clientCategoryLabel, resolveCategoryFilter } from '../utils/categories.js';

const formatOwnerItem = (item) => ({
  _id: item._id,
  name: item.name,
  price: item.price,
  type: item.category,
  category: item.category,
  description: item.description,
  cost: item.cost,
  status: item.status,
  image: item.imageUrl,
  imageUrl: item.imageUrl,
  actionable: item.status === 'Active',
  isTopRated: item.isTopRated,
  isSpecial: item.isSpecial,
  specialTag: item.specialTag,
  tags: item.tags
});

const formatClientBrowseItem = (item) => ({
  id: item._id,
  _id: item._id,
  name: item.name,
  category: clientBrowseCategory(item.category),
  clientCategory: clientCategoryLabel(item.category),
  price: item.price,
  desc: item.description,
  img: item.imageUrl,
  imageUrl: item.imageUrl,
  tags: item.tags,
  status: item.status
});

const formatClientOrderItem = (item) => ({
  id: item._id,
  _id: item._id,
  name: item.name,
  category: clientCategoryLabel(item.category),
  price: item.price,
  desc: item.description,
  img: item.imageUrl,
  tags: item.tags
});

export const getMenuItems = async (req, res) => {
  const { category, sort, status, view } = req.query;
  const query = { restaurant: req.restaurant._id };

  if (req.user.role === 'client' || view === 'client') {
    query.status = 'Active';
  } else if (status) {
    query.status = status;
  }

  const resolved = resolveCategoryFilter(category);
  if (resolved) query.category = resolved;

  let items = await MenuItem.find(query);

  if (sort === 'low-to-high') items.sort((a, b) => a.price - b.price);
  else if (sort === 'high-to-low') items.sort((a, b) => b.price - a.price);
  else items.sort((a, b) => a.createdAt - b.createdAt);

  const formatter = view === 'client' || req.user.role === 'client'
    ? (view === 'orders' ? formatClientOrderItem : formatClientBrowseItem)
    : formatOwnerItem;

  res.json(items.map(formatter));
};

export const getTopRated = async (req, res) => {
  const items = await MenuItem.find({
    restaurant: req.restaurant._id,
    isTopRated: true,
    status: 'Active'
  }).limit(6);

  res.json(items.map((item) => ({
    _id: item._id,
    name: item.name,
    price: item.price,
    image: item.imageUrl
  })));
};

export const getSpecials = async (req, res) => {
  const items = await MenuItem.find({
    restaurant: req.restaurant._id,
    isSpecial: true,
    status: 'Active'
  }).limit(10);

  res.json(items.map((item) => ({
    _id: item._id,
    name: item.name,
    price: item.price,
    tag: item.specialTag,
    image: item.imageUrl
  })));
};

const parseBoolean = (value) => value === true || value === 'true';
const parseTags = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    return JSON.parse(value);
  } catch {
    return String(value).split(',').map((tag) => tag.trim()).filter(Boolean);
  }
};

export const createMenuItem = async (req, res) => {
  const {
    name,
    category,
    description,
    price,
    cost,
    status,
    imageUrl,
    image,
    isTopRated,
    isSpecial,
    specialTag,
    tags
  } = req.body;

  if (!name || price == null) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  const savedImageUrl = req.file ? `/uploads/${req.file.filename}` : (imageUrl || image || '');

  const item = await MenuItem.create({
    restaurant: req.restaurant._id,
    name,
    category: category || 'main',
    description: description || '',
    price: Number(price),
    cost: Number(cost) || 0,
    status: status || 'Active',
    imageUrl: savedImageUrl,
    isTopRated: parseBoolean(isTopRated),
    isSpecial: parseBoolean(isSpecial),
    specialTag: specialTag || '',
    tags: parseTags(tags)
  });

  res.status(201).json(formatOwnerItem(item));
};

export const updateMenuItem = async (req, res) => {
  const item = await MenuItem.findOne({ _id: req.params.id, restaurant: req.restaurant._id });
  if (!item) return res.status(404).json({ message: 'Menu item not found' });

  const fields = ['name', 'category', 'description', 'price', 'cost', 'status', 'imageUrl', 'isTopRated', 'isSpecial', 'specialTag', 'tags'];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) item[field] = field === 'tags' ? parseTags(req.body[field]) : req.body[field];
  });

  if (req.file) item.imageUrl = `/uploads/${req.file.filename}`;
  else if (req.body.image) item.imageUrl = req.body.image;

  await item.save();
  res.json(formatOwnerItem(item));
};

export const toggleMenuStatus = async (req, res) => {
  const item = await MenuItem.findOne({ _id: req.params.id, restaurant: req.restaurant._id });
  if (!item) return res.status(404).json({ message: 'Menu item not found' });

  item.status = item.status === 'Active' ? 'Inactive' : 'Active';
  await item.save();
  res.json(formatOwnerItem(item));
};

export const deleteMenuItem = async (req, res) => {
  const item = await MenuItem.findOneAndDelete({ _id: req.params.id, restaurant: req.restaurant._id });
  if (!item) return res.status(404).json({ message: 'Menu item not found' });
  res.json({ message: 'Menu item deleted' });
};
