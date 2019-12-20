import React from 'react'
import { Icon, Header } from 'semantic-ui-react'

const style = {
    header: {
        marginBottom: '2em'
    }
}

// 본 페이지 헤더
const PageHeader = () => (
    <Header as='h1' style={ style.header } dividing>
        <Icon name='payment' />
        <Header.Content>
            주문하기
        <Header.Subheader>결제 수단 및 배송지를 선택하고 선택한 상품을 구매하세요!</Header.Subheader>
        </Header.Content>
    </Header>
);

export default PageHeader;