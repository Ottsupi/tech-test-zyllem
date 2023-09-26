import {
    Component, 
    ComponentFactoryResolver, 
    Input,
    OnInit, 
    ViewContainerRef } from "@angular/core";
import { Article } from "src/app/model/article";
import { articleMapper } from "./article.mapper";

@Component({
    selector: 'article-renderer-component',
    template: '',
    styleUrls: ['article.renderer.component.scss'],
})
export class ArticleRendererComponent implements OnInit {

    @Input() articles: Article[];

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly componentFactoryResolver: ComponentFactoryResolver
    ) { }

    ngOnInit() {
        for (const article of this.articles) {
            const resolveArticle = articleMapper.get(article.type);

            if (!resolveArticle) {
                console.warn(`component not implemented yet for this type ${article.type}.`);
            } 
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(resolveArticle);
            const componentRef = this.viewContainerRef.createComponent(componentFactory);

            const hostElement = <HTMLElement>componentRef.location.nativeElement;

            hostElement.classList.add('article-item');

            componentRef.instance.article = article;
            componentRef.changeDetectorRef.detectChanges();
        }

        console.log('ngOnInit executed successfully.');
    }


}
