import 'whatwg-fetch';

interface IRequestOptions {
  headers?: any;
}

export const request = (url: string, options: IRequestOptions) =>
  new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => resolve(response.json()))
      .catch(reject);
  });
