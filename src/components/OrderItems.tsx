import "../styles/_orderItems.scss";
import { CartItems } from "../models/types";

type OrderItemProps = {
  item: CartItems;
};

const OrderItems = (props: OrderItemProps) => {
  return (
    <section className="order-item">
      <div className="order-info">
        <p className="item-name">{props.item.name} x {props.item.amount}</p>
        <p>à {props.item.price} kr</p>
      </div>
      <div className="divider"></div>
    </section>
  );
};

export default OrderItems;
