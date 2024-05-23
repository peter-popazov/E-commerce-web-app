/* eslint-disable no-undef */
import { useState, useContext } from "react";
import Product from "../components/Product";
import SideBar from "../components/SideBar/SideBar";
import Card from "../components/Card";
import Recommended from "../components/Recommended";
import products from "../data/data";
import { SearchContext } from "../components/SearchProvider";

function ProductsPage() {
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
        product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  };

  const filterByCategory = (products, categories) => {
    if (categories.length === 0) return products;
    return products.filter((product) => categories.includes(product.category));
  };

  const filterByPrice = (products, prices) => {
    if (prices.length === 0) return products;
    return products.filter((product) => {
      return prices.some((priceRange) => {
        const [min, max] = priceRange.split("-").map(Number);
        return product.newPrice >= min && product.newPrice <= max;
      });
    });
  };

  const filterByBrand = (products, brand) => {
    if (!brand) return products;
    return products.filter((product) => product.company === brand);
  };

  function filteredData(
    products,
    selectedCategories,
    selectedPrices,
    selectedBrand,
    query
  ) {
    let filteredProducts = products;

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

    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <div className="w-full" key={Math.random()}>
          <Card
            img={img}
            title={title}
            star={star}
            reviews={reviews}
            prevPrice={prevPrice}
            newPrice={newPrice}
          />
        </div>
      )
    );
  }

  const result = filteredData(
    products,
    selectedCategories,
    selectedPrices,
    selectedBrand,
    searchQuery
  );

  return (
    <div className="container mx-auto px-6">
      <div className="w-full h-full flex pb-20 gap-10 mt-16">
        <div className="container w-[30%] lg:w-[20%] hidden md:inline-flex h-full">
          <SideBar onFilterChange={handleFilterChange} />
        </div>
        <div className="container w-full md:w-[70%] lg:w-[80%] h-full flex flex-col gap-2">
          <Recommended onButtonClick={handleClickButton} />
          <Product result={result} onButtonClick={handleClickButton} />
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
