import { useEffect, useState } from "react";
import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";
import { publicRequest } from "../requestMethods";
import { InfinitySpin } from  'react-loader-spinner'
import { display } from "@mui/system";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Loading = styled.div`
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;
    transition: all 0.3s;
    top: 0;
    bottom: 0;
`

const Products = ({ cat, filters, sort }) => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
  
    useEffect(() => {
        setLoading(true)
        setProducts([])
        const getProducts = async () => {
            try {
            const res = await publicRequest.get(
                cat != "all"
                ? `/products?category=${cat}`
                : "/products"
            );
            setProducts(res.data);
            setLoading(false)
            } catch (err) {
                console.log(err)
            }
        };
        getProducts();
    }, [cat]);
  
    useEffect(() => {
        cat &&
            setFilteredProducts(
                products.filter((item) =>
                    Object.entries(filters).every(([key, value]) =>
                    item[key].includes(value)
                    )
                )
            );
    }, [products, cat, filters]);
  
    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts((prev) =>
            [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "asc") {
            setFilteredProducts((prev) =>
            [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilteredProducts((prev) =>
            [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]);
  
    return (
        <>
            {
                loading &&
                <Loading>
                    <InfinitySpin 
                    width='200'
                    color="#000000"
                    />
                </Loading>
            }
            <Container>
                {
                    cat
                    ? filteredProducts.map((item, index) => <Product item={item} key={index} />)
                    : products
                        .slice(0, 8)
                        .map((item, index) => <Product item={item} key={index} />)
                }
            </Container>
        </>
    );
  };

export default Products