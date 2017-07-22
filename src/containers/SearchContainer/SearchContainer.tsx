// Packages
import React, { PropTypes } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ISearchState, changeSearchTerm, updateSearchResults } from '../../ducks/SearchDucks';
import { IGlobalState, Action } from '../../reducers';

// Components
import Input from '../../components/Input';
import Gallery from '../../components/Gallery';
import Footer from '../../components/Footer';

// Utils
import { request } from '../../utils/ApiUtils';

// Interfaces
import { IUnsplashApiImageSearchResponse } from '../../utils/ApiUtils.interfaces';

interface IStateProps {
  search: ISearchState;
}

interface IDispatchProps {
  actions: {
    changeSearchTerm: (searchTerm: string) => Action<{ searchTerm: string; }>;
    updateSearchResults: (results: IUnsplashApiImageSearchResponse) => Action<{ results: IUnsplashApiImageSearchResponse }>;
  }
}

interface IProps extends IStateProps, IDispatchProps {}

class SearchContainer extends React.PureComponent<IProps, {}> {
  searchForImage = () => {
    const { actions, search: { searchTerm } } = this.props;

    request(`https://api.unsplash.com/search/photos?query=${searchTerm}`, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_CLIENT_ID}`,
      },
    }).then(actions.updateSearchResults);
  }

  render() {
    const { actions, search: { searchTerm, results } } = this.props;

    return (
      <div>
        <Input
          onBlur={this.searchForImage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { actions.changeSearchTerm(e.currentTarget.value); }}
          value={searchTerm}
        />
        <Gallery
          data={results}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch: Dispatch<IGlobalState>) => ({
  actions: bindActionCreators({ changeSearchTerm, updateSearchResults }, dispatch),
});

export default connect<IStateProps, IDispatchProps, any>(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainer);
