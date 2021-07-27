import {FooterProps} from "./Footer.props";
import styles from "./Footer.module.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cn from "classnames";
import { format } from "date-fns";

export const Footer = ({className,...props}:FooterProps):JSX.Element => {

    return(
       <footer className={cn(className,styles.footer)} {...props}>
           <div>
               Kashirin inc © {format(new Date(),'yyyy')} - Все права защищены
           </div>
           <a href="#" target="blank">Пользовательское соглашение</a>
           <a href="#" target="blank">Политика конфидицеальности</a>
       </footer>
    );
};