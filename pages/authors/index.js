import Link from 'next/link';
import {
  Box,
  Heading,
  Container,
  Text,
  SimpleGrid,
  Avatar
} from '@chakra-ui/react';

import Layout from 'components/Layout';
import BreadCrumbs from 'components/BreadCrumbs';
import HeroImage from 'components/HeroImage';
import StructuredContent from 'components/StructuredContent';
import ModularContent from 'components/ModularContent';
import ProfileCard from 'components/ProfileCard';

import { doQuery } from 'lib/api';
import * as queries from 'lib/queries';
import { getLayoutData } from 'lib/utils';

const AuthorsIndexPage = ({ authors, page, layout }) => {
  const breadcrumbs = [
    { title: 'Home', path: '/' },
    { title: 'Authors', path: `/authors`, isCurrentPage: true }
  ];
  return (
    <Layout data={layout}>
      {page?.slideshow?.slides && <Slideshow slides={page.slideshow.slides} />}
      {page?.pic && <HeroImage pic={page.pic} small={true} />}
      <Container maxW={'container.xl'} px={4} py={5} justify="flex-start">
        <BreadCrumbs paths={breadcrumbs} />
        <Heading as="h1" fontSize="6xl" py={10}>
          {page?.title}
        </Heading>
        {page?.content && <StructuredContent content={page.content} />}
        {page?.modBlocks && <ModularContent content={page.modBlocks} />}

        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3 }}
          spacing="8"
          p="10"
          rounded="lg">
          {authors?.map((author) => {
            return (
              <Box key={author.id}>
                <ProfileCard {...author} />
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const response = await doQuery(queries.authors, null);
  const authors = response?.data?.authors || [];

  const slug = 'authors';
  const pageResponse = await doQuery(queries.page, { slug });
  const page = pageResponse?.data?.page || null;

  const site = await doQuery(queries.siteQuery, null);
  const layout = getLayoutData(site, page?.seo);

  return {
    props: { authors, page, layout }
  };
}

export default AuthorsIndexPage;
