import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

export const readCSV = (filePath: string): Promise<any[]> => {
  const csvFilePath = path.resolve(__dirname, filePath);

  return new Promise((resolve, reject) => {
    const records: any[] = [];
    fs.createReadStream(csvFilePath)
      .pipe(parse({ columns: true })) // columns: true ensures we get objects instead of arrays
      .on('data', (data) => {
        records.push(data);
      })
      .on('end', () => {
        resolve(records);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};
