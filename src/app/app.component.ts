import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  OnInit
} from '@angular/core';
import { ZyllemApiService } from "./app.service";
import { Article, VideoArticle } from './model/article';
import { ArticleType } from "src/app/model/article";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  articleTypes = ArticleType;
  selectedArticleType: ArticleType;

  constructor(
    private readonly apiService: ZyllemApiService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  private results: Article[];
  videoArticleHighlight: VideoArticle;

  get articles() {
    var filteredArticles: Article[] = [];
    for (const article of this.results) {
      if (article !== this.videoArticleHighlight)
        filteredArticles.push(article);
    }
    return filteredArticles;
  }

  set articles(articlesList) {
    this.articles = articlesList;
  }

  getVideoHighlight() {
    for (const article of this.results) {
      if (article.type === 'VIDEO')
        return article;
    }
    return undefined;
  }

  onSelectArticleFilter() {
    console.log('Selected Article Type:', this.selectedArticleType);
    var filteredArticles: Article[] = [];
    for (const article of this.results) {
      if (article.type == this.selectedArticleType)
        filteredArticles.push(article);
    }
    console.log('Article List:', filteredArticles);
  }

  testFunk() {
    console.log("test work!")
    var filteredArticles: Article[] = [];
    for (const article of this.results) {
      if (article.type == this.articleTypes.NORMAL)
        filteredArticles.push(article);
    }
    this.articles = filteredArticles;
    console.log(this.articles);
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
