export default function sign(credential: Authentication): Promise<string>;
/**
 * Types
 */
export interface Authentication {
    agape?: string;
    shop?: string;
}
