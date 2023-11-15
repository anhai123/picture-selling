import Resizer from "react-image-file-resizer";

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      1000,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
