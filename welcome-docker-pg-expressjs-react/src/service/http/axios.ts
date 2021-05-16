import axios from "axios";

/**
 * Wrap Methods with custom handler error
 */

function parseError(error: any) {
  console.log(error);

  const message = error?.response?.data?.message;

  if (message) {
    return Error(message);
  } else if (error.message) {
    return error;
  } else {
    return Error("Unknown Error");
  }
}

export default (function () {
  const instance = axios.create();

  const { get, post, put } = instance as any;

  const dlete: any = instance.delete;

  instance.get = async function (...args: any): Promise<any> {
    try {
      return await get.call(instance, ...args);
    } catch (error) {
      throw parseError(error);
    }
  };

  instance.post = async function (...args: any): Promise<any> {
    try {
      return await post.call(instance, ...args);
    } catch (error) {
      throw parseError(error);
    }
  };

  instance.put = async function (...args: any): Promise<any> {
    try {
      return await put.call(instance, ...args);
    } catch (error) {
      throw parseError(error);
    }
  };

  instance.delete = async function (...args: any): Promise<any> {
    try {
      return await dlete.call(instance, args);
    } catch (error) {
      throw parseError(error);
    }
  };

  return instance;
})();
