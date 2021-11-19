import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-word-ranking',
  templateUrl: './word-ranking.component.html',
  styleUrls: ['./word-ranking.component.css']
})
export class WordRankingComponent implements OnInit {
  fileData: any;
  result: any = [{}];
  tempFileData: any = [];
  textFileData: any;

  // access a child component and call methods using viewchild

  @ViewChild(DataTableDirective, { static: true })
  // datatables attributes
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  fileName: any;
  selectUpload: boolean = false;

  ngOnInit() {

    // Function to display file name 
    $(document).ready(function () {
      $('input[type="file"]').on("change", function () {
        let filenames = [];
        let files = this.files;
        if (files.length > 1) {
          filenames.push("Total Files (" + files.length + ")");
        } else {
          for (let i in files) {
            if (files.hasOwnProperty(i)) {
              filenames.push(files[i].name);
            }
          }
        }
        $(this)
          .next(".custom-file-label")
          .html(filenames.join(","));
      });
    });
  }

  rerender(): void {  // rerender data
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }


  file: any;
  // target the change event of file.
  fileChanged(e) {
    this.selectUpload = true
    this.fileName = e.target.files[0]
    if (e.target.files[0].type === "text/plain") {
      this.file = e.target.files[0];
    } else {
      alert('Please Upload Text File Only.');
      return;
    }
  }

  async uploadDocument() { // upload document
    let file = this.file;
    let fileReader = new FileReader();
    fileReader.onload = async (e) => {
      this.fileData = fileReader.result;
      this.bindData();
    }
    fileReader.readAsText(file);
  }

  async bindData() {
    var startTime = performance.now() // start time of the execution
    this.result = this.fileData.toString().replace(/[^a-zA-Z-A-Za-zÀ-ÖØ-öø-ÿ ]/g, ' ').toLowerCase().split(' ').filter(x => x.length > 6);  // converted the fileData into array
    var counts = {};
    await this.result.forEach(x => {
      counts[x] = (counts[x] || 0) + 1;   // increment the duplicates
    });
    var textKeys = Object.keys(counts);     // keys(name)
    var textValues = Object.values(counts);    //  values(count)
    for (let i = 0; i < this.result; i++) {
      var tempArray: any
      tempArray = Object.assign({ count: textValues[i], name: textKeys[i] });  // assign keys and value to one array
      this.tempFileData.push(tempArray)
    }
    this.textFileData = this.tempFileData.sort(function (a, b) {  // revering the count of words
      return b.count - a.count
    });
    this.dtTrigger.next();    //  manually trigger the rendering of table
    var endTime = performance.now()     // execution timeout
    console.log(`Time Taken For Execution :  ${endTime - startTime} milliseconds`)
  }


}