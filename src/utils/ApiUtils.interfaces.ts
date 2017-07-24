export interface IUnsplashApiImageSearchResponse {
  results: {
    id: string;
    description: string;
    urls: {
      full: string;
      raw: string;
      regular: string;
      small: string;
      thumb: string;
    }
  }[];
}
