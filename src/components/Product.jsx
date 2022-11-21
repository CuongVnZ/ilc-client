import { 
    FavoriteBorderOutlined, 
    SearchOutlined, 
    ShoppingCartOutlined } 
    from '@material-ui/icons';
import { Link } from "react-router-dom";
import styled from 'styled-components';


const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`;
const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 250px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f7f4ee;
    position: relative;

    &:hover ${Info} {
        opacity: 1;
    }
    
`;
const Circle = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`;
const Image = styled.img`
    height: 75%;
    border-radius: 10%;
    z-index: 2;
`;
const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transform:all 0.5s ease;
    &:hover {
        background-color: #f7d8a7;
        transform: scale(1.1);
    }
`;

const Title = styled.div`
    display: inline-block;
    justify-content: center;
`

const Product = ({item}) => {
    return (
        <Container>
            <Circle/>
            <Image src={item.img}/>
            <Info>
                <Icon>
                    <ShoppingCartOutlined/>
                </Icon>
                <Icon>
                    <Link to={`/product/${item.id}`}>
                        <SearchOutlined />
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined/>
                </Icon>
            </Info>
            {/* <Title>Test</Title> */}
        </Container>
    )
}

export default Product