const ProductCard = ({
  name,
  id,
  price,
  handler,
  imgSrc,
  hotelname,
  address,
  hotelimage,
}) => (
  <div className="productCard">
    <img src={imgSrc} alt={name} />
    <p>{name}</p>
    <h4>${price}</h4>
    <h5>{hotelname}</h5>
    <h5>{address}</h5>
    <button
      onClick={() =>
        handler({
          name,
          price,
          id,
          quantity: 1,
          imgSrc,
          hotelname,
          address,
          hotelimage,
        })
      }
    >
      Add to Cart
    </button>
  </div>
);

export default ProductCard;
