import { Express } from 'express';

export {};

declare global {
  interface RouteFile {
    file: string;
    name: string;
    module: string;
  }
  
  interface LoadRoute {
    (
      route: string,
      app: Express,
      files?: RouteFile[]
    ):void;
  }
}
