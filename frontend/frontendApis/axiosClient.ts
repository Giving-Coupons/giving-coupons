import axios, { AxiosInstance } from 'axios';

class AxiosClient {
  // Singleton Instance
  public static get instance(): AxiosInstance {
    return AxiosClient.classInstance.axiosClient;
  }

  private static classInstance = new AxiosClient();

  private axiosClient: AxiosInstance;

  private constructor() {
    this.axiosClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_SERVER_URL,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 10000 /* 10s */,
    });
  }
}

export default AxiosClient;
