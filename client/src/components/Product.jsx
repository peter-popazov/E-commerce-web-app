/* eslint-disable react/prop-types */

function Product({ result }) {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-4 
      lg:gap-10 dark:bg-gray-900"
    >
      {result}
    </section>
  );
}

export default Product;
