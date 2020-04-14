import React from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import { perPage } from '../config';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;

  button{
    background:#f4976c;
    border:none;
    font-size:2rem;
    font-family: Porton;
    margin:0 1%;
  }

  button:disabled {
    color:purple;
    background:transparent;
  }
  a{
    color:#d2fdff;
  }
`;

const PAGINATION_QEURY = gql`
  query PAGINATION_QEURY{
    restaurantsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QEURY}>
    {({ data, loading, error }) => {
      if (error) return <p>Error</p>
      if (loading) return <p>Loading...</p>
      const count = data.restaurantsConnection.aggregate.count
      const pages = Math.ceil(count / perPage)
      const page = props.page
      return (
        <PaginationStyles>
          <Head>
            <title>Popina | Page {page} of {pages}</title>
          </Head>
          <Link prefetch href={{
            pathname: 'restaurants',
            query: { page: page - 1 }
          }}>
            <button disabled={page <= 1}>
              <a>Prev</a>
            </button>
          </Link>
          <h2>Page {page} of {pages}</h2>
          <Link prefetch href={{
            pathname: 'restaurants',
            query: { page: page + 1 }
          }}>
            <button disabled={page >= pages}>
              <a>Next</a>
            </button>
          </Link>
        </PaginationStyles>)
    }}
  </Query>
)

export default Pagination;