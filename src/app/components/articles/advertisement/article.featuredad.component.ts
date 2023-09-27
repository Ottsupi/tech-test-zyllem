import { Component, Input } from "@angular/core";

import { FeaturedAdArticle } from "src/app/model/article";
import { AbstractArticleComponent } from "../abstract.article.component";

@Component({
    selector: 'article-featuredad-component',
    templateUrl: './article.featuredad.component.html'
})
export class ArticleFeaturedAdComponent extends AbstractArticleComponent{

    @Input() article: FeaturedAdArticle;
}
