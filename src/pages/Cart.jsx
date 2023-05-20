import { Add, Remove } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from '../responsive';
import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useState } from 'react';
import { userRequest } from './../requestMethods';
import { useNavigate } from "react-router";
import { resetCart } from '../redux/cartRedux';
import { Link } from 'react-router-dom';

const KEY = import.meta.env.VITE_STRIPE;

const Container = styled.div`

`;
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props=>props.type === "filled" && "none"};
    background-color: ${(props) => 
        props.type === "filled" ? "black" : "transparent"};
    color: ${props=>props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`;
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: center;
    ${mobile({ flexDirection: "column"})}
`;
const Info = styled.div`
    flex: 3;
`;
const Product = styled.div`
    display: flex;
    justify-content: center;
    ${mobile({ flexDirection: "column"})}
`;
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;
const Image = styled.img`
    width: 100px;
`;
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductID = styled.span``;
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color};
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 10px" })}
`;
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`;
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;
const SummaryTitle = styled.h1`
    font-weight: 200;
`;
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=>props.type === "total" && "500"};
    font-size: ${props=>props.type === "total" && "500"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`;

const Cart = () => {
    const cart = useSelector(state=>state.cart)
    const [stripeToken, setStripeToken] = useState(null)
    const [cartValidate, setValidate] = useState([true, null])

    const currentUser = useSelector((state) => state.user.currentUser);

    const history = useNavigate()
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const onToken = (token) => {
        setStripeToken(token)
    }
    
    useEffect(() => {
        if (currentUser == null) {
            setValidate([false, "/login"])
        } else {
            if (cart.products.length <= 0) setValidate([false, "/products"])
        }
        const makeRequest = async () => {
            try{
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100
                })
                history("/success", { 
                    state: {
                        stripeData: res.data,
                        products: cart, 
                    }
                });
            }catch{ }
        }
        stripeToken && makeRequest()
    }, [stripeToken, cart, history])

    const resetCartHandler = () => {
        dispatch(resetCart())
    }

    const handleClick = () => {
        cartValidate[1] && navigate(cartValidate[1])
    }

    return (
        <Container>
            <Announcement/>
            <Navbar/>
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <Link to="/products"><TopButton>CONTINUE SHOPPING</TopButton></Link>
                    <TopTexts>
                        {/* <TopText>Clear bag</TopText> */}
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts>
                    <TopButton type="filled" onClick={resetCartHandler}>CLEAR</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((product, index) => (
                            <Product key={index}>
                                <ProductDetail>
                                    <Image src={product.img}/>
                                    <Details>
                                        <ProductName><b>Product:</b> {product.title}</ProductName>
                                        <ProductID><b>ID:</b> {product._id}</ProductID>
                                        {/* <ProductColor color="black"/> */}
                                        <span>Topping: </span>
                                        <ProductSize>
                                            <b>Size:</b> {product.size}
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <Remove/>
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <Add/>
                                    </ProductAmountContainer>
                                    <ProductPrice> $ {product.price}</ProductPrice>
                                </PriceDetail>
                            </Product>
                        ))}
                        <Hr/>
                    
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        { 
                        cartValidate[0] ?
                            <StripeCheckout
                                name = "Eldrie Shop"
                                image = "https://avatars.githubusercontent.com/u/14831133?v=4"
                                billingAddress
                                shippingAddress
                                description = {`Your total is $${cart.total}`}
                                amount = {cart.total*100}
                                token = {onToken}
                                stripeKey = {KEY}
                            >
                            <Button>CHECKOUT NOW</Button>
                            </StripeCheckout>
                            :
                            <Button onClick={handleClick}>CHECKOUT NOW</Button>
                        }
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default Cart