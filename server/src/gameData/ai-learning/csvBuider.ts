import fs, { WriteStream } from "fs";

export class CsvBuilder<T extends object> {
  private fileStream: WriteStream;
  private needHeader: boolean;

  constructor(csvFileName: string) {
    this.fileStream = fs.createWriteStream(`${csvFileName}.csv`, { flags: 'w' })
    this.needHeader = true;
  }

  private addHeader(row: T) {
    this.needHeader = false;
    const headerRow = Object.keys(row).join(',') + '\n';

    this.fileStream.write(headerRow);
  }

  public addRow(row: T) {
    if (this.needHeader) {
      this.addHeader(row);
    }

    const dataRow = Object.values(row).join(',') + '\n';
    this.fileStream.write(dataRow);
  }

  public close() {
    this.fileStream.end();
  }
}