import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

import Histogram from 'highcharts/modules/histogram-bellcurve';
Histogram(Highcharts);

import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);
const Cylinder = require('highcharts/modules/cylinder');
Cylinder(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);

@Component({
  selector: 'app-cylinder-chart',
  templateUrl: './cylinder-chart.component.html',
  styleUrls: ['./cylinder-chart.component.css']
})
export class CylinderChartComponent implements OnInit {
  @ViewChild('charts', {static: false}) public chartEl: ElementRef;
  @Input() chartData;

   public activity;
   public xData;
   public label;
    options: any;
   alpha: number;
   beta: number;
   depth : number;
    
 
   highcharts;
   constructor() {
      this.alpha = 15;
      this.beta = 15;
      this.depth = 50

      //let seriesData = [["apple",29.9], ["orange",71.5], ["mango",106.4]]; 
      
 
      this.options = {
       chart: {
          type: 'column',
          options3d: {
              enabled: true,
              alpha: this.alpha,
              beta: this.beta,
              depth: this.depth,
              viewDistance: 25
          }
      },
      title: {
          text: ''
         },
         xAxis: {
            title: {
               text: 'airline',
               rotation: 0
           },
            categories: ['AA', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
            labels: {
                rotation: 0
            }
         },
         yAxis: {
            //range: 30,
            min: 0,
            max: 100,
            // minColor: '#ffece8',
            // maxColor: '#8a1900',
            title: {
               text: 'No 0f delays',
               rotation: -95
            }
        },
      plotOptions: {
          series: {
              depth: 25,
            colorByPoint: true,
            //color: '#59bfff'
         },
         bar: {
            dataLabels: {
                enabled: true
            }
        }
         },
         legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
      
      series: [{
         data: [103, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
         colorByPoint: false,
          name: 'airline',
         showInLegend: true,        
         color: '#000000',
      }]
      }
 }
 
   ngOnInit() {
      this.options.xAxis.categories = this.chartData.labels;
    this.options.series = [{
        name: 'Completeness',
       data: this.chartData.completeness,
       //colorByPoint: false,
       //color: '#3c1361'
      }, {
        name: 'Validity',
          data: this.chartData.validity,
          //colorByPoint: true
      }];
    console.log(this.chartData);
      Highcharts.chart('container', this.options);
   }
    
   showValues() {
      this.options.chart.options3d.alpha;
 }
    
   
    
 alphaChange(event: any) {
      this.alpha = event.value;
      this.options.chart.options3d.alpha = this.alpha;
      Highcharts.chart('container', this.options);
   }
   betaChange(event: any) {
      this.beta = event.value;
      this.options.chart.options3d.beta = this.beta;
      Highcharts.chart('container', this.options);
   }
   depthChange(event: any) {
      this.depth = event.value;
      this.options.chart.options3d.depth = this.depth;
      Highcharts.chart('container', this.options);
   }

   ngAfterViewInit() {
      this.highcharts = Highcharts;
      this.highcharts.chart(this.chartEl.nativeElement, this.options);
    }
 }

