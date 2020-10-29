import { flatten, clone } from 'ramda';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AppStorageService } from 'src/app/app-storage.service';
import { ValueChanges } from 'src/app/shared/models';
import * as XLSX from 'xlsx';

type FileModel = any[][];

@Component({
  selector: 'app-create-chart',
  templateUrl: './create-chart.component.html',
  styleUrls: ['./create-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateChartComponent {
  @Input() public resetData: ValueChanges;

  @Output() public initNextStep: EventEmitter<void> = new EventEmitter();

  public fileToUpload: File = null;
  public data: FileModel = null;
  public panelOpenState: boolean = false;
  public displayedColumns: string[] = ['header', 'first', 'second', 'third'];
  public dataSource = [
    { header: 'Header1', first: 1, second: 2, third: 3 },
    { header: 'Header2', first: 2, second: 1, third: 3 },
    { header: 'Header3', first: 3, second: 2, third: 1 },
  ];

  public constructor(private store: AppStorageService) {}

  /**
   * Opens file upload.
   * @param files - incoming file
   */
  public handleFileInput(evt: any): void {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer> (evt.target);
    const reader: FileReader = new FileReader();

    if (target.files.length !== 1) {
      alert('Cannot use multiple files');
    }

    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <FileModel> (XLSX.utils.sheet_to_json(ws, { header: 1 }));
    };
    reader.readAsBinaryString(target.files[0]);
  }

  /**
   * Collect table data.
   * Emits change next step in stepper.
   */
  public collectData(): void {
    const data = clone(this.data);
    const headers = flatten(data?.map((row) => row.splice(0, 1)));
    const tableData = data?.map((row) => row?.map((value, id) => ({ id: id + 1, value})));
    const tableRows = headers?.map((value, id) => ({ id: id + 1, header: value, columnDef: value }));
    const tableColumns = headers?.map((value, id) => ({ id: id + 1, header: value, columnDef: value }));

    this.store.setTableData(tableData);
    this.store.setRowHeaders(tableRows);
    this.store.setColumnHeaders(tableColumns);
    this.initNextStep.emit();
  }

  public export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      ['Header1', 1, 2, 3],
      ['Header2', 2, 1, 3],
      ['Header3', 3, 2, 1],
    ]);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Example.xlsx');
  }
}
