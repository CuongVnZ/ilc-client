import React from 'react'
import { ColorRing } from  'react-loader-spinner'
import styled from 'styled-components'

const LoadingWrapper = styled.div`

`

const Loading = styled.div`
    height: 100vh;
    width: 100vw;
    z-index: 9999;
    background-color: #7c4c23;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;
    transition: all 0.3s;
    top: 0;
    bottom: 0;
`

export default function BusyLoading() {
    return (
        <LoadingWrapper>
            <Loading> 
                <ColorRing
                    height="80"
                    width="80"
                    visible={true}
                    ariaLabel="blocks-loading"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            </Loading>
        </LoadingWrapper>
    )
}
