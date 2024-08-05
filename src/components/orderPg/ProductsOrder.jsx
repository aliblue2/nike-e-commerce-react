const ProductsOrder = ({ orderItems }) => {
  return (
    <div className="w-full flex flex-col items-center justify-start gap-2 p-2">
      {orderItems.map((item) => {
        return (
          <div
            key={item.id}
            className="flex w-full items-center justify-between gap-5"
          >
            <img
              src={item.product.image}
              loading="lazy"
              className="w-14 h-14 mix-blend-multiply rounded-md  border border-gray-200"
            />
            <span className="text-xs font-medium">{item.product.title}</span>
            <span className="text-xs font-medium text-accentColor">
              {item.product.price.toLocaleString("fa-IR") + " تومان"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsOrder;
