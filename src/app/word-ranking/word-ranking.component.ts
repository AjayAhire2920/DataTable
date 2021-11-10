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

  ngOnInit() {

    // for file name display
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

  rerender(): void {  // render data
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }


  file: any;
  fileChanged(e) {
    this.fileName = e.target.files[0]
    if (e.target.files[0].type === "text/plain") {
      this.file = e.target.files[0];
    } else {
      alert('Please Upload Text File Only.');
      return;
    }
  }

  async uploadDocument() {
    let file = this.file;
    let fileReader = new FileReader();
    fileReader.onload = async (e) => {
      this.fileData = fileReader.result;
      this.bindData();
    }
    fileReader.readAsText(file);
  }

  async bindData() {
    var startTime = performance.now()
    this.result = this.fileData.toString().replace(/(\r\n|\n|\r)/gm, "").toLowerCase().split(' ').filter(x => x.length > 6);
    console.log(this.result);
    
    var counts = {};
    await this.result.forEach(x => {
      counts[x] = (counts[x] || 0) + 1;
    });
    var textKeys = Object.keys(counts);
    var textValues = Object.values(counts);
    for (let i = 0; i < 50; i++) {
      var tempArray: any
      tempArray = Object.assign({ count: textValues[i], name: textKeys[i] })
      this.tempFileData.push(tempArray)
    }
    this.textFileData = this.tempFileData.sort(function(a, b){
      return b.count - a.count});
    this.dtTrigger.next();
    var endTime = performance.now()
    console.log(`Time Taken For Execution :  ${endTime - startTime} milliseconds`)
  }


}