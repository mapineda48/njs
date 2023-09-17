export default interface UploadFile {
  (file: File, filename: string): Promise<string>;
}
