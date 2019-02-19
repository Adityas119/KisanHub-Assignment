import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
// import { GetReportDataService } from '../app/weather.service';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  metricArr: string[] = ["Min Temp", "Max Temp", "Rainfall"];
  regionArr: string[] = ["UK", "England", "Scotland", "Wales"];
  minDate = new Date(1993, 0);
  maxDate = new Date(2017, 11);
  weatherData: Object;
  acceptInputsForReport: FormGroup;
  chart: any = [];
  senDataToGraph: any;
  showChart: Boolean = false;
  @ViewChild('canvas') canvas: ElementRef;

  

  constructor(private http: HttpClient) {

  }


  ngOnInit() {

    this.acceptInputsForReport = new FormGroup({
      firstDate: new FormControl('', [Validators.required]),
      lastDate: new FormControl('', [Validators.required]),
      metric: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required])
    })

  }
  

  submitInputs() {

    let sendMetric: string;
    let sendLocation: string = this.acceptInputsForReport.value.region;

    let sendStartYear: Object = this.acceptInputsForReport.value.firstDate.getUTCFullYear();
    let sendStartMonth: Object = this.acceptInputsForReport.value.firstDate.getUTCMonth() + 1;

    let sendLastYear: Object = this.acceptInputsForReport.value.lastDate.getUTCFullYear();
    let sendLastMonth: Object = this.acceptInputsForReport.value.lastDate.getUTCMonth() + 1;

    if (this.acceptInputsForReport.value.metric == 'Max Temp') {
      sendMetric = "Tmax"
    }
    else if (this.acceptInputsForReport.value.metric == 'Min Temp') {
      sendMetric = "Tmin"
    }
    else if (this.acceptInputsForReport.value.metric == 'Rainfall') {
      sendMetric = "Rainfall"
    }
    return this.http.get('https://s3.eu-west-2.amazonaws.com/interview-question-data/metoffice/' + sendMetric + '-' + sendLocation + '.json')
      .subscribe(
        res => {

          let data: any = res;
          let startPointIndex: any;
          let endPointIndex: any;
          let startPointData: any;
          let endPointData: any;

          data.map(function (res, index) {
            if (sendStartYear == res.year && sendStartMonth == res.month) {
              startPointIndex = index;
            }
            if (sendLastYear == res.year && sendLastMonth == res.month) {
              endPointIndex = index;
            }
          })

          let xAxisData = [];
          let yAxisData = [];
          // let yearNmonth = 

          this.senDataToGraph = data.slice(startPointIndex, endPointIndex)
          this.senDataToGraph.forEach(function (data) { xAxisData.push(data.month + "/" +data.year) })
          this.senDataToGraph.forEach(function (data) { yAxisData.push(data.value) })

          this.showChart = true;

          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: xAxisData,
              datasets: [
                // {
                //   data: [],
                //   borderColor: "#3cba9f",
                //   fill: false
                // },
                {
                  data: yAxisData,
                  borderColor: "#ffcc00",
                  fill: false
                },
              ]
            },
            options: {
              legend: {
                display: false
              },
              scales: {
                xAxes: [{
                  display: true
                }],
                yAxes: [{
                  display: true
                }],
              }
            }
          })
        }
      )
  }

}
