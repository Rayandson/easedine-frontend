import { OrderBody, OrderResponse } from "../types";
import api from "./api"

async function postOrder(body: OrderBody) {
    const order = await api.post("/orders", body);

    return order;
}

async function getOrder(orderId: number) {
    const order = await api.get(`/orders/${orderId}`);
    
    return order;
}

const ordersApi = {
    postOrder,
    getOrder
}

export default ordersApi;