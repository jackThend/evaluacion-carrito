<script setup>
import { ref, computed } from 'vue';

// 1. Datos iniciales de productos
const products = ref([
  { id: 1, name: 'Audífono', price: 30000, stock: 3, image: 'https://i.imgur.com/h5m0Sgy.png' },
  { id: 2, name: 'Mouse', price: 20000, stock: 5, image: 'https://i.imgur.com/Jjq9zBf.png' },
  { id: 3, name: 'Teclado', price: 15000, stock: 10, image: 'https://i.imgur.com/B9tA5dC.png' },
  { id: 4, name: 'Gabinete', price: 35000, stock: 4, image: 'https://i.imgur.com/s6z1C4W.png' },
  { id: 5, name: 'Pantalla', price: 175000, stock: 3, image: 'https://i.imgur.com/kS9yV2M.png' },
  { id: 6, name: 'Silla', price: 150000, stock: 2, image: 'https://i.imgur.com/sFfWb3G.png' },
]);

// 2. Estado del carrito
const cart = ref([]);

// 3. Propiedad computada para el total a pagar
const totalToPay = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

// 4. Método para agregar al carrito
const addToCart = (productToAdd) => {
  const existingItemIndex = cart.value.findIndex(item => item.id === productToAdd.id);
  const originalProduct = products.value.find(p => p.id === productToAdd.id);

  if (existingItemIndex !== -1) {
    const currentQuantityInCart = cart.value[existingItemIndex].quantity;
    if (currentQuantityInCart < originalProduct.stock) {
      cart.value[existingItemIndex].quantity++;
    } else {
      alert(`No hay más unidades disponibles en stock para ${productToAdd.name}.`);
    }
  } else {
    if (originalProduct.stock > 0) {
      cart.value.push({
        id: productToAdd.id,
        name: productToAdd.name,
        price: productToAdd.price,
        image: productToAdd.image,
        quantity: 1,
      });
    } else {
      alert(`No hay stock disponible para ${productToAdd.name}.`);
    }
  }
};

// 5. Método para remover del carrito
const removeFromCart = (productId) => {
  const existingItemIndex = cart.value.findIndex(item => item.id === productId);
  if (existingItemIndex !== -1) {
    // Eliminar el producto completamente del carrito
    cart.value.splice(existingItemIndex, 1);
  }
};
</script>

<template>
  <div class="container py-4">
    <h1 class="text-center mb-5">Mi Tienda Online</h1>
    <div class="row">
      <!-- Columna Izquierda: Productos Disponibles y Total -->
      <div class="col-md-7">
        <h2 class="mb-3">Productos disponibles</h2>
        <div class="vstack gap-3"> <!-- Usamos vstack para apilar verticalmente -->
          <div v-for="product in products" :key="product.id" class="card">
            <div class="card-body d-flex align-items-center">
              <img :src="product.image" :alt="product.name" class="me-3" style="width: 50px; height: 50px;">
              <div class="flex-grow-1">
                <p class="fw-bold mb-0">{{ product.name }} - Precio: ${{ product.price.toLocaleString('es-CL') }}</p>
              </div>
              <button @click="addToCart(product)" class="btn btn-primary btn-sm">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
        <hr class="my-4"> <!-- Una línea para separar visualmente -->
        <h3 class="text-end">Total a pagar: <span class="fw-bold">${{ totalToPay.toLocaleString('es-CL') }}</span></h3>
      </div>

      <!-- Columna Derecha: Productos en el Carrito -->
      <div class="col-md-5">
        <h2 class="mb-3">Productos en el carrito</h2>
        <div class="card">
          <div class="card-body">
            <div v-if="cart.length === 0" class="text-center text-muted">
              El carrito está vacío
            </div>
            <div v-else class="vstack gap-3">
              <div v-for="item in cart" :key="item.id" class="d-flex align-items-center">
                <img :src="item.image" :alt="item.name" class="me-3" style="width: 50px; height: 50px;">
                <div class="flex-grow-1">
                  <p class="mb-0">{{ item.name }}</p>
                  <small class="text-muted">Cantidad: {{ item.quantity }}</small>
                </div>
                <button @click="removeFromCart(item.id)" class="btn btn-outline-danger btn-sm">
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Puedes dejar esto vacío por ahora o añadir estilos globales si lo necesitas */
</style>