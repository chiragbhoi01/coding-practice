type CounterProps = {
  counterValue: number;
  limit: boolean;
};

export default function Counter({ counterValue, limit }: CounterProps) {
  return (
    <>
      {limit && (
        <h1 className="bg-red-500 text-white px-3 py-1 mb-2">
          Limit is reached
        </h1>
      )}
      <h1 className="bg-amber-300 p-5 text-4xl">
        Counter value : {counterValue}
      </h1>
    </>
  );
}
