import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [productos, setProductos] = useState([])
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [editandoId, setEditandoId] = useState(null)

  useEffect(() => {
    cargarProductos()
  }, [])

  async function cargarProductos() {
    const respuesta = await fetch('https://api-prueba-g8rt.onrender.com/api/productos')
    const datos = await respuesta.json()
    setProductos(datos)
  }

  async function guardarProducto(evento) {
    evento.preventDefault()

    const url = editandoId
      ? `https://api-prueba-g8rt.onrender.com/api/productos/${editandoId}`
      : 'https://api-prueba-g8rt.onrender.com/api/productos'

    const respuesta = await fetch(url, {
      method: editandoId ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        precio,
      }),
    })

    if (respuesta.ok) {
      setNombre('')
      setPrecio('')
      setEditandoId(null)
      cargarProductos()
    }
  }

  function editarProducto(producto) {
    setNombre(producto.nombre)
    setPrecio(producto.precio)
    setEditandoId(producto.id)
  }

  async function eliminarProducto(id) {
    const respuesta = await fetch(
      `https://api-prueba-g8rt.onrender.com/api/productos/${id}`,
      {
        method: 'DELETE',
      }
    )

    if (respuesta.ok) {
      cargarProductos()
    }
  }

  function cancelarEdicion() {
    setNombre('')
    setPrecio('')
    setEditandoId(null)
  }

  return (
    <div className="app">
      <div className="container">

        <header className="header">
          <h1>Product Manager</h1>
          <p>Administra tus productos de forma sencilla.</p>
        </header>

        <section className="form-card">
          <form className="form" onSubmit={guardarProducto}>

            <input
              className="input"
              type="text"
              placeholder="Nombre del producto"
              value={nombre}
              onChange={(evento) => setNombre(evento.target.value)}
            />

            <input
              className="input"
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(evento) => setPrecio(evento.target.value)}
            />

            <button className="button button-primary" type="submit">
              {editandoId ? 'Actualizar' : 'Crear producto'}
            </button>

          </form>

          {editandoId && (
            <button
              className="button button-secondary"
              onClick={cancelarEdicion}
              style={{ marginTop: '12px' }}
            >
              Cancelar edición
            </button>
          )}
        </section>

        <section>
          <div className="products-header">
            <h2>Productos</h2>

            <span className="products-count">
              {productos.length} productos
            </span>
          </div>

          <div className="products">

            {productos.length === 0 ? (
              <div className="empty">
                <p>No hay productos todavía.</p>
              </div>
            ) : (
              productos.map((producto) => (
                <article className="product-card" key={producto.id}>

                  <div className="product-info">
                    <h3>{producto.nombre}</h3>
                    <p className="product-price">
                      ${producto.precio}
                    </p>
                  </div>

                  <div className="product-actions">
                    <button
                      className="button button-secondary"
                      onClick={() => editarProducto(producto)}
                    >
                      Editar
                    </button>

                    <button
                      className="button button-danger"
                      onClick={() => eliminarProducto(producto.id)}
                    >
                      Eliminar
                    </button>
                  </div>

                </article>
              ))
            )}

          </div>
        </section>

      </div>
    </div>
  )
}

export default App
