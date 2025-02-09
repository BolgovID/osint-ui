import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IScanDto, IScanWithDetailsDto } from "../models/models";

@Injectable({ providedIn: 'root' })
export class HttpService {
    constructor(public http: HttpClient) { }

    scan(domain: string): Observable<IScanDto> {
        return this.http.post<IScanDto>(`http://localhost:8080/api/scans`, { domain });
    }

    getScanById(id: string): Observable<IScanWithDetailsDto> {
        return this.http.get<IScanWithDetailsDto>(`http://localhost:8080/api/scans/${id}`);
    }

    getScanResults(): Observable<IScanDto[]> {
        return this.http.get<IScanDto[]>(`http://localhost:8080/api/scans`);
    }

    stopScanById(id: string): Observable<IScanDto> {
        return this.http.post<IScanDto>(`http://localhost:8080/api/scans/${id}/stop`, {});
    }
}
