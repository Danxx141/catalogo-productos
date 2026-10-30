// ===== Paso 1: arreglo de productos =====
const productos = [
  { nombre: "Computadora", precio: 850, categoria: "Computación", imagen: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop" },
  { nombre: "Laptop", precio: 650, categoria: "Computación", imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop" },
  { nombre: "Tablet", precio: 300, categoria: "Computación", imagen: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop" },
  { nombre: "Monitor", precio: 180, categoria: "Computación", imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop" },
  { nombre: "PS5", precio: 500, categoria: "Gaming", imagen: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop" },
  { nombre: "Control de PS5", precio: 70, categoria: "Gaming", imagen: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=300&fit=crop" },
  { nombre: "Audífonos", precio: 45, categoria: "Accesorios", imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop" },
  { nombre: "Teclado", precio: 35, categoria: "Accesorios", imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop" },
  { nombre: "Mouse", precio: 20, categoria: "Accesorios", imagen: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop" },
];

const categorias = ["Todos", "Computación", "Gaming", "Accesorios"];

// Color del badge según la categoría
const colorCategoria = (categoria) => {
  if (categoria === "Computación") return "bg-primary";
  if (categoria === "Gaming") return "bg-danger";
  return "bg-success";
};

// Elementos del DOM
const listaProductos = document.getElementById("lista-productos");
const resultado = document.getElementById("resultado");
const contadorNav = document.getElementById("contador-nav");
const botonesCategoria = document.getElementById("botones-categoria");
const inputPrecio = document.getElementById("input-precio");
const btnPrecio = document.getElementById("btn-precio");

// ===== Paso 2: mostrar los productos con map() =====

// Plantilla: recibe UN producto y devuelve el HTML de su tarjeta
const crearTarjeta = (producto) => `
  <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
    <div class="card card-producto h-100 border-0 shadow-sm overflow-hidden">
      <div class="position-relative">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <span class="badge ${colorCategoria(producto.categoria)}">${producto.categoria}</span>
      </div>
      <div class="card-body d-flex flex-column">
        <h3 class="h5 card-title">${producto.nombre}</h3>
        <p class="precio mt-auto mb-3">$${producto.precio}</p>
        <button class="btn btn-outline-dark w-100">
          <i class="bi bi-cart-plus"></i> Agregar al carrito
        </button>
      </div>
    </div>
  </div>
`;

// Render: recibe una lista, la convierte en HTML y la muestra
const mostrarProductos = (lista) => {
  contadorNav.textContent = `${lista.length} productos`;

  if (lista.length === 0) {
    listaProductos.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning text-center">
          <i class="bi bi-emoji-frown"></i> No hay productos que coincidan con el filtro.
        </div>
      </div>
    `;
    resultado.textContent = "";
    return;
  }

  listaProductos.innerHTML = lista.map(crearTarjeta).join("");
  resultado.textContent = `Mostrando ${lista.length} de ${productos.length} productos`;
};

// ===== Paso 3: filtrar por categoría con filter() =====

// Crear un botón por cada categoría
botonesCategoria.innerHTML = categorias
  .map((categoria) => `<button class="btn btn-outline-primary rounded-pill btn-categoria">${categoria}</button>`)
  .join("");

const botones = document.querySelectorAll(".btn-categoria");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const categoria = boton.textContent;

    // Marcar el botón activo
    botones.forEach((b) => b.classList.remove("active"));
    boton.classList.add("active");
    inputPrecio.value = "";

    if (categoria === "Todos") {
      mostrarProductos(productos);
    } else {
      const filtrados = productos.filter((producto) => producto.categoria === categoria);
      mostrarProductos(filtrados);
    }
  });
});

// ===== Paso 4: filtrar por precio máximo =====
btnPrecio.addEventListener("click", () => {
  const precioMaximo = Number(inputPrecio.value);

  if (inputPrecio.value === "" || precioMaximo < 0) {
    alert("Escribí un precio válido");
    return;
  }

  botones.forEach((b) => b.classList.remove("active"));

  const filtrados = productos.filter((producto) => producto.precio <= precioMaximo);
  mostrarProductos(filtrados);
});

// Al cargar la página se muestran todos
mostrarProductos(productos);
botones[0].classList.add("active");
