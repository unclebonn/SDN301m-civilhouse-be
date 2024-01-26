import path from 'path';

const utils = {
  rootDir: path.join(path.dirname(require.main?.filename!), '..'),
  //require.main là một đối tượng chứa thông tin về module gốc (module chính) của ứng dụng Node.js. filename là thuộc tính của require.main chứa đường dẫn đến tệp JavaScript chính (thực thi) của ứng dụng. Sử dụng ?. là một toán tử optional chaining để kiểm tra xem require.main có tồn tại không trước khi truy cập filename
  mainDir: path.dirname(require.main?.filename!)
};

export default utils;
