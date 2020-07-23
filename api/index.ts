/**
 * Added this layer on top of the generated package to add `Buffer` polyfill for nodejs
 */

import { Buffer } from "buffer";

declare const global: any;

global.Buffer = global.Buffer || Buffer;

if (typeof btoa === 'undefined') {
  global.btoa = function (str: string) {
    return Buffer.from(str, 'binary').toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded: string) {
    return Buffer.from(b64Encoded, 'base64').toString('binary');
  };
}

export * from "./src";
