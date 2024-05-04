import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useQuery } from '@apollo/client';
import { getTechPostsQueryDocuments } from '@/gql/query/posts/getTechPosts';
import { Box, Button, Text } from '@chakra-ui/react';
import FlatCard from './FlatCard';

const TechPostList = () => {
  const { data, loading, error } = useQuery(getTechPostsQueryDocuments);

  if (error) return <Text>読み込めませんでした</Text>;

  return (
    <Box as="section" pt={{ base: '10', md: '8' }}>
      <Box as="ul">
        {data?.posts?.nodes.map((post, i) => (
          <Box key={i} mt={{ base: '8', md: '16' }}>
            <FlatCard post={post} loading={loading} i={i} />
          </Box>
        ))}
      </Box>
      <Box mt="10" textAlign="center">
        <Button
          as={NextLink}
          href={`/posts`}
          bg="black"
          color="white"
          borderRadius="3xl"
          fontWeight="bold"
          fontSize="sm"
          px="8"
          _hover={{ opacity: '0.7' }}
        >
          READ MORE →
        </Button>
      </Box>
    </Box>
  );
};

export default TechPostList;
