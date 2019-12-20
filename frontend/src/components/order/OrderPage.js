import React, { Component } from 'react';
import { Container, Button, Grid } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import TabForChooseLocation from './deliveryLocation/TabForChooseLocation';

class OrderPage extends Component {

    // 결제하기 클릭 이벤트
    handlePay = () => {
        let IMP = window.IMP;
        IMP.init('imp91508646');

        IMP.request_pay({
            pg : 'html5_inicis',
            pay_method : 'card',
            merchant_uid : 'merchant_' + new Date().getTime(),
            name : '주문명:결제테스트',
            amount : 14000,
            buyer_email : 'iamport@siot.do',
            buyer_name : '구매자이름',
            buyer_tel : '010-1234-5678',
            buyer_addr : '서울특별시 강남구 삼성동',
            buyer_postcode : '123-456',
        }, function(rsp) {
            if ( rsp.success ) {
                var msg = '결제가 완료되었습니다.';
                msg += '고유ID : ' + rsp.imp_uid;
                msg += '상점 거래ID : ' + rsp.merchant_uid;
                msg += '결제 금액 : ' + rsp.paid_amount;
                msg += '카드 승인번호 : ' + rsp.apply_num;
            } else {
                var msg = '결제에 실패하였습니다.';
                msg += '에러내용 : ' + rsp.error_msg;
            }
            alert(msg);
        });
    }

    render() {
        return (
            <Container>
                <PageHeader />
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column width='11'>
                            <h2>배송지 선택</h2>
                            <TabForChooseLocation />
                            <h2>주문상품 정보</h2>
                            <div style={ { overflow: 'auto', height: 400} }>

                            </div>
                        </Grid.Column>
                        <Grid.Column width='5'>
                            <h2>최종결제 정보</h2>
                            <div style={ { border: '4px solid orange', padding: '5px 5px 5px 5px' } }>
                                <Button onClick={ this.handlePay }>결제하기</Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default OrderPage;