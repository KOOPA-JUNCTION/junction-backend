declare module 'multer-firebase-storage' {
  interface MulterFirebaseStorageOption {
    bucketName: string;
    credentials: {
      clientEmail: string;
      privateKey: string;
      projectId: string;
    };
  }
  const multerFirebaseStorage: (options: MulterFirebaseStorageOption) => any;
  export default multerFirebaseStorage;
}
