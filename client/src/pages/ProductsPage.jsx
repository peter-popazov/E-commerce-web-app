/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from "react";
import SideBar from "../components/SideBar/SideBar";
import Card from "../components/Card";
import Recommended from "../components/Recommended";

function ProductsPage({
  productsServer,
  categoriesServer,
  setProductsServer,
  searchQuery,
}) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  const brands = Array.from(
    new Set(productsServer.map((product) => product.brand))
  );

  const handleFilterChange = (value, checked, type) => {
    if (type === "category") {
      setSelectedCategories((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value)
      );
    } else if (type === "price") {
      setSelectedPrices((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value)
      );
    }
  };

  const handleClickButton = (brand) => {
    if (selectedBrand === brand) {
      setSelectedBrand(null);
    } else {
      setSelectedBrand(brand);
    }
  };

  const filterByQuery = (products, query) => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  };

  const filterByCategory = (products, categories) => {
    if (categories.length === 0) return products;
    return products.filter((product) =>
      categories.includes(product.category.name)
    );
  };

  const filterByPrice = (products, prices) => {
    if (prices.length === 0) return products;
    return products.filter((product) => {
      return prices.some((priceRange) => {
        const [min, max] = priceRange.split("-").map(Number);
        return product.price >= min && product.price <= max;
      });
    });
  };

  const filterByBrand = (products, brand) => {
    if (!brand) return products;
    return products.filter((product) => product.brand === brand);
  };

  function filteredData(
    productsServer,
    selectedCategories,
    selectedPrices,
    selectedBrand,
    query
  ) {
    let filteredProducts = productsServer;

    if (query) {
      filteredProducts = filterByQuery(filteredProducts, query);
    }

    if (selectedCategories.length > 0) {
      filteredProducts = filterByCategory(filteredProducts, selectedCategories);
    }

    if (selectedPrices.length > 0) {
      filteredProducts = filterByPrice(filteredProducts, selectedPrices);
    }

    if (selectedBrand) {
      filteredProducts = filterByBrand(filteredProducts, selectedBrand);
    }

    if (!Array.isArray(filteredProducts)) {
      return [];
    }

    return filteredProducts.map(({ id, filePath, name, price, inventory }) => (
      <Card
        key={id}
        id={id}
        img={filePath}
        title={name}
        price={price}
        inventoryQuantity={inventory.quantity}
        productsServer={productsServer}
        setProductsServer={setProductsServer}
      />
    ));
  }

  const result = filteredData(
    productsServer,
    selectedCategories,
    selectedPrices,
    selectedBrand,
    searchQuery
  );

  return (
    <div className="lg:mx-10 md:mx-4  flex justify-center lg:mt-16">
      <div className="w-full h-full flex justify-center mb-20 gap-10">
        <div className="w-[30%] lg:w-[20%] max-w-[300px] hidden sm:inline-flex h-full">
          <SideBar
            onFilterChange={handleFilterChange}
            categoriesServer={categoriesServer}
          />
        </div>
        <div className="items-center md:items-start h-full flex flex-col gap-2">
          <Recommended onButtonClick={handleClickButton} brands={brands} />
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center gap-10 md:gap-4 lg:gap-10 dark:bg-gray-900">
            {result.length > 0 ? (
              result
            ) : (
              <div className="flex justify-center items-center h-full w-full">
                <p className="w-inherit m-2 text-center text-gray-700">
                  No products found.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
