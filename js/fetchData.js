// fetchData.js
export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
