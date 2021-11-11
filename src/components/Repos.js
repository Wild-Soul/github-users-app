import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) {
      return total;
    }
    if (!total[language]) {
      total[language] = {
        label: language,
        value: 1,
        stars: 1
      };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count
      };
    }
    return total;
  }, {});

  // top-5 most used lanugage.
  const mostUsedLanguages = Object.values(languages).sort((cur, next) => {
    return next.value - cur.value;
  }).slice(0, 5);

  // top-5 most stars per language.
  const mostPopular = Object.values(languages).sort((cur, next) => {
    return next.stars - cur.stars
  }).map((item) => {
    // format the data for chart. swap vlaue with stars count.
    return { ...item, value: item.stars };
  }).slice(0,5);

  console.log(mostPopular);
  return <section className="section">
    <Wrapper className="section-center">
      <Pie3D data={mostUsedLanguages} />
      <Column3D data={mostPopular} />
      <Doughnut2D data={mostPopular} />
      <Bar3D data={mostPopular} />
    </Wrapper>
  </section>
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
