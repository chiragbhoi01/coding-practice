import React, { useEffect, useMemo, useState } from "react";
import Product from "./Product";

interface ProductData {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
}

function Parent() {
  const [items, setItems] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("All");

  useEffect(() => {
    const url =
      "https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=10&inc=category%252Cprice%252Cthumbnail%252Cimages%252Ctitle%252Cid&query=mens-watches";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setItems(data.data.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get all unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(items.map((item) => item.category)));
    return ["All", ...uniqueCategories];
  }, [items]);

  // Filtered list based on search + category
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [items, search, category]);

  return (
    <>
      {/* Search Input */}
      <input
        type="text"
        name="search-item"
        placeholder="Search your product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4"
      />

      {/* Category Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded ml-2"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Product List */}
      <div className="flex flex-wrap gap-4 p-4 justify-center">
        {error && <h2 className="text-red-500">{error}</h2>}
        {loading ? (
          <h1>Loading...........</h1>
        ) : filteredItems.length > 0 ? (
          filteredItems.map((product) => (
            <Product
              key={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              image={product.thumbnail}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </>
  );
}

export default Parent;
