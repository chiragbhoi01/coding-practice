import React from "react";

type ProductProps = {
  title: string;
  price: number;
  category: string;
  image: string;
};

function Product({ title, price, category, image }: ProductProps) {
  return (
    <div className="bg-blue-300 w-80 rounded-2xl text-center shadow-md hover:shadow-lg transition p-4">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-gray-700">₹ {price}</p>
      <p className="text-sm text-gray-500">Category: {category}</p>
      <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
