import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { register } from '../redux/apiCalls';
import { useState } from 'react';
import { publicRequest } from '../requestMethods';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.5), 
        rgba(255,255,255,0.5)
    ), 
    url('/images/register-bg.png') center;

    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div`
    width: 40%;
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
    flex-wrap: wrap;
`;
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;
const Agreement = styled.span`
    font-size: 15px;
    margin: 20px 0px;
`;
const Button = styled.button`
    width: 40%;
    border:none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`;

const Error = styled.span`
    color: red;
`;

const Register = () => {

    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(null);

    const handleClick = (e) => {
        e.preventDefault()

        const register = async () => {
            try {
                var res = await publicRequest.post("/auth/register", {
                    ...inputs,
                    points: 0
                })
                console.log(res)
            } catch {}
        };
        register();
    }

    const handleChange = (e) => {
        setInputs((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
    };

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input type="text" name="firstname" placeholder="First Name" />
                    <Input type="text" name="firstname" placeholder="Last Name" />
                    <Input type="text" name="username" placeholder="Username" onChange={handleChange}/>
                    <Input type="text" name="email" placeholder="Email" onChange={handleChange}/>
                    <Input type="text" name="phone" placeholder="Phone number" onChange={handleChange}/>
                    <Input type="text" name="password" placeholder="Password" onChange={handleChange}/>
                    <Input type="text" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange}/>
                    <Agreement>
                        By creating an account, you agree to our <b>Terms of Service</b> and <b>Privacy Policy</b>
                    </Agreement>
                    <Button onClick={handleClick}>CREATE ACCOUNT</Button>
                    {error && <Error>Something went wrong...</Error>}
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register