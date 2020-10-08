import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface IRefreshToken {
  access_token: string
  refresh_token: string
  user_id: string
}

export async function refreshToken(_: any, { refreshToken }: { refreshToken: string }) {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_WEB_KEY}`,
    data: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }
  };

  const result: IRefreshToken = await axios(config)
    .then((response: AxiosResponse) => {
      return response && response.data;
    })
    .catch(error => {
      throw error;
    });

  return {
    token: result.access_token,
    refreshToken: result.refresh_token,
    userId: result.user_id
  };
}