import { NormalArticle, FeaturedArticle, VideoArticle } from "src/app/model/article";

export abstract class AbstractArticleComponent {

    abstract article: NormalArticle | FeaturedArticle | VideoArticle;
}
