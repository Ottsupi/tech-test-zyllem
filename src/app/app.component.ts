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
  private _test: string = 'hi';
  get test() {
    return this._test;
  }
  set test(test) {
    this._test = test;
  }


  private _articles: Article[] = [];
  articleTypes = ArticleType;
  selectedArticleType: ArticleType;

  constructor(
    private readonly apiService: ZyllemApiService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  private results: Article[];
  videoArticleHighlight: VideoArticle;

  get articles() {
    return this._articles;
  }

  set articles(articlesList) {
    this._articles = [...articlesList];
  }

  getVideoHighlight() {
    for (const article of this.results) {
      if (article.type === 'VIDEO')
        return article;
    }
  }

  onSelectArticleFilter() {
    var filteredArticles: Article[] = [];
    for (const article of this.results) {
      if (article.type == this.selectedArticleType)
        filteredArticles.push(article);
    }
    this.articles = filteredArticles;
    console.log('Selected Article Type:', this.selectedArticleType, '\nArticle List:', this.articles);
  }

  populateArticles() {
    return [...this.results];
  }

  testFunk() {
    console.log("test work!")
    var filteredArticles: Article[] = [];
    for (const article of this.results) {
      if (article.type == this.articleTypes.NORMAL)
        filteredArticles.push(article);
    }
    this.articles = filteredArticles;
    this.cdr.markForCheck();
    console.log(this.articles);
  }

  ngOnInit() {
    this.apiService.getArticles()
      .subscribe(result => {
        this.results = result;
        this.articles = this.populateArticles();
        this.videoArticleHighlight = this.getVideoHighlight();
        this.cdr.detectChanges();
        console.log(this.articles);
      });
  }
}
