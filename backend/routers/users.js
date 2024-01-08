const router = require("express").Router();
const {
  createUser,
  updateUser,
  deleteUser,
  createProduct,
  login,
  updateProduct,
  deleteProduct,
  getAllProducts,
  shopingCart,
  getUsersCartItems,
  getAllProductsWithImages,
  getUserInfo,
  clearShopppingCart,
  deleteShoppingCartItem,
  createOrder,
  updateOrder,
  deleteOrder,

  updateOrderItem,
  deleteOrderItem,
  getUserOrders,
  getAllOrders,
} = require("../controlers/users");
const verifyToken = require("../middleware/verifyToken");
const multer = require("../middleware/multer");

router.get("/userInfo", verifyToken, getUserInfo);
router.post("/", createUser);
router.put("/", verifyToken, updateUser);
router.delete("/", verifyToken, deleteUser);
router.post("/create", verifyToken, multer, createProduct);
router.post("/login", login);
router.put("/update/:productId", verifyToken, multer, updateProduct);
router.delete("/delete/:productId", verifyToken, deleteProduct);
router.get("/", getAllProducts);

router.post("/cart", verifyToken, shopingCart);
router.get("/cart", verifyToken, getUsersCartItems);
router.get("/products", getAllProductsWithImages);
router.delete("/cart", verifyToken, clearShopppingCart);
router.delete("/cart/item/:cart_item_id", verifyToken, deleteShoppingCartItem);

router.get("/order", verifyToken, getUserOrders);
router.post("/order", verifyToken, createOrder);
router.put("/order/:orderId", updateOrder);
router.delete("/order/:orderId", deleteOrder);
router.put("/orderItem/:orderItemId", updateOrderItem);
router.delete("/ordeerItem/:orderItemId", deleteOrderItem);
router.get("/allorders", verifyToken, getAllOrders);

module.exports = router;
