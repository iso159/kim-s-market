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
        <Icon name='users' />
        <Header.Content>
            멤버 관리
        <Header.Subheader>멤버 목록 확인 및 권한 등 멤버에 대한 전반적인 관리를 할 수 있습니다.</Header.Subheader>
        </Header.Content>
    </Header>
);

export default PageHeader;