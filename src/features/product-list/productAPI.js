export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products?id=" + id);
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductsByFilter(filter, sort, pagination) {
  let queryString = "";
  for (const key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValues = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValues}&`;
    }
  }
  for (const key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (const key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get["X-Total-Count"];
    resolve({ data: { products: data, totalItems: totalItems } });
  });
}
