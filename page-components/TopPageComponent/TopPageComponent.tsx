import React, {useEffect, useReducer} from 'react';
import {TopPageComponentProps} from "./TopPageComponent.props";
import {Advantages, HhData, Htag, Product, Sort, Tag} from "../../components";
import styles from "./TopPageComponent.module.css";
import {TopLevelCategory} from '../../interfaces/page.interface';
import {SortEnum} from "../../components/Sort/Sort.props";
import {sortReducer} from "./sort.reducer";
import {useReducedMotion} from "framer-motion";

const TopPageComponent = ({page,products,firstCategory}:TopPageComponentProps):JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [{products:sortedProducts,sort},dispatchSort] = useReducer(sortReducer,{products,sort: SortEnum.Rating});
    const shouldReduceMotion = useReducedMotion();

    const setSort = (sort:SortEnum):void => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatchSort({type:sort});
    };

    useEffect(()=>{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatchSort({type:'reset',initialState: products});
    },[products]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                {products && <Tag color="gray" aria-label={products.length  + "элементов"}>{products.length}</Tag>}
                <Sort sort={sort} setSort={setSort} />
            </div>
           <div role='list'>
               {sortedProducts && sortedProducts.map(
                   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                   // @ts-ignore
                   (p)=> (<Product role="listitem" layout={!shouldReduceMotion} key={`${p._id}`} product={p} />))}
           </div>
            <div className={styles.hhTitle}>
                <Htag tag="h2">Вакансии - {page.category}</Htag>
                <Tag color="red">hh.ru</Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
            {page.advantages && page.advantages.length > 0 &&
            <>
                <Htag tag="h2">Преимущества</Htag>
                <Advantages advantages={page.advantages} />
            </>
            }
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html:page.seoText}} />}
            <Htag tag="h2">Получаемы навыки</Htag>
            {page.tags.map(t => <Tag key={`${t}`} color="primary">{t}</Tag>)}
        </div>
    );
};

export default TopPageComponent;