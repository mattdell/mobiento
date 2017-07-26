export interface IUnsplashApiImageSearchResponse {
  results: IUnsplashApiImageSearchResponseResultItem[];
  total: number;
  total_pages: number; // eslint-disable-line camelcase
}

export interface IUnsplashApiImageSearchResponseResultItem {
  id: string;
  description: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  }
}
