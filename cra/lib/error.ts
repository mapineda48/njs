/**
 * If its possible handler error with friendly messages
 */
export function parseError(error: any) {
  /**
   * It unhandler error
   */
  if (!error.ups) {
    throw error;
  }

  const { message } = error;

  console.error(message);
}

export class Ups extends Error {
  public ups = true;
}

export default Ups;

/**
 * Types
 */

export interface CustomError {
  message: string;
  code: number;
}
