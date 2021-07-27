import React, {useState} from "react";
import { Htag, P, Tag, Rating, Input, Textarea} from "../components";
import { withLayout} from "../layout/Layout";
import {GetStaticProps} from "next";
import axios from "axios";
import {MenuItem} from "../interfaces/menu.interface";
import {API} from "../helpers/api";

function Home({menu,firstCategory}:HomeProps): JSX.Element {

    const [rating,setRating] = useState<number>(4);
    
  return (
    <>
      <Htag tag="h1">Hi YEgor</Htag>
          <P size="l">1231212dadassdaasdasdsadas</P>
          <P size="m">1231212dadassdaasdasdsadas</P>
          <P size="s">1231212dadassdaasdasdsadas</P>
        <Tag size="s"  color="ghost">GHOST</Tag>
        <Tag size="m" color="red">Test</Tag>
        <Tag size="m" color="green">Test</Tag>
        <Tag size="m" color="primary">Test</Tag>
        <Rating isEditable={true} rating={rating} setRating={setRating} />
        <Input placeholder='Test' />
        <Textarea placeholder='Test' />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data:menu } = await axios.post<MenuItem[]>(API.topPage.find,{firstCategory});

  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown>{
  menu: MenuItem[],
  firstCategory: number;
}
