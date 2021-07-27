import {AdvantagesProps} from "./Advantages.props";
import styles from "./Advantages.module.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cn from "classnames";
import {Card} from "../Card/Card";
import React from "react";
import CheckIcon from "./check.svg";

export const Advantages = ({advantages}:AdvantagesProps):JSX.Element => {

    return(
        <div>
            {advantages.map((a)=>(
                <div key={`Advantage-${a._id}`} className={styles.advantage}>
                    <CheckIcon />
                    <div className={styles.title}>{a.title}</div>
                    <hr className={styles.vline} />
                    <div>{a.description}</div>
                </div>
            ))}
        </div>
    );
};