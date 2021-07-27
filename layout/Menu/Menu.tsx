import React, {useContext, useState} from 'react';
import {AppContext} from "../../context/app.context";
import {FirstLevelMenuItem, PageItem} from "../../interfaces/menu.interface";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cn from "classnames";
import styles from "./Menu.module.css";
import Link from "next/link";
import {useRouter} from "next/router";
import {firstLevelMenu} from "../../helpers/helpers";
import {motion, useReducedMotion} from "framer-motion";

export const Menu = ():JSX.Element => {
    const {menu,setMenu,firstCategory} = useContext(AppContext);
    const [announce,setAnnounce] = useState<'closed' | 'opened' | undefined>();
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();

    const variants = {
        visible: {
            marginBottom:20,
            transition: shouldReduceMotion ? {} : {
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        hidden: {
            marginBottom:0
        },
    };

    const variantsChildren = {
        visible: {
           opacity:1,
            height: 29
        },
        hidden: {
            opacity:shouldReduceMotion ? 1 : 0,
            height: 0
        },
    };

    const openSecondLevel = (secondCategory:string) => {
        setMenu && setMenu(menu.map(m=>{
            if(m._id.secondCategory == secondCategory) {
                setAnnounce(m.isOpened ? 'closed' : 'opened');
                m.isOpened = !m.isOpened;
            }
            return m;
        }));
    };

    const openSecondLevelKey = (key:KeyboardEvent,secondCategory:string) => {
        if(key.code === "Space" || key.code === 'Enter') {
            key.preventDefault();
            openSecondLevel(secondCategory);
        }
    };

    const buildFirstLevel = () => {
        return (
            <ul className={styles.firstLevelList}>
                {firstLevelMenu.map((menuItem,index) => (
                    <li key={`FirstLevelMenu-${index}`} aria-expanded={menuItem.id === firstCategory}>
                        <Link href={`/${menuItem.route}`}>
                            <a>
                                <div className={cn(styles.firstLevel,{
                                    [styles.firstLevelActive]: menuItem.id === firstCategory
                                })}>
                                    {menuItem.icon}
                                    <span>{menuItem.name}</span>
                                </div>
                            </a>
                        </Link>
                        {menuItem.id === firstCategory && buildSecondLevel(menuItem)}
                    </li>
                ))}
            </ul>
        );
    };

    const buildSecondLevel = (menuFirst:FirstLevelMenuItem) => {
        return (
            <ul className={styles.secondBlock}>
                {menu.map((menuItem,index) => {
                    if(menuItem.pages.map(p=>p.alias).includes(router.asPath.split('/')[2])){
                        menuItem.isOpened = true;
                    }
                    return <li key={`SecondLevelMenu-${index}`}>
                        <button
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            onKeyDown={(key:KeyboardEvent) => openSecondLevelKey(key,menuItem._id.secondCategory)}
                             className={styles.secondLevel}
                             onClick={()=>openSecondLevel(menuItem._id.secondCategory)}
                            aria-expanded={menuItem.isOpened}
                        >{menuItem._id.secondCategory}</button>
                        <motion.ul
                            layout
                            variants={variants}
                            initial={menuItem.isOpened ? 'visible' : 'hidden'}
                            animate={menuItem.isOpened ? 'visible' : 'hidden'}
                            className={cn(styles.secondLevelBlock)}
                        >
                            {buildThirdLevel(menuItem.pages, menuFirst.route,menuItem.isOpened ?? false)}
                        </motion.ul>
                    </li>;
                })}
            </ul>
        );
    };

    const buildThirdLevel = (pages:PageItem[],route:string,isOpened:boolean) => {
        return (
            pages.map(p=>(
                <motion.li variants={variantsChildren} key={`linkThirdLevel${p._id}`}>
                    <Link href={`/${route}/${p.alias}`}>
                        <a tabIndex={isOpened ? 0 : -1} className={cn(styles.thirdLevel,{
                            [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
                        })} aria-current={`/${route}/${p.alias}` === router.asPath ? 'page' : false}>
                            {p.category}
                        </a>
                    </Link>
                </motion.li>
            ))
        );
    };

    return (
        <nav className={styles.menu} role="navigation">
            {announce && <span className="visibleHidden" role="log">{announce === 'opened' ? "развернуто" : "свернуто"}</span>}
            {buildFirstLevel()}
        </nav>
    );
};