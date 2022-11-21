import React from 'react'
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';

const Container = styled.div``;

export default function Profile() {
    return (
        <Container>
            <Announcement />
            <Navbar />
            <div>Profile</div>
        </Container>
    )
}
