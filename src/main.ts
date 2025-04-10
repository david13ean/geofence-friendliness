import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Amplify } from 'aws-amplify';
import { parseAmplifyConfig } from "aws-amplify/utils";
import outputs from '../amplify_outputs.json';

const amplifyConfig = parseAmplifyConfig(outputs);

// Add existing resource to the existing configuration.
Amplify.configure({
  ...amplifyConfig,
  API: {
    ...amplifyConfig.API,
    REST: {
      ...amplifyConfig.API?.REST,
      mobileDataCoords: {
        endpoint:
          'https://4fla1tc57k.execute-api.us-east-2.amazonaws.com/dev',
        region: 'us-east-2' // Optional
      }
    }
  }
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
