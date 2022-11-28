import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from '../components/Products'
import { mobile } from "../responsive";
import { useNavigate , useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import BusyLoading from "../components/BusyLoading";

const Container = styled.div`

`;

const Wrapper = styled.div`
    padding: 20px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const PathText = styled.nav`
    letter-spacing: .5px;
    line-height: 1.7;
    color: #000;
    font-size: 14px;
    box-sizing: border-box;
    display: block;
    list-style: none;
    background: #f5f5f5;
    text-transform: uppercase;
    padding: 7px 15px;
    border-radius: 0;
    margin: 20px;
`;

const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 50vh;
    height: 50vh;
    border-radius: 10%;
    -webkit-box-shadow: 0px 0px 11px -1px rgba(0,0,0,0.25); 
    box-shadow: 0px 0px 11px -1px rgba(0,0,0,0.25);
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Desc = styled.p`
    margin: 20px 0px;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    width: 100%;
    margin: 30px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: auto;
    margin-bottom: 10px;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
    margin-bottom: 5px;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
`;

const FilterSize = styled.select`
    margin-right: auto;
    padding: 5px;
`;

const FilterButtonArea = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
`

const FilterButton = styled.button`
    display: flex;
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    vertical-align: baseline;
    transition: all 0.3s;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    padding: 0 20px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    height: 40px;
    line-height: 1;
    font-weight: 400;
    margin-right: 16px;
    font-size: 14px;
    color: #666666;
`

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid #af8a64;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid #af8a64;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    &:hover {
        background-color: #f8f4f4;
    }
    margin-left: auto;
`;

const OtherProducts = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    `;

const OtherProductsText = styled.span`
    justify-content: center;
    font-weight: 300;
    font-size: 30px;
    `;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
    margin-top: 5px;
    margin-bottom: 5px;
    `;

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("S");
    const [loading, setLoading] = useState(<BusyLoading/>);

    const [sizeStyle, setSizeStyle] = useState([
    {
        backgroundColor: "#af8a64",
        color: "#fff"
    },
    {
        backgroundColor: "#fff",
        color: "#666666"
    },
    {
        backgroundColor: "#fff",
        color: "#666666"
    }]);


    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(<BusyLoading/>)
                const res = await publicRequest.get("/products/find/" + id);
                if (JSON.stringify(res.data) === "{}" ) {
                    return navigate("/");
                }
                setProduct(res.data);
                setLoading(null)
            } catch {}
        };
        getProduct();
    }, [id, navigate]);

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleClick = () => {
        dispatch(
            addProduct({ ...product, quantity, color, size })
        );
    };

    const handleSize = (e) => {
        var value = e.target.value
        if (value === "S"){
            setSizeStyle([
                {
                    backgroundColor: "#af8a64",
                    color: "#fff"
                },
                {
                    backgroundColor: "#fff",
                    color: "#666666"
                },
                {
                    backgroundColor: "#fff",
                    color: "#666666"
                },
            ])
        }else if (value === "M"){
            setSizeStyle([
                {
                    backgroundColor: "#fff",
                    color: "#666666"
                },
                {
                    backgroundColor: "#af8a64",
                    color: "#fff"
                },
                {
                    backgroundColor: "#fff",
                    color: "#666666"
                },
            ])
        }else if (value === "L"){
            setSizeStyle([
                {
                    backgroundColor: "#fff",
                    color: "#666666"
                },
                {
                    backgroundColor: "#fff",
                    color: "#666666"
                },
                {
                    backgroundColor: "#af8a64",
                    color: "#fff"
                },
            ])
        }
        setSize(value)
        
    };

    return (
        <Container>
            <Announcement />
            <Navbar />
            {loading}
            <PathText>HOME | PRODUCTS | {product.title}</PathText>
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Hr/>
                    <Desc>{product.desc}</Desc>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Topping</FilterTitle>
                                {product.color?.map((c) => (
                                    <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                                ))}
                            </Filter>
                            <FilterButtonArea>
                                <FilterButton>Toping1 + 0 USD</FilterButton>
                                <FilterButton>Toping2 + 0.5 USD</FilterButton>
                                <FilterButton>Toping3 + 1 USD</FilterButton>
                            </FilterButtonArea>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            {/* <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product.size?.map((s) => (
                                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                ))}
                            </FilterSize> */}
                            <FilterButtonArea>
                                <FilterButton value="S" onClick={handleSize} style={sizeStyle[0]}>Small</FilterButton>
                                <FilterButton value="M" onClick={handleSize} style={sizeStyle[1]}>Medium</FilterButton>
                                <FilterButton value="L" onClick={handleSize} style={sizeStyle[2]}>Large</FilterButton>
                            </FilterButtonArea>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity("dec")} style={{cursor: "pointer"}}/>
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity("inc")} style={{cursor: "pointer"}}/>
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Hr/>
            <OtherProducts>
                <OtherProductsText>SIMILAR PRODUCTS</OtherProductsText>
                <Products cat={product.category} filters={{}} sort="newest"/>
            </OtherProducts>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Product;