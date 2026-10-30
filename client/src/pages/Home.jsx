import React from "react";
import Hero from "./Hero";
import NewArrivals from "./NewArrivals";
import BestDeals from "./BestDeals";
import Brands from "./Brands";
import FeaturedProducts from "./FeaturedProducts";
import Categories from "./Category";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <NewArrivals />
      <Categories />
      {/* <BestDeals /> */}
      {/* <Brands /> */}
    </>
  );
}

export default Home;
