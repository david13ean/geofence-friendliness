import { Component } from '@angular/core';
import { GoogleMapsModule } from "@angular/google-maps";
import { RouterOutlet } from '@angular/router';
import { GeofenceMapComponent } from "./geofence-map/geofence-map.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GoogleMapsModule, GeofenceMapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'geofence-friendliness';
}
