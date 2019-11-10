import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Container, Header, Icon, Grid, Input, Form, Dropdown, Pagination, Button, Table, Dimmer, Loader, Label } from 'semantic-ui-react'
import { formatDate } from '../../customLibrary'
import { getCategories } from '../../store/actions/categoryActions'
import { loadingDatas, loadedDatas } from '../../store/actions/loaderActions'
import axios from 'axios'
import SimpleReactValidator from 'simple-react-validator';

const style = {
    container: {
        marginTop: '3em',
        marginBottom: '2em',
        minHeight: '800px'
    },
    header: {
        marginBottom: '2em'
    },
    formField: {
        marginBottom: '2em'
    },
    submitButton: {
        marginTop: '3em'
    }
};

// 본 페이지 헤더
const PageHeader = () => (
    <Header as='h1' style={ style.header } dividing>
        <Icon name='settings' />
        <Header.Content>
            카테고리 관리
        <Header.Subheader>카테고리를 등록, 삭제할 수 있습니다</Header.Subheader>
        </Header.Content>
    </Header>
);

// 카테고리 삭제 버튼 컴포넌트
const DeleteButton = (props) => {
    const handleOnDelete = (e) => {
        e.preventDefault();

        props.loadingDatas();
        const categoryNo = props.categoryNo;
        
        axios.delete('/categories/' + categoryNo)
        .then(() => {
            props.axiosGetCategories();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            props.loadedDatas();
        });
    }

    return (
        <Button onClick={ handleOnDelete } size='tiny' negative icon>
            <Icon name='trash' />
        </Button>
    );
}

// 카테고리 리스트 한 행 컴포넌트
const CategoryRow = (props) => {
    const category = props.categoryForTable;
    const labelColor = category.categoryType === '최상위' ? 'blue' : null;

    return (
        <Table.Row>
            <Table.Cell>
                <Label color={ labelColor } ribbon>{ category.categoryType }</Label>
            </Table.Cell>
            <Table.Cell>{ category.categoryName }</Table.Cell>
            <Table.Cell>{ category.creatorId }</Table.Cell>
            <Table.Cell>{ category.createdAt }</Table.Cell>
            <Table.Cell textAlign='center'>
                <DeleteButton 
                    categoryNo={ category.categoryNo } 
                    { ...props }
                />
            </Table.Cell>
        </Table.Row>
    );
}

// 카테고리 리스트 하단 푸터 컴포넌트
const CategoryTableFooter = (props) => {
    const currentPage = props.currentPage;
    const pageLength = props.pageLength;
    const handlePageChange = props.handlePageChange;

    return (
        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan='6'>
                    <Pagination 
                        activePage={ currentPage } 
                        totalPages={ pageLength } 
                        onPageChange={ handlePageChange }
                    />
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    );
}

// 카테고리 리스트 상단 헤더 컴포넌트
const CategoryTableHeader = () => {
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>분류</Table.HeaderCell>
                <Table.HeaderCell>카테고리 명</Table.HeaderCell>
                <Table.HeaderCell>등록자</Table.HeaderCell>
                <Table.HeaderCell>등록일자</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    );
}

