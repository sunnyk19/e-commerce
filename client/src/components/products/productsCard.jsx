export default function ProductCard({ product }) {
  return (
    <div className="border p-4 hover:shadow-lg transition">
      <img src={product.image} className="h-40 mx-auto" />
      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-green-600 font-bold">₹{product.price}</p>
      <button className="bg-yellow-500 w-full mt-2 p-2">
        Add to Cart
      </button>
    </div>
  );
}