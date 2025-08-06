export default function ButtonGroup({ addValue, removeValue, resetValue, limit }) {
  return (
    <div className="flex flex-col items-start">
      
      <button 
        onClick={addValue}
        disabled={limit}
        className="bg-red-300 p-2 text-2xl rounded-2xl m-2 cursor-pointer hover:bg-blue-200 disabled:bg-gray-400"
      >
        Increase Value
      </button>
      <button 
        onClick={removeValue}
        className="bg-red-300 p-2 text-2xl rounded-2xl m-2 cursor-pointer hover:bg-blue-200"
      >
        Decrease Value
      </button>
      <button 
        onClick={resetValue}
        className="bg-red-300 p-2 text-2xl rounded-2xl m-2 cursor-pointer hover:bg-blue-200"
      >
        Reset Value
      </button>
    </div>
  );
}
