import Link from 'next/link';
import {
  Box,
  Heading,
  Container,
  Text,
  SimpleGrid,
  Avatar
} from '@chakra-ui/react';
import { Image, StructuredText } from 'react-datocms';

import Layout from 'components/template/Layout';
import { doQuery } from 'lib/api';
import * as queries from 'lib/queries';

const BlogIndexPage = ({ posts }) => {
  return (
    <Layout>
      <Container maxW={'container.xl'} px={4} py={5} justify="flex-start">
        <Heading as="h1" fontSize="6xl" py={10}>
          {'BLOG INDEX'}
        </Heading>
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3 }}
          spacing="8"
          p="10"
          rounded="lg">
          {posts?.map((post) => {
            return (
              <Box key={post.id}>
                <Link href={`/blog/${post.slug}`}>
                  <a>
                    {post.pic && (
                      <Avatar title={post.title} src={post.pic.url} />
                    )}
                    <Text>{post.title}</Text>
                  </a>
                </Link>
                <StructuredText data={post.excerpt} />
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const response = await doQuery(queries.postList, null);
  const posts = response?.data?.posts || [];
  return {
    props: { posts }
  };
}

export default BlogIndexPage;