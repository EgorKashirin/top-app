import {LayoutProps} from "./Layout.props";
import styles from "./Layout.module.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cn from "classnames";
import {Header} from "./Header/Header";
import {Sidebar} from "./Sidebar/Sidebar";
import {Footer} from "./Footer/Footer";
import {FunctionComponent, useRef, useState} from "react";
import {AppContextProvider, IAppContext} from "../context/app.context";
import {Up} from "../components";

const Layout = ({children}:LayoutProps):JSX.Element => {

    const [isSkipLinkDisplayed,setIsSkipLinkDisplayed] = useState<boolean>(false);
    const bodyRef = useRef<HTMLDivElement>(null);

    const skipContentAction = (key:KeyboardEvent):void => {
        if(key.code === "Space" || key.code === "Enter") {
            key.preventDefault();
            bodyRef.current?.focus();
        }
        setIsSkipLinkDisplayed(false);
    };

    return(
       <div className={styles.wrapper}>
           <a tabIndex={1} className={cn(styles.skipLink,{
               [styles.displayed]: isSkipLinkDisplayed
           })}
              onFocus={()=>setIsSkipLinkDisplayed(true)}
              //eslint-disable-next-line @typescript-eslint/ban-ts-comment
               // @ts-ignore
              onKeyDown={skipContentAction}
           >
               Сразу к содержанию</a>
           <Header className={styles.header} />
           <Sidebar className={styles.sidebar} />
           <main className={styles.body} ref={bodyRef}  tabIndex={0} role="main">
               {children}
           </main>
           <Footer className={styles.footer} />
           <Up />
       </div>
    );
};

export const withLayout =  <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return (props:T) => {
        return (
            <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
                <Layout>
                    <Component {...props} />
                </Layout>
            </AppContextProvider>
        );
    };
};