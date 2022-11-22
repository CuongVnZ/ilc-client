import { Badge } from '@mui/material';
import { Search, ShoppingCartOutlined } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components'
import {mobile} from '../responsive'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../redux/userRedux"

const Container = styled.div`
    height: 60px;
    position: sticky;
    top: 0;
    background-color: #fff;
    ${mobile({ height: "50px" })}
    z-index: 100;
    border-bottom: 1px solid #ccc!important;
    border-color: grey;
`;
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 5px" })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;
const Language = styled.div`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${mobile({ marginLeft: "10px" })}
`;
const Input = styled.input`
    border: none;
    ${mobile({ width: "50px" })}
`

const Center = styled.div`
    flex: 2;
    text-align: center;
    `;
const StyledLink = styled(Link)`
    text-decoration: none;
    text-decoration-style: none;
    color: inherit;
`;
const Logo = styled.h1`
    font-weight: bold;
    cursor: pointer;
    ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-right: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "5px", marginRight: "5px" })}
`;

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity)

    const user = useSelector(state => state.user.currentUser)

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
    <Container>
        <Wrapper>
            <Left>
                {/* <Language>EN</Language> */}
                {/* <SearchContainer>
                    <Input placeholder="Search" />
                    <Search style={{color:"gray", fontSize:16}}/>
                </SearchContainer> */}
                <StyledLink to="/">
                    <Logo>Dreamy Coffee.</Logo>
                </StyledLink>
            </Left>
            <Center>
                {/* <StyledLink to="/">
                    <Logo>Dreamy Coffee.</Logo>
                </StyledLink> */}
            </Center>
            <Right>
                { !user && 
                <StyledLink to="/register">
                    <MenuItem>REGISTER</MenuItem> 
                </StyledLink>
                }
                { !user && 
                <StyledLink to="/login">
                    <MenuItem>LOGIN</MenuItem>
                </StyledLink> }
                { user && 
                    <StyledLink to="/profile">
                        <MenuItem>HI {user.username} !</MenuItem>
                    </StyledLink>
                }
                { user && 
                    <MenuItem onClick={logoutHandler}>LOGOUT</MenuItem>
                }
                <StyledLink to="/cart">
                    <MenuItem>
                        <Badge badgeContent={quantity} color="primary" overlap="rectangular">
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                </StyledLink>
            </Right>
        </Wrapper>
    </Container>
    )
}

export default Navbar