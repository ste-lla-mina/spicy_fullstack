export const getRestaurantSettings = async (req, res) => {
  res.json({
    restaurantName: req.restaurant.settings.restaurantName || req.restaurant.name,
    currency: req.restaurant.settings.currency,
    taxRate: String(req.restaurant.settings.taxRate),
    allowOrderCancel: req.restaurant.settings.allowOrderCancel,
    serviceChargeRate: req.restaurant.settings.serviceChargeRate
  });
};

export const updateRestaurantSettings = async (req, res) => {
  const { restaurantName, currency, taxRate, allowOrderCancel, serviceChargeRate } = req.body;

  if (restaurantName) req.restaurant.settings.restaurantName = restaurantName;
  if (currency) req.restaurant.settings.currency = currency;
  if (taxRate !== undefined) req.restaurant.settings.taxRate = Number(taxRate);
  if (allowOrderCancel !== undefined) req.restaurant.settings.allowOrderCancel = allowOrderCancel;
  if (serviceChargeRate !== undefined) req.restaurant.settings.serviceChargeRate = Number(serviceChargeRate);

  await req.restaurant.save();

  res.json({
    message: 'Settings updated',
    restaurantName: req.restaurant.settings.restaurantName,
    currency: req.restaurant.settings.currency,
    taxRate: String(req.restaurant.settings.taxRate),
    allowOrderCancel: req.restaurant.settings.allowOrderCancel
  });
};
