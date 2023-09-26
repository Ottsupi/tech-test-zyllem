import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  OnInit
} from '@angular/core';
import { ZyllemApiService } from "./app.service";
import { Article, VideoArticle } from './model/article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(
    private readonly apiService: ZyllemApiService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  private results: Article[];
  videoArticleHighlight: VideoArticle;

  get articles() {
    // Filter out the highlight
    var filteredArticles: Article[] = [];
    for (const article of this.results) {
      if (article !== this.videoArticleHighlight)
        filteredArticles.push(article);
    }
    return filteredArticles;
  }

  getVideoHighlight() {
    for (const article of this.results) {
      if (article.type === 'VIDEO')
        return article;
    }
    return undefined;
  }

  ngOnInit(): void {
    this.apiService.getArticles()
      .subscribe(result => {
        this.results = result;
        this.videoArticleHighlight = this.getVideoHighlight();
        this.cdr.markForCheck();
        console.log(this.results);
      });
  }

}
