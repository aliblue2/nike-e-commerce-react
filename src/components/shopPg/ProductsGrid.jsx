import { FiPercent } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProductsGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5  gap-2 w-full">
      {products.map((product) => {
        return (
          <Link
            to={`/products/${product.id}`}
            state={product}
            key={product.id}
            className="w-full h-80 rounded-lg shadow-sm overflow-hidden border border-gray-200 relative"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-36 mix-blend-multiply w-full object-cover aspect-square"
            />
            <FiPercent
              size={20}
              className="absolute top-2 left-2 bg-primaryColor rounded-full text-white p-[2px]"
            />
            <div className="h-44 bg-white p-2 flex flex-col items-start justify-around">
              <h6 className="font-medium text-sm line-clamp-2">
                {product.title}
              </h6>
              <p className="text-xs line-clamp-3">
                {product.title}
                که برای چوب‌های سخت ساخته شده اما به خیابان‌ها کشیده شده است، با
                روکش‌های واضح و رنگ‌های تیمی اصلی بازمی‌گردد. این نماد بسکتبال
                حال و هوای دهه 80 را با چرم درجه یک در رویه پخش می کند که ظاهری
                زیبا دارد و حتی بهتر می شود. تکنولوژی مدرن کفش کمک می کند تا
                آسایش را به قرن بیست و یکم بیاورد.
              </p>
              <h6 className="text-primaryColor font-medium text-sm">
                {product.price.toLocaleString("fa-IR") + " تومان"}
              </h6>

            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
