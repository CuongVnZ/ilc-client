import styled from 'styled-components';
import { mobile } from '../responsive';

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

const Register = () => {
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input type="text" placeholder="First Name" />
                    <Input type="text" placeholder="Last Name" />
                    <Input type="text" placeholder="Username" />
                    <Input type="text" placeholder="Email" />
                    <Input type="text" placeholder="Phone number" />
                    <Input type="text" placeholder="Password" />
                    <Input type="text" placeholder="Confirm Password" />
                    <Agreement>
                        By creating an account, you agree to our <b>Terms of Service</b> and <b>Privacy Policy</b>
                    </Agreement>
                    <Button>CREATE ACCOUNT</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register