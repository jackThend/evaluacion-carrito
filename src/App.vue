<script setup>
import { ref, computed } from 'vue';

// 1. Importar las imágenes que están en local
import audifonoImg from './assets/productos/audifono.png';
import mouseImg from './assets/productos/mouse.png';
import tecladoImg from './assets/productos/teclado.png';
import gabineteImg from './assets/productos/gabinete.png';
import pantallaImg from './assets/productos/pantalla.png';
import sillaImg from './assets/productos/silla.png';

// 2. Datos iniciales de los productos
const productos = ref([
  { id: 1, nombre: 'Audífono', precio: 30000, stock: 3, imagen: audifonoImg },
  { id: 2, nombre: 'Mouse', precio: 20000, stock: 5, imagen: mouseImg },
  { id: 3, nombre: 'Teclado', precio: 15000, stock: 10, imagen: tecladoImg },
  { id: 4, nombre: 'Gabinete', precio: 35000, stock: 4, imagen: gabineteImg },
  { id: 5, nombre: 'Pantalla', precio: 175000, stock: 3, imagen: pantallaImg },
  { id: 6, nombre: 'Silla', precio: 150000, stock: 2, imagen: sillaImg },
]);

// 3. Estado del carrito de compras
const carrito = ref([]);

// 4. Propiedad computada para calcular el total a pagar
const totalAPagar = computed(() => {
  return carrito.value.reduce((suma, articulo) => suma + (articulo.precio * articulo.cantidad), 0);
});

// 5. Método para agregar un producto al carrito
const agregarAlCarrito = (productoAAgregar) => {
  const indiceProductoExistente = carrito.value.findIndex(articulo => articulo.id === productoAAgregar.id);
  const productoOriginal = productos.value.find(p => p.id === productoAAgregar.id);

  if (indiceProductoExistente !== -1) {
    // Si el producto ya está en el carrito, se incrementa la cantidad si hay stock
    const cantidadActualEnCarrito = carrito.value[indiceProductoExistente].cantidad;
    if (cantidadActualEnCarrito < productoOriginal.stock) {
      carrito.value[indiceProductoExistente].cantidad++;
    } else {
      alert(`No hay más unidades disponibles en stock para ${productoAAgregar.nombre}.`);
    }
  } else {
    // Si el producto no está, se añade al carrito si hay stock
    if (productoOriginal.stock > 0) {
      carrito.value.push({
        id: productoAAgregar.id,
        nombre: productoAAgregar.nombre,
        precio: productoAAgregar.precio,
        imagen: productoAAgregar.imagen,
        cantidad: 1, // Se añade con cantidad inicial de 1
      });
    } else {
      alert(`No hay stock disponible para ${productoAAgregar.nombre}.`);
    }
  }
};

// 6. Método para remover un producto del carrito
const removerDelCarrito = (productoId) => {
  const indiceProductoExistente = carrito.value.findIndex(articulo => articulo.id === productoId);
  if (indiceProductoExistente !== -1) {
    carrito.value.splice(indiceProductoExistente, 1);
  }
};
</script>

<template>
  <div class="container py-4">
    <h1 class="text-center mb-5">Tienda Online evaluación 3</h1>
    <div class="row">
      <!-- Columna Izquierda: Productos Disponibles y Total -->
      <div class="col-md-7">
        <h2 class="mb-3">Productos disponibles</h2>
        <div class="vstack gap-4">
          <div v-for="producto in productos" :key="producto.id" class="d-flex align-items-center">
            <img :src="producto.imagen" :alt="producto.nombre" class="me-3" style="width: 50px; height: 50px;">
            <div class="flex-grow-1">
              <p class="fw-bold mb-1">{{ producto.nombre }} - Precio: ${{ producto.precio.toLocaleString('es-CL') }}</p>
              <button @click="agregarAlCarrito(producto)" class="btn btn-primary btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill me-1" viewBox="0 0 16 16">
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 4 0h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 11.49 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
                </svg>
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
        <h3 class="mt-5 text-center">Total a pagar: <span class="fw-bold">${{ totalAPagar.toLocaleString('es-CL') }}</span></h3>
      </div>

      <!-- Columna Derecha: Productos en el Carrito -->
      <div class="col-md-5">
        <h2 class="mb-3">Productos en el carrito</h2>
        <div v-if="carrito.length === 0" class="text-center text-muted fst-italic mt-4">
          El carrito está vacío
        </div>
        <div v-else class="vstack gap-3">
          <!-- Bucle para cada artículo en el carrito -->
          <div v-for="articulo in carrito" :key="articulo.id" class="bg-light p-3 rounded">
            <!-- Sección de información del producto -->
            <div class="d-flex align-items-center mb-2">
              <img :src="articulo.imagen" :alt="articulo.nombre" class="me-3" style="width: 50px; height: 50px;">
              <div class="flex-grow-1">
                <p class="mb-0 fw-bold">{{ articulo.nombre }}</p>
                <small class="text-muted">Cantidad: {{ articulo.cantidad }}</small>
              </div>
            </div>
            <!-- Botón de remover -->
            <button @click="removerDelCarrito(articulo.id)" class="btn btn-primary w-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill me-1" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
              </svg>
              Remover del carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
