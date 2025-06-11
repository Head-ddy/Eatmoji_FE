const BASE_URL = process.env.NEXT_PUBLIC_URL_SERVER;

export const fetchRecipeByFood = async (food: string): Promise<string> => {

  const response = await fetch(`${BASE_URL}/api/recipe?food=${encodeURIComponent(food)}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("레시피를 불러오지 못했습니다.");
  }

  return response.text();
};
