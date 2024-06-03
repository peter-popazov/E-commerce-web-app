/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState, useContext } from "react";
import SideBar from "../components/SideBar/SideBar";
import Card from "../components/Card";
import Recommended from "../components/Recommended";
import { SearchContext } from "../components/providers/SearchProvider";

function ProductsPage({ productsServer, categoriesServer }) {
  const { searchQuery } = useContext(SearchContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

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
    setSelectedBrand(brand);
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
    return products.filter((product) => product.company === brand);
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

    return filteredProducts.map(
      ({ id, filePath, name, star, reviews, price }) => (
        <Card
          key={id}
          id={id}
          img={filePath}
          title={name}
          star={star}
          reviews={reviews}
          price={price}
        />
      )
    );
  }

  const result = filteredData(
    productsServer,
    selectedCategories,
    selectedPrices,
    selectedBrand,
    searchQuery
  );

  return (
    <div className="container mx-auto px-6">
      <div className="w-full h-full flex pb-20 gap-10 mt-16">
        <div className="w-[30%] lg:w-[20%] hidden sm:inline-flex h-full">
          <SideBar
            onFilterChange={handleFilterChange}
            categoriesServer={categoriesServer}
          />
        </div>
        <div className="w-full md:w-[70%] items-center md:items-start lg:w-[80%] h-full flex flex-col gap-2">
          <Recommended onButtonClick={handleClickButton} />
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-4 lg:gap-10 dark:bg-gray-900">
            {result}
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
