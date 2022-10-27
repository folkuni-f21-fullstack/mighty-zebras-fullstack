import appertizer from "../assets/menu/appertizer.svg";
import "../styles/_handleOrder.scss";
import UserOrderAccordian from "./UserOrderAccordian";
import { Order } from "../models/types";
import { useEffect, useState } from "react";
import Nav from "./Nav";

type Props = {};

const HandleOrder = (props: Props) => {
  const foodImg = appertizer;

  const [orders, setOrders] = useState<Order[]>();

  let checkId: string | null = localStorage.getItem("accountId");
  let finishedOrders: Order[] = [];
  let activeOrders: Order[] = [];

  useEffect(() => {
    async function getOrders() {
      if (checkId === "null") {
        return;
      } else {
        const response = await fetch("api/order/admin/orders", {
          headers: {
            accountID: `${checkId}`,
          },
        });
        const data = await response.json();
        setOrders(data);
      }
    }
    getOrders();
  }, []);

  if (orders !== undefined) {
    activeOrders = orders.filter((order) => !order.completed);
    finishedOrders = orders.filter((order) => order.completed);

    //  ON HOLD:                const notPickedUp: Order[] | undefined = orders?.filter(order => ??? );
  }

  return (
    <div className="admin_page--wrapper">
      <Nav />

      <div className="menu-wrapper">
        <section
          className="menu-header"
          style={{ backgroundImage: `url(${foodImg})` }}
        >
          <h1>ADMINISTRATION </h1>
        </section>
      </div>

      <div className="admin_button--container">
        <button className="admin-buttonSmall">Tillbaka </button>
        <button className="admin-buttonSmall">Logga ut </button>
      </div>

      <section className="search">
        <section className="user-search">
          <div className="search-container">
            <input
              type="text"
              name="search"
              id="search-user"
              placeholder="Sök ordernummer"
            />
            <label htmlFor="search">SÖK</label>
          </div>
        </section>
      </section>

      <section className="user-orders">
        {orders !== undefined ? (
          <UserOrderAccordian
            key={1}
            orderType={"Ohanterade"}
            orders={activeOrders}
          />
        ) : (
          <p></p>
        )}
        {orders !== undefined ? (
          <UserOrderAccordian
            key={2}
            orderType={"Avslutade"}
            orders={finishedOrders}
          />
        ) : (
          <p></p>
        )}
      </section>

    </div>
  );
};

export default HandleOrder;
