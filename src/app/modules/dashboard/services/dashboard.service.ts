import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApiService } from 'src/app/common/services/http.service';
import { GIT_USER_URL } from 'src/app/common/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: ApiService) { }

  getUserData() {
    const URL = environment.GIT_HOST_URL + GIT_USER_URL;
    return this.http.get(URL);
  }
}
