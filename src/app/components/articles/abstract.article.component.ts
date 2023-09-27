import { NormalArticle, FeaturedArticle, VideoArticle, FeaturedAdArticle } from "src/app/model/article";

export abstract class AbstractArticleComponent {

    abstract article: NormalArticle | FeaturedArticle | VideoArticle | FeaturedAdArticle;
}
