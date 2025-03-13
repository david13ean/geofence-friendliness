import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  Renderer2,
} from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
// import { myApiFunction } from '../../../amplify/functions/api-function/resource';
import { post } from 'aws-amplify/api';

@Component({
  selector: 'app-geofence-map',
  imports: [GoogleMapsModule],
  templateUrl: './geofence-map.component.html',
  styleUrl: './geofence-map.component.scss',
})
export class GeofenceMapComponent implements AfterViewInit {
  friendliness: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2
  ) {}

  ngAfterViewInit() {
    const url =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBSBGs_SX95q3imJl-3hiZ0wZIQetTJ0k8&libraries=drawing&v=weekly';
    this.loadScript(url).then(() => this.initMap());
  }

  private loadScript(url: string) {
    return new Promise((resolve, reject) => {
      const script = this.renderer2.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.text = ``;
      script.onload = resolve;
      script.onerror = reject;
      this.renderer2.appendChild(this.document.head, script);
    });
  }

  private initMap(): any {
    const map = new google.maps.Map(
      document.getElementById('geofence-map') as any,
      {
        center: { lat: 40, lng: -111 },
        zoom: 5,
      }
    );

    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON,
          google.maps.drawing.OverlayType.RECTANGLE,
        ],
      },
    });

    drawingManager.setMap(map);
  }

  async getPolygonFriendliness() {
    // console.log(myApiFunction);
    this.postItem();
  }

  async postItem() {
    try {
      const restOperation = post({
        apiName: 'mobileDataCoords',
        path: '/',
        options: {
          body: {
            message: 'Mow the lawn'
          }
        }
      });
  
      const { body } = await restOperation.response;
      const response = await body.json();
  
      console.log('POST call succeeded');
      console.log(response);
    } catch (error: any) {
      console.log('POST call failed: ', JSON.parse(error));
    }
    

    try {
      const restOperation = post({
        apiName: 'myRestApi',
        path: 'item',
        options: {
          body: {
            message: 'Mow the lawn'
          }
        }
      });
  
      const { body } = await restOperation.response;
      const response = await body.json();
  
      console.log('POST call succeeded');
      console.log(response);
    } catch (error: any) {
      console.log('POST call failed: ', JSON.parse(error));
    }
  }
}
