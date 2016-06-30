import { Injectable } from "@angular/core";
import { Angulartics2GoogleAnalytics } from "angulartics2/src/providers/angulartics2-google-analytics";

declare var __DEV__;

@Injectable()
export class AnalyticsService {
  
  constructor(private ga: Angulartics2GoogleAnalytics) {
    
  }
  
  eventTrack(action: string, properties: any): void {
    if (__DEV__ == 'production') {
      this.ga.eventTrack(action, properties);
    }
  }
  
}
