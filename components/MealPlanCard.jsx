import Navbar from "./NavBar";

export default function MealPlanCard({ mealPlan }) {
  if (!mealPlan) return null;
  // return (
  //   <div className="bg-white rounded-lg shadow p-6 mt-6">
  //     <h3 className="text-2xl font-bold mb-2 text-green-700">Your Meal Plan</h3>
  //     <pre className="bg-gray-100 rounded p-4 overflow-auto text-xs mb-6">
  //       {/* For debugging, show the raw JSON */}
  //       {JSON.stringify(mealPlan.summary, null, 2)}
  //     </pre>
  //     {Object.entries(mealPlan.daily_meals).map(([day, dayData]) => (
  //       <div key={day} className="mb-4">
  //         <h4 className="font-bold text-blue-700 mb-2 capitalize">{day.replace("_", " ")}</h4>
  //         <ul>
  //           {Object.entries(dayData.meals).map(([mealName, meal]) => (
  //             <li key={mealName} className="mb-2">
  //               <span className="font-semibold">{mealName}:</span> {meal.description}
  //               <div className="ml-4 text-xs text-gray-600">
  //                 Calories: {meal.calories} | Protein: {meal.protein_grams}g
  //                 <br />
  //                 Ingredients:{" "}
  //                 {meal.ingredients &&
  //                   meal.ingredients.map((ing, idx) => (
  //                     <span key={idx}>
  //                       {ing.item} ({ing.quantity})
  //                       {idx < meal.ingredients.length - 1 ? ", " : ""}
  //                     </span>
  //                   ))}
  //               </div>
  //             </li>
  //           ))}
  //         </ul>
  //         <div className="text-sm mt-2">
  //           <strong>Total Calories:</strong> {dayData.total_calories} |{" "}
  //           <strong>Total Protein:</strong> {dayData.total_protein_grams}g
  //         </div>
  //       </div>
  //     ))}
  //     <h4 className="font-bold mt-6 mb-2 text-blue-700">Shopping Sources</h4>
  //     <ul>
  //       {mealPlan.shopping_sources.map((src, idx) => (
  //         <li key={idx} className="mb-2">
  //           <span className="font-semibold">{src.place}</span> ({src.type}) - {src.address}
  //           <br />
  //           <span className="text-xs">Items: {src.available_items.join(", ")}</span>
  //           <br />
  //           <span className="text-xs">Used in: {src.used_in_meals.join(", ")}</span>
  //           <br />
  //           <span className="text-xs text-gray-500">{src.notes}</span>
  //         </li>
  //       ))}
  //     </ul>
  //     <h4 className="font-bold mt-6 mb-2 text-blue-700">Estimated Weekly Cost</h4>
  //     <div className="text-sm">
  //       Food: {mealPlan.estimated_weekly_cost.food} <br />
  //       Restaurant Meals: {mealPlan.estimated_weekly_cost.restaurant_meals} <br />
  //       <strong>Total: {mealPlan.estimated_weekly_cost.total}</strong>
  //     </div>
  //   </div>
  // );

  return (
  <div className="min-h-screen bg-gray-100 pt-24">
    <Navbar />
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )} */}
      {!showResults ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
            <MealPlanForm onSubmit={handleGenerate} />
          </div>
        </div>
      ) : loading ? (
        <div className="text-blue-600 text-lg">Generating your meal plan...</div>
      ) : mealPlan ? (
        // Show raw JSON output
        <pre className="bg-gray-100 rounded p-4 overflow-auto text-xs mt-6">
          {JSON.stringify(mealPlan, null, 2)}
        </pre>
      ) : null}
    </div>
  </div>
);

}
