import { Type } from "@angular/core";
import { ArticleType } from "src/app/model/article";
import { AbstractArticleComponent } from "./abstract.article.component";
import { articleMapper } from "./article.mapper";
import { ArticleFeatureComponent } from "./feature/article.feature.component";
import { ArticleNormalComponent } from "./normal/article.normal.component";
import { ArticleVideoComponent } from "./video/article.video.component";
import { ArticleFeaturedAdComponent } from "./advertisement/article.featuredad.component";

export const articleEntries: Type<AbstractArticleComponent>[] = [
    ArticleFeatureComponent,
    ArticleNormalComponent,
    ArticleVideoComponent,
    ArticleFeaturedAdComponent
];

const registerArticle = (articleType: ArticleType, component: Type<AbstractArticleComponent>) => {
    if (!articleEntries.includes(component)) {
        throw new Error(`${component} is not yet registered.`);
    }

    if (articleMapper.has(articleType)) {
        throw new Error(`${articleType} articleType already exists.`);
    }

    articleMapper.set(articleType, component);
};
//
registerArticle(ArticleType.NORMAL, ArticleNormalComponent);
registerArticle(ArticleType.FEATURED, ArticleFeatureComponent);
registerArticle(ArticleType.VIDEO, ArticleVideoComponent);
registerArticle(ArticleType.FEATURED_AD, ArticleFeaturedAdComponent);