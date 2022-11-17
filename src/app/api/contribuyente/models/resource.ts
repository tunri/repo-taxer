/* tslint:disable */
/* eslint-disable */
import { InputStream } from './input-stream';
export interface Resource {
  description?: string;
  file?: Blob;
  filename?: string;
  inputStream?: InputStream;
  open?: boolean;
  readable?: boolean;
  uri?: string;
  url?: string;
}
