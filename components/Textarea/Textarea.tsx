import {TextareaProps} from "./Textarea.props";
import styles from "./Textarea.module.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cn from "classnames";
import {ForwardedRef, forwardRef} from "react";

export const Textarea = forwardRef(({className,error,...props}:TextareaProps,ref:ForwardedRef<HTMLTextAreaElement>):JSX.Element => {

    return(
        <div className={cn(styles.inputWrapper,className)}>
            <textarea ref={ref} className={cn(styles.input,{
                [styles.error]: error
            })} {...props}/>
            {error && <span role="alert" className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});