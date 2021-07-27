import React from "react";
import { withLayout} from "../../layout/Layout";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import axios from "axios";
import {MenuItem} from "../../interfaces/menu.interface";
import {TopLevelCategory, TopPageModel} from "../../interfaces/page.interface";
import {ParsedUrlQuery} from "querystring";
import {ProductModel} from "../../interfaces/product.interface";
import {firstLevelMenu} from "../../helpers/helpers";
import TopPageComponent from "../../page-components/TopPageComponent/TopPageComponent";
import {API} from "../../helpers/api";
import Head from "next/head";
import {Error404} from "../404";

function TopPage({firstCategory,page,products}:TopPageProps): JSX.Element {
    if(!page || !products){
        return <Error404 />;
    }

    return <>
            <Head>
                <title>{page.metaTitle}</title>
                <meta name="description" content={page.metaDescription}/>
                <meta property="og:title" content={page.metaTitle}/>
                <meta property="og:description" content={page.metaDescription}/>
                <meta property="og:type" content="article"/>
            </Head>
                <TopPageComponent firstCategory={firstCategory} page={page} products={products} />
        </>;
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths:string[] = [];
    for(const m of firstLevelMenu){
        const { data:menu } = await axios.post<MenuItem[]>(API.topPage.find,{firstCategory:m.id});
        paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)));
    }
    return {
        paths,
        fallback: false
    };
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getStaticProps: GetStaticProps<CourseProps> = async ({params}:GetStaticPropsContext<ParsedUrlQuery>) => {
    if(!params) return {notFound:true};
    if(!params.type) return {notFound:true};
    const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type);
    if(!firstCategoryItem) return {notFound:true};
    try{
        const { data:menu } = await axios.post<MenuItem[]>(API.topPage.find,{ firstCategory: firstCategoryItem.id });
        if(menu.length == 0) return {notFound:true};
        const { data:page } = await axios.get<TopPageModel[]>(API.topPage.byAlias + params.alias);
        const { data:products } = await axios.post<ProductModel[]>(API.product.find,{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            category: page.category,
            limit:10
        });
        return {
            props: {
                page,
                firstCategory:firstCategoryItem.id,
                menu,
                products
            }
        };
    }catch (e) {
        console.log("Error :",e);
        return {notFound:true};
    }
};

interface TopPageProps extends Record<string, unknown>{
    menu: MenuItem[],
    firstCategory: TopLevelCategory;
    page:TopPageModel;
    products:ProductModel[];
}
