import React from 'react';
import './AboutUs.css';
import { ReactComponent as RssLogo } from '../../assets/icons/logo.svg';
import { Link } from 'react-router-dom';
import natalia from './images/Natalia.webp';
import mariam from './images/Mariam.webp';
import umida from './images/Umida.webp';
import { MainWrapper } from '../mainWrapper/MainWrapper';
import GitHubIcon from '@mui/icons-material/GitHub';

const team = [
  {
    name: 'Natalia Ivantsova',
    role: 'Team Lead',
    bio: `I'm Natalia Ivantsova, a Junior Front-End Developer, based in Ukraine. Here's a bit about me. I have experience working with HTML, CSS, JavaScript, TypeScript, Material-UI (MUI), Redux, RTK Query, REST API, Jest, React Hook Forms, Yup Validator, Commercetools, Git, and Azure DevOps. I have 2 cats and a dog. I have a lot of hobbies, like watercolor painting, photography, candle making, and plant care.Have a project in mind? Let's chat and make something awesome together!
`,
    photo: natalia,
    github: 'https://github.com/NataliaIv90',
    contributions: `As a team lead, I specialized in setting up task boards and configuring development environments.
My responsibility included creating a registration form and its input validation, integrating user profiles and addresses with commercetools, and implementing routing.
I implemented a product page (displaying detailed product information based on data, fetched from commercetools API, implemented an image slider, and created a custom skeleton for pending component state). Additionally, I managed all the necessary data in commercetools, related to product info, categories, sales promo, etc.
I also implemented the basket page: displaying the data, fetched from commercetools API, functionality to modify cart data, and updating it in commercetools.`,
  },
  {
    name: 'Umida Abdugafurova',
    role: 'Software Engineer',
    bio: `I'm Umida Abdugafurova, a Junior Front-End Developer, based in Uzbekistan. I have experience with HTML, CSS, SCSS, JavaScript, TypeScript,Vue Js, React, Redux, React Query, Redux Toolkit, REST API, React Hook Forms, Yup Validator, Git, and Next js. I have 1 year experience in UIC company in Tashkent. I have a lot of hobbies, like swimming in pool, cooking and hand made decorations.
`,
    photo: umida,
    github: 'https://github.com/AbdugafurovaUmida',
    contributions: `As a software engineer, I specialize in setting up commercetools projects and API clients. 
I manage state for registration, implement automatic login and redirection, and handle authentication tokens. 
I excel in login page integration with authentication services, input validation, and seamless redirection. 
My expertise extends to catalog management, including category navigation, product listing, filtering, sorting, and searching. 
I enhance catalog pages with shopping cart integration, interactive product cards, and performance optimization.`,
  },
  {
    name: 'Mariam Kochadze',
    role: 'Software Engineer',
    bio: 'I am Mariam Kochadze,based in Georgia. I am a Junior Front-End Developer on a journey of continuous learning and growth. With a solid foundation in HTML, CSS, and JavaScript, I have expanded my skills to include React, TypeScript and Git. I thrive on creating intuitive and visually appealing user interfaces that enhance the user experience. Committed to innovation and best practices, I am dedicated to mastering the art of front-end development and contributing to meaningful projects that make a difference.I have a lot of hobbies, walking, reading,capturing moments and creating visual stories,exploring new places and cultures which can provide new perspectives and experiences.',
    photo: mariam,
    github: 'https://github.com/MariamKochadze',
    contributions: `As a software engineer I specialize in crafting comprehensive README documentation and developing centralized main page navigation systems.
 My role involves setting evaluation criteria for headers, implementing robust routing systems, and managing user profiles. 
I ensure seamless display and editing of user profile information, enhancing user experience. 
Additionally, I design and implement informative and engaging About Us pages, contributing to a cohesive and intuitive web platform.`,
  },
];

export const AboutUs = (): JSX.Element => {
  return (
    <MainWrapper>
      <div className='about-us_wrapper'>
        <h1>About us</h1>
        <div className='about-us_title'>
          <p className='about-us_intro'>
            Welcome to Garden with Flowers! We are a team of developers from different countries and cultures, brought
            together by our love for flowers. We created this website as part of our team pet project at
            <Link
              className='about-us_rss-text'
              to='https://rs.school/'
              target='_blank'
            >
              {` `}RSSchool
            </Link>
            . At Garden with Flowers, we believe that flowers can make any day special. Thank you for visiting our site.
            We can't wait to share our love of flowers with you! Best, The Garden with Flowers Team.
          </p>
          <div className='rss-logo_wrapper'>
            <Link
              to='https://rs.school/'
              target='_blank'
            >
              <RssLogo className='rss-logo' />
            </Link>
          </div>
        </div>
        <h2>Our team members</h2>
        {team.map((member, index) => {
          return (
            <div
              key={member.name}
              className={`about-us member${index}`}
            >
              <img
                className='about-us_image'
                src={member.photo}
                alt={member.name + "'s photo"}
              ></img>
              <div className='about-us_info'>
                <h2 className='about-us_name'>{member.name}</h2>
                <p className='about-us_role'>{member.role}</p>
                <p className='about-us_bio'>{member.bio}</p>
                <p className='about-us_contributions'>{member.contributions}</p>
                <span>{member.role}</span>
                <Link
                  to={member.github}
                  className='about-us_link'
                >
                  <GitHubIcon className='github-icon' />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </MainWrapper>
  );
};
