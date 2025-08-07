import React, { useCallback, useMemo, useState } from "react";

const sampleProduct = [
  { id: 1, name: "iPhone 14", category: "Electronics", price: 800 },
  { id: 2, name: "T-Shirt", category: "Clothing", price: 20 },
  { id: 3, name: "Laptop", category: "Electronics", price: 1200 },
  { id: 4, name: "Jeans", category: "Clothing", price: 40 },
  { id: 5, name: "Bluetooth Speaker", category: "Electronics", price: 100 },
];

function Product() {
  const [cart, setCart] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // 🧠 useCallback for addCart
  const addCart = useCallback(() => {
    setCart((prev) => prev + 1);
  }, []);

  // 🧠 useMemo for filtered products
  const filteredProducts = useMemo(() => {
    console.log("Filtering...");
    return sampleProduct.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="justify-center flex bg-amber-100 min-h-screen p-6">
      <div className="w-full max-w-3xl">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4 gap-4">
          <span className="text-2xl font-bold">🛒 Cart: {cart}</span>

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search Product..."
            className="p-2 rounded-md border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Category Filter */}
          <select
            className="p-2 rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
          </select>
        </div>

        {/* Product List */}
        <div className="space-y-4">
          {filteredProducts.map((item) => (
            <div
              className="flex bg-blue-400 p-4 gap-4 justify-between text-xl items-center rounded-lg"
              key={item.id}
            >
              <span className="font-semibold">{item.name}</span>
              <span>{item.category}</span>
              <span className="text-orange-600">₹ {item.price}</span>
              <button
                onClick={addCart}
                className="bg-blue-200 rounded-xl px-4 py-2 cursor-pointer hover:bg-red-300"
              >
                Add to cart
              </button>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <p className="text-center text-red-600 text-xl">
              No Products Found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
