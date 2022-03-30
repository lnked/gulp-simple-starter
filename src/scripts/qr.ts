import Bowser from 'bowser';
const { createCanvas, loadImage } = require('canvas');
const { scanImageData } = require('zbar.wasm');

export type MediaPermissionsError = {
  type?: MediaPermissionsErrorType;
  name: string;
  message?: string;
};

export enum MediaPermissionsErrorType {
  /** (macOS) browser does not have permission to access cam/mic */
  SystemPermissionDenied = 'SystemPermissionDenied',
  /** user denied permission for site to access cam/mic */
  UserPermissionDenied = 'UserPermissionDenied',
  /** (Windows) browser does not have permission to access cam/mic OR camera is in use by another application or browser tab */
  CouldNotStartVideoSource = 'CouldNotStartVideoSource',
  /** all other errors */
  Generic = 'Generic',
}

/**
 * Request camera and mic permissions from the browser.
 * @returns
 */

// const constraints = { video: { facingMode: { exact: 'environment' } } };
const constraints = { video: true };

export const requestMediaPermissions = () => {
  return new Promise<boolean>((resolve, reject) => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream: MediaStream) => {
        console.log('get');

        stream.getTracks().forEach(t => {
          t.stop();
        });

        resolve(true);
      })
      .catch((err: any) => {
        const browser = Bowser.getParser(window.navigator.userAgent);
        const browserName = browser.getBrowserName();

        const errName = err.name;
        const errMessage = err.message;

        let errorType: MediaPermissionsErrorType = MediaPermissionsErrorType.Generic;

        if (browserName === 'Chrome') {
          if (errName === 'NotAllowedError') {
            if (errMessage === 'Permission denied by system') {
              errorType = MediaPermissionsErrorType.SystemPermissionDenied;
            } else if (errMessage === 'Permission denied') {
              errorType = MediaPermissionsErrorType.UserPermissionDenied;
            }
          } else if (errName === 'NotReadableError') {
            errorType = MediaPermissionsErrorType.CouldNotStartVideoSource;
          }
        } else if (browserName === 'Safari') {
          if (errName === 'NotAllowedError') {
            errorType = MediaPermissionsErrorType.UserPermissionDenied;
          }
        } else if (browserName === 'Microsoft Edge') {
          if (errName === 'NotAllowedError') {
            errorType = MediaPermissionsErrorType.UserPermissionDenied;
          } else if (errName === 'NotReadableError') {
            errorType = MediaPermissionsErrorType.CouldNotStartVideoSource;
          }
        } else if (browserName === 'Firefox') {
          // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#exceptions
          if (errName === 'NotFoundError') {
            errorType = MediaPermissionsErrorType.SystemPermissionDenied;
          } else if (errName === 'NotReadableError') {
            errorType = MediaPermissionsErrorType.SystemPermissionDenied;
          } else if (errName === 'NotAllowedError') {
            errorType = MediaPermissionsErrorType.UserPermissionDenied;
          } else if (errName === 'AbortError') {
            errorType = MediaPermissionsErrorType.CouldNotStartVideoSource;
          }
        }

        reject({
          type: errorType,
          name: err.name,
          message: err.message,
        });
        // Brave cannot be detected by the bowser library because they removed Brave from the User Agent to reduce fingerprinting
        // https://github.com/brave/browser-laptop/blob/master/CHANGELOG.md#090
      });
  });
};

const getImageData = async src => {
  const img = await loadImage(src);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, img.width, img.height);
};

const url = 'https://raw.githubusercontent.com/zbar-wasm/demo/master/node/test.png';
const main = async () => {
  const img = await getImageData(url);
  const res = await scanImageData(img);
  console.log(res[0].typeName); // ZBAR_QRCODE
  console.log(res[0].decode()); // Hello World
};

main();

window.addEventListener('load', () => {
  navigator.permissions.query({ name: 'camera' }).then(res => {
    res.onchange = e => {
      // detecting if the event is a change
      if (e.type === 'change') {
        // checking what the new permissionStatus state is
        const newState = e.target.state;
        if (newState === 'denied') {
          console.log('why did you decide to block us?');
        } else if (newState === 'granted') {
          console.log('We will be together forever!');
        } else {
          console.log('Thanks for reverting things back to normal');
        }
      }
    };
  });
});

document.querySelector('#request')?.addEventListener('click', () => {
  requestMediaPermissions();
});

// document.querySelector('#revoke')?.addEventListener('click', () => {
//   navigator.mediaDevices
//     .getUserMedia({ video: false })
//     .then(function (stream) {
//       /* используем поток */
//     })
//     .catch(function (err) {
//       /* обработка ошибки */
//     });
// });
