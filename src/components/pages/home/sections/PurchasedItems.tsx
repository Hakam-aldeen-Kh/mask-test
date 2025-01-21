import Image from "next/image";
import data from "@/content/home/purchasedItems.json";
import PurchaseItemsCard from "../components/PurchaseItemsCard";
import PurchaseItemsCategoryCard from "../components/PurchaseItemsCategoryCard";

const PurchasedItems = () => {
  return (
    <section
      className="relative py-[50px] md:py-[80px] lg:py-[120px] px-5 md:px-[50px] lg:px-[160px]"
      aria-labelledby="purchased-items-heading"
    >
      <Image
        src="/images/home-page/bg-items.jpg"
        alt="banner-right-bg"
        fill
        priority
        className="object-cover opacity-10 -z-10"
      />
      {/* overlay */}
      <div className="absolute h-full w-full left-0 top-0 bg-[#FFE0E3] -z-20"></div>
      <h2 className="text-[30px] md:text-[50px] lg:text-[60px] leading-[45px] md:leading-[60px] lg:leading-[90px] font-black text-center font-noto bg-gradient-to-r from-light-red to-dark-red bg-clip-text text-transparent">
        買取品目一覧
      </h2>
      {/* filter */}
      <div className="mt-[40px] md:mt-[45px] lg:mt-[50px] mb-[24px] md:mb-[28px] lg:mb-[32px] w-[75%] md:w-[85%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mx-auto">
        {data.filter.map((filterItem) => (
          <PurchaseItemsCategoryCard
            key={filterItem.id}
            id={filterItem.id}
            title={filterItem.title}
            image={filterItem.image}
          />
        ))}
      </div>
      {/* items */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[17px] gap-y-[24px] lg:gap-8">
        {data.items.map((item) => (
          <PurchaseItemsCard
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
          />
        ))}
      </div>
    </section>
  );
};

export default PurchasedItems;
