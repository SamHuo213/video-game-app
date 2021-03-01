import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { VideoGameDto } from 'src/app/models/video-game-dto';

@Injectable({
	providedIn: 'root'
})
export class VideoGameService {
	constructor(private httpClient: HttpClient) { }

	getVideoGameList(): Observable<VideoGameDto[]> {
		return this.httpClient.get<VideoGameDto[]>('https://localhost:5001/VideoGame');
	}

	getVideoGameDetail(videoGameId: number): Observable<VideoGameDto> {
		return this.httpClient.get<VideoGameDto>(`https://localhost:5001/VideoGame/${videoGameId}`);
	}

	saveVideoGame(videoGame: VideoGameDto) {
		return this.httpClient.put(`https://localhost:5001/VideoGame`, videoGame);
	}
}