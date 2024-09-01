const fs = require('fs');
const path = require('path');

class FileManagementService {
  static getUploadedFiles() {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    return fs.readdirSync(uploadDir).filter(file => file !== '.gitkeep');
  }

  static getFileMetadata(filename) {
    const filePath = path.join(__dirname, '..', '..', 'uploads', filename);
    const stats = fs.statSync(filePath);
    return {
      name: filename,
      size: stats.size,
      uploadDate: stats.mtime
    };
  }
}

module.exports = FileManagementService;