// 카테고리 리스트 테이블 컴포넌트
const CategoryTable = (props) => {
    const rowPerPage = props.rowPerPage;
    const currentPage = props.currentPage;
    const categories = props.categories;
    const handlePageChange = props.handlePageChange;
    const searchObject = props.searchObject;
    const searchKey = searchObject.searchKey;
    const searchValue = new RegExp(searchObject.searchValue, 'ig');

    // categoryNo로 할당된 categoryParents를 categoryName으로 전환하는 작업 (부모 카테고리를 카테고리 명으로 표기하기 위함)
    const categoriesForTable = categories.map((category) => {
        let categoryType = '';
        let categoryParentsName = '없음';
        
        for(let i = 0; i < categories.length; i++) {
            if(category.categoryParents === categories[i].categoryNo){
                categoryParentsName = categories[i].categoryName;
            }
        }
        
        categoryType = category.categoryParents === 0 ? '최상위' : categoryParentsName;

        return {
            categoryType: categoryType,
            categoryNo: category.categoryNo,
            categoryName: category.categoryName,
            categoryParents: categoryParentsName,
            creatorId: category.creatorId,
            createdAt: formatDate(category.createdAt)
        }
    });

    // 검색어 필터링 작업
    const searchFilteredCategories = categoriesForTable.filter((category) => {
        return (searchValue === '') || ( searchValue.exec(category[searchKey]) !== null );
    })

    // 페이지 필터링 작업
    const pageFilteredCategories = searchFilteredCategories.filter((category, index) => {
        return (index >= (currentPage - 1) * rowPerPage) && (index <= currentPage * rowPerPage - 1)
    });

    const categoryRows = pageFilteredCategories.map((categoryForTable) => {
        return (
            <CategoryRow 
                categoryForTable={ categoryForTable } 
                key={ categoryForTable.categoryNo } 
                { ...props }
            />
        );
    });

    const haveNoRowsException = (
        <Table.Row>
            <Table.Cell colSpan='5'>
                검색 결과가 존재하지 않습니다.
            </Table.Cell>
        </Table.Row>
    );

    return (
        <Table celled>
            <CategoryTableHeader />
            <Table.Body>
                { categoryRows.length !== 0 ? categoryRows : haveNoRowsException }
            </Table.Body>
            <CategoryTableFooter 
                currentPage={ currentPage } 
                pageLength={ Math.ceil( (searchFilteredCategories.length / rowPerPage) ) }
                handlePageChange={ handlePageChange }
            />
        </Table>
    );
}

// validator 확인후 오류 메시지 출력부분
const Checkmessage = (props) =>{
    if(props.message === undefined){

    }else{
        return(
            <div style={ style.formField } className="ui red pointing basic label">{props.message}</div>
        );
    }
    return(
        <div></div>
    );
}

