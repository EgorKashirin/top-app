import {ProductProps} from "./Product.props";
import styles from "./Product.module.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cn from "classnames";
import {Card} from "../Card/Card";
import {Rating} from "../Rating/Rating";
import {Tag} from "../Tag/Tag";
import {Button} from "../Button/Button";
import {declOfNum, priceRu} from "../../helpers/helpers";
import {Divider} from "../Divider/Divider";
import Image from "next/image";
import {ForwardedRef, forwardRef, useRef, useState} from "react";
import {Review} from "../Review/Review";
import {ReviewForm} from "../ReviewForm/ReviewForm";
import {motion} from "framer-motion";

export const Product = motion(forwardRef(({product,className,...props}:ProductProps,ref:ForwardedRef<HTMLDivElement>):JSX.Element => {

    const variants = {
        visible: {opacity:1,height: 'auto'},
        hidden: {opacity: 0,height: 0}
    };

    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

    const reviewRef = useRef<HTMLDivElement>(null);

    const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    return(
        <div className={className} {...props} ref={ref}>
            <Card className={styles.product}>
                <div className={styles.logo}>
                    <img
                        src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                        alt={product.title}
                        width={70}
                        height={70}
                    />
                </div>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.price}>
                    <span><span className="visibleHidden">Цена</span>{priceRu(product.price)}</span>
                    {product.oldPrice &&
                    <Tag className={styles.oldPrice} color="green">
                        <span><span className="visibleHidden">Скидка</span>{priceRu(product.price - product.oldPrice)}</span >
                    </Tag>
                    }
                </div>
                <div className={styles.credit}>
                    <span><span className="visibleHidden">Кредит</span>{priceRu(product.credit)}/<span className={styles.month}>мес</span></span>
                </div>
                <div className={styles.rating}>
                    <span><span className="visibleHidden">{`Рейтинг ${product.reviewAvg ?? product.initialRating}`}</span>
                        <Rating rating={product.reviewAvg ?? product.initialRating} />
                    </span>
                </div>
                <div className={styles.tags}>{product.categories.map((c,i) => (<Tag className={styles.category} key={`product-tag-${i}`} color="ghost">{c}</Tag>) )}</div>
                <div aria-hidden={true} className={styles.priceTitle}>цена</div>
                <div aria-hidden={true} className={styles.creditTitle}>кредит</div>
                <div className={styles.rateTitle}>
                    <a href="#ref" onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount,['отзыв','отзыва','отзывов'])}</a>
                </div>
                <Divider className={styles.hr}/>
                <div className={styles.description}>{product.description}</div>
                <div className={styles.feature}>
                    {product.characteristics.map(c=>(
                        <div key={`characteristic - ${c.name}`} className={styles.characteristic}>
                            <span className={styles.characteristicsName}>{c.name}</span>
                            <span className={styles.characteristicsDots} />
                            <span className={styles.characteristicsValue}>{c.value}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.advBlock}>
                    {product.advantages && <div className={styles.advantages}>
                        <div className={styles.advTitle}>Преимущетва</div>
                        {product.advantages}
                    </div>}
                    {product.disadvantages && <div className={styles.disadvantages}>
                        <div className={styles.advTitle}>Недостатки</div>
                        {product.disadvantages}
                    </div>}
                </div>
                <Divider className={cn(styles.hr,styles.hr2)}/>
                <div className={styles.actions}>
                    <Button appearance='primary'>Узнать подробнее</Button>
                    <Button
                        appearance='ghost'
                        arrow={!isReviewOpened ? "right" : "down"}
                        onClick={()=>setIsReviewOpened((prev)=>!prev)}
                        aria-expanded={isReviewOpened}
                    >Читать отзывы</Button>
                </div>
            </Card>
            <motion.div animate={isReviewOpened ? 'visible' : 'hidden'} variants={variants} initial={'hidden'}>
                <Card color="blue" className={styles.reviews} ref={reviewRef}>
                    {product.reviews.map((r) => (
                        <div key={`review-${r._id}`}>
                            <Review review={r} />
                            <Divider />
                        </div>
                    ))}
                    <ReviewForm productId={product._id} />
                </Card>
            </motion.div>
        </div>
    );
}));