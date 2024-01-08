const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const multer = require("../middleware/multer");

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, rolecode } = req.body;

    if (rolecode !== undefined && rolecode === 1234) {
      const createAdminUser = await prisma.user.create({
        data: {
          first_name,
          last_name,
          email,
          password,
          role: "admin",
        },
      });

      res.json(createAdminUser);
    } else {
      const createCustomerUser = await prisma.user.create({
        data: {
          first_name,
          last_name,
          email,
          password,
          role: "customer",
        },
      });

      res.json(createCustomerUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};

const updateUser = async (req, res) => {
  try {
    const { user } = req;

    const { new_first_name, new_last_name, new_email, new_password } = req.body;

    if (user.role === "admin") {
      const {
        first_name1,
        last_name1,
        email1,
        password1,
        new_first_name1,
        new_last_name1,
        new_email1,
        role,
      } = req.body;
      console.log("Received data from frontend:", req.body);

      const user1 = await prisma.user.findUnique({
        where: {
          first_name: first_name1,
          last_name: last_name1,
          email: email1,
        },
      });

      if (user1) {
        const updateAdminUser = await prisma.user.update({
          where: {
            user_id: user1.user_id,
          },
          data: {
            first_name: new_first_name1 || user1.first_name,
            last_name: new_last_name1 || user1.last_name,
            email: new_email1 || user1.email,
            password: password1 || user1.password,
            role: role || user1.role,
          },
        });

        res.json(updateAdminUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } else {
      const updateCustomerUser = await prisma.user.update({
        where: {
          user_id: user.user_id,
        },
        data: {
          first_name: new_first_name || user.first_name,
          last_name: new_last_name || user.last_name,
          email: new_email || user.email,
          password: new_password || user.password,
        },
      });

      res.json(updateCustomerUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    if (user.role === "admin") {
      const { first_name, last_name, email } = req.body;
      console.log("Received data from frontend:", req.body);
      const deleteAdminUser = await prisma.user.delete({
        where: {
          first_name,
          last_name,
          email,
        },
      });
      res.json(deleteAdminUser);
    } else {
      const deleteCostumerUser = await prisma.user.delete({
        where: {
          user_id: user.user_id,
        },
      });
      res.json(deleteCostumerUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

const createProduct = async (req, res) => {
  try {
    const { user } = req;

    if (user && user.role === "admin") {
      const { name, description, price, stock_quantity } = req.body;

      const parsedPrice = parseFloat(price);
      const parsedStockQuantity = parseInt(stock_quantity);

      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const createProduct = await prisma.product.create({
        data: {
          name,
          description,
          image_url: imageUrl,
          price: parsedPrice,
          stock_quantity: parsedStockQuantity,
        },
      });

      res.json(createProduct);
    } else {
      console.log("Not authorized");
      res.status(403).send("Forbidden");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });
    if (user) {
      delete user.password;
      const token = await jwt.sign(user, process.env.SECRET_TOKEN, {
        expiresIn: "1h",
      });
      res.json(token);
    } else {
      res.status(404).send("Please check your credentials.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
const updateProduct = async (req, res) => {
  try {
    const { user } = req;
    if (user && user.role === "admin") {
      const { productId } = req.params;

      const {
        name,
        price: priceString,
        stock_quantity: stockQuantityString,
      } = req.body;

      const price = parseFloat(priceString);

      const stock_quantity = parseInt(stockQuantityString);

      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      console.log("ProductId:", productId);
      const existingProduct = await prisma.product.findUnique({
        where: {
          product_id: parseInt(productId, 10),
        },
      });

      if (!existingProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      const updatedProduct = await prisma.product.update({
        where: {
          product_id: parseInt(productId, 10),
        },
        data: {
          name: name || existingProduct.name,
          price: price || existingProduct.price,
          stock_quantity: stock_quantity || existingProduct.stock_quantity,
          image_url: imageUrl || existingProduct.image_url,
        },
      });

      res.json(updatedProduct);
    } else {
      res.status(403).send("Forbidden");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { user } = req;
    if (user && user.role === "admin") {
      const productId = req.params;

      const existingProduct = await prisma.product.findUnique({
        where: {
          product_id: parseInt(productId, 10),
        },
      });

      if (!existingProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      const deleteProduct = await prisma.product.delete({
        where: {
          product_id: parseInt(productId, 10),
        },
      });

      res.json(deleteProduct);
    } else {
      console.log("Not authorized");
      res.status(403).send("Forbidden");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await prisma.product.findMany();

    res.json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};

const shopingCart = async (req, res) => {
  try {
    const { user } = req;
    const { product_id, quantity } = req.body;

    const shopingCart = await prisma.shoppingCartItem.create({
      data: {
        user_id: user.user_id,
        product_id,
        quantity,
      },
    });
    res.json(shopingCart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};

const getUsersCartItems = async (req, res) => {
  try {
    const { user } = req;

    const getUsersCartItems = await prisma.shoppingCartItem.findMany({
      where: {
        user_id: user.user_id,
      },
      include: {
        product: true,
      },
    });
    res.json(getUsersCartItems);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};
const clearShopppingCart = async (req, res) => {
  try {
    const { user } = req;
    const clearShopppingCart = await prisma.shoppingCartItem.deleteMany({
      where: {
        user_id: user.user_id,
      },
    });
    res.json(clearShopppingCart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};
const deleteShoppingCartItem = async (req, res) => {
  try {
    const { user } = req;
    const { cart_item_id } = req.params;
    const deleteShoppingCartItem = await prisma.shoppingCartItem.delete({
      where: {
        cart_item_id: parseInt(cart_item_id),
      },
    });
    res.json(deleteShoppingCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};

const getAllProductsWithImages = async (req, res) => {
  try {
    const allProducts = await prisma.product.findMany();

    const productsWithImages = allProducts.map((product) => {
      const imageData = product.image
        ? Buffer.from(product.image, "base64").toString("base64")
        : null;
      return {
        ...product,
        image: imageData,
      };
    });

    res.json(productsWithImages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { user } = req;
    const getUser = await prisma.user.findUnique({
      where: {
        user_id: user.user_id,
      },
    });
    res.json(getUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};

const createOrder = async (req, res) => {
  try {
    const { user } = req;
    const { total_amount, order_items } = req.body;

    const createdOrder = await prisma.order.create({
      data: {
        user_id: user.user_id,
        total_amount,

        order_items: {
          create: order_items.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        order_items: true,
      },
    });

    res.json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};

const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { total_amount, is_confirmed } = req.body;

    const updatedOrder = await prisma.order.update({
      where: { order_id: parseInt(orderId, 10) },
      data: { total_amount, is_confirmed },
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await prisma.order.delete({
      where: { order_id: parseInt(orderId, 10) },
    });

    res.json(deletedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};

const updateOrderItem = async (req, res) => {
  try {
    const { orderId, orderItemId } = req.params;
    const { quantity, price } = req.body;

    const updatedOrderItem = await prisma.orderItem.update({
      where: { order_item_id: parseInt(orderItemId, 10) },
      data: { quantity, price },
    });

    res.json(updatedOrderItem);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};
const deleteOrderItem = async (req, res) => {
  try {
    const { orderId, orderItemId } = req.params;

    const deletedOrderItem = await prisma.orderItem.delete({
      where: { order_item_id: parseInt(orderItemId, 10) },
    });

    res.json(deletedOrderItem);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};
const getUserOrders = async (req, res) => {
  try {
    const { user } = req;
    const getUserOrders = await prisma.order.findMany({
      where: {
        user_id: user.user_id,
      },
      include: {
        order_items: {
          include: {
            product: true,
          },
        },
      },
    });
    res.json(getUserOrders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};
const getAllOrders = async (req, res) => {
  try {
    const { user } = req;

    if (user && user.role === "admin") {
      const getAllOrders = await prisma.order.findMany({
        include: {
          order_items: {
            include: {
              product: true,
            },
          },
        },
      });
      res.json(getAllOrders);
    } else {
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};

module.exports = {
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
};
