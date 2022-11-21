import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 30px;
  background-color: #af8a64;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`

const Announcement = () => {
  return (
    <Container>
      Super Deal! Free Shipping on Orders Over $50
    </Container>
  )
}

export default Announcement