import { Component, Input } from "@angular/core";

import { FeaturedArticle} from "src/app/model/article";
import { AbstractArticleComponent } from "../abstract.article.component";

@Component({
    selector: 'article-feature-component',
    templateUrl: './article.feature.component.html'
})
export class ArticleFeatureComponent extends AbstractArticleComponent{

    @Input() article: FeaturedArticle;
}
