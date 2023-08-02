import { v4 as generateFileName } from 'uuid'
import fs from 'fs';
import path from 'path';

class FileService {
    async save(file: any) {
      const fileExt = file.mimetype.split('/')[1];
      const fileName = generateFileName() + '.' + fileExt;
      const filePath = path.resolve('static', fileName);
      await file.mv(filePath);

      return fileName;
    }
    async delete() { }
  }

export default new FileService();