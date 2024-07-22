import React, { useState, useEffect } from 'react'
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'

import { useGetMoviesQuery } from '../../services/TMDB'
import { MovieList } from '..'

const Movies = () => {
  const [page, setPage] = useState(1);
  //* Getting data from useSelector about the search query
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  //* Passing the searchQuery into the useGetMoviesQuery
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

  //* Loading
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    )
  }

  //* No data
  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    )
  }

  //* Error
  if (error) return 'An error has occured.';

  return (
    <div>
      <MovieList movies={data} />
    </div>
  )
}

export default Movies