// 카테고리 페이지 컴포넌트
class CategoryPage extends Component {

    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator({
            validators: {
                //카테고리 
                krString: {
                message: '한글 또는 영문,숫자만 입력가능합니다.',
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val,/^[ㄱ-ㅎㅏ-ㅣ가-힣A-Z0-9\s]*$/i)
                },
                required: true
                },
            },
            messages: {
                required: '필수입력란 입니다.',
            },
        })
    }

    state = {
        categoryName: '',
        categoryParents: 0,
        currentPage: 1,
        rowPerPage: 10,
        searchKey: 'categoryName',
        searchValue: '',
        searchObject: {
            searchKey: 'categoryName',
            searchValue: ''
        }
    }
    

    // 카테고리 리스트 - 검색 이벤트
    handleSearch = () => {
        this.setState({
            ...this.state,
            searchObject: {
                searchKey: this.state.searchKey,
                searchValue: this.state.searchValue
            }
        })
    }

    // 카테고리 리스트 - 검색 - 드롭다운 변경 이벤트
    handleSearchKeyChange = (e, data) => {
        this.setState({
            ...this.state,
            searchKey: data.value
        })
    }

    // 카테고리 리스트 - 검색 - 검색어 입력 이벤트
    handleSearchValueChange = (e) => {
        this.setState({
            ...this.state,
            searchValue: e.target.value
        });
    }

    // 카테고리 리스트 - 페이지 변경 이벤트
    handlePageChange = (e, data) => {
        this.setState({
            ...this.state,
            currentPage: data.activePage
        })
    }

    // axios get 요청으로 DB로부터 카테고리 조회 함수
    axiosGetCategories = () => {
        axios.get('/categories')
        .then((res) => {
            console.log(res.data);
            const categories = res.data;
            
            this.props.getCategories(categories);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // 카테고리 추가 - 카테고리 명 입력 이벤트
    handleCategoryNameChange = (e) => {
        this.setState({
            ...this.state,
            categoryName: e.target.value
        });
    }

    // 카테고리 추가 - 부모 카테고리 드롭다운 선택 이벤트
    handleCategoryParentsChange = (e, { value }) => {
        this.setState({
            ...this.state,
            categoryParents: value
        });
    }

    // 카테고리 추가 - 폼 제출 이벤트
    handleOnSubmit = (e) => {
        e.preventDefault();

        this.props.loadingDatas();

        axios.post('/categories', {
            categoryName: this.state.categoryName,
            categoryParents: this.state.categoryParents,
            creatorId: this.props.auth.memberId
        })
        .then(() => {
            this.axiosGetCategories();
        }).catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.props.loadedDatas();
            
            this.setState({
                ...this.state,
                categoryName: '',
                categoryParents: 0
            })
        })
    }

    // validator 작업 
    submitForm = (e) => {
        if (this.validator.allValid()) {
            this.handleOnSubmit(e)
            this.validator.hideMessageFor('categoryName');
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        const { auth } = this.props;

        if(auth.authority !== 'ADMIN') return <Redirect to='/'/>

        // Redux store - category
        const { categories } = this.props.category;
        const mainCategories = categories.filter((category) => category.categoryParents === 0);
        
        // 카테고리 추가 - 부모카테고리 리스트
        let categoryParentsOptions = mainCategories.map((mainCategory) => {
            return {
                key: mainCategory.categoryNo,
                value: mainCategory.categoryNo,
                text: mainCategory.categoryName
            }
        });
        
        categoryParentsOptions = [
            { key: 0, value: 0, text: '없음' },
            ...categoryParentsOptions
        ]

        // 카테고리 리스트 - 검색 드롭다운 리스트
        const searchKeyOptions = [
            {key: 'categoryName', text: '카테고리명', value: 'categoryName'},
            {key: 'categoryParents', text: '1차카테고리', value: 'categoryParents'}
        ]

        return (
            <Container style={ style.container }>
                <Dimmer active={ this.props.loader.isLoading } inverted page>
                    <Loader size='massive'>Loading...</Loader>
                </Dimmer>
                <PageHeader />
                <Grid columns={3}>
                    <Grid.Column className='category_form' width='5'>
                            <Header size='medium' color='grey' style={ {marginBottom: '2em'} }>
                                카테고리 추가
                            </Header>
                            <Form size='small' onSubmit={ this.submitForm }>
                                <Form.Field 
                                    id='categoryName'
                                    label='카테고리 명'
                                    control={ Input }
                                    onChange={ this.handleCategoryNameChange }
                                    value={ this.state.categoryName }
                                    onBlur={() => this.validator.showMessageFor('categoryName')}
                                />
                                <Checkmessage message={this.validator.message('categoryName', this.state.categoryName, 'required|krString')}/>
                                <Form.Field
                                    label='부모 카테고리'
                                    control={ Dropdown }
                                    value={ this.state.categoryParents }
                                    options={ categoryParentsOptions }
                                    selection
                                    search
                                    fluid
                                    style={ style.formField }
                                    onChange={ this.handleCategoryParentsChange }
                                >
                                </Form.Field>
                                <Button icon labelPosition='left' color='orange' style={ style.submitButton }>
                                    <Icon name='add' />
                                    카테고리 등록
                                </Button>
                            </Form>
                    </Grid.Column>
                    <Grid.Column width='1' />
                    <Grid.Column className='category_list' width='10'>
                        <Input 
                            placeholder='검색...' 
                            icon={ <Icon onClick={ this.handleSearch } name='search' inverted circular link /> }
                            action={ 
                                <Dropdown basic button 
                                    options={ searchKeyOptions } 
                                    defaultValue='categoryName'
                                    onChange={ this.handleSearchKeyChange }
                                /> 
                            }
                            actionPosition='left'
                            onChange={ this.handleSearchValueChange }
                        />
                        <CategoryTable {...this.props } 
                            categories={ categories } 
                            axiosGetCategories={ this.axiosGetCategories }
                            currentPage={ this.state.currentPage }
                            rowPerPage={ this.state.rowPerPage }
                            handlePageChange={ this.handlePageChange }
                            searchObject={ this.state.searchObject }
                        />
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        auth: state.auth,
        category: state.category,
        loader: state.loader
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: (categories) => dispatch(getCategories(categories)),
        loadingDatas: () => dispatch(loadingDatas()),
        loadedDatas: () => dispatch(loadedDatas()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)