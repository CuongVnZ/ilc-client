import { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { login } from '../redux/apiCalls';
import { mobile } from '../responsive';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.25), 
        rgba(255,255,255,0.25)
    ), 
    url('/images/login-bg.png') center;

    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`;
const Button = styled.button`
    width: 40%;
    border:none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`;

const Error = styled.span`
    color: red;
`;

const FormLink = styled.a`
    margin: 5px 0px;
    text-decoration: underline;
    cursor: pointer;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    text-decoration-style: none;
    color: inherit;
`;

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { isFetching, error } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, { username, password })
    }
    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                    <Input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                    {error && <Error>Something went wrong...</Error>}
                    <FormLink>DO NOT YOU REMEMBERR THE PASSWORD?</FormLink>
                    <StyledLink to="/register"><FormLink>CREATE A NEW ACCOUNT</FormLink></StyledLink>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login