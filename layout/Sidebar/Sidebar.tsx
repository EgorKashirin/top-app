import {SidebarProps} from "./Sidebar.props";
import styles from "./Sidebar.module.css";
import {Menu} from "../Menu/Menu";
import {Search} from "../../components";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cn from "classnames";
import Logo from "../logo.svg";
import Link from "next/link";
import {ForwardedRef, forwardRef} from "react";

export const Sidebar = forwardRef(({className,...props}:SidebarProps,ref:ForwardedRef<HTMLDivElement>):JSX.Element => {

    return(
       <div ref={ref} {...props} className={cn(className,styles.sidebar)} {...props}>
           <Link href="/">
               <a>
                   <Logo className={styles.logo} />
               </a>
           </Link>
           <Search />
           <Menu />
       </div>
    );
});