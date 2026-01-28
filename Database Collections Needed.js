// 1. Meals Collection
{
  name: "StreetWise Burger",
  description: "Burger with fries",
  price: 76.99,
  image: "url_or_file_id",
  categoryId: "food",
  isPopular: true,
  isDiscounted: false,
  preparationTime: 15,
  ingredients: ["beef", "cheese", "lettuce"],
  available: true
}

// 2. Orders Collection
{
  userId: "user_123",
  items: [{mealId: "1", quantity: 2, price: 76.99}],
  totalAmount: 153.98,
  status: "pending", // pending, preparing, ready, delivered, cancelled
  deliveryType: "delivery",
  deliveryAddress: "123 Main St",
  paymentMethod: "card",
  orderNumber: "ORD-123456",
  createdAt: "2024-01-20T10:30:00Z"
}

// 3. Categories Collection
{
  name: "Food",
  icon: "fastfood_icon.png",
  description: "Main food items"
}

// 4. User Profiles (extends AppWrite Auth)
{
  userId: "auth_user_id",
  phone: "+1234567890",
  address: "123 Main St",
  favoriteMeals: ["meal_1", "meal_2"]
}