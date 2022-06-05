import './App.css';

import { useState, useEffect } from 'react';

// 4- custom hook

import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);

  // 4 - custom hook
  const { data: items, httpConfig, loading, error } = useFetch(url)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  // 1 - resgatando dados
  // useEffect(  () => {
  //   async function fetchData() {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     setProducts(data)
  
  //   }
  //   fetchData();
    
  // }, []);

  // 2 - add de produtos

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price
    }

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(product),
    // })

    // // 3 - carregamento dinâmico
    // const addedProducts = await res.json();
    // setProducts((prevProducts) => [...prevProducts, addedProducts ])

    // 5 - refatorando POST
    httpConfig(product, "POST")

    setName("")
    setPrice('')

  };

  //8 - Desafio 6 delete
  const handleRemove = (id) => {
    httpConfig(id, 'DELETE')
  }

  return (
    <div className="App">
      <h1>Lista de produtos   </h1>
      {/* 6 - loading */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p> }
      { !error && (
      <ul>
        {items && items.map((product) => (
          <li key={product.id}>{product.name} - {product.price}
          <button onClick={() => handleRemove(product.id)}>Exluir</button>
          </li>
          
        ))}
      </ul>

      )}
        <div className="add-product">
          <form onSubmit={handleSubmit}>
          <label>
            Nome: 
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
          </label>
          <label>
            Preço: 
            <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
          </label>
          {/* 7 - state de loading no post */}
          {loading && <input type="submit" disabled value="Aguarde" />}
          {!loading && <input type="submit" value="Criar" />}
          </form>
        </div>   

    </div>
  );
}

export default App;
