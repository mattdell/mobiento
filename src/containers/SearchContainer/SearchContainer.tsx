// Packages
import React, { PropTypes } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ISearchState, IUpdateSearchResultsPayload, changeSearchTerm, addSearchResults, updateSearchResults } from '../../ducks/SearchDucks';
import { IGlobalState, Action } from '../../reducers';

// Components
import Input from '../../components/Input';
import Button from '../../components/Button';
import Gallery from '../../components/Gallery';

// Utils
import { request } from '../../utils/ApiUtils';

// Interfaces
import { IUnsplashApiImageSearchResponseResultItem, IUnsplashApiImageSearchResponse } from '../../utils/ApiUtils.interfaces';

// Styles
const styles = require('./SearchContainer.scss');

interface IStateProps {
  search: ISearchState;
}

interface IDispatchProps {
  actions: {
    changeSearchTerm: (searchTerm: string) => Action<{ searchTerm: string; }>;
    addSearchResults: (response: IUnsplashApiImageSearchResponse) => Action<IUpdateSearchResultsPayload>;
    updateSearchResults: (response: IUnsplashApiImageSearchResponse, pageNumber: number) => Action<IUpdateSearchResultsPayload>;
  }
}

interface IProps extends IStateProps, IDispatchProps {}

class SearchContainer extends React.PureComponent<IProps, {}> {
  getMoreImages = () => {
    const { actions, search: { searchTerm } } = this.props;
    const pageNumber = this.props.search.pageNumber + 1;

    request(`https://api.unsplash.com/search/photos?query=${searchTerm}&per_page=18&page=${pageNumber}`, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_CLIENT_ID}`,
      },
    }).then((response: IUnsplashApiImageSearchResponse) => { actions.updateSearchResults(response, pageNumber); });
  }

  searchForImage = () => {
    const { actions, search: { searchTerm } } = this.props;

    request(`https://api.unsplash.com/search/photos?query=${searchTerm}&per_page=18`, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_CLIENT_ID}`,
      },
    }).then(actions.addSearchResults);
  }

  render() {
    const { actions, search: { searchTerm, results, pageNumber, totalPages } } = this.props;
    const hasMoreResults = pageNumber !== totalPages;

    return (
      <div>
        <div className={styles['search-container']}>
          <h1>Unsplash photo search</h1>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { actions.changeSearchTerm(e.currentTarget.value); }}
            value={searchTerm}
          />
          <Button onClick={this.searchForImage}>Search</Button>
        </div>
        <Gallery
          data={results}
        />
        {
          hasMoreResults && (
            <div className={styles['loading-button-container']}>
              <Button
                onClick={this.getMoreImages}
              >
              Moar!
              </Button>
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch: Dispatch<IGlobalState>) => ({
  actions: bindActionCreators({ changeSearchTerm, addSearchResults, updateSearchResults }, dispatch),
});

export default connect<IStateProps, IDispatchProps, any>(
  mapStateToProps,
  mapDispatchToProps,
)(SearchContainer);
