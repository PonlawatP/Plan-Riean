import { serialize, parse } from 'cookie';

import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import { cookies } from 'next/headers';

export const setTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Enable 'Secure' attribute in production
    sameSite: 'Strict', // Set SameSite attribute to 'Strict'
    maxAge: 60 * 60 * 24 * 1, // 1 week in seconds
    path: '/', // Set the path for the cookie
  };

  const serializedToken = serialize('jwtToken', token, cookieOptions);
  res.setHeader('Set-Cookie', serializedToken);
};
export const deleteTokenCookie = (res) => {
  // Delete the 'jwtToken' cookie on the server side
  res.setHeader(
    'Set-Cookie',
    'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; HttpOnly; SameSite=Strict; path=/',
  );
};

export const getTokenCookie = (req) => {
  return req.req.cookies.jwtToken;
};

export const setTokenCookieClientSide = (token) => {
  const cookieOptions = {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production', // Enable 'Secure' attribute in production
    sameSite: 'Strict', // Set SameSite attribute to 'Strict'
    path: '/', // Set the path for the cookie
  };

  Cookies.set('jwtToken', token, cookieOptions);
};
export const deleteTokenCookieClientSide = () => {
  // Delete the 'jwtToken' cookie
  Cookies.remove('jwtToken', {
    secure: process.env.NODE_ENV === 'production', // Ensure the same options used for setting the cookie
    path: '/',
  });
};

export const getTokenCookieClientSide = () => {
  return Cookies.get('jwtToken');
};
