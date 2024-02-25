import { getTokenCookie, setTokenCookie } from '@/app/utils/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import { JWT, getToken } from 'next-auth/jwt'
import * as jose from 'jose'
 
type ResponseData = {
  redirect: string
}

export default async function handler(
  req: any,
  res: NextApiResponse<ResponseData>
) {
  // console.log(req)
  const token = await getToken({
      req
  })
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET,
    )
    // console.log(secret)
    const alg = 'HS256'
    const jwt = await new jose.SignJWT(token as JWT)
      .setProtectedHeader({ alg })
      .sign(secret)
    // setTokenCookie(res, jwt)


  console.log(token, jwt)
  // res.redirect("/account/first-started")
  // use jwt to app token between api

  res.status(302).json({ redirect: "/account/first-started" })
}