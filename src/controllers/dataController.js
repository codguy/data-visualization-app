const DataProcessingService = require('../services/dataProcessingService');
const DataVisualizationService = require('../services/dataVisualizationService');
const FileManagementService = require('../services/fileManagementService');
const path = require('path');
const fs = require('fs').promises;
const FileType = require('file-type');

class DataController {
    static async processData(req, res) {
        try {
            let { file } = req;
            let data;
            let filePath;
            if (!req.file && req.params.filename) {
                filePath = path.join(__dirname, '..', '..', 'uploads', req.params.filename);
                const stats = await fs.stat(filePath);
                const fileBuffer = await fs.readFile(filePath);
                const mimetype = await determineMimeType(filePath);
                file = {
                    fieldname: 'file',
                    originalname: path.basename(filePath),
                    encoding: '7bit',
                    mimetype: mimetype,
                    size: stats.size,
                    destination: path.dirname(filePath),
                    filename: path.basename(filePath),
                    path: filePath,
                    buffer: fileBuffer
                };
            }
            if (file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel') {
                data = await DataProcessingService.processCSV(file.path);
            } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                data = await DataProcessingService.processExcel(file.path);
            } else {
                throw new Error('Unsupported file type');
            }
            res.render('result', { title: 'Data Visualization Result', data, rawData: JSON.stringify(data) });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    static getIndex(req, res) {
        res.render('index', { title: 'Data Visualization App' });
    }

    static async listFiles(req, res) {
        try {
            const files = await FileManagementService.getUploadedFiles();
            const filesWithMetadata = await Promise.all(files.map(async file => {
                let filePath = path.join(__dirname, '..', '..', 'uploads', file);
                const stats = await fs.stat(filePath);
                const fileBuffer = await fs.readFile(filePath);
                const mimetype = await determineMimeType(filePath);
                return {
                    fieldname: 'file',
                    originalname: path.basename(filePath),
                    encoding: '7bit',
                    mimetype: mimetype,
                    size: stats.size,
                    destination: path.dirname(filePath),
                    filename: path.basename(filePath),
                    path: filePath,
                    buffer: fileBuffer,
                    ...await FileManagementService.getFileMetadata(file)
                };
                // return await FileManagementService.getFileMetadata(file);
            }));
            res.render('fileList', { files: filesWithMetadata });
        } catch (error) {
            console.error('Error listing files:', error);
            res.status(500).send('Error listing files');
        }
    }

    static async deleteFile(req, res) {
        try {
            const { filename } = req.params;
            console.log('Deleting file:', filename, req);
            let filePath = path.join(__dirname, '..', '..', 'uploads', filename);
            await fs.unlink(filePath);
            res.status(200).send('File deleted successfully');
        } catch (error) {
            console.error('Error deleting file:', error);
            res.status(500).send(error.message);
        }
    }
}
async function determineMimeType(filePath) {
    const buffer = await fs.readFile(filePath, { length: 8 });
    const hex = buffer.toString('hex').toUpperCase();

    if (hex.startsWith('504B0304')) return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; // XLSX
    if (hex.startsWith('D0CF11E0')) return 'application/vnd.ms-excel'; // XLS
    if (hex.startsWith('EFBBBF') || hex.startsWith('FEFF') || hex.startsWith('FFFE')) return 'text/csv'; // CSV with BOM
    if (/^[0-9A-F,\s]+$/.test(hex)) return 'text/csv'; // CSV without BOM

    return 'application/octet-stream'; // Default fallback
}



module.exports = DataController;

