// Packages
import React, { PropTypes } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IState as ISearchState, changeSearchTerm } from '../../ducks/SearchDucks';
import { IGlobalState } from '../../reducers';

// Components
import Search from '../../components/Search';
import Gallery from '../../components/Gallery';
import Footer from '../../components/Footer';

// Interfaces
interface IStateProps {
  search: ISearchState;
}

interface IDispatchProps {
  actions: any;
}

interface IProps extends IStateProps, IDispatchProps {}

const SearchContainer = ({ search, actions }: IProps) => (
  <div>
    <Search />
    <Gallery />
    <Footer />
  </div>
);

const mapStateToProps = (state: IGlobalState) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch: Dispatch<IGlobalState>) => ({
  actions: bindActionCreators({ changeSearchTerm }, dispatch),
});

export default connect<IStateProps, IDispatchProps, any>(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainer);
