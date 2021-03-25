import {AfterViewInit, Component, Inject, NgZone, OnInit, PLATFORM_ID} from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {isPlatformBrowser} from "@angular/common";
import {RequestsService} from "../../requests.service";
import {Data} from "../../model";
@Component({
  selector: 'app-map-chart',
  templateUrl: './map-chart.component.html',
  styleUrls: ['./map-chart.component.css']
})



export class MapChartComponent implements OnInit, AfterViewInit {


  obj: object | undefined;
  dataSource: object[]=[];
  name:string| undefined;
  case:number=0;
  code:string| undefined;
  chart=am4core.create("chartdiv", am4maps.MapChart);



  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,private dataService:RequestsService) {
    this.dataService.getCountryData().subscribe( response => {

      response.forEach((item: { code: string | undefined; name: string | undefined; caseSum: number; }) => {
        this.code = item.code
        this.name = item.name
        this.case = item.caseSum
        this.obj ={"id":this.code,"name":this.name,"value":this.case,"color":this.chart.colors.getIndex(2)}
        this.dataSource.push(this.obj)
      });
      this.setMap();
    })



  }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  ngAfterViewInit() {
    // Chart code goes in here

  }


  ngOnInit(): void {
  }

  setMap(){
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      let chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
      chart.geodata = am4geodata_worldLow;

// Set projection
      chart.projection = new am4maps.projections.Miller();

// Create map polygon series
      let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.exclude = ["AQ"];
      polygonSeries.useGeodata = true;
      polygonSeries.nonScalingStroke = true;
      polygonSeries.strokeWidth = 0.5;
      polygonSeries.calculateVisualCenter = true;

      let imageSeries = chart.series.push(new am4maps.MapImageSeries());
      imageSeries.data = this.dataSource;
      imageSeries.dataFields.value = "value";

      let imageTemplate = imageSeries.mapImages.template;
      imageTemplate.nonScaling = true

      let circle = imageTemplate.createChild(am4core.Circle);
      circle.fillOpacity = 0.7;
      circle.propertyFields.fill = "color";
      circle.tooltipText = "{name}: [bold]{value}[/]";


      imageSeries.heatRules.push({
        "target": circle,
        "property": "radius",
        "min": 4,
        "max": 30,
        "dataField": "value"
      })

      imageTemplate.adapter.add("latitude", function(latitude, target) {

        let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
        if(polygon){
          return polygon.visualLatitude;
        }
        return latitude;
      })

      imageTemplate.adapter.add("longitude", function(longitude, target) {

        let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
        if(polygon){
          return polygon.visualLongitude;
        }
        return longitude;
      })


    });
  }

}
