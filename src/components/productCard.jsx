export default function ProductCard(props) {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
      
      {/* Image */}
      <img
        src={props.image}
        alt={props.name}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h1 className="text-lg font-semibold text-gray-800 mb-2">
          {props.name}
        </h1>

        <p className="text-gray-600 mb-4">
          Price: <span className="font-bold text-gray-900">Rs. {props.price}</span>
        </p>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200">
          View More
        </button>
      </div>
    </div>
  );
}
