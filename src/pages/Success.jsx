import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { updateToken, userRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useDispatch } from 'react-redux';
import { resetCart } from "../redux/cartRedux"

const StyledLink = styled(Link)`
    text-decoration: none;
    text-decoration-style: none;
    color: inherit;
`;

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const data = location.state.stripeData;
    const cart = location.state.products;

    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        const createOrder = async () => {

        try {
            const res = await userRequest.post("/orders", {
                userId: currentUser._id,
                products: cart.products.map((item) => ({
                    productId: item._id,
                    quantity: item.quantity,
                    price: item.price
                })),
                amount: cart.total,
                address: data.billing_details.address,
                createdAt: new Date().toLocaleString('en-CA', {timeZone: "Asia/Ho_Chi_Minh", hour12: false}),
                status: "pending",
            });
            console.log(res)
            if(res) dispatch(resetCart())
            setOrderId(res.data.documentId);
        } catch(err) {
            console.log(err)
        }
        };
        data && createOrder();
        // navigate("/success", {}); 
    }, [cart, data, currentUser, updateToken, navigate, dispatch]);

    return (
        <div
        style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
        {orderId
            ? `Order has been created successfully. Your order number is ${orderId}`
            : `Successfull. Your order is being prepared...`}
        <StyledLink to="/"> <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button> </StyledLink>
        </div>
    );
};

export default Success;