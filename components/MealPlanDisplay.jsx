export default function MealPlanDisplay({ data }) {
  if (data.error) return <p>Error: {data.error}</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Meal Plan Summary</h2>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
