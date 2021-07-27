import styles from "./ButtonIcon.module.css";
import {ButtonIconProps, icons} from "./ButtonIcon.props";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cn from "classnames";

export const ButtonIcon = ({appearance,icon,className,...props}:ButtonIconProps):JSX.Element => {
    const IconComp = icons[icon];
    return (
        <button className={cn(styles.button,className,{
            [styles.primary] : appearance === 'primary',
            [styles.white] : appearance === 'white'
        })}{...props}>
            <IconComp />
        </button>
    );
